/**
 * Unit testing for the products router api calls.
 */

const request = require("supertest");
const { response } = require("../server");
const server = require("../server");

describe("GET /products", () => {

  // Positive Test for status code
  describe("Positive test for status code to 'Get all products'", () => {
    jest.setTimeout(30000);

  // Positive Test for status code
    test("Should respond with a 200 status code", async () => {
      const response = await request(server).get("/products").send();
      expect(response.statusCode).toBe(200);
    });
  });

  // Negative Test for status code
  describe("Negative test for status code to 'Get all products'", () => {
    jest.setTimeout(30000);

    test("Should not respond with a status code of 400" , async() => {
      const response = await request(server).get("/products").send();
      expect(response.statusCode).not.toBe(400);
    });
  });


  // Returned Object keys matching

  describe("Match returned object keys of product data" , () => {
    jest.setTimeout(30000);

    
  // Object keys to be matched with
  const productMatch = {
    _id: "6357bf68f25fd541025b0173",
    productId: "P001",
    productStatus: "Available",
    productPrice: 5000,
    productDescription: "Cement Description",
    supplierId: "S001",
    supplierName: "Dammika Perera",
    quantity: "10",
    productImage: "",
    productName: "Cement"
  }
    test("Should match object keys defined" , async() =>{
      const response = await request(server).get("/products").send();
      expect(Object.keys(response.data[0]).sort()).toEqual(Object.keys(productMatch).sort());
    });
  });

});

// Tests for Adding Products

describe("POST /products/addProduct" , () =>{

  // Positive test for status code
  describe("Positive Test for status code to 'Add Product'" , () =>{
    jest.setTimeout(30000);

    test("Should response with a status code of 200" ,async() =>{
      const response  = await request(server).post('/products/addProduct').send({
        productPrice: 5000,
        productDescription: "Cement Description",
        supplierId: "S001",
        supplierName: "Dammika Perera",
        quantity: "10",
        productImage: "",
        productName: "Cement"
      });
      expect(response.statusCode).toBe(200);
    });
  });

  // Negative Test for Status Code

  describe("Negative test for status code to 'Add Product'" , ()=>{
    jest.setTimeout(30000);

    test("Should not respond with a status code of 400" , async () =>{
      const response = await request(server).post('/products/addProduct').semd({
        productPrice: 5000,
        productDescription: "Cement Description",
        supplierId: "S001",
        supplierName: "Dammika Perera",
        quantity: "10",
        productImage: "",
        productName: "Cement"
      });
      expect(response.statusCode).not.toBe(400);
    })
  })
})


// Image fetching tests
