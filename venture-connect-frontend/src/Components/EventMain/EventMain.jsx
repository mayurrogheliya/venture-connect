import EventCard from '../EventMain/EventCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useEventStore } from '../../store/useEventStore'; // Adjust the import path
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

function EventMain() {
  const { events, fetchEvents, loading } = useEventStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <>
      <div
        className="flex justify-center flex-col items-center text-center px-10 py-4 mt-24"
        id="events"
      >
        <div className="px-5 py-1 text-sm inline-block mx-auto font-normal md:text-xl border border-black rounded-full">
          Upcoming Networking Events
        </div>
        <p className="text-3xl md:text-5xl lg:text-6xl font-bold mt-8 leading-tight">
          Join Our Exclusive <span className="text-blue-500">Events</span>
        </p>
        <p className="md:mt-6 mt-4 text-neutral-400 font-normal text-lg md:text-xl">
          Join exclusive events to connect with investors, pitch
          <br /> ideas, and network with industry leaders.
        </p>
      </div>
      <div className="container mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Spin size="large" /> {/* Ant Design Loading Spinner */}
            </div>
          ) : (
            events
              .filter((event) => event.status) // Filters only active events
              .map((event) => <EventCard key={event.id} events={event} />)
          )}
        </div>
      </div>
      <div className="container mx-auto my-10 mb-20">
        <div className="mx-4 md:mx-10 flex justify-center flex-col items-center bg-slate-200/70 py-12 px-4 md:px-10 text-center rounded-2xl md:rounded-4xl shadow-md">
          <div className="px-5 py-1 text-sm inline-block mx-auto font-normal md:text-xl bg-white rounded-full">
            Take the First Step Toward Growth
          </div>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold mt-8 leading-tight">
            Ready to Transform Your Startup Journey?
          </p>
          <p className="md:mt-6 mt-4 text-neutral-400 font-normal text-lg md:text-base">
            Join Venture Connect today and experience how we bring startups and
            investors closer than ever
          </p>
          <button
            className="font-sarabun mt-6 px-7 py-2 bg-blue-500 text-white text-lg md:text-xl rounded-lg hover:bg-blue-600 shadow-xl cursor-pointer"
            onClick={() => navigate('/signin')}
          >
            <FontAwesomeIcon
              icon={faBolt}
              size="xs"
              style={{ color: '#ffffff' }}
            />{' '}
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default EventMain;
