import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImage from '../../assets/images/default-user.png';

const OppStartupCard = () => {
  return (
    <>
      <div className="bg-white w-full xl:p-5 p-3 rounded-2xl shadow-sm mx-auto space-y-4">
        <div className="flex flex-col items-start">
          <div className="flex w-full justify-between items-center text-lg font-bold gap-3">
            <h3>HealthTech Ventures Pitch</h3>
            <h3 className="text-blue-500">$25K - $100K</h3>
          </div>
          <div className="flex items-center gap-2 text-xs mt-1 flex-wrap">
            <div className="bg-sky-50 rounded-full text-blue-600 py-1 px-2 inline-block font-semibold">
              <p>Pre-seed</p>
            </div>
            <div className="bg-gray-50 rounded-full text-gray-500 py-1 px-2 inline-block font-semibold">
              <p>Healthcare</p>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          magni!
        </p>

        <div className="flex items-center text-base justify-between gap-x-4">
          <div className="flex items-center gap-x-3 flex-wrap">
            <div>
              <img
                src={UserImage}
                alt="inversore-img"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">Dr. Emily Wong</p>
              <p className="text-gray-500">Healthcare VC</p>
            </div>
          </div>
          <button className="text-blue-500 hover:text-blue-600 font-medium transition cursor-pointer">
            Apply Now <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default OppStartupCard;
