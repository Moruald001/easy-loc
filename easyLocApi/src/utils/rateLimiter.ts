// src/middlewares/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max par IP
  message: {
    success: false,
    message: "Trop de requêtes, veuillez réessayer dans 15 minutes.",
  },
  standardHeaders: true, // infos dans les headers RateLimit-*
  legacyHeaders: false,
});

// Limiter plus strict pour les routes sensibles
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 tentatives max pour le login
  message: {
    success: false,
    message: "Trop de tentatives de connexion, réessayez dans 15 minutes.",
  },
});
