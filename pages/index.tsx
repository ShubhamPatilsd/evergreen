import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prismadb";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status == "authenticated") {
    router.push("/home");
  }

  return (
    <>
      <nav className="absolute p-6">
        <h3
          className="text-2xl font-semibold text-accent hover:cursor-pointer"
          onClick={() => router.push("/home")}
        >
          evergreen
        </h3>
      </nav>
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-8">
          <h1 className="max-w-2xl text-center text-5xl font-black">
            <span className="text-accent">Organic</span>,{" "}
            <span className="text-accent">local</span>, and{" "}
            <span className="text-accent">home-grown</span> produce{" "}
            {/* TODO: dynamic data this later */}
            from your community.
          </h1>
          <div className="flex justify-center">
            <button
              onClick={() => {
                signIn("google");
              }}
              className="rounded-lg bg-accent px-4 py-2 font-bold text-white transition hover:bg-accent-darker"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
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
    } else {
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
