import supertest from "supertest";
import { app } from "@/app";

export async function createUserTest() {
  const response = await supertest(app).post("/users").send({
    name: "UserTest",
    email: "usertest@dev.com",
    password: "123456",
  });

  return response;
}
