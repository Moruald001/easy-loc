import { Router } from "express";
import { protect } from "../middlewares/protect";
import { login, deleted } from "../controllers/controller.auth";
import { authLimiter } from "../utils/rateLimiter";

const route = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification
 */

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Connexion via Clerk
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       401:
 *         description: Non autorisé
 */
route.get("/login", authLimiter, login);

/**
 * @swagger
 * /deleted:
 *   patch:
 *     summary: Supprimer le compte utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Compte supprimé avec succès
 *       401:
 *         description: Non autorisé
 */
route.patch("/deleted", protect, deleted);

export default route;
