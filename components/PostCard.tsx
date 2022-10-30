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
          className="rounded-xl"
          // src="https://images.pexels.com/photos/2893639/pexels-photo-2893639.jpeg"
        />
        <div className="translate inline-flex w-auto -translate-y-12 rounded-full bg-white px-4 py-1 font-black text-black">
          $2
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-black">Lettuce</h3>
        <h4 className="font-black text-gray-500">
          5353 Sunol Blvd, Pleasanton
        </h4>
      </div>
    </div>
  );
};
