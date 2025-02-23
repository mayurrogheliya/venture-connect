import { Card, Avatar, Button, Tag, Statistic } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faUsers, faClock,faGlobe } from "@fortawesome/free-solid-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";

const InvestorProfile = () => {
  return (
    <div className="p-10 min-h-screen flex justify-center ">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Profile Card */}
        <Card className="md:col-span-1 text-center shadow-lg rounded-lg p-6 bg-white items-center flex justify-center">
          <Avatar size={120} src="https://via.placeholder.com/100" className="shadow-md" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Dhruv Burada <CheckCircleOutlined className="text-blue-500" />
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2 mt-1 mb-1">
            <EnvironmentOutlined /> Rajkot, India
          </p>
          <Tag color="blue" className="mt-3 text-lg p-2">Venture Capitalist</Tag>
          <div className="mt-4">
            <Button type="primary" icon={<LinkedinOutlined />} size="large">
              Connect
            </Button>
          </div>
          <div className="mt-4 flex justify-center gap-4 text-2xl text-gray-600 cursor-pointer">
            {/* Twitter Icon */}
            <a href={""} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FontAwesomeIcon icon={faTwitter} className='text-gray-700' />
            </a>

            {/* Website Icon */}
            <a href={""} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FontAwesomeIcon icon={faGlobe} className='text-gray-700' />
            </a>
          </div>
        </Card>

        {/* Contact Information & Investment Statistics */}
        <div className="md:col-span-2 space-y-6 gap-5 ">
          <Card className="shadow-lg rounded-lg p-6 bg-white ">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
            <p className="text-gray-700 flex items-center gap-2 text-lg">
              <MailOutlined /> buradadhruv35@gmail.com
            </p>
            <p className="text-gray-700 flex items-center gap-2 text-lg mt-2">
              <PhoneOutlined /> +91 8488997323
            </p>
          </Card>

          <div className="h-6"></div> 

          <Card className="shadow-lg rounded-lg p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-900">Investment Statistics</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faBriefcase} className='text-blue-600' />
                  <span className="text-gray-600">Total Investments</span>
                </div>
                <span className="font-semibold text-gray-900">47</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUsers} className='text-blue-600' />
                  <span className="text-gray-600">Portfolio Companies</span>
                </div>
                <span className="font-semibold text-gray-900">32</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} className='text-blue-600' />
                  <span className="text-gray-600">Years Experience</span>
                </div>
                <span className="font-semibold text-gray-900">15</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Investment Preferences */}
        <Card className="md:col-span-3 shadow-lg rounded-lg p-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Preferences</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-gray-700">Interested Domains</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["AI/ML", "SaaS", "Fintech", "Healthcare", "Web3"].map((domain) => (
                  <Tag color="blue" key={domain} className="text-md p-1">
                    {domain}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Investment Range</p>
              <p className="mt-2 text-lg">$100K - $2M</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Preferred Stage</p>
              <p className="mt-2 text-lg">Seed to Series A</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Mentorship</p>
              <p className="mt-2 text-lg">Available</p>
            </div>
          </div>
        </Card>

        {/* Previous Investments */}
        <Card className="md:col-span-3 shadow-lg rounded-lg p-6 bg-white">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Previous Investments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "TechFlow AI",
                desc: "AI-powered workflow automation platform",
                year: 2023,
              },
              {
                name: "HealthSync",
                desc: "Digital health monitoring solutions",
                year: 2022,
              },
              {
                name: "CryptoSecure",
                desc: "Blockchain security infrastructure",
                year: 2022,
              },
              {
                name: "GreenEnergy",
                desc: "Renewable energy solutions",
                year: 2021,
              },
            ].map((inv, idx) => (
              <Card key={idx} bordered className="shadow-sm p-4">
                <h4 className="font-semibold text-gray-800 text-lg">{inv.name}</h4>
                <p className="text-gray-600">{inv.desc}</p>
                <Tag color="geekblue" className="mt-2 text-md">{inv.year}</Tag>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvestorProfile;