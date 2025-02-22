import { useState } from 'react';
import StartupHubCard from '../Components/StartupHub/StartupHubCard';
import { SortAscendingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const BookmarkedStartups = () => {
  const [bookmarkedStartups, setBookmarkedStartups] = useState([
    {
      name: 'TechFlow',
      location: 'Rajkot, GUJ',
      image: '/assets/images/companies/techflow.jpg',
      description:
        'AI-powered workflow automation platform for modern enterprises',
      industry: 'AI',
      funding: '$5.2M',
      teamSize: '25-50',
      stage: 'Seed Stage',
      isBookmarked: true,
    },
    {
      name: 'CloudSecure',
      location: 'Rajkot, GUJ',
      image: '/assets/images/companies/logo.png',
      description: 'Cloud security solutions for enterprises',
      industry: 'AI',
      funding: '$10M',
      teamSize: '50-100',
      stage: 'Series A',
      isBookmarked: true,
    },
    {
      name: 'CloudSecure',
      location: 'Rajkot, GUJ',
      image: '/assets/images/companies/logo.png',
      description:
        'AI-powered workflow automation platform for modern enterprises',
      industry: 'AI',
      funding: '$5.2M',
      teamSize: '25-50',
      stage: 'Seed Stage',
      isBookmarked: true,
    },
  ]);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-bold">
            Bookmarked <span className="text-blue-500">Startups</span>
          </h2>
          <p className="text-lg text-gray-500 font-normal">
            {bookmarkedStartups.length} startups saved to your bookmarks
          </p>
        </div>

        <Button
          icon={<SortAscendingOutlined className="text-gray-700" />}
          className="flex-0 rounded-full h-10 bg-white border-gray-300 font-medium"
          size="large"
        >
          Sort
        </Button>

        
      </div>

      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookmarkedStartups.map((startup, index) => (
          <StartupHubCard key={index} {...startup} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkedStartups;
