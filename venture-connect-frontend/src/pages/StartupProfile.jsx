import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import techImage from '/assets/images/companies/logo.png';
import {
  faDollar,
  faGlobe,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IoBarChart, IoRocket, IoStatsChart } from 'react-icons/io5';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { FaBuilding, FaUsers } from 'react-icons/fa';
import { Card, Progress } from 'antd';
const StartupProfile = () => {
  return (
    <>
      <div className="md:pt-10 md:pb-5 md:px-12 pt-5 pb-3 px-5">
        <div className="flex gap-x-10 gap-y-2 items-center border-b pb-5 border-gray-100 flex-wrap">
          <img
            src={techImage}
            alt={techImage}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="space-y-2">
            <div className="flex gap-x-5 gap-y-1 items-center flex-wrap">
              <p className="text-3xl md:text-4xl font-bold">TechFlow AI</p>
              <p className="text-green-700 text-sm md:text-base bg-green-100 rounded-full px-2 py-1">
                Growth Stage
              </p>
              <p className="text-blue-700 text-sm md:text-base bg-blue-100 rounded-full px-2 py-1">
                Tech / AI
              </p>
            </div>
            <div className="flex items-center gap-x-5 flex-wrap">
              <p className="flex items-center gap-1.5 text-gray-800/75 font-normal">
                <FontAwesomeIcon icon={faLocationDot} />
                San Francisco, CA
              </p>
              <p className="text-blue-500 flex items-center gap-1.5 font-normal">
                <FontAwesomeIcon icon={faGlobe} />
                techvision-ai.com
              </p>
              <FontAwesomeIcon icon={faLinkedin} className="text-gray-800/75" />
              <FontAwesomeIcon icon={faTwitter} className="text-gray-800/75" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-7">
          {[
            {
              icon: <FaUsers className="text-blue-600 text-4xl" />,
              value: '45',
              label: 'Team Size',
            },
            {
              icon: <MdOutlineTrendingUp className="text-blue-600 text-4xl" />,
              value: '$850K',
              label: 'MRR',
            },
            {
              icon: <IoStatsChart className="text-blue-600 text-4xl" />,
              value: '187%',
              label: 'YoY Growth',
            },
            {
              icon: (
                <FontAwesomeIcon
                  icon={faDollar}
                  className="text-blue-600 text-4xl"
                />
              ),
              value: '$12.5M',
              label: 'Total Raised',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 h-40 rounded-2xl p-6 flex flex-col items-center text-center"
            >
              {stat.icon}
              <p className="font-bold text-xl md:text-2xl mt-3">{stat.value}</p>
              <p className="text-gray-500 font-medium text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xl font-bold text-slate-950 mb-3">Overview</p>
          <Card>
            <p className="text-gray-800/75 text-base">
              TechVision AI is revolutionizing enterprise decision-making
              through advanced AI and machine learning solutions. Our platform
              enables businesses to harness the power of predictive analytics
              and automated insights, driving efficiency and innovation across
              industries.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-base">
              <div>
                <p className="text-slate-950 font-bold text-lg">
                  Key Highlights
                </p>
                <div className="space-y-0.5">
                  <p className="text-gray-800/75 flex items-center gap-2">
                    <IoRocket className="text-blue-600" /> 500+ Enterprise
                    Clients
                  </p>
                  <p className="text-gray-800/75 flex items-center gap-2">
                    <IoBarChart className="text-blue-600" /> 98% Client
                    Retention Rate
                  </p>
                  <p className="text-gray-800/75 flex items-center gap-2">
                    <FaBuilding className="text-blue-600" />
                    Global Presence in 15 Countries
                  </p>
                </div>
              </div>
              <div>
                <p className="text-slate-950 font-bold text-lg">
                  Investment Details
                </p>
                <div className="space-y-0.5">
                  <p className="text-gray-800/75 flex justify-between">
                    <span>Investment Required:</span>
                    <span className="font-medium">$5M</span>
                  </p>
                  <p className="text-gray-800/75 flex justify-between">
                    <span>Equity Offered:</span>
                    <span className="font-medium">8%</span>
                  </p>
                  <p className="text-gray-800/75 flex justify-between">
                    <span>Current Valuation:</span>
                    <span className="font-medium">$62.5M</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-7">
          <p className="text-xl font-bold text-slate-950 mb-3">Leadership</p>
          <Card className="w-full">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center">
              <img
                src={techImage}
                alt="Dhruv Burada"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="text-center md:text-left space-y-0.5">
                <p className="text-xl font-bold text-slate-950">Dhruv Burada</p>
                <p className="text-blue-500 font-medium text-base">
                  Founder & CEO
                </p>
                <p className="text-gray-800/75 font-medium text-base">
                  Former ML Research Lead at Google AI, PhD in Computer Science
                  from Stanford. 15+ years experience in AI and enterprise
                  software. Serial entrepreneur with two successful exits.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
            <Card className="w-full">
              <div className="flex flex-col sm:flex-row gap-5 md:gap-10 items-center">
                <img
                  src={techImage}
                  alt="Mayur Rogheliya"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="text-center md:text-left">
                  <p className="text-xl font-bold text-slate-950">
                    Mayur Rogheliya
                  </p>
                  <p className="text-blue-500 font-medium text-base">CTO</p>
                  <p className="text-gray-800/75 font-medium text-base">
                    Ex-Amazon Principal Engineer, 12 years in distributed
                    systems
                  </p>
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <div className="flex flex-col sm:flex-row gap-5 md:gap-10 items-center">
                <img
                  src={techImage}
                  alt="Keshav Murari"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="text-center md:text-left">
                  <p className="text-xl font-bold text-slate-950">
                    Keshav Murari
                  </p>
                  <p className="text-blue-500 font-medium text-base">
                    Head of Product
                  </p>
                  <p className="text-gray-800/75 font-medium text-base">
                    Previously PM at Microsoft, MBA from Harvard Business School
                  </p>
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <div className="flex flex-col sm:flex-row gap-5 md:gap-10 items-center">
                <img
                  src={techImage}
                  alt="Meet Pitroda"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="text-center md:text-left">
                  <p className="text-xl font-bold text-slate-950">
                    Meet Pitroda
                  </p>
                  <p className="text-blue-500 font-medium text-base">
                    Head of AI Research
                  </p>
                  <p className="text-gray-800/75 font-medium text-base">
                    PhD in ML from MIT, 20+ published papers in top AI
                    conferences
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-xl font-bold text-slate-950 mb-3">
            Financial Performance
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <Card className="w-full md:w-1/2">
              <p className="text-lg font-bold text-gray-800 mb-3">
                Revenue & Growth
              </p>
              <div className="space-y-3">
                <div>
                  <p className="flex justify-between text-base md:text-lg text-gray-800/75 font-medium gap-2">
                    <span>Annual Revenue (2023)</span>
                    <span>$10.2M</span>
                  </p>
                  <Progress percent={80} showInfo={false} />
                </div>
                <div>
                  <p className="flex justify-between md:text-lg text-base text-gray-800/75 font-medium gap-2">
                    <span>Profit Margin</span>
                    <span>28%</span>
                  </p>
                  <Progress
                    percent={28}
                    showInfo={false}
                    strokeColor="#52c41a"
                  />
                </div>
              </div>
            </Card>
            <Card className="w-full md:w-1/2">
              <p className="text-lg font-bold text-gray-800 mb-3">Key Stats</p>
              <div className="space-y-1.5 text-base">
                <p className="text-gray-800/75 flex justify-between gap-2">
                  <span>Customer Acquisition Cost:</span>
                  <span className="font-medium">$12,500</span>
                </p>
                <p className="text-gray-800/75 flex justify-between gap-2">
                  <span>Lifetime Value (LTV):</span>
                  <span className="font-medium">$85,000</span>
                </p>
                <p className="text-gray-800/75 flex justify-between gap-2">
                  <span>Burn Rate:</span>
                  <span className="font-medium">$350K/month</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartupProfile;
