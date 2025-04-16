import { Table, Space, Tooltip, Button, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useOpportunites } from '../../store/useOpportunites';

const AdminOpportunityTable = () => {
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const {
    startupopportunities,
    loading,
    getStartUpOpportunities,
    handledelete,
  } = useOpportunites();

  // Fetch opportunities on component mount
  useState(() => {
    getStartUpOpportunities();
  }, []);

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
      dataIndex: 'startupstage',
      sorter: (a, b) => a.startupstage.localeCompare(b.startupstage),
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Industry',
      dataIndex: 'domain',
      sorter: (a, b) => a.domain.localeCompare(b.domain),
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Investment Range',
      dataIndex: 'investmentRange',
      render: (_, record) =>
        `${record.mininvestment.toLocaleString()} - ${record.maxinvestment.toLocaleString()}`,
    },
    {
      title: 'Investor',
      dataIndex: 'investor',
      sorter: (a, b) => a.investor.localeCompare(b.investor),
      render: (_, record) =>
        highlightText(
          record.user?.investor?.investorBasicInfo?.name,
          searchText,
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => text.charAt(0).toUpperCase() + text.slice(1),
    },
  ];

  const excludedFields = ['investmentRange', 'status'];
  const filteredData = startupopportunities.filter(
    (record) =>
      Object.keys(record)
        .filter((key) => !excludedFields.includes(key))
        .some((key) =>
          record[key]
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()),
        ) ||
      record.user?.investor?.investorBasicInfo?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase()),
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
        loading={loading}
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
