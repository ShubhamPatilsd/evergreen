import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-10 space-y-8 px-10 pb-6">
        <h1 className="mx-auto max-w-2xl text-center text-4xl font-black">
          Organic, local, and home-grown food in{" "}
          {/* TODO: dynamic data this later */}
          <span className="text-accent">Pleasanton</span>
        </h1>
        <div>
          <PostCard />
        </div>
      </div>
    </>
  );
};
//TODO: protect this page later
export default Home;
