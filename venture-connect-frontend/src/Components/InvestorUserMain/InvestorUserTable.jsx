import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { useState } from 'react';

const InvestorUserTable = () => {
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(5);

  const handleSearch = (e) => setSearchText(e.target.value);

  const highlightText = (text, highlight) => {
    if (!text || !highlight) return text;
    const regex = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
    return regex.map((match, i) =>
      match.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: 'yellow' }}>
          {match}
        </span>
      ) : (
        match
      ),
    );
  };

  const StartupsRecords = [
    {
      key: 1,
      name: 'Startup A',
      type: 'Tech Startup',
      location: 'New York',
      investmentRange: '$100,000 - $500,000',
      domains: 'Tech, AI',
    },
    {
      key: 2,
      name: 'Startup B',
      type: 'Finance Startup',
      location: 'San Francisco',
      investmentRange: '$500,000 - $1,000,000',
      domains: 'Finance, Blockchain',
    },
    {
      key: 3,
      name: 'Startup C',
      type: 'Healthcare Startup',
      location: 'San Francisco',
      investmentRange: '$1,000,000 - $2,000,000',
      domains: 'Healthcare, Biotech',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Investment Range',
      dataIndex: 'investmentRange',
      key: 'investmentRange',
    },
    {
      title: 'Domains',
      dataIndex: 'domains',
      key: 'domains',
      render: (text) =>
        text.split(',').map((domain, index) => (
          <span
            key={index}
            className="text-blue-700 mr-1 md:text-base bg-blue-100 rounded-full px-2 py-1"
          >
            {highlightText(domain.trim(), searchText)}
          </span>
        )),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size={0}>
          <Tooltip title="Edit Startup">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: '#2ecc71' }}
              onClick={() => console.log('Edit Startup')}
            />
          </Tooltip>
          <Tooltip title="Delete Startup">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: '#e74c3c' }}
              onClick={() => console.log('Delete Startup')}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData = StartupsRecords.filter((record) =>
    ['name', 'type', 'location', 'domains'].some((key) =>
      record[key]?.toString().toLowerCase().includes(searchText),
    ),
  );

  return (
    <>
      <Input
        placeholder="Search Investor..."
        prefix={<SearchOutlined style={{ color: 'gray' }} />}
        style={{ marginBottom: 16 }}
        onChange={handleSearch}
        value={searchText}
      />
      <Table
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        bordered={true}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} startups`,
          pageSizeOptions: ['5', '10', '20'],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
      />
    </>
  );
};

export default InvestorUserTable;
