import { Router } from "express";

import { userRoutes } from "./user-routes";

import { sessionRoutes } from "./session-route";
import { deliveriesRoutes } from "./deliveries-routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/deliveries", deliveriesRoutes);

export { routes };
