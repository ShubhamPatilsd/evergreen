import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prismadb";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-10 space-y-8 px-10 pb-6">
        <h1 className="mx-auto max-w-2xl text-center text-4xl font-black">
          Organic, local, and home-grown food in{" "}
          {/* TODO: dynamic data this later */}
          <span className="text-accent">Pleasanton</span>
        </h1>
        <div>
          <PostCard />
        </div>
      </div>
    </>
  );
};
//TODO: protect this page later
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
          destination: "/onboarding",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
