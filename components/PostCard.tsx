interface PostCardProps {
  pickUpLocation: string;
  price: string;
  name: string;
  userPfp: string;
  image: string;
  userEmail: string;
  userName: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  price,
  name,
  image,
  pickUpLocation,
  userPfp,
  userEmail,
  userName,
}) => {
  return (
    <div className="rounded-md">
      <div>
        <div
          style={{
            background: `url(${image}) no-repeat`,
            width: "300px",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: "#002a02",
            height: "300px",
          }}
          className="relative rounded-xl"
        >
          <div className="translate absolute bottom-2 right-2 inline-flex w-auto rounded-full bg-white px-4 py-1 font-black text-black">
            {price}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center space-x-3">
          {/* <img src={userPfp} className="mb-2 h-10 w-10 rounded-full" />
          <div className="-space-y-1"> */}
          <p className="text-xs font-bold text-gray-700">
            {userName} • {userEmail}
          </p>
          {/* // <p className="text-xs font-medium  text-gray-600">{userEmail}</p> */}
          {/* </div> */}
        </div>
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
