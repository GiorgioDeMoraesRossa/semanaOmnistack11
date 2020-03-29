const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("sessions", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const ong = await request(app) // getting a valid ong id
      .post("/ongs")
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "53981044323",
        city: "Rio do Sul",
        uf: "SC"
      });

    const response = await request(app)
      .post("/sessions")
      .send({
        id: ong.body.id
      });

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual(expect.any(String));
  });
});
