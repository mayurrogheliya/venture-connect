import { useState } from 'react';
import { Button, Flex, Space, Typography } from 'antd';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdminOpportunityTable from '../../Components/AdminOpportunity/AdminOpportunityTable';
const { Title } = Typography;
const AdminOpportunity = () => {
  const navigate = useNavigate();
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between">
        <Title level={2}>Opportunity</Title>
      </Flex>
      <AdminOpportunityTable />
    </Space>
  );
};

export default AdminOpportunity;
