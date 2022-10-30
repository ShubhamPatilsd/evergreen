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
        <h1 className="mx-auto max-w-2xl text-center text-4xl font-black">
          Organic, local, and home-grown food in{" "}
          {/* TODO: dynamic data this later */}
          <span className="text-accent">Pleasanton</span>
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-12">
          {posts
            ? posts.length > 0
              ? posts.map((post, i) => {
                  return (
                    <div key={i}>
                      <PostCard
                        name={post.name}
                        price={post.price}
                        pickUpLocation={post.location}
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
