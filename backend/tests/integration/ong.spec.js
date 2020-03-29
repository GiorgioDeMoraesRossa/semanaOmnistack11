const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });

  it("should be able to retrieve all ongs with the correct ID, whatsapp and uf sizes", async () => {
    await request(app) // populating db
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC"
      });
    await request(app) // populating db
      .post("/ongs")
      .send({
        name: "teste",
        email: "teste@email.com",
        whatsapp: "53981042535",
        city: "Pelotas",
        uf: "RS"
      });

    const [count] = await connection("ongs").count();
    const response = await request(app).get("/ongs");

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.stringMatching(/^[0-9a-zA-Z]{8}$/),
          name: expect.any(String),
          email: expect.any(String),
          whatsapp: expect.stringMatching(/^[0-9a-zA-Z]{10,11}$/),
          city: expect.any(String),
          uf: expect.stringMatching(/^[0-9a-zA-Z]{2}$/)
        })
      ])
    );
    expect(response.body).toHaveLength(count["count(*)"]);
  });
});
