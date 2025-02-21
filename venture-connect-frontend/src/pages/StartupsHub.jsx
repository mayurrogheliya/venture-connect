import { Button, Input } from 'antd';
import StartupHubCard from '../Components/StartupHub/StartupHubCard';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';


const StartupsHub = () => {
  const startupData = [
    {
      name: 'TechFlow',
      location: 'Rajkot, GUJ',
      image: '/assets/images/companies/techflow.jpg',
      description: 'AI-powered workflow automation platform for modern enterprises',
      industry: 'Software & Technology',
      funding: '$5.2M',
      teamSize: '25-50',
      stage: 'Seed Stage',
      isBookmarked: false,
      
    },
    {
      name: 'CloudSecure',
      location: 'Rajkot, GUJ',
      description: 'Cloud security solutions for enterprises',
      industry: 'Software & Technology',
      image: '/assets/images/logo.png',
      funding: '$10M',
      teamSize: '50-100',
      stage: 'Series A',
      isBookmarked: false,
    },
    {
      name: 'FinTrack',
      location: 'Bangalore, IND',
      description: 'Fintech solutions for expense tracking and analysis',
      industry: 'Fintech',
      image: '/assets/images/fintrack-logo.png',
      funding: '$3M',
      teamSize: '10-20',
      stage: 'Pre-Seed',
      isBookmarked: false
    },
  ];


  return (
    <>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">
          Discover <span className="text-blue-500">Startups</span>
        </h1>
        <p className="text-lg text-gray-500 font-normal">
          Discover and connect with innovative Startups
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 my-5">
        <Input
          placeholder="Search Startups..."
          prefix={<SearchOutlined className="text-gray-500 px-1 pe-1.5" />}
          allowClear
          className="flex-1 min-w-md rounded-lg h-10 bg-gray-100"
        />
        <Button
          icon={<FilterOutlined className="text-gray-700" />}
          className="flex-0 rounded-full h-10 bg-white border-gray-300 font-medium"
          size="large"
        >
          Filters
        </Button>
      </div>

      <div className="flex gap-6 items-center text-gray-600 break-words">
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">200+ </span>
          Opportunities
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">50K+ </span>
          Investors
        </p>
        <p className="text-lg">
          <span className="text-blue-500 text-xl font-bold">1000+ </span>
          Startups
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {startupData.map((startup, index) => (
          <StartupHubCard key={index} {...startup} />
        ))}
      </div>
    </>
  );
};

export default StartupsHub;
