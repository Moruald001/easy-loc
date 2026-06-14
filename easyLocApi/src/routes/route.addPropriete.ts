import { Router } from "express";
import { protect } from "../middlewares/protect";
import { validate } from "../middlewares/validator";
import {
  addPropriete,
  proprieteList,
  updatePropriete,
  deleteProrpriete,
  deletePropriete,
} from "../controllers/controller.Propriete";
import {
  addProprieteSchema,
  proprIdschema,
  proprUpdateschema,
} from "../schema/addProprieteSchema";

const route = Router();
//creation d une propriété

route.post(
  "/add-propriete",
  protect,
  validate(addProprieteSchema),
  addPropriete,
);

// liste des propriétés
route.get("/propriete-list", protect, proprieteList);
// mise a jour des infos d 'une propriété
route.patch(
  "/update-prorpriete/:id",
  protect,
  validate(proprUpdateschema),
  updatePropriete,
);
// suppresiion d'une propriete
route.delete(
  "/delete-prorpriete/:id",
  protect,
  validate(proprIdschema),
  deletePropriete,
);
