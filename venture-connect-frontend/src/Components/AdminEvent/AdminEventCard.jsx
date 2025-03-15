import { faPen, faTrash, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Switch } from 'antd';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, toggleEventStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="md:max-w-md max-w-sm w-full min-h-96 rounded-lg shadow-md mx-auto">
      <div className="w-full h-60 overflow-hidden rounded-t-lg">
        <img
          src={event.event_url}
          alt={event.name}
          className="w-full h-full object-fill"
        />
      </div>
      <div className="p-4">
        <p className="text-2xl font-semibold">{event.name}</p>
        <p className="text-gray-500 mt-1 font-base">{event.subTitle}</p>
        <p className="text-blue-600 flex items-center gap-2 mt-2 font-semibold">
          <FaUsers className="text-lg" />
          <span>
            {/* {event.attendeeCount}  */}
            users registered
          </span>
        </p>
        <div className="flex gap-2 mt-4 flex-wrap">
          <Button
            variant="solid"
            icon={<FontAwesomeIcon icon={faPen} />}
            onClick={() => navigate(`/admin/events/edit/${event.id}`)}
          >
            Edit
          </Button>
          <Button
            color="primary"
            variant="solid"
            icon={<FontAwesomeIcon icon={faUserGroup} />}
          >
            View Attendees
          </Button>

          <div className="flex items-center gap-2">
            <Switch
              checked={event.status}
              onChange={() => toggleEventStatus(event.id)}
              checkedChildren={
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  Active
                </span>
              }
              unCheckedChildren={
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  Inactive
                </span>
              }
              style={{
                backgroundColor: event.status ? '#1890ff' : '#d9d9d9',
                width: '80px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
