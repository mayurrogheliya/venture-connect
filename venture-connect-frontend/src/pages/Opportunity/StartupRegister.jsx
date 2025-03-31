import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, message } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { registerStartupAPIs } from '../../api/endpoints/startupregister';
import { toast } from 'react-toastify';

const { Title } = Typography;

const StartupRegister = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [startups, setStartups] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRegisteredStartups();
  }, []);

  const fetchRegisteredStartups = async () => {
    setLoading(true);
    try {
      const response = await registerStartupAPIs.getByIdregisterStartup(id);
      if (response.data.success) {
        setStartups(response.data.data);
      } else {
        toast.error(response.data.message || 'Failed to fetch startups');
      }
    } catch (error) {
      toast.error('Error fetching startups');
    } finally {
      setLoading(false);
    }
  };

  const deleteStartup = async (regId, userId) => {
    try {
      const response = await registerStartupAPIs.deleteopportunity(
        regId,
        userId,
        id,
      ); // Passing userId and opportunityId
      if (response.data.success) {
        toast.success('Startup deleted successfully');
        fetchRegisteredStartups();
      } else {
        toast.error(response.data.message || 'Failed to delete startup');
      }
    } catch (error) {
      toast.error('Error deleting startup');
    }
  };

  const columns = [
    {
      title: 'Startup Name',
      dataIndex: 'startupName',
      key: 'startupName',
    },
    {
      title: 'Preferred Stage',
      dataIndex: 'preferredStage',
      key: 'preferredStage',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: 'Annual Revenue',
      dataIndex: 'annualRevenue',
      key: 'annualRevenue',
      render: (value) => `${value} Lakhs`,
    },
    {
      title: 'Current Valuation',
      dataIndex: 'currentValuation',
      key: 'currentValuation',
      render: (value) => `${value} Cr`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/startup-profile/${record.userId}`)}
            icon={<EyeOutlined />}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteStartup(record.id, record.userId)} // Pass userId along with the regId
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>Registered Startups</Title>
      <Typography.Text>Manage and view all registered Startups</Typography.Text>
      <Table
        columns={columns}
        dataSource={startups}
        loading={loading}
        rowKey="id"
        pagination={false}
        className="mt-4"
        bordered
      />
    </div>
  );
};

export default StartupRegister;
