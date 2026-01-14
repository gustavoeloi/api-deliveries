import supertest from "supertest";

import { app } from "@/app";

describe("UsersController", () => {
  it("should create a user with successfully", async () => {
    const request = await supertest(app).post("/users").send({
      name: "UserTest",
      email: "usertest@dev.com",
      password: "123456",
    });

    expect(request.status).toBe(201);
    expect(request.body).toHaveProperty("id");
    expect(request.body.name).toBe("UserTest");
  });
});
