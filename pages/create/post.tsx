import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../lib/prismadb";
import { useRouter } from "next/router";

export const CreatePost = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sellerLocation, setSellerLocation] = useState("");
  const router = useRouter();
  // const [] = useState("");

  return (
    <div className="space-y-10">
      <Navbar />
      <div className="mx-auto flex max-w-2xl flex-col space-y-4 px-10">
        <h1 className="mb-10 text-center text-5xl font-black">
          Create a <span className="text-accent">post</span>
        </h1>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold">
            Name of Produce
          </label>
          <input
            type={"text"}
            name="name"
            placeholder="Cabbage"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <textarea
            //   type={"text"}
            placeholder="Freshly picked cabbages, green in color."
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="font-bold">
            Pickup Location
          </label>
          <input
            type={"text"}
            name="location"
            onChange={(e) => {
              setSellerLocation(e.target.value);
            }}
            placeholder="5353 Sunol Blvd, Pleasanton"
            className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Price</label>
          <div className="relative mt-1 rounded-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="block w-full appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 pl-7 pr-12 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="0.00"
            />
          </div>
        </div>
        <button
          onClick={async () => {
            try {
              if (!parseFloat(price)) {
                //TODO: react toastify
                console.log("goofy agh", price);
                return;
              }
              console.log("i am here");
              const body = {
                name,
                description,
                price,
                sellerLocation,
              };
              await fetch(`/api/post/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              router.push("/");
            } catch (err) {
              //TODO: add toast here
            }
          }}
          className="w-full rounded-lg bg-accent py-4 font-semibold text-white transition hover:bg-accent-darker"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

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
