import { useState } from 'react';
import { Button, Flex, Space, Typography } from 'antd';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import AdminEventForm from '../../components/AdminEvent/AdminEventForm';
import AdminEventDashboard from '../../components/AdminEvent/AdminEventDashboard';

const { Title } = Typography;

const AdminEvents = () => {
  const [mode, setMode] = useState('dashboard');
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between">
        <Title level={2}>Events Dashboard</Title>
        <>
          {mode == 'form' && (
            <Button
              color="primary"
              variant="solid"
              icon={<EyeOutlined />}
              onClick={() => {
                setMode('dashboard');
              }}
            >
              {'Dashboard'}
            </Button>
          )}
          {mode == 'dashboard' && (
            <Button
              color="primary"
              variant="solid"
              icon={<PlusOutlined />}
              onClick={() => {
                setMode('form');
              }}
            >
              {'Add'}
            </Button>
          )}
        </>
      </Flex>
      {mode == 'form' && <AdminEventForm />}
      {mode == 'dashboard' && <AdminEventDashboard />}
    </Space>
  );
};

export default AdminEvents;
