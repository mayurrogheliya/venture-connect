import EventCard from './AdminEventCard';

const AdminEventDashboard = () => {
  const events = [
    {
      id: 1,
      name: 'Annual Tech Summit 2024',
      subTitle: 'The biggest tech conference of the year',
      users: 234,
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/024/039/777/small_2x/team-portrait-of-confident-multicultural-business-people-discuss-and-sit-at-table-in-boardroom-generative-ai-illustration-photo.jpg',
    },
    {
      id: 2,
      name: 'UX Design Workshop',
      subTitle: 'Learn from industry experts',
      users: '156',
      image:
        'https://news.virginia.edu/sites/default/files/article_image/18077_photo_1_high_res.jpg',
    },
    {
      id: 3,
      name: 'Digital Marketing Masterclass',
      subTitle: 'Advanced strategies for digital growth',
      users: 189,
      image:
        'https://www.shutterstock.com/shutterstock/videos/3536067231/thumb/7.jpg?ip=x480',
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

export default AdminEventDashboard;
