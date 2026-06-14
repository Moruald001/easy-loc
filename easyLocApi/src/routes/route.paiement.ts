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

/**
 * @swagger
 * tags:
 *   name: Paiements
 *   description: Gestion des paiements
 */

/**
 * @swagger
 * /history-paiement/{id}:
 *   get:
 *     summary: Récupérer l'historique des paiements d'un appartement
 *     tags: [Paiements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'appartement
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre de résultats par page
 *     responses:
 *       200:
 *         description: Historique des paiements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       periode:
 *                         type: string
 *                       montant_paye:
 *                         type: number
 *                       montant_loyer:
 *                         type: number
 *                       date_encaissement:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     hasNext:
 *                       type: boolean
 *                     hasPrev:
 *                       type: boolean
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Appartement introuvable
 */
route.get(
  "/history-paiement/:id",
  protect,
  validate(historiquePaiementSchema),
  transactions.historiquePaiements,
);

/**
 * @swagger
 * /paiement:
 *   post:
 *     summary: Effectuer un paiement
 *     tags: [Paiements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - locataire_id
 *               - appartement_id
 *               - montant
 *               - periode
 *             properties:
 *               locataire_id:
 *                 type: string
 *                 example: abc123
 *               appartement_id:
 *                 type: string
 *                 example: def456
 *               montant:
 *                 type: number
 *                 example: 150000
 *               periode:
 *                 type: string
 *                 example: "2026-06"
 *     responses:
 *       201:
 *         description: Paiement effectué avec succès
 *       409:
 *         description: Un paiement existe déjà pour cette période
 *       401:
 *         description: Non autorisé
 */
route.post(
  "/paiement",
  protect,
  validate(creerPaiementSchema),
  transactions.creerPaiement,
);

/**
 * @swagger
 * /getInvoice/{id}:
 *   get:
 *     summary: Télécharger le reçu PDF d'un paiement
 *     tags: [Paiements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du paiement
 *     responses:
 *       200:
 *         description: Fichier PDF du reçu
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Reçu introuvable
 *       401:
 *         description: Non autorisé
 */
route.get(
  "/getInvoice/:id",
  protect,
  validate(invoiceIdSchema),
  transactions.getInvoicePdf,
);

export default route;
