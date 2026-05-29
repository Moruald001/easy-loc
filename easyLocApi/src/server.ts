import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// Middleware pour parser le JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "le serveur est en cours d'exécution" });
});

app.listen(Number(PORT), HOST, () => {
  console.log(`[serveur]: Serveur démarré sur http://${HOST}:${PORT}`);
  console.log(`[serveur]: Accessible en local sur http://localhost:${PORT}`);
});
