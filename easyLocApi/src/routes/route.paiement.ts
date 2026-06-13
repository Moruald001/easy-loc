import { Router } from "express";
import { protect } from "../middlewares/protect";
import * as transactions from "../controllers/controller.paiement";
import { validate } from "../middlewares/validator";
import {
  creerPaiementSchema,
  historiquePaiementSchema,
  invoiceIdSchema,
} from "../schema/paiementschema";

const route = Router();

// Récupérer l'historique des paiements pour un appartement donné

route.get(
  "/history-paiement/:id",
  protect,
  validate(historiquePaiementSchema),
  transactions.historiquePaiements,
);
// effectuer un paiement
route.post(
  "/paiement",
  protect,
  validate(creerPaiementSchema),
  transactions.creerPaiement,
);
// télécharger le reçu correspondant a un paiement
route.get(
  "getInvoice/:id",
  protect,
  validate(invoiceIdSchema),
  transactions.getInvoicePdf,
);

export default route;
