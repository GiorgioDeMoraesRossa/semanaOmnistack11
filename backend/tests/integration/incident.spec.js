const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
const seedFile = require("../../src/database/seeds/incidentsTest");

describe("incidents", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new incident", async () => {
    const ong = await request(app) // getting an valid ong id
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC",
      });

    const response = await request(app)
      .post("/incidents")
      .set("authorization", ong.body.id)
      .send({
        title: "teste",
        description: "descriptiontestingdescription",
        value: 150,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).not.toBe(NaN);
  });

  it("should be able to retrieve pages of incidents with their respective ong data", async () => {
    const ong = await request(app) // getting a valid ong id
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC",
      });

    seedFile(ong.body.id); // populate the incidents table

    const [count] = await connection("incidents").count();

    // tests all the pages
    let posts = 0;
    for (let page = 1; page < Math.ceil(count["count(*)"] / 5); page++) {
      const response = await request(app).get("/incidents?page=" + page);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            value: expect.any(Number),
            ong_id: expect.stringMatching(/^[0-9a-zA-Z]{8}$/),
            name: expect.any(String),
            email: expect.any(String),
            city: expect.any(String),
            uf: expect.stringMatching(/^[0-9a-zA-Z]{2}$/),
          }),
        ])
      );
      if (page + 1 > Math.ceil(count["count(*)"] / 5)) {
        expect(response.body).toHaveLength(count["count(*)"] - posts);
      } else {
        expect(response.body).toHaveLength(5);
      }
      posts += 5;
    }
  });

  it("should be able to delete an incident", async () => {
    const ong = await request(app) // getting an valid ong id
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC",
      });

    const incident = await request(app)
      .post("/incidents")
      .set("authorization", ong.body.id)
      .send({
        title: "teste",
        description: "descriptiontestingdescription",
        value: 150,
      });

    const response = await request(app)
      .delete("/incidents/" + incident.body.id)
      .set("authorization", ong.body.id);

    expect(response.body).toMatchObject({});
  });
});
