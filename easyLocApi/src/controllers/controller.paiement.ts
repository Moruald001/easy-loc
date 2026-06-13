import { Request, Response } from "express";
import prisma from "../core/prisma";
import {
  CreerPaiementInput,
  HistoriquePaiementInput,
  InvoiceID,
} from "../schema/paiementschema";
import { generatePDF } from "../utils/pdf-generator";
import path from "path";
import fs from "fs";

interface PaiementsHistoryResponse {
  success: boolean;
  message?: string;
  data?: { id: string; montant_paye: number; date_encaissement: Date }[];
}

//récupérer l historique de paiements

export const historiquePaiements = async (
  req: Request<HistoriquePaiementInput, PaiementsHistoryResponse, {}>,
  res: Response<PaiementsHistoryResponse>,
): Promise<void> => {
  const id = req.params.id;
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
export const creerPaiement = async (
  req: Request<{}, {}, CreerPaiementInput>,
  res: Response,
) => {
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

      // 2. Récupérer le loyer figé
      const appartement = await tx.appartement.findUnique({
        where: { id: appartement_id },
        select: { loyer_base: true },
      });

      if (!appartement) {
        throw new Error("Appartement introuvable.");
      }

      // 3. Créer le paiement
      const nouveauPaiement = await tx.paiement.create({
        data: {
          locataire_id,
          appartement_id,
          montant_paye: montant,
          montant_loyer: appartement.loyer_base,
          periode,
        },
      });

      // 4. Générer le PDF
      const nomFichier = await generatePDF({
        paiementId: nouveauPaiement.id,
        locataireId: nouveauPaiement.locataire_id,
        appartement: appartement_id,
        montant: nouveauPaiement.montant_paye,
        charges: 0,
        periode: nouveauPaiement.periode,
      });

      if (!nomFichier) throw Error("Error lors de la creation du fichier");

      // 5. Mettre à jour le nom du fichier PDF
      return await tx.paiement.update({
        where: { id: nouveauPaiement.id },
        data: { pdf_nom_fichier: nomFichier },
      });
    }); // ← fin transaction

    // 6. Réponse en dehors de la transaction
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
// telecharger le recu correspondant au paiement

export const getInvoicePdf = async (
  req: Request<InvoiceID, {}, {}>,
  res: Response,
): Promise<void> => {
  const paiementId = req.params.id;

  const paiement = await prisma.paiement.findUnique({
    where: { id: paiementId },
    select: { pdf_nom_fichier: true },
  });
  // Vérifier que le paiement existe et a un PDF
  if (!paiement || !paiement.pdf_nom_fichier) {
    res.status(404).json({
      success: false,
      message: "Reçu introuvable.",
    });
    return;
  }

  const fichier = path.join(
    __dirname,
    `../storage/paiement/${paiement.pdf_nom_fichier}`,
  );

  if (!fs.existsSync(fichier)) {
    res.status(404).json({ success: false, message: "Fichier introuvable." });
    return;
  }

  res.download(fichier);
};
