export const Stage1: React.FC<{
  name: string;
  setName: any;
  location: string;
  setLocation: any;
}> = ({ name, setName, location, setLocation }: any) => {
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
        <input
          type="text"
          placeholder="San Francisco, California"
          className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300  focus:outline-none focus:ring-2 focus:ring-accent"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
    </div>
  );
};
