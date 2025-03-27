import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Typography } from 'antd';
import StartupUserForm from '../../../components/StartupUserMain/StartupUserForm';
import StartupUserTable from '../../../components/StartupUserMain/StartupUserTable';
import { useStartupProfileStore } from '../../../store/useStartupProfileStore';

const { Title } = Typography;
const StartupUser = () => {
  const { mode, setMode, setEditingStartupProfile } = useStartupProfileStore();
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex justify="space-between">
          <Title level={2}>
            {mode === 'table' ? 'Startup Users' : 'Add Startup User'}
          </Title>
          <>
            {mode == 'form' && (
              <Button
                color="primary"
                variant="solid"
                icon={<EyeOutlined />}
                onClick={() => {
                  setMode('table');
                  setEditingStartupProfile(null);
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
                  setMode('form');
                  setEditingStartupProfile(null);
                }}
              >
                {'Add'}
              </Button>
            )}
          </>
        </Flex>
        {mode == 'form' && <StartupUserForm />}
        {mode == 'table' && <StartupUserTable />}
      </Space>
    </>
  );
};

export default StartupUser;
