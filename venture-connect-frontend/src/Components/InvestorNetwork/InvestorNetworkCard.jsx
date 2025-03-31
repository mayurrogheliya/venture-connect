import { Card, Avatar, Button, Typography } from 'antd';
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { PiTargetBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import DefaultUser from '../../assets/images/default-user.png';

const { Title, Text } = Typography;

const InvestorNetworkCard = ({ investor, userId }) => {
  const navigate = useNavigate();
  const { investorBasicInfo, investmentDetails } = investor || {};
  const handleKnowMore = () => {
    navigate(`/investor-profile/${userId}`);
  };
  return (
    <Card className="shadow-md border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
        <div className="flex-shrink-0 flex justify-center sm:justify-start w-full sm:w-auto">
          <Avatar
            size={80}
            src={investorBasicInfo?.investor_image || DefaultUser}
            alt={`${investorBasicInfo?.name}_image`}
            className="bg-gray-300"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="text-center sm:text-left">
            <Title level={5} className="!m-0 !text-lg font-semibold">
              {investorBasicInfo?.name}
            </Title>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2 text-gray-600 text-sm">
              <Text className="flex items-center">
                <UserOutlined className="text-blue-600 mr-1" />{' '}
                {investorBasicInfo?.investor_type}
              </Text>
              <Text className="flex items-center">
                <EnvironmentOutlined className="text-blue-600 mr-1" />{' '}
                {investorBasicInfo?.location}
              </Text>
              <Text className="flex items-center gap-0.5 text-blue-600">
                <PiTargetBold />{' '}
                {investmentDetails?.interestedDomain?.join(', ')}
              </Text>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end sm:ml-6">
            <Button
              type="primary"
              className="bg-blue-600 hover:bg-blue-700 rounded-full font-medium px-6 min-w-[140px] h-10 w-full sm:w-auto"
              onClick={handleKnowMore}
            >
              Know More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvestorNetworkCard;
