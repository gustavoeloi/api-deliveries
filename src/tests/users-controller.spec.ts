import supertest from "supertest";

import { app } from "@/app";
import { prisma } from "@/database/prisma";
import { createUserTest } from "./utils";

describe("UsersController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should create a user with successfully", async () => {
    const response = await createUserTest();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("UserTest");

    user_id = response.body.id;
  });

  it("should throw a error when the email is already in use", async () => {
    const response = await createUserTest();

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("E-mail has been already used");
  });

  it("should throw a error when the email is invalid", async () => {
    const response = await supertest(app).post("/users").send({
      name: "UserTest",
      email: "invalid-email",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("validation error");
  });
});
