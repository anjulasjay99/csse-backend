const request = require("supertest");
const server = require("../server");

describe("GET /orders/all", () => {
  describe("get all orders by site id", () => {
    jest.setTimeout(30000);

    //fetch all orders by side id
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/orders/all/ST001").send();
      expect(response.statusCode).toBe(200);
    });

    //fetch all orders without site id
    test("should respond with a 404 status code", async () => {
      const response = await request(server).get("/orders/all").send();
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("POST /orders", () => {
  describe("place a new order", () => {
    jest.setTimeout(30000);

    //placing an order with all required details
    test("should respond with a 200 status code", async () => {
      const response = await request(server).post("/orders").send({
        siteId: "ST001",
        siteName: "CNTRCTN SITE",
        productId: "P001",
        productName: "Cement",
        supplierId: "S001",
        supplierName: "Dammika Perera",
        amount: 5,
        payment: 25000,
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
