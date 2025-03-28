import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const LandingHome = () => {
  const navigate = useNavigate();
  return (
    <section
      className="flex flex-col items-center justify-center text-center px-6 py-12 pt-44 md:pt-48"
      id="home"
    >
      <div className="px-5 py-1 text-sm inline-block mx-auto font-normal md:text-xl border border-black rounded-full">
        Build, Fund, Grow.
      </div>
      <p className="text-3xl md:text-5xl lg:text-7xl font-bold mt-8 leading-tight">
        Connecting <span className="text-blue-500">Startups</span>
        <br /> with Investors
      </p>
      <p className="md:mt-6 mt-4 text-neutral-400 font-normal text-lg md:text-xl">
        Venture Connect bridges the gap between innovation and funding. Build
        connections, find mentorship, and unlock <br /> opportunities to scale
        your vision.
      </p>
      <button
        className="font-sarabun mt-10 px-7 py-2 bg-blue-500 text-white text-lg md:text-lg rounded-lg hover:bg-blue-600 shadow-xl cursor-pointer"
        onClick={() => navigate('/signin')}
      >
        <FontAwesomeIcon icon={faBolt} size="xs" style={{ color: '#ffffff' }} />{' '}
        Join Us – It’s Free
      </button>
    </section>
  );
};

export default LandingHome;
