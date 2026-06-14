import { Router } from "express";
import { protect } from "../middlewares/protect";
import { validate } from "../middlewares/validator";
import {
  addPropriete,
  proprieteList,
  updatePropriete,
  deletePropriete,
} from "../controllers/controller.Propriete";
import {
  addProprieteSchema,
  proprIdschema,
  proprUpdateschema,
} from "../schema/addProprieteSchema";

const route = Router();

/**
 * @swagger
 * tags:
 *   name: Propriétés
 *   description: Gestion des propriétés
 */

/**
 * @swagger
 * /add-propriete:
 *   post:
 *     summary: Créer une propriété
 *     tags: [Propriétés]
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
 *               - loyer
 *               - status
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Appartement A
 *               description:
 *                 type: string
 *                 example: Appartement 2 pièces au 1er étage
 *               loyer:
 *                 type: number
 *                 example: 150000
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Propriété créée avec succès
 *       400:
 *         description: Données incomplètes
 *       401:
 *         description: Non autorisé
 */
route.post(
  "/add-propriete",
  protect,
  validate(addProprieteSchema),
  addPropriete,
);

/**
 * @swagger
 * /propriete-list:
 *   get:
 *     summary: Récupérer la liste des propriétés
 *     tags: [Propriétés]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des propriétés
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
 *                       description:
 *                         type: string
 *                       loyer_base:
 *                         type: number
 *                       status:
 *                         type: boolean
 *       401:
 *         description: Non autorisé
 */
route.get("/propriete-list", protect, proprieteList);

/**
 * @swagger
 * /update-prorpriete/{id}:
 *   patch:
 *     summary: Mettre à jour les infos d'une propriété
 *     tags: [Propriétés]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propriété
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               loyer:
 *                 type: number
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Propriété mise à jour avec succès
 *       404:
 *         description: Propriété introuvable
 *       401:
 *         description: Non autorisé
 */
route.patch(
  "/update-prorpriete/:id",
  protect,
  validate(proprUpdateschema),
  updatePropriete,
);

/**
 * @swagger
 * /delete-prorpriete/{id}:
 *   delete:
 *     summary: Supprimer une propriété
 *     tags: [Propriétés]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propriété
 *     responses:
 *       200:
 *         description: Propriété supprimée avec succès
 *       404:
 *         description: Propriété introuvable
 *       401:
 *         description: Non autorisé
 */
route.delete(
  "/delete-prorpriete/:id",
  protect,
  validate(proprIdschema),
  deletePropriete,
);

export default route;
