import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response } from "express";
import prisma from "../core/prisma";

// login

export const login = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Non autorisé, veuillez vous connecter.",
    });
    return;
  }
  const user = await clerkClient.users.getUser(userId);

  const emailSend = user.emailAddresses[0].emailAddress;
  if (emailSend !== process.env.AUTHORIZE_EMAIL) {
    res
      .status(401)
      .json({ message: "acc es interdis , vous ne pouvez pas vous connecter" });
    return;
  }
  const name = user.fullName;

  const info = await prisma.utilisateur.upsert({
    where: {
      email: emailSend,
    },
    update: {},
    create: {
      email: emailSend,
      name,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Connexion réussie",
    data: { email: info.email, name: info.name },
  });
};

//suppression de compte

export const deleted = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Non autorisé, veuillez vous connecter.",
    });
    return;
  }
  const user = await clerkClient.users.getUser(userId);

  const emailSend = user.emailAddresses[0].emailAddress;

  const info = await prisma.utilisateur.delete({
    where: {
      email: emailSend,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Utilisateur supprimé",
    data: { email: info.email, name: info.name },
  });
};
