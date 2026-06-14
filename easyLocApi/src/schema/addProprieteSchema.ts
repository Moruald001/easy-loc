import { z } from "zod";

export const addProprieteSchema = z.object({
  body: z.object({
    nom: z.string().min(1, "veuillez donner un titre a la propriété"),
    description: z.string().min(10).optional,
    loyer: z
      .float64("veuillez entrer un montant")
      .positive("Le montant doit être positif"),
    status: z.boolean("donnez le status de la propriété"),
  }),
});

export type addProprieteInput = z.infer<typeof addProprieteSchema>["body"];

export const proprIdschema = z.object({
  param: z.object({
    id: z.string("id de la propriete  manquant"),
  }),
});

export const proprUpdateschema = z.object({
  param: z.object({
    id: z.string("id de la propriete  manquant"),
  }),
  body: z.object({
    nom: z.string().min(1, "veuillez donner un titre a la propriété").optional,
    description: z.string().min(10).optional,
    loyer: z
      .float64("veuillez entrer un montant")
      .positive("Le montant doit être positif").optional,
    status: z.boolean("donnez le status de la propriété").optional,
  }),
});

export type proprUpdateInput = z.infer<typeof proprUpdateschema>;
