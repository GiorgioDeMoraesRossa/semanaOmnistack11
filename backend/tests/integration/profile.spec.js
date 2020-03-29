const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
const seedFile = require("../../src/database/seeds/incidentsTest");

describe("profile", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to retrieve all incidents from a logged ong", async () => {
    const ong1 = await request(app) // getting an valid ong id
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC"
      });

    const ong2 = await request(app) // getting another valid ong id
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC"
      });

    seedFile(ong1.body.id);
    seedFile(ong2.body.id);

    const [count] = await connection("incidents")
      .where("ong_id", ong1.body.id)
      .count();

    const response = await request(app)
      .get("/profile")
      .set("authorization", ong1.body.id);

    expect(response.body).toHaveLength(count["count(*)"]);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          value: expect.any(Number),
          ong_id: expect.stringMatching(/^[0-9a-zA-Z]{8}$/)
        })
      ])
    );
  });
});
