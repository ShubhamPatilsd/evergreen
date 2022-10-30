import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../lib/prismadb";

export default function Home() {
  return (
    <div className="space-y-10 p-10">
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-semibold text-accent">evergreen</h3>
      </div>

      <div className="space-y-3 pt-16 text-center">
        <h1 className="text-4xl font-bold">Welcome! First things first...</h1>
        <p className="text-gray-600">You can always change these later.</p>
      </div>

      <div className="px-[28rem]">
        <div id="input" className="my-5 flex w-full flex-col">
          <label className="mb-2 text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div id="input" className="my-5 flex w-full flex-col">
          <label className="mb-2 text-gray-700">Location</label>
          <input
            type="text"
            placeholder="San Francisco, California"
            className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div id="button" className="my-5 flex w-full flex-col">
          <button
            type="button"
            className="w-full rounded-lg bg-accent py-4 text-white"
          >
            <div className="flex flex-row items-center justify-center">
              <div className="font-semibold">Next</div>
            </div>
          </button>
        </div>
      </div>
    </div>
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

    if (user?.onboarded) {
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
