import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { useState } from 'react';

const StartupUserTable = () => {
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

  const investorData = [
    {
      startup_name: 'Startup A',
      industry: 'Tech',
      team_size: 5,
      valuation: '$100,000',
    },
    {
      startup_name: 'Startup B',
      industry: 'Finance',
      team_size: 10,
      valuation: '$500,000',
    },
    {
      startup_name: 'Startup C',
      industry: 'Tech',
      team_size: 3,
      valuation: '$150,000',
    },
    {
      startup_name: 'Startup D',
      industry: 'Finance',
      team_size: 7,
      valuation: '$200,000',
    },
    {
      startup_name: 'Startup E',
      industry: 'Tech',
      team_size: 4,
      valuation: '$120,000',
    },
  ];

  const columns = [
    {
      title: 'Startup',
      dataIndex: 'startup_name',
      key: 'startup_name',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Team Size',
      dataIndex: 'team_size',
      key: 'team_size',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Valuation',
      dataIndex: 'valuation',
      key: 'valuation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size={0}>
          <Tooltip title="Edit Investor">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: '#2ecc71' }}
              onClick={() => console.log('Edit Investor')}
            />
          </Tooltip>
          <Tooltip title="Delete Investor">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: '#e74c3c' }}
              onClick={() => console.log('Delete Investor')}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData = investorData.filter((record) =>
    ['startup_name', 'industry', 'team_size'].some((key) =>
      record[key]?.toString().toLowerCase().includes(searchText),
    ),
  );

  return (
    <>
      <Input
        placeholder="Search Startup..."
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
          showTotal: (total) => `Total ${total} investors`,
          pageSizeOptions: ['5', '10', '20'],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
      />
    </>
  );
};

export default StartupUserTable;
