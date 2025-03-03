import { Table, Space, Tooltip, Button, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const AdminOpportunityTable = () => {
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Preferred Stage',
      dataIndex: 'stage',
      sorter: (a, b) => a.stage.localeCompare(b.stage),
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      sorter: (a, b) => a.industry.localeCompare(b.industry),
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Investment Range',
      dataIndex: 'investmentRange',
    },
    {
      title: 'Investor',
      dataIndex: 'investor',
      sorter: (a, b) => a.investor.localeCompare(b.investor),
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size={0}>
          <Tooltip title="Edit Opportunity">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: '#2ecc71' }}
              onClick={() => console.log('Edit Opportunity')}
            />
          </Tooltip>
          <Tooltip title="Delete Opportunity">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: '#e74c3c' }}
              onClick={() => console.log('Delete Opportunity')}
            />
          </Tooltip>
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

  const excludedField = 'investmentRange';
  const filteredData = data.filter((record) =>
    Object.keys(record)
      .filter((key) => key !== excludedField)
      .some((key) =>
        record[key]
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      ),
  );

  return (
    <>
      <Input
        placeholder="Search Opportunity..."
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
          showTotal: (total) => `Total ${total} opportunities`,
          pageSizeOptions: ['5', '10', '20'],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
      />
    </>
  );
};

export default AdminOpportunityTable;
