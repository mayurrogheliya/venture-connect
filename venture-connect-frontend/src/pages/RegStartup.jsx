import StartupTable from "../Components/RegStartupTable.jsx";

const RegisteredStartups = () => {
  const startupData = [
    { name: "Tech Innovation", stage: "Series A", industry: "Technology", revenue: "10 Lakhs", valuation: "1 Cr" },
    { name: "Green Energy", stage: "Seed", industry: "Clean Energy", revenue: "25 Lakhs", valuation: "10 Cr" },
    { name: "HealthSoft", stage: "Series B", industry: "Healthcare", revenue: "20 Lakhs", valuation: "2 Cr" },
  ];

  return (
    <div className="w-screen p-6">
      <h1 className="text-4xl font-bold">Registered Startups</h1>
      <p className="text-lg text-gray-500">Manage and view all registered Startups</p>
      <div className="mt-6">
        <StartupTable data={startupData} />
      </div>
    </div>
  );
};

export default RegisteredStartups;
