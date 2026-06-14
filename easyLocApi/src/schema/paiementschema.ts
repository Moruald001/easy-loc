import { z } from "zod";

export const creerPaiementSchema = z.object({
  body: z.object({
    locataire_id: z.string().min(1, "ID locataire requis"),
    appartement_id: z.string().min(1, "ID appartement requis"),
    montant: z.number().positive("Le montant doit être positif"),
    charges: z
      .number()
      .nonnegative("Les charges ne peuvent pas être négatives")
      .default(0),
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
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
  }),
});

export type HistoriquePaiementInput = z.infer<
  typeof historiquePaiementSchema
>["params"];

export const invoiceIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID du paiement   manquant"),
  }),
});

export type InvoiceID = z.infer<typeof invoiceIdSchema>["params"];
