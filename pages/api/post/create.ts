import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
//TODO: add error handling
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, description, price, latitude, longitude, formattedName } =
      req.body;

    const image =
      "https://images.pexels.com/photos/2893639/pexels-photo-2893639.jpeg";
    const city = "Pleasanton";

    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email || "",
        },
      });

      if (!user) {
        res.status(500).send("User not found");
        return;
      }
      const pickUpLocation = await prisma.location.create({
        data: {
          latitude: latitude,
          longitude: longitude,
          formatted_name: formattedName,
        },
        include: {
          Post: true,
          User: true,
        },
      });

      const result = await prisma.post.create({
        data: {
          name: name,
          description: description,
          userId: user.id,
          price: `$${price}`,
          city: city,
          image: image,
          locationId: pickUpLocation.id,
        },
      });

      res.json(result);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    res.status(400).send("Method not allowed");
  }
}
