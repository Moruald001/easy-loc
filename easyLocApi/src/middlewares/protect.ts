import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import prisma from "../core/prisma";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

  const info: { email: string } | null = await prisma.utilisateur.findUnique({
    where: {
      email: emailSend,
    },
    select: {
      email: true,
    },
  });
  if (!info || info?.email !== process.env.authorizeEmail) {
    res.status(401).json({
      success: false,
      message: "Non autorisé",
    });
    return;
  }

  next();
};
