import { z } from "zod";

export const addLocaSchema = z.object({
  param: z.object({
    id: z.string("id de l'appartement incorrect "),
  }),
  body: z.object({
    nom: z
      .string("veuillez entrer le nom du locataire")
      .min(3, "le nom est trop court  "),
    prenom: z
      .string("veuillez entrer le prenom du locataire")
      .min(5, "le prenom est trop court"),
    email: z.email().optional(),
    phone: z
      .string()
      .regex(/^\+?[\d\s\-\(\)]{8,15}$/, "Numero de telephone invalide "),
  }),
});

export type addLocaInput = z.infer<typeof addLocaSchema>;

export const locataireIdSchema = z.object({
  param: z.object({
    id: z.string("id du locataire manquant"),
  }),
});

export const locaUpdateschema = z.object({
  param: z.object({
    id: z.string("id du locataire   manquant"),
  }),
  body: z.object({
    nom: z
      .string("veuillez entrer le nom du locataire")
      .min(3, "le nom est trop court  ").optional,
    prenom: z
      .string("veuillez entrer le prenom du locataire")
      .min(5, "le prenom est trop court").optional,
    email: z.email().optional(),
    phone: z
      .string()
      .regex(/^\+?[\d\s\-\(\)]{8,15}$/, "Numero de telephone invalide ")
      .optional,
  }),
});

export type locaUpdateInput = z.infer<typeof locaUpdateschema>;
