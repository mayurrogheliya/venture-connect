import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { useState } from 'react';

const EventAttendees = () => {
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
      title: 'First Name',
      dataIndex: 'fname',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'email',
      dataIndex: 'email',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size={0}>
          <Tooltip title="Edit Entries">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: '#2ecc71' }}
              onClick={() => console.log('Edit Entries')}
            />
          </Tooltip>
          <Tooltip title="Delete Entries">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: '#e74c3c' }}
              onClick={() => console.log('Delete Entries')}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      companyName: 'TechCorp',
      jobTitle: 'Software Engineer',
    },
    {
      id: 2,
      fname: 'Jane',
      lname: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      companyName: 'InnovateX',
      jobTitle: 'Product Manager',
    },
    {
      id: 3,
      fname: 'Alice',
      lname: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-123-4567',
      companyName: 'Web Solutions',
      jobTitle: 'UI/UX Designer',
    },
    {
      id: 4,
      fname: 'Bob',
      lname: 'Brown',
      email: 'bob.brown@example.com',
      phone: '777-888-9999',
      companyName: 'NextGen AI',
      jobTitle: 'AI Researcher',
    },
    {
      id: 5,
      fname: 'Charlie',
      lname: 'Davis',
      email: 'charlie.davis@example.com',
      phone: '222-333-4444',
      companyName: 'FinTech Hub',
      jobTitle: 'Financial Analyst',
    },
  ];

  const filteredData = data.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  return (
    <>
      <Input
        placeholder="Search Attendees..."
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
          showTotal: (total) => `Total ${total} entries`,
          pageSizeOptions: ['5', '10', '20'],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
      />
    </>
  );
};

export default EventAttendees;
