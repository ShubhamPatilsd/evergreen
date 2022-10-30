import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, userType, latitude, longitude, formattedName } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const result = await prisma.user.update({
      where: {
        email: session.user?.email || "",
      },
      data: {
        name: name,
        userType: userType,
        onboarded: true,
      },
      include: {
        location: true,
      },
    });

    await prisma.location.create({
      data: {
        latitude: latitude,
        longitude: longitude,
        formatted_name: formattedName,
        User: {
          connect: [{ email: session?.user?.email || "" }],
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
