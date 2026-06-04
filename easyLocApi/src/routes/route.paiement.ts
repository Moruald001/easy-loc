import express from "express";
import { Router } from "express";
import { protect } from "../middlewares/protect";
import * as transactions from "../controllers/controller.paiement";
import { validate } from "../middlewares/validator";
import {
  creerPaiementSchema,
  historiquePaiementSchema,
} from "../schema/paiementschema";

const route = Router();

// Récupérer l'historique des paiements pour un appartement donné

route.get(
  "/history-paiement/:id",
  protect,
  validate(historiquePaiementSchema),
  transactions.historiquePaiements,
);
route.post(
  "/paiement",
  protect,
  validate(creerPaiementSchema),
  transactions.creerPaiement,
);

export default route;
