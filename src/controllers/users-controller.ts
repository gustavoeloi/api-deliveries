import { Request, Response, NextFunction } from "express";

class UserController {
  create(request: Request, response: Response, next: NextFunction) {
    return response.json({ message: "Is testees!" });
  }
}

export { UserController };
