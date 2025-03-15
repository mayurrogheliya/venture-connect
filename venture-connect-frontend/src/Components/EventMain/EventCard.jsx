import { Link } from 'react-router-dom';

export function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function isEventExpired(eventDate, eventEndTime) {
  const eventDateTime = new Date(eventDate);
  const [hours, minutes, seconds] = eventEndTime.split(':').map(Number);

  eventDateTime.setHours(hours, minutes, seconds);

  const now = new Date();

  return now > eventDateTime;
}

function EventCard({ events }) {
  const eventExpired = isEventExpired(events.date, events.timeTill);

  return (
    <>
      <div className="max-w-sm md:max-w-md w-full min-h-96 rounded-lg shadow-lg mx-auto">
        <div className="w-full h-60 overflow-hidden rounded-t-lg">
          <img
            src={events.event_url}
            alt="event_image"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-semibold">{events.name}</p>
              <p className="text-gray-600 pt-2 font-semibold">{events.city}</p>
            </div>
            <Link to={`joinevent/${events.id}`}>
              <button
                type="button"
                className={`border border-blue-500 text-blue-500 px-4 py-1 rounded-lg 
                transition duration-300 cursor-pointer ${
                  eventExpired
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-500 hover:text-white'
                }`}
                disabled={eventExpired}
              >
                {eventExpired ? 'Event Ended' : 'Join'}
              </button>
            </Link>
          </div>

          <div className="flex justify-between text-center mt-7">
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Date</p>
              <p className="font-medium text-gray-800">
                {formatDate(events.date)}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Time From</p>
              <p className="font-medium text-gray-800">
                {formatTime(events.timeFrom)}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm font-normal">Till</p>
              <p className="font-medium text-gray-800">
                {formatTime(events.timeTill)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventCard;
