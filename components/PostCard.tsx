import { convertDistance, getDistance } from "geolib";

interface Location {
  longitude: number;
  latitude: number;
}

interface PostCardProps {
  pickUpLocation: string;
  price: string;
  name: string;
  userPfp: string;
  image: string;
  userEmail: string;
  userName: string;
  id: string;
  coords: Location;
  userLocation: Location | undefined | null;
}

export const PostCard: React.FC<PostCardProps> = ({
  price,
  name,
  image,
  pickUpLocation,
  userPfp,
  userEmail,
  userName,
  id,
  coords,
  userLocation,
}) => {
  return (
    <div className="rounded-md">
      <a href={`/view/post/${id}`}>
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
            <div className="translate absolute bottom-2 left-2 inline-flex w-auto rounded-full bg-white px-4 py-1 font-black text-black">
              {userLocation &&
              convertDistance(getDistance(userLocation, coords), "mi") < 1
                ? Math.trunc(
                    convertDistance(getDistance(userLocation, coords), "ft")
                  )
                : userLocation &&
                  Math.trunc(
                    convertDistance(getDistance(userLocation, coords), "mi")
                  )}{" "}
              {userLocation &&
              convertDistance(getDistance(userLocation, coords), "mi") < 1
                ? "ft"
                : "mi"}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center space-x-3">
            <img src={userPfp} className="mb-2 h-10 w-10 rounded-full" />
            <div className="-space-y-1">
              <p className="text-sm font-medium  text-gray-600">{userName}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black">{name}</h3>
            <h4 className="text-xs font-bold uppercase text-gray-500">
              {pickUpLocation}
            </h4>
          </div>
        </div>
      </a>
    </div>
  );
};
