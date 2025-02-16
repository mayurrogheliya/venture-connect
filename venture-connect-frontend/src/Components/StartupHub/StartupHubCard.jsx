import { faBookmark, faBuilding } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleRight,
  faDollar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import signupImage from '../../assets/images/signupSIdeImage.png';
import { IoLocationOutline } from 'react-icons/io5';

const StartupHubCard = () => {
  return (
    <div className="bg-white max-w-sm md:max-w-md w-full xl:p-5 p-3 rounded-2xl shadow-md mx-auto space-y-4">
      <div className="flex justify-between items-start lg:items-center flex-row">
        <div className="flex items-start lg:items-center gap-3 flex-col lg:flex-row">
          <img
            src={signupImage}
            alt="startup-image"
            className="w-16 h-16 rounded-md object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold">Relovent</h3>
            <p className="text-gray-600 text-base flex items-center gap-1 mt-1">
              <span>
                <IoLocationOutline size="18" />
              </span>
              Mumbai, India
            </p>
          </div>
        </div>
        <button className="px-3 py-1 hover:cursor-pointer rounded-md hover:bg-gray-200 transition">
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-gray-600"
            size="lg"
          />
        </button>
      </div>

      <p className="text-gray-500 text-base font-normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, magni!
      </p>
      <div className="flex items-center gap-3 text-base">
        <div className="bg-sky-50 rounded-md text-blue-600 px-2 py-1 inline-block">
          <p>AI</p>
        </div>
      </div>

      <div className="flex items-center text-base justify-between text-gray-500">
        <p>
          <FontAwesomeIcon icon={faDollar} /> $5.2M
        </p>
        <button>
          <FontAwesomeIcon icon={faUsers} /> 20-25
        </button>
      </div>

      <hr className="text-gray-200/90" />
      <div className="flex items-center text-base justify-between mt-4">
        <p className="text-gray-500">
          <FontAwesomeIcon icon={faBuilding} /> Seed Stage
        </p>
        <button className="text-blue-500 hover:text-blue-600 transition cursor-pointer">
          Learn More <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default StartupHubCard;
