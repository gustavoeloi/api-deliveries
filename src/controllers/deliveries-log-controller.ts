import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";

class DeliveriesLogControler {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string().min(6),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findFirst({
      where: { id: delivery_id },
    });

    if (!delivery) {
      throw new AppError("the delivery id must be valid");
    }

    if (delivery.status === "processing") {
      throw new AppError("you have to shippe the delivery");
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.json();
  }

  async show(request: Request, response: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramSchema.parse(request.params);

    const delivery = await prisma.delivery.findFirst({
      where: { id: id },
      include: {
        deliveryLogs: true,
      },
    });

    if (delivery?.status === "delivered") {
      throw new AppError("This delivery has already been delivered.");
    }

    if (delivery?.userId !== request.user?.id) {
      throw new AppError("You can only see your own deliveries");
    }

    return response.json(delivery);
  }
}

export { DeliveriesLogControler };
