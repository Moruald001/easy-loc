import express from "express";
import { Router } from "express";
import { protect } from "../middlewares/protect";
import * as auth from "../controllers/controller.auth";

const route = Router();

route.get("/login ", auth.login);

route.patch("/deleted", protect, auth.deleted);

export default route;
