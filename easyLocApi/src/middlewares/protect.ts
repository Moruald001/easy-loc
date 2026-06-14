import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

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

  if (emailSend !== process.env.AUTHORIZE_EMAIL) {
    res.status(401).json({
      success: false,
      message: "Non autorisé",
    });
    return;
  }

  next();
};
