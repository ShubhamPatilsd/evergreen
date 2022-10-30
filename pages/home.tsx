import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "../lib/prismadb";
import { useEffect, useState } from "react";

//TODO: fix any
const Home = () => {
  const [posts, setPosts] = useState<any[]>();
  const [radius, setRadius] = useState(1.2);

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/post/get/all");
      const returnedPosts = await data.json();
      setPosts(returnedPosts);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-10 space-y-8 px-10 pb-6">
        <h1 className="mx-auto max-w-2xl text-center text-3xl font-black">
          Organic, local, and home-grown food in{" "}
          {/* TODO: dynamic data this later */}
          <span className="text-accent">Pleasanton</span> within{" "}
          <input
            type="number"
            min="0.1"
            max="5.0"
            step="0.1"
            onChange={(e) => {
              setRadius(parseFloat(e.target.value));
            }}
            value={radius}
            className="w-auto max-w-md rounded-lg bg-transparent px-4 py-1 text-right text-accent"
          />{" "}
          miles
        </h1>

        {/* <div className="inline-flex w-full items-center space-x-4 rounded-xl border-2 border-accent bg-[#f1fcf6] p-4">
          <p className="font-black">{radius} miles</p>

          {/* <input
            type="range"
            min="0.1"
            max="5.0"
            step="0.1"
            onChange={(e) => {
              setRadius(parseFloat(e.target.value));
            }}
            value={radius}
          /> */}
        {/* </div> */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-12">
          {posts
            ? posts.length > 0
              ? posts.map((post, i) => {
                  console.log(post);

                  return (
                    <div key={i}>
                      <PostCard
                        name={post.name}
                        price={post.price}
                        pickUpLocation={post.location.formatted_name}
                        userPfp={post.author.image}
                        image={post.image}
                        userEmail={post.author.email}
                        userName={post.author.name}
                      />
                    </div>
                  );
                })
              : "No posts right now"
            : "Loading..."}
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
          destination: "/auth/onboarding",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
