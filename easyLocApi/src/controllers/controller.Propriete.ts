import { Request, Response } from "express";
import prisma from "../core/prisma";
import {
  addProprieteInput,
  proprUpdateInput,
} from "../schema/addProprieteSchema";

export const addPropriete = async (
  req: Request<{}, {}, addProprieteInput>,
  res: Response,
): Promise<void> => {
  const { nom, loyer, status, description } = req.body;

  if (!nom || !loyer || !status) {
    res.status(400).json({
      success: false,
      message: "donnees incomplètes",
    });
    return;
  }

  const appartExist = await prisma.appartement.findMany({
    where: { nom },
    select: { nom: true },
  });

  if (appartExist.length > 0) {
    res
      .status(400)
      .json({ success: false, message: "cette propriété existe deja " });
    return;
  }

  try {
    await prisma.appartement.create({
      data: {
        nom,
        loyer_base: loyer,
        status,
        description: (description as string) ?? "",
      },
    });
    res.status(201).json({
      success: true,
      message: `l'appartement ${nom} est créé avec succes`,
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

// liste des propriétés
export const proprieteList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const listPropriete = await prisma.appartement.findMany({
      where: {
        supprime_le: null,
      },
      select: { id: true, nom: true, loyer_base: true, status: true },
    });

    res.status(200).json({
      success: true,
      list: listPropriete,
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

// mise a jour des infos d 'une propriété

export const updatePropriete = async (
  req: Request<proprUpdateInput["param"], {}, proprUpdateInput["body"]>,
  res: Response,
): Promise<void> => {
  const appartId = req.params.id;
  const { nom, description, loyer, status } = req.body;

  if (nom == "" && description == "" && loyer == "" && status == "") {
    res.status(400).json({
      success: false,
      message: `un donnees au minimum `,
    });
    return;
  }

  if (!appartId) {
    res.status(400).json({
      success: false,
      message: `id de l'appartement manquant`,
    });
    return;
  }

  try {
    const appart = await prisma.appartement.findUnique({
      where: {
        id: appartId,
      },
    });

    if (!appart) {
      res.status(404).json({
        success: false,
        message: `l'appartement n'existe pas`,
      });
      return;
    }

    await prisma.appartement.update({
      where: { id: appartId },
      data: {
        ...(nom !== undefined && { nom: nom as string }),
        ...(description !== undefined && {
          description: description as string,
        }),
        ...(loyer !== undefined && { loyer_base: loyer as number }),
        ...(status !== undefined && { status: status as boolean }),
      },
    });

    res.status(201).json({
      success: true,
      message: `appartement ${nom} mise a jour`,
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

// suppresiion d'une propriete

export const deletePropriete = async (
  req: Request<proprUpdateInput["param"]>,
  res: Response,
): Promise<void> => {
  const appartId = req.params.id;
  if (!appartId) {
    res.status(404).json({
      success: false,
      message: `id de l'appartement manquant`,
    });
    return;
  }

  try {
    const appart = await prisma.appartement.findUnique({
      where: {
        id: appartId,
      },
    });

    if (!appart) {
      res.status(404).json({
        success: false,
        message: `l'appartement n'existe pas`,
      });
      return;
    }

    await prisma.appartement.update({
      where: { id: appartId },
      data: {
        supprime_le: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      message: `appartement ${appart.nom} supprime`,
    });
    return;
  } catch (error) {}
};
