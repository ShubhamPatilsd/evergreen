import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../lib/prismadb";
import { Stage1 } from "../../components/onboarding/Stage1";
import { Stage2 } from "../../components/onboarding/Stage2";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Onboarding() {
  const [stage, setStage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [userType, setUserType] = useState<"gardener" | "consumer">("gardener");
  const { data: session, status } = useSession();

  console.log(stage);
  const handleNext = () => {
    if (stage === 1 && name && location) {
      setStage(stage + 1);
    } else {
      console.log("no");
    }
  };

  return (
    <div className="space-y-10 p-10">
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-semibold text-accent">evergreen</h3>
      </div>

      <div className="lg:px-[23rem]">
        {stage === 1 && (
          <Stage1
            name={name}
            setName={setName}
            location={location}
            setLocation={setLocation}
          />
        )}

        {stage === 2 && (
          <Stage2 userType={userType} setUserType={setUserType} />
        )}

        <div className="flex w-full flex-col px-10">
          <button
            type="button"
            onClick={handleNext}
            className="w-full rounded-lg bg-accent py-4 text-white"
          >
            <div className="flex flex-row items-center justify-center">
              <div className="font-semibold">
                {stage === 1 ? "Next" : "Create Account"}
              </div>
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
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
