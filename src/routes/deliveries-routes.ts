import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controller";
import { DeliveriesStatusControler } from "@/controllers/deliveries-status-controller";

import { ensureAuthentication } from "@/middlewares/ensure-authentication";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorizatoin";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusControler();

// valida a autenticação e autorização
deliveriesRoutes.use(ensureAuthentication, verifyUserAuthorization(["sale"]));

// rotas
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.create);

export { deliveriesRoutes };
