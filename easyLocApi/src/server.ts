import "./core/env";
import express from "express";
import prisma from "./core/prisma";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/route.auth";
import paiementsRoutes from "./routes/route.paiement";
import proprieteRoutes from "./routes/route.addPropriete";
import locataireRoutes from "./routes/route.addLoca";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";
import { rateLimiter } from "./utils/rateLimiter";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

// Créer le dossier logs si inexistant
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Rotation des logs chaque jour
const accessLogStream = createStream(
  (time, index) => {
    if (!time) return "access.log";
    const jour = new Date(time).toISOString().split("T")[0];
    return `access-${jour}.log`;
  },
  {
    interval: "1d",
    path: logDir,
  },
);

const app = express();
// const router = app.router;
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Dev → console, Prod → fichier
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  app.use(morgan("dev"));
}
// Middleware pour parser le JSON
app.use(express.json());
app.use(clerkMiddleware());

app.use(helmet()); // ← sécurise les headers HTTP
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ← autorise uniquement ton frontend
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

//rate limit
app.use(rateLimiter);
//documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//routes
app.use(authRoutes);
app.use(proprieteRoutes);
app.use(locataireRoutes);
app.use(paiementsRoutes);
app.get("/", (req, res) => {
  res.json({ message: "le serveur est en cours d'exécution" });
});
// route 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} introuvable.`,
  });
});
//gestion d'erreur
app.use(errorHandler);
async function startServer() {
  try {
    prisma.$connect();

    console.log("[serveur]: Connecté à la base de données avec succès.");

    app.listen(Number(PORT), HOST, () => {
      console.log(`[serveur]: Serveur démarré sur http://${HOST}:${PORT}`);
      console.log(
        `[serveur]: Accessible en local sur http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("[serveur]: Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  }
}

startServer();
