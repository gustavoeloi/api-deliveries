import { Router } from "express";

import { userRoutes } from "./user-routes";

import { sessionRoutes } from "./session-route";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveriesLogRoutes } from "./deliveries-log-routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/deliveries-logs", deliveriesLogRoutes);

export { routes };
