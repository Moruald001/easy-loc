import "dotenv/config";
const requiredEnvs = [
  "DATABASE_URL",
  "CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "AUTHORIZE_EMAIL",
  "NODE_ENV",
];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Variable d'environnement manquante : ${env}`);
  }
});
