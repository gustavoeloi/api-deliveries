import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/app-error";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT not found!", 404);
    }

    const [_, token] = authHeader.split(" ");

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token", 401);
  }
}

export { ensureAuthentication };
