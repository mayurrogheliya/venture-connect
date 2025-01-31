import React from 'react';

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-16 mt-20 md:mt-32">
      <button className="px-5 py-2 text-sm md:text-base border border-black rounded-full">
        Build, Fund, Grow.
      </button>
      <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Connecting <span className="text-blue-600">Startups</span> with{' '}
        <span className="text-black">Investors</span>
      </h2>
      <p className="mt-4 text-gray-500 max-w-lg md:max-w-2xl text-sm md:text-lg">
        Venture Connect bridges the gap between innovation and funding. Build
        connections, find mentorship, and unlock opportunities to scale your
        vision.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg md:text-xl rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
        ⚡ Join Us — It’s Free
      </button>
    </section>
  );
};

export default Home;
