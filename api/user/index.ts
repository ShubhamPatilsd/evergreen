import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, userType, location } = req.body;
  const session = await getSession();

  console.log(session?.user);

  if (session) {
    const result = await prisma.user.update({
      where: {
        email: session.user?.email || "",
      },
      data: {
        name: name,
        location: location,
        userType: userType,
        onboarded: true,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
