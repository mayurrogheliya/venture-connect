import { faPen, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { FaUsers } from 'react-icons/fa';

const EventCard = ({ event }) => {
  return (
    <div className="md:max-w-md max-w-sm w-full min-h-96 rounded-lg shadow-md mx-auto">
      <div className="w-full h-60 overflow-hidden rounded-t-lg">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-fill"
        />
      </div>
      <div className="p-4">
        <p className="text-2xl font-semibold">{event.name}</p>
        <p className="text-gray-500 mt-1 font-base">{event.subTitle}</p>
        <p className="text-blue-600 flex items-center gap-2 mt-2 font-semibold">
          <FaUsers className="text-lg" />
          <span>{event.users} users registered</span>
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="solid" icon={<FontAwesomeIcon icon={faPen} />}>
            Edit
          </Button>
          <Button
            color="primary"
            variant="solid"
            icon={<FontAwesomeIcon icon={faUserGroup} />}
          >
            View Attendees
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
