import React from 'react';
import { Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AdminOpportunityTable = ({ searchText }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Preferred Stage',
      dataIndex: 'stage',
      render: (text) => <span className="text-blue-500">{text}</span>,
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
    },
    {
      title: 'Investment Range',
      dataIndex: 'investmentRange',
    },
    {
      title: 'Investor',
      dataIndex: 'investor',
    },
    {
      title: 'Actions',
      render: () => (
        <Space size="middle">
          <EditOutlined className="text-gray-500 cursor-pointer" />
          <DeleteOutlined className="text-gray-500 cursor-pointer" />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Tech Innovation Fund',
      stage: 'Series A',
      industry: 'Technology',
      investmentRange: '$500K - $2M',
      investor: 'John Anderson',
    },
    {
      key: '2',
      name: 'Green Energy Ventures',
      stage: 'Seed',
      industry: 'Clean Energy',
      investmentRange: '$100K - $500K',
      investor: 'Sarah Williams',
    },
    {
      key: '3',
      name: 'Healthcare Solutions',
      stage: 'Series B',
      industry: 'Healthcare',
      investmentRange: '$2M - $5M',
      investor: 'Michael Chen',
    },
    {
      key: '4',
      name: 'AI Research Fund',
      stage: 'Early Stage',
      industry: 'Artificial Intelligence',
      investmentRange: '$1M - $3M',
      investor: 'Emily Johnson',
    },
    {
      key: '5',
      name: 'Fintech Growth Fund',
      stage: 'Series A',
      industry: 'Financial Technology',
      investmentRange: '$500K - $2M',
      investor: 'David Thompson',
    },
    {
      key: '6',
      name: 'Sustainable Agriculture',
      stage: 'Seed',
      industry: 'Agriculture',
      investmentRange: '$250K - $1M',
      investor: 'Lisa Martinez',
    },
    {
      key: '7',
      name: 'E-commerce Platform',
      stage: 'Series B',
      industry: 'E-commerce',
      investmentRange: '$3M - $7M',
      investor: 'Robert Wilson',
    },
    {
      key: '8',
      name: 'EdTech Innovation',
      stage: 'Early Stage',
      industry: 'Education',
      investmentRange: '$300K - $1M',
      investor: 'Amanda Brown',
    },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="p-6 bg-white rounded-lg ">
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 1000 }}
        />
      </div>
      <p className="mt-4 text-gray-500 text-sm">
        Showing {filteredData.length} of {data.length} opportunities
      </p>
    </div>
  );
};

export default AdminOpportunityTable;
