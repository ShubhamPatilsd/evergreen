import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data);
    })();
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <h3
        className="text-2xl font-semibold text-accent hover:cursor-pointer"
        onClick={() => router.push("/home")}
      >
        evergreen
      </h3>
      <div className="flex items-center space-x-4">
        {user && user.userType == "gardener" ? (
          <button
            className="rounded-lg bg-accent px-4 py-1 font-bold text-white transition hover:bg-accent-darker"
            onClick={() => router.push("/create/post")}
          >
            Create a post
          </button>
        ) : (
          ""
        )}

        <button
          onClick={() => {
            signOut();
          }}
          className="flex items-center justify-center rounded-full border-2 border-2 border-transparent p-2 transition duration-150 hover:border-accent hover:bg-accent hover:bg-opacity-10"
        >
          <HiOutlineLogout size={25} />
        </button>

        <div className="relative">
          <a href={`/view/profile/${user?.id as any}`}>
            <img
              src={session?.user?.image || ""}
              className="h-12 w-12 rounded-full"
            />
            <VscTriangleDown
              size={18}
              className="absolute -right-1 bottom-0 text-accent"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
