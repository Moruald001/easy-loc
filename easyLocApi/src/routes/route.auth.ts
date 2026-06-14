import { Router } from "express";
import { protect } from "../middlewares/protect";
import { login, deleted } from "../controllers/controller.auth";

const route = Router();

route.get("/login ", login);

route.patch("/deleted", protect, deleted);

export default route;
