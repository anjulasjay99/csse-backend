const request = require("supertest");
const { response } = require("../server");
const server = require("../server");

// Tests for Adding Suppliers

describe("POST /Add suppliers", () => {
  // Positive test for Adding Suppliers
  describe("Positive Test for status code to 'Add Suppliers'", () => {
    jest.setTimeout(50000);

    test("Add suppliers Should response with a status code of 200", async () => {
      const response = await request(server).post("/supplier").send({
        businessName: "Kamal Perera pvt",
        supplierId: "S12345",
        fullName: "K.M kamal piris perera",
        telephone: "09478356789",
        email: "kamalperera@gmail.com",
        address: "1A/f3/U34 Malabe ,Colombo",
        state: "Colombo",
        zip: "10230",
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
// Negative Test for Adding Suppliers

describe("Negative test for status code to 'Add Suppliers'", () => {
  test("Add suppliers Should not respond with a status code of 400", async () => {
    const response = await request(server).post("/supplier").send({
      businessName: "Kamal Perera pvt",
      supplierId: "S12345",
      fullName: "K.M kamal piris perera",
      telephone: "09478356789",
      email: "kamalperera@gmail.com",
      address: "1A/f3/U34 Malabe ,Colombo",
      state: "Colombo",
      zip: "10230",
    });
    expect(response.statusCode).not.toBe(404);
  });
});

describe("positive test case for status code to 'Update Suppliers'", () => {
  //postive test for update suppliers
  test("Update Supplier should respond with a 200 status code", async () => {
    const response = await request(server)
      .post("/supplier/update/636001e41971a628ebe0bd80")
      .send({
        businessName: "Saman Perera pvt",
        supplierId: "S987621",
        fullName: "K.M Saman piris perera",
        telephone: "09178356727",
        email: "samanperera@gmail.com",
        address: "1p/f9/U74 Kalaniya ,Colombo",
        state: "Colombo",
        zip: "10230",
      });
    expect(response.statusCode).toBe(200);
  });
});

describe("Negative test case for status code to 'Update Suppliers'", () => {
  //postive test for update suppliers
  test("Update Supplier should respond with a 404 status code", async () => {
    const response = await request(server).post("/supplier/update/").send({
      businessName: "Saman Perera pvt",
      supplierId: "S987621",
      fullName: "K.M Saman piris perera",
      telephone: "09178356727",
      email: "samanperera@gmail.com",
      address: "1p/f9/U74 Kalaniya ,Colombo",
      state: "Colombo",
      zip: "10230",
    });
    expect(response.statusCode).toBe(404);
  });
});

describe("GET /supplier/ById", () => {
  describe("get specific supplier", () => {
    jest.setTimeout(30000);

    //postive test for  get specific supplier
    test("Get suppliers should respond with a 200 status code", async () => {
      const response = await request(server)
        .get("/supplier/get/636001e41971a628ebe0bd80")
        .send();
      expect(response.statusCode).toBe(200);
    });

    // Negative Test for get specific supplier
    test("Get suppliers should respond with a 400 status code", async () => {
      const response = await request(server).get("/supplier/get").send();
      expect(response.statusCode).toBe(404);
    });
  });
});

//Unit testing for delete supplier
describe("DELETE /Delete supplier", () => {
  // Positive test for deleting Supplier
  describe("Positive Test for status code to 'Delete Supplier'", () => {
    jest.setTimeout(30000);

    test("Delete supplier Should response with a status code of 200", async () => {
      const response = await request(server)
        .delete("/supplier/delete/6367301d2ce9fd2bdb158107")
        .send();
      expect(response.statusCode).toBe(200);
    });
  });

  // Negative Test for Deleting Supplier

  describe("Negative test for status code to 'Delete Supplier'", () => {
    jest.setTimeout(30000);

    test("Delete supplier Should not respond with a status code of 400", async () => {
      const response = await request(server)
        .delete("/supplier/delete/6359762895c26c28ebc5eer7")
        .send();
      expect(response.statusCode).toBe(400);
    });
  });
});
