import { Request, Response } from "express";
import prisma from "../core/prisma";
import {
  CreerPaiementInput,
  HistoriquePaiementInput,
} from "../schema/paiementschema";

interface PaiementsHistoryResponse {
  success: boolean;
  message?: string;
  data?: { id: string; montant_paye: number; date_encaissement: Date }[];
}

//récupérer l historique de paiements

export const historiquePaiements = async (
  req: Request,
  res: Response<PaiementsHistoryResponse>,
): Promise<void> => {
  const id = req.params.id as string;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "ID de l'appartement est requis.",
    });
    return;
  }

  try {
    const paiements = await prisma.paiement.findMany({
      where: {
        appartement_id: id,
      },
      select: {
        id: true,
        montant_paye: true,
        date_encaissement: true,
      },
    });
    res.status(200).json({
      success: true,
      data: paiements,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des paiements :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};

// effectuer un paiement
export const creerPaiement = async (req: Request, res: Response) => {
  const { locataire_id, appartement_id, montant, periode } = req.body;

  try {
    const paiement = await prisma.$transaction(async (tx) => {
      // 1. Vérifier qu'un paiement n'existe pas déjà
      const paiementExistant = await tx.paiement.findUnique({
        where: {
          locataire_id_periode: {
            locataire_id,
            periode,
          },
        },
      });

      if (paiementExistant) {
        throw new Error(`Un paiement existe déjà pour la période ${periode}.`);
      }

      // 2. Récupérer le montant du loyer figé au moment du paiement
      const appartement = await tx.appartement.findUnique({
        where: { id: appartement_id },
        select: { loyer_base: true },
      });

      if (!appartement) {
        throw new Error("Appartement introuvable.");
      }

      // 3. Insérer le paiement avec le montant figé
      return await tx.paiement.create({
        data: {
          locataire_id,
          appartement_id,
          montant_paye: montant, // ← montant réellement versé
          montant_loyer: appartement.loyer_base, // ← loyer figé au moment du paiement
          periode,
          date_paiement: new Date(),
        },
      });
    });

    res.status(201).json({
      success: true,
      data: paiement,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
};
