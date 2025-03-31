import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImage from '../../assets/images/default-user.png';

const OppStartupCard = ({ data }) => {
  const investorImage =
    data.user?.investorBasicInfo?.investor_image || UserImage;
  const investorName = data.user?.investorBasicInfo?.name || 'mayur';
  const investorType =
    data.user?.investorBasicInfo?.investor_type || 'angel investor';

  return (
    <>
      <div className="bg-white w-full xl:p-5 p-3 rounded-2xl shadow-sm mx-auto space-y-4">
        <div className="flex flex-col items-start">
          <div className="flex w-full justify-between items-center text-lg font-bold gap-3">
            <h3>{data.name}</h3>
            <h3 className="text-blue-500">
              ${data.mininvestment} - ${data.maxinvestment}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs mt-1 flex-wrap">
            <div className="bg-sky-50 rounded-full text-blue-600 py-1 px-2 inline-block font-semibold">
              <p>{data.startupstage}</p>
            </div>
            <div className="bg-gray-50 rounded-full text-gray-500 py-1 px-2 inline-block font-semibold">
              <p>{data.domain}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm font-medium">{data.description}</p>

        <div className="flex items-center text-base justify-between gap-x-4">
          <div className="flex items-center gap-x-3 flex-wrap">
            <div>
              <img
                src={investorImage}
                alt="investor-img"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">{investorName}</p>
              <p className="text-gray-500">{investorType}</p>
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
