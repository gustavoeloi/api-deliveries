import { Request, Response } from "express";
import { z } from "zod";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { authConfig } from "@/configs/auth";

class SessionsControler {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid e-mail or password", 401);
    }

    let isSamePassword = await compare(password, user.password);

    if (!isSamePassword) {
      throw new AppError("Invalid e-mail or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.json({ token, user: userWithoutPassword });
  }
}

export { SessionsControler };
