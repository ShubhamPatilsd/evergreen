import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import prisma from "../../../lib/prismadb";
import { Navbar } from "../../../components/Navbar";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { PostCard } from "../../../components/PostCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IndividualPostProps {
  requestedPost: any;
}

const IndividualPost: NextPage<IndividualPostProps> = ({ requestedPost }) => {
  const router = useRouter();

  return (
    <div className="space-y-10">
      <Navbar />

      <div className="mt-8 flex items-center justify-center space-y-10 px-12 pt-28 lg:-mx-6">
        <img
          className="h-96 w-full rounded-xl object-cover lg:mx-6 lg:h-96 lg:w-1/2"
          src={requestedPost.image}
          alt=""
        />
        <div className="mt-6 space-y-5 lg:mx-6 lg:mt-0 lg:w-1/2">
          <h3 className="mt-4 block font-semibold text-gray-800 md:text-5xl">
            {requestedPost.name}
          </h3>
          <p className="text-xl font-semibold text-gray-700">
            {requestedPost.price}
          </p>
          <p className="mt-3 text-sm text-gray-700 md:text-base">
            {requestedPost.description}
          </p>
          <div></div>

          <div
            className="space-y-3 pt-10 hover:cursor-pointer"
            onClick={() =>
              router.push(`/view/profile/${requestedPost.author.id}`)
            }
          >
            <p className="text-base font-medium">Contact the gardener</p>

            <div className="flex items-center ">
              <img
                className="h-10 w-10 rounded-full object-cover object-center"
                src={requestedPost.author.image}
                alt=""
              />
              <div className="mx-4">
                <h1 className="text-sm font-semibold text-gray-700">
                  {requestedPost.author.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {requestedPost.author.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const postId = context.params?.id;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    if (!user?.onboarded) {
      return {
        redirect: {
          destination: "/auth/onboarding",
          permanent: false,
        },
      };
    }

    const requestedPost = await prisma.post.findUnique({
      where: {
        id: postId?.toString(),
      },
      include: {
        location: true,
        author: true,
      },
    });

    return {
      props: {
        requestedPost: JSON.parse(JSON.stringify(requestedPost)),
      },
    };
  }
};
