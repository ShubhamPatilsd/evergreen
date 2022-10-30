import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import prisma from "../../../lib/prismadb";
import { Navbar } from "../../../components/Navbar";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { PostCard } from "../../../components/PostCard";
import { useRouter } from "next/router";

interface ProfileProps {
  profile: any;
  ownerIsViewing: boolean;
  posts: any;
}

const Profile: NextPage<ProfileProps> = ({
  profile,
  ownerIsViewing,
  posts,
}) => {
  const router = useRouter();

  return (
    <div className="space-y-10">
      <Navbar />
      <div className="mx-auto max-w-4xl rounded-lg border-2 border-accent bg-[#f1fcf6] p-6">
        <img
          src={profile?.image || ""}
          className="mx-auto mb-4 h-32 w-32 rounded-full"
        />
        <div className="space-y-4 text-center">
          <h1 className="text-center text-4xl font-black">{profile.name}</h1>

          <div className="mx-auto flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2 ">
              <HiLocationMarker size={22} className="text-gray-600" />
              <p className="text-left text-sm font-normal tracking-wider text-gray-600">
                {profile.location.formatted_name}
              </p>
            </div>
            <p className="text-gray-600">|</p>
            <div className="flex items-center space-x-2">
              <HiMail size={22} className="text-gray-600" />
              <p className="text-left text-sm font-normal text-gray-600">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-black">
          {profile.name}
          {"'"}s Posts
        </h1>
        {posts
          ? posts.length > 0
            ? posts.map((post: any, i: number) => {
                return (
                  <div
                    key={i}
                    onClick={() => router.push(`/view/post/${post.id}`)}
                    className="hover:cursor-pointer"
                  >
                    <div className="flex w-full rounded-xl border-2 border-accent bg-[#f1fcf6]">
                      <div
                        style={{
                          background: `url(${post.image}) no-repeat`,
                          backgroundPosition: "50% 50%",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          width: "10rem",
                          height: "10rem",
                          backgroundColor: "#002a02",
                        }}
                        className="relative rounded-l-xl"
                      ></div>
                      <div className="space-y-2 p-4">
                        <div>
                          <h1 className="text-xl font-semibold">{post.name}</h1>
                          <p className="font-semibold text-gray-700">
                            {post.price}
                          </p>
                          <h4 className="text-xs font-bold uppercase text-gray-500">
                            {post.location.formatted_name}
                          </h4>
                        </div>
                        <p className="text-md max-w-2xl line-clamp-1">
                          {post.description}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No posts right now"
          : "Loading..."}
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const userId = context.params?.id;

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

    //TODO: add error handling if this is null
    const requestedProfile = await prisma.user.findUnique({
      where: {
        id: userId?.toString(),
      },
      include: {
        location: true,
      },
    });

    let posts = await prisma.post.findMany({
      where: {
        userId: requestedProfile?.id,
      },
      include: {
        location: true,
        author: true,
      },
    });

    posts = JSON.parse(JSON.stringify(posts));

    let ownerIsViewing = false;
    if (requestedProfile?.id === user.id) {
      ownerIsViewing = true;
    }

    return {
      props: {
        profile: requestedProfile,
        ownerIsViewing: ownerIsViewing,
        posts: posts,
      },
    };
  }
};
