import { Router } from "express";
import { SessionsControler } from "@/controllers/sessions-controller";

const sessionRoutes = Router();
const sessionsController = new SessionsControler();

sessionRoutes.post("/", sessionsController.create);

export { sessionRoutes };
