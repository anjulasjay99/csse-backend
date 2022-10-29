const request = require("supertest");
const server = require("../server");

describe("GET /products", () => {
  describe("get all products", () => {
    jest.setTimeout(30000);

    //fetch all products
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/products").send();
      expect(response.statusCode).toBe(200);
    });
  });
});
