import { useState } from 'react';
import { Button, Flex, Space, Typography } from 'antd';
import AdminOpportunityTable from '../../Components/AdminOpportunity/AdminOpportunityTable';
import AddOpportunity from '../AddOpportunity';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const AdminOpportunity = () => {
  const [mode, setMode] = useState('table');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between">
        <Title level={2}>Opportunity</Title>
        <>
          {mode == 'form' && (
            <Button
              color="primary"
              variant="solid"
              icon={<EyeOutlined />}
              onClick={() => {
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
                setMode('form');
              }}
            >
              {'Add'}
            </Button>
          )}
        </>
      </Flex>
      {mode == 'form' && <AddOpportunity />}
      {mode == 'table' && <AdminOpportunityTable />}
    </Space>
  );
};

export default AdminOpportunity;
