export const PostCard = () => {
  return (
    <div className="rounded-md">
      <div>
        <div
          style={{
            background:
              "url(https://images.pexels.com/photos/2893639/pexels-photo-2893639.jpeg) no-repeat",
            width: "300px",
            backgroundSize: "100%",
            height: "300px",
          }}
          className="relative rounded-xl"
          // src="https://images.pexels.com/photos/2893639/pexels-photo-2893639.jpeg"
        >
          <div className="translate absolute bottom-2 right-2 inline-flex w-auto rounded-full bg-white px-4 py-1 font-black text-black">
            $2
          </div>
        </div>
      </div>

      <div className="mt-4">
        <img
          src="https://lh3.googleusercontent.com/a/ALm5wu27VEpf83lT4WPUOWLTH20YBVaGIXyUfk9eB4O8SA=s96-c"
          className="mb-2 h-8 w-8 rounded-full"
        />
        <div>
          <h3 className="text-lg font-black">Lettuce</h3>
          <h4 className="text-xs font-bold uppercase text-gray-500">
            5353 Sunol Blvd, Pleasanton
          </h4>
        </div>
      </div>
    </div>
  );
};
