import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";

class DeliveriesLogControler {
  async create(request: Request, response: Response) {
    return response.json({ message: "ok" });
  }
}

export { DeliveriesLogControler };
