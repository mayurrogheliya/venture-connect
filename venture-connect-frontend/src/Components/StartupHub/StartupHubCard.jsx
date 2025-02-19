import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faDollar, faUsers, faBuilding, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoLocationOutline } from 'react-icons/io5';

const StartupHubCard = ({ name, location, image, description, industry, funding, teamSize, stage, isBookmarked }) => {
  return (
    <div className="bg-white w-full max-w-sm p-4 rounded-2xl shadow-md space-y-4">
      <div className="flex justify-between items-start">
        {/* Startup Info */}
        <div className="flex items-center gap-3">
          <img src={image} alt={name} className="w-16 h-16 rounded-md object-cover" />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <IoLocationOutline size="18" /> {location}
            </p>
          </div>
        </div>

        {/* Bookmark / Delete Icon */}
        <button 
          className="px-3 py-1 hover:bg-gray-200 rounded-md"
          onClick={() => isBookmarked}
        >
          <FontAwesomeIcon 
            icon={isBookmarked ? faTrash : faBookmark} 
            className={`text-gray-500`} 
            size="lg" 
          />
        </button>
      </div>

      <p className="text-gray-500">{description}</p>
      <div className="flex items-center gap-3 text-sm">
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md">{industry}</span>
      </div>

      <div className="flex justify-between text-gray-500">
        <p>
          <FontAwesomeIcon icon={faDollar} /> {funding}
        </p>
        <p>
          <FontAwesomeIcon icon={faUsers} /> {teamSize}
        </p>
      </div>

      <hr className="border-gray-200" />
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-500">
          <FontAwesomeIcon icon={faBuilding} /> {stage}
        </p>
        <button className="text-blue-500 hover:text-blue-600">Learn More <FontAwesomeIcon icon={faAngleRight} /></button>
      </div>
    </div>
  );
};

export default StartupHubCard;
