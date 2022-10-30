import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status == "authenticated") {
    router.push("/home");
  }

  return (
    <>
      <nav className="absolute p-6">
        <h3 className="text-xl font-semibold">🌲 Evergreen</h3>
      </nav>
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-8">
          <h1 className="max-w-2xl text-center text-4xl font-black">
            Organic, local, and home-grown food in your{" "}
            <span className="text-accent">community</span>
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
