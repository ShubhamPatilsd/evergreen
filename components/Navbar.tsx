import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <h3
        className="text-2xl font-semibold text-accent hover:cursor-pointer"
        onClick={() => router.push("/home")}
      >
        evergreen
      </h3>
      <div className="flex items-center space-x-4">
        <button
          className="rounded-lg bg-accent px-4 py-1 font-bold text-white transition hover:bg-accent-darker"
          onClick={() => router.push("/create/post")}
        >
          Create a post
        </button>
        <img
          src={session?.user?.image || ""}
          className="h-12 w-12 rounded-full"
        />
      </div>
    </div>
  );
};
