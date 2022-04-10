const server = require("../index");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);
var _ = require("lodash");
const initData = require("../init_data.json");

afterAll(() => server.close());

describe("User Endpoints", () => {
  it("GET /users should show all users", async () => {
    const res = await requestWithSupertest.get("/api/v1/users");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(_.toArray(initData.data));
  });

  it("GET /users should user by id", async () => {
    const res = await requestWithSupertest.get("/api/v1/users/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(initData.data["1"]);
  });
  it("GET /users by id handles not found user", async () => {
    const res = await requestWithSupertest.get("/api/v1/users/6");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(expect.objectContaining({ message: "Not Found" }));
  });

  it("POST /users should create User", async () => {
    const newUser = {
      email: "testemail@gmail.com",
      firstName: "tester",
      lastName: "smith",
    };
    const res = await requestWithSupertest.post("/api/v1/users").send(newUser);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toEqual(expect.objectContaining(newUser));
    expect(_.toArray(initData.data)).toEqual(
      expect.arrayContaining([expect.objectContaining(newUser)])
    );
  });
});
