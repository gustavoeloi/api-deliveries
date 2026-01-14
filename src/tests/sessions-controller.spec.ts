import supertest from "supertest";

import { app } from "@/app";
import { prisma } from "@/database/prisma";
import { createUserTest } from "./utils";
import { string } from "zod";

describe("SessionsController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should authenticate a and get access token", async () => {
    const response = await createUserTest();

    user_id = response.body.id;

    const responseSession = await supertest(app).post("/sessions").send({
      email: "usertest@dev.com",
      password: "123456",
    });

    expect(responseSession.status).toBe(200);
    expect(responseSession.body.token).toEqual(expect.any(String));
  });
});
