export const Stage2: React.FC<{
  userType: "gardener" | "consumer";
  setUserType: any;
}> = ({ userType, setUserType }) => {
  return (
    <div className="space-y-10 p-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-bold">What type of user are you?</h1>
        <p className="text-gray-500">
          We’ll customize your experience accordingly.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div
          className={`flex-auto rounded-lg border-2 px-4 py-5 hover:cursor-pointer ${
            userType === "gardener" ? "border-accent" : ""
          }`}
          onClick={() => setUserType("gardener")}
        >
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
            <i className="fas fa-sitemap"></i>
          </div>
          <h6 className="mb-1 text-xl font-semibold">Gardener</h6>
          <p className="mb-4 text-gray-500">
            You’re a passionate home gardener, who wants to share your produce
            with the community.
          </p>
        </div>
        <div
          className={`flex-auto rounded-lg border-2 px-4 py-5 hover:cursor-pointer ${
            userType === "consumer" ? "border-accent" : ""
          }`}
          onClick={() => setUserType("consumer")}
        >
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
            <i className="fas fa-sitemap"></i>
          </div>
          <h6 className="mb-1 text-xl font-semibold">Consumer</h6>
          <p className="mb-4 text-gray-500">
            You’re a health-conscious consumer who wants fresh, local produce.
          </p>
        </div>
      </div>
    </div>
  );
};
