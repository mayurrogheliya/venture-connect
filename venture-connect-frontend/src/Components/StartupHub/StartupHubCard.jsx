import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultUser from '../../assets/images/default-user.png';

const StartupHubCard = () => {
  return (
    <div className="bg-white max-w-sm md:max-w-md w-full p-5 rounded-2xl shadow-md mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <img
          src={DefaultUser}
          alt="startup-image"
          className="w-12 h-12 rounded-full object-cover"
        />
        <button className="px-3 py-1 text-sm font-medium border border-purple-500 text-purple-500 rounded-md hover:bg-purple-100 transition cursor-pointer">
          Seed
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Relovent</h3>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="font-medium">Tech</span> • Mumbai, India
        </p>
      </div>

      <p className="text-gray-500 text-lg font-normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        necessitatibus quia ad fugiat minima sequi!
      </p>

      <div className="flex items-center justify-between mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-600 transition cursor-pointer">
          Learn More
        </button>
        <button className="border border-gray-300 px-3 py-1 hover:cursor-pointer rounded-md hover:bg-gray-200 transition">
          <FontAwesomeIcon icon={faBookmark} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default StartupHubCard;
