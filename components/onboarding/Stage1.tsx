import ReactGoogleAutocomplete from "react-google-autocomplete";

export const Stage1: React.FC<{
  name: string;
  setName: any;
  longitude: string;
  latitude: string;
  formattedName: string;
  setFormattedName: any;
  setLatitude: any;
  setLongitude: any;
}> = ({
  name,
  setName,
  longitude,
  latitude,
  formattedName,
  setFormattedName,
  setLongitude,
  setLatitude,
}) => {
  return (
    <div className="space-y-10 p-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-bold">Welcome! First things first...</h1>
        <p className="text-gray-500">You can always change these later.</p>
      </div>

      <div id="input" className="my-5 flex w-full flex-col">
        <label className="mb-2 text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div id="input" className="my-5 flex w-full flex-col">
        <label className="mb-2 text-gray-700">Location</label>
        <ReactGoogleAutocomplete
          placeholder="San Francisco, California"
          className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
          onPlaceSelected={(place) => {
            setFormattedName(place.formatted_address);
            setLatitude(place.geometry.location.lat);
            setLongitude(place.geometry.location.lng);
          }}
          defaultValue={formattedName}
          options={{
            types: ["geocode", "establishment"],
          }}
        />
      </div>
    </div>
  );
};
