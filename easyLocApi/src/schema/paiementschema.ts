// src/validators/paiement.validator.ts
import { z } from "zod";

export const creerPaiementSchema = z.object({
  body: z.object({
    locataire_id: z.string().min(1, "ID locataire requis"),
    appartement_id: z.string().min(1, "ID appartement requis"),
    montant: z.number().positive("Le montant doit être positif"),
    periode: z
      .string()
      .regex(/^\d{4}-\d{2}$/, "Format période invalide (ex: 2024-06)"),
  }),
});

export type CreerPaiementInput = z.infer<typeof creerPaiementSchema>["body"];

export const historiquePaiementSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID de l'appartement requis"),
  }),
});

export type HistoriquePaiementInput = z.infer<
  typeof historiquePaiementSchema
>["params"];
