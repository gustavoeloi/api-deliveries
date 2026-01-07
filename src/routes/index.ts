import { app } from "@/app";

import { userRoutes } from "./user-routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", userRoutes);

export { routes };
