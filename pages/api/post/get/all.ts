import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prismadb";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
//TODO: add error handling
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send("Unauthorized");
    return;
  }

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  res.json(posts);
}
