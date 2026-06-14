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

/**
 * @swagger
 * tags:
 *   name: Locataires
 *   description: Gestion des locataires
 */

/**
 * @swagger
 * /add-locataire:
 *   post:
 *     summary: Créer un locataire
 *     tags: [Locataires]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Dupont
 *               prenom:
 *                 type: string
 *                 example: Jean
 *               email:
 *                 type: string
 *                 example: jean.dupont@gmail.com
 *               telephone:
 *                 type: string
 *                 example: "+228 90 00 00 01"
 *     responses:
 *       201:
 *         description: Locataire créé avec succès
 *       400:
 *         description: Données incomplètes
 */
route.post("/add-locataire", protect, validate(addLocaSchema), addLocataire);

/**
 * @swagger
 * /locataire-list:
 *   get:
 *     summary: Récupérer la liste des locataires
 *     tags: [Locataires]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des locataires
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
 *                       nom:
 *                         type: string
 *                       prenom:
 *                         type: string
 *                       email:
 *                         type: string
 *                       telephone:
 *                         type: string
 *       401:
 *         description: Non autorisé
 */
route.get("/locataire-list", protect, locataireList);

/**
 * @swagger
 * /update-locataire/{id}:
 *   patch:
 *     summary: Mettre à jour les infos d'un locataire
 *     tags: [Locataires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du locataire
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Locataire mis à jour avec succès
 *       404:
 *         description: Locataire introuvable
 */
route.patch(
  "/update-locataire/:id",
  protect,
  validate(locaUpdateschema),
  updateLocataire,
);

/**
 * @swagger
 * /delete-locataire/{id}:
 *   delete:
 *     summary: Supprimer un locataire
 *     tags: [Locataires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du locataire
 *     responses:
 *       200:
 *         description: Locataire supprimé avec succès
 *       404:
 *         description: Locataire introuvable
 */
route.delete(
  "/delete-locataire/:id",
  protect,
  validate(locataireIdSchema),
  deleteLocataire,
);

export default route;
