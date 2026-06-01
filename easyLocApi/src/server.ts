import express from "express";
import prisma from "./core/prisma";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/route.auth";

const app = express();
// const router = app.router;
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Middleware pour parser le JSON
app.use(express.json());
app.use(clerkMiddleware());

// routes

app.use("/login", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "le serveur est en cours d'exécution" });
});

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
