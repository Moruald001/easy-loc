import { Request, Response } from "express";
import prisma from "../core/prisma";
import { addLocaInput, locaUpdateInput } from "../schema/addLocaSchema";

export const addLocataire = async (
  req: Request<addLocaInput["param"], {}, addLocaInput["body"]>,
  res: Response,
): Promise<void> => {
  const appartId = req.params.id;
  const { nom, email, prenom, phone } = req.body;

  if (!appartId || !nom || !prenom || !phone) {
    res.status(400).json({ message: "donnees incomplètes" });
    return;
  }
  const locataireExist = await prisma.locataire.findFirst({
    where: {
      nom,
      prenom,
    },
  });
  if (locataireExist) {
    res.status(400).json({ message: "Ce locataire existe deja" });
  }

  try {
    await prisma.locataire.create({
      data: {
        nom,
        prenom,
        telephone: phone,
        email: email ?? "",
        appartement_id: appartId,
      },
    });
  } catch (error) {}
};

// liste des locataires
export const locataireList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const locataireList = await prisma.locataire.findMany({
      where: {
        supprime_le: null,
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        telephone: true,
      },
    });

    res.status(200).json({
      success: true,
      list: locataireList,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` Erreur serveur : ${error}`,
    });
    return;
  }
};

export const updateLocataire = async (
  req: Request<locaUpdateInput["param"], {}, locaUpdateInput["body"]>,
  res: Response,
): Promise<void> => {
  const locataireId = req.params.id;

  const { nom, prenom, email, phone } = req.body;

  if (nom == "" && prenom == "" && email == "" && phone == "") {
    res.status(400).json({
      success: false,
      message: `un donnees au minimum `,
    });
    return;
  }

  if (!locataireId) {
    res.status(400).json({
      success: false,
      message: `id du locataire manquant`,
    });
    return;
  }
  try {
    const locataire = await prisma.locataire.findUnique({
      where: {
        id: locataireId,
      },
    });

    if (!locataire) {
      res.status(400).json({
        success: false,
        message: `ce locataire  n'existe pas`,
      });
      return;
    }

    await prisma.locataire.update({
      where: { id: locataireId },
      data: {
        ...(nom !== undefined && { nom: nom as string }),
        ...(prenom !== undefined && { prenom: prenom as string }),
        ...(email !== undefined && { email: email as string }),
        ...(phone !== undefined && { telephone: phone as string }),
      },
    });

    res.status(201).json({
      success: true,
      message: `locataire ${locataire.nom} mise a jour`,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ` Erreur serveur : ${error}`,
    });
    return;
  }
};
// suppresiion d'un locataire

export const deleteLocataire = async (
  req: Request<locaUpdateInput["param"]>,
  res: Response,
): Promise<void> => {
  const locataireId = req.params.id;

  if (!locataireId) {
    res.status(404).json({
      success: false,
      message: `id du locataire manquant`,
    });
    return;
  }

  try {
    const locataire = await prisma.locataire.findUnique({
      where: {
        id: locataireId,
      },
    });

    if (!locataire) {
      res.status(404).json({
        success: false,
        message: `ce locataire  n'existe pas`,
      });
      return;
    }

    await prisma.locataire.update({
      where: { id: locataireId },
      data: {
        supprime_le: new Date(),
      },
    });
    res.status(201).json({
      success: true,
      message: `locataire ${locataire.nom} supprimer  `,
    });
    return;
  } catch (error) {}
};
