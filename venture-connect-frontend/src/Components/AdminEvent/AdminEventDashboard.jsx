import { toast } from 'react-toastify';
import { eventsAPIs } from '../../api/endpoints/event';
import { useEventStore } from '../../store/useEventStore';
import EventCard from './AdminEventCard';
import { Spin } from 'antd';
const AdminEventDashboard = () => {
  const { events, fetchEvents, loading } = useEventStore();

  const toggleEventStatus = async (id) => {
    try {
      const response = await eventsAPIs.toggleEventStatus(id);
      if (response.status === 200) {
        toast.success('Event status updated successfully');
        fetchEvents();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" /> {/* Ant Design Loading Spinner */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              toggleEventStatus={toggleEventStatus}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AdminEventDashboard;
