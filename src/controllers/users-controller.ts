import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";

class UserController {
  async create(request: Request, response: Response) {
    const userSchema = z.object({
      name: z.string().trim().min(1),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = userSchema.parse(request.body);

    const passwordHashed = await hash(password, 8);

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError("E-mail has been already used", 409);
    }

    const user = await prisma.user.create({
      data: { name, email, password: passwordHashed },
    });

    const { password: _, ...userWithouPassword } = user;

    return response.status(201).json(userWithouPassword);
  }
}

export { UserController };
