interface PostCardProps {
  pickUpLocation: string;
  price: string;
  name: string;
  userPfp: string;
  image: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  price,
  name,
  image,
  pickUpLocation,
  userPfp,
}) => {
  return (
    <div className="rounded-md">
      <div>
        <div
          style={{
            background: `url(${"https://images.pexels.com/photos/2893639/pexels-photo-2893639.jpeg"}) no-repeat`,
            maxWidth: "300px",
            backgroundSize: "100%",
            maxHeight: "300px",
          }}
          className="relative rounded-xl"
        >
          <div className="translate absolute bottom-2 right-2 inline-flex w-auto rounded-full bg-white px-4 py-1 font-black text-black">
            {price}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <img src={userPfp} className="mb-2 h-8 w-8 rounded-full" />
        <div>
          <h3 className="text-lg font-black">{name}</h3>
          <h4 className="text-xs font-bold uppercase text-gray-500">
            {pickUpLocation}
          </h4>
        </div>
      </div>
    </div>
  );
};
