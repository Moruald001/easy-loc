import express from "express";
import prisma from "./core/prisma";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Middleware pour parser le JSON
app.use(express.json());

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
    prisma.$disconnect();
    console.error("[serveur]: Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  }
}

startServer();
