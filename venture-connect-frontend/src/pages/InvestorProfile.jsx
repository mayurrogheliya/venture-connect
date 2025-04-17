import { Card, Button, Tag, Flex, Spin } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faUsers,
  faClock,
  faGlobe,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInvestorProfileStore } from '../store/useInvestorProfileStore';
import { useEffect, useState } from 'react';
import { formatAmount } from '../utils/formatUtils';
import { usersAPI } from '../api/endpoints/users';

const InvestorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInvestorProfile, investorProfile, setLoading, loading } =
    useInvestorProfileStore();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getInvestorProfile(id);
      const { data } = await usersAPI.getUser(id);
      setUserData(data.data);
      setLoading(false);
    };
    fetchData();
  }, [getInvestorProfile, id]);

  const { investorBasicInfo, investmentDetails, previousInvestments } =
    investorProfile || {};

  return (
    <>
      <div
        className="md:py-5 py-3 md:px-15 px-5 border-b border-gray-200 bg-gray-50 cursor-pointer"
        onClick={() => navigate('/investor-network')}
      >
        <p>
          <FontAwesomeIcon icon={faChevronLeft} className="pe-5" />
          Return to Dashboard
        </p>
      </div>
      {loading ? (
        <Flex gap="middle" vertical>
          <Spin tip="Loading..." size="large" />
        </Flex>
      ) : (
        <div className="p-10 min-h-screen flex justify-center ">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {/* Profile Card */}
            <Card className="md:col-span-1 text-center shadow-lg rounded-lg p-6 bg-white items-center flex justify-center">
              <img
                src={investorBasicInfo?.investor_image}
                alt={`${investorBasicInfo?.name}_image`}
                className="w-35 h-35 rounded-full border border-gray-300 object-cover mx-auto"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {investorBasicInfo?.name}{' '}
                <CheckCircleOutlined className="text-blue-500" />
              </h2>
              <p className="text-gray-600 flex items-center justify-center gap-2 mt-1 mb-1">
                <EnvironmentOutlined /> {investorBasicInfo?.location}
              </p>
              {investorBasicInfo?.investor_type && (
                <Tag color="blue" className="mt-3 text-lg p-2">
                  {investorBasicInfo?.investor_type}
                </Tag>
              )}
              {investorBasicInfo?.linkedin_url && (
                <div className="mt-4">
                  <Link target="_blank" to={investorBasicInfo?.linkedin_url}>
                    <Button type="primary" size="middle">
                      <FontAwesomeIcon icon={faLinkedin} />
                      Connect
                    </Button>
                  </Link>
                </div>
              )}
              <div className="mt-4 flex justify-center gap-4 text-2xl text-gray-600 cursor-pointer">
                {/* Twitter Icon */}
                {investorBasicInfo?.twitter && (
                  <Link
                    to={investorBasicInfo?.twitter}
                    target="_blank"
                    className="hover:text-blue-500"
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="text-gray-700"
                    />
                  </Link>
                )}

                {/* Website Icon */}
                {investorBasicInfo?.website_url && (
                  <Link
                    to={investorBasicInfo?.website_url}
                    target="_blank"
                    className="hover:text-blue-500"
                  >
                    <FontAwesomeIcon icon={faGlobe} className="text-gray-700" />
                  </Link>
                )}
              </div>
            </Card>

            {/* Contact Information & Investment Statistics */}
            <div className="md:col-span-2 space-y-6 gap-5 ">
              <Card className="shadow-lg rounded-lg p-6 bg-white ">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Contact Information
                </h3>
                <p className="text-gray-700 flex items-center gap-2 text-lg">
                  <MailOutlined /> {userData?.email}
                </p>
                {investorBasicInfo?.phone && (
                  <p className="text-gray-700 flex items-center gap-2 text-lg mt-2">
                    <PhoneOutlined /> {investorBasicInfo?.phone}
                  </p>
                )}
              </Card>

              <div className="h-6"></div>

              <Card className="shadow-lg rounded-lg p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">
                  Investment Statistics
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="text-blue-600"
                      />
                      <span className="text-gray-600">Total Investments</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatAmount(investmentDetails?.totalInvestment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-blue-600"
                      />
                      <span className="text-gray-600">Portfolio Companies</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {investmentDetails?.companyPortfolio}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-blue-600"
                      />
                      <span className="text-gray-600">Years Experience</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {investorBasicInfo?.experience}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Investment Preferences */}
            <Card className="md:col-span-3 shadow-lg rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Investment Preferences
              </h3>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-gray-700">
                    Interested Domains
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {investmentDetails?.interestedDomain?.map((domain) => (
                      <Tag color="blue" key={domain} className="text-md p-1">
                        {domain}
                      </Tag>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">
                    Investment Range
                  </p>
                  <p className="mt-2 text-lg">
                    {investmentDetails?.investmentRange}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Preferred Stage</p>
                  <p className="mt-2 text-lg">
                    {investorBasicInfo?.preffered_stage}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Mentorship</p>
                  <p className="mt-2 text-lg">
                    {investmentDetails?.mentorship
                      ? 'Available'
                      : 'Not Available'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Previous Investments */}
            <Card className="md:col-span-3 shadow-lg rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Previous Investments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previousInvestments &&
                  previousInvestments.map((prevInvestment) => (
                    <Card
                      key={prevInvestment?.id}
                      bordered
                      className="shadow-sm p-4"
                    >
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {prevInvestment?.startupName}
                      </h4>
                      <p className="text-gray-600">
                        {prevInvestment?.description}
                      </p>
                      <Tag color="geekblue" className="mt-2 text-md">
                        {prevInvestment?.year}
                      </Tag>
                    </Card>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestorProfile;
