import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Typography } from 'antd';
import InvestorUserForm from '../../../components/InvestorUserMain/InvestorUserForm';
import InvestorUserTable from '../../../components/InvestorUserMain/InvestorUserTable';
import { useInvestorProfileStore } from '../../../store/useInvestorProfileStore';

const { Title } = Typography;
const InvestorUser = () => {
  const { mode, setMode, setEditingInvestorProfile } =
    useInvestorProfileStore();
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex justify="space-between">
          <Title level={2}>Investor Users</Title>
          <>
            {mode == 'form' && (
              <Button
                color="primary"
                variant="solid"
                icon={<EyeOutlined />}
                onClick={() => {
                  setEditingInvestorProfile(null);
                  setMode('table');
                }}
              >
                {'View'}
              </Button>
            )}
            {mode == 'table' && (
              <Button
                color="primary"
                variant="solid"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingInvestorProfile(null);
                  setMode('form');
                }}
              >
                {'Add'}
              </Button>
            )}
          </>
        </Flex>
        {mode == 'form' && <InvestorUserForm />}
        {mode == 'table' && <InvestorUserTable />}
      </Space>
    </>
  );
};

export default InvestorUser;
