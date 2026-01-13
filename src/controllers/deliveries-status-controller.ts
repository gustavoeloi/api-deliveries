import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";

class DeliveriesStatusControler {
  async create(request: Request, response: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"]),
    });

    const { id } = paramSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    await prisma.delivery.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: status,
      },
    });

    return response.status(204).json();
  }
}

export { DeliveriesStatusControler };
