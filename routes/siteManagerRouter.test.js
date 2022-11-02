const request = require("supertest");
const server = require("../server");

describe("POST /siteManagers/login", () => {
  describe("login to site manager account", () => {
    jest.setTimeout(30000);

    //login to site manager account with correct email and password
    test("should respond with a 200 status code", async () => {
      const response = await request(server).post("/siteManagers/login").send({
        email: "shehan123@gmail.com",
        password: "abcd1234",
      });
      expect(response.statusCode).toBe(200);
    });

    //login to site manager account with an invalid email
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/siteManagers/login").send({
        email: "anjulasjay",
        password: "abcd1234",
      });
      expect(response.statusCode).toBe(400);
    });

    //login to site manager account with an incorrect password
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/siteManagers/login").send({
        email: "shehan123@gmail.com",
        password: "abc",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
