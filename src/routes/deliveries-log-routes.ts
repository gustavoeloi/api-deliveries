import { Router } from "express";

import { ensureAuthentication } from "@/middlewares/ensure-authentication";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorizatoin";

import { DeliveriesLogControler } from "@/controllers/deliveries-log-controller";

const deliveriesLogRoutes = Router();

const deliveriesLogController = new DeliveriesLogControler();

deliveriesLogRoutes.post(
  "/",
  ensureAuthentication,
  verifyUserAuthorization(["sale"]),
  deliveriesLogController.create
);

deliveriesLogRoutes.get(
  "/:id/show",
  ensureAuthentication,
  verifyUserAuthorization(["sale", "customer"]),
  deliveriesLogController.show
);

export { deliveriesLogRoutes };
