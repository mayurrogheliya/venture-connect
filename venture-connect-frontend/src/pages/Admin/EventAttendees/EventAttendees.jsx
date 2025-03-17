import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useEventAttendStore } from '../../../store/useEventAttend';
import { useParams } from 'react-router-dom';
import EventAttendEdit from './EventAttendEdit';
import { eventsAttentAPIs } from '../../../api/endpoints/eventattendees';
import { toast } from 'react-toastify';

const EventAttendees = () => {
  const { id } = useParams();

  const { fetchAttends, eventAttendees, setEditData, edit } =
    useEventAttendStore();
  const handleEdithandler = (record) => {
    setEditData({ ...record, open: true });
  };

  const handlerDelete = async (eventId, id) => {
    const response = await eventsAttentAPIs.deleteEventAttent(id);
    if (response.status === 200) {
      toast.success(response.data.message);
      fetchAttends(eventId);
    }
  };

  useEffect(() => {
    fetchAttends(id);
  }, [id]);
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
      dataIndex: 'firstname',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'email',
      dataIndex: 'email',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Phone',
      dataIndex: 'phonenumber',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Company Name',
      dataIndex: 'companyname',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Job Title',
      dataIndex: 'jobtitle',
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
              onClick={() => handleEdithandler(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Entries">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: '#e74c3c' }}
              onClick={() => handlerDelete(record.eventId, record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // const filteredData = data.filter((record) =>
  //   Object.values(record).some((value) =>
  //     value.toString().toLowerCase().includes(searchText.toLowerCase()),
  //   ),
  // );

  return (
    <>
      {edit.open && <EventAttendEdit />}
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
        dataSource={eventAttendees}
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
