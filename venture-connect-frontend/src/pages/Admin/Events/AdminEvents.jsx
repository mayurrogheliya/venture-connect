import { Button, Flex, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useEventStore } from '../../../store/useEventStore';
import AdminEventDashboard from '../../../Components/AdminEvent/AdminEventDashboard';

const { Title } = Typography;

const AdminEvents = () => {
  const navigate = useNavigate();
  const { fetchEvents } = useEventStore();
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between">
        <Title level={2}>Events Dashboard</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/admin/events/create')}
        >
          Add Event
        </Button>
      </Flex>

      <AdminEventDashboard />
    </Space>
  );
};

export default AdminEvents;
