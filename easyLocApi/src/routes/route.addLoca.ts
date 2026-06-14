import { Router } from "express";
import { protect } from "../middlewares/protect";
import { validate } from "../middlewares/validator";
import {
  addLocaSchema,
  locataireIdSchema,
  locaUpdateschema,
} from "../schema/addLocaSchema";
import {
  addLocataire,
  deleteLocataire,
  locataireList,
  updateLocataire,
} from "../controllers/controller.Loca";

const route = Router();

//creation d un locataire
route.post("/add-locataire", protect, validate(addLocaSchema), addLocataire);
// liste des locataire
route.get("/locataire-list", protect, locataireList);
// mise a jour des infos d 'un locataire
route.patch(
  "/update-locataire/:id",
  protect,
  validate(locaUpdateschema),
  updateLocataire,
);
// suppresiion d'un locataire
route.delete(
  "/delete-locataire/:id",
  protect,
  validate(locataireIdSchema),
  deleteLocataire,
);
