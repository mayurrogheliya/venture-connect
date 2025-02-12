import StartupHubCard from '../components/StartupHub/StartupHubCard';

const StartupsHub = () => {
  const cards = Array(5).fill(0);
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          Descover <span className="text-blue-500">Startups</span>
        </h1>
        <p className="text-lg text-gray-500 font-normal">
          Explore and Connect with innovative startups
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {cards.map((_, index) => (
          <StartupHubCard key={index} />
        ))}
      </div>
    </>
  );
};

export default StartupsHub;
