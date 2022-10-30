import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, userType, location } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);

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
