import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Flex, Input, Space, Spin, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useStartupProfileStore } from '../../store/useStartupProfileStore';
import { formatAmount } from '../../utils/formatUtils';

const StartupUserTable = () => {
  const {
    getAllStartupProfiles,
    startupAllProfile,
    setEditingStartupProfile,
    setLoading,
    loading,
    setMode,
  } = useStartupProfileStore();
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getAllStartupProfiles();
      } catch (error) {
        console.error('Error fetching startup profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAllStartupProfiles]);

  const startupData =
    Array.isArray(startupAllProfile) &&
    startupAllProfile?.map((item) => ({
      id: item?.id,
      startup_name: item?.startup?.basicInfo?.startup_name,
      industry: item?.startup?.basicInfo?.industry,
      team_size: formatAmount(item?.startup?.basicInfo?.team_size),
      current_valuation: formatAmount(
        item?.startup?.metrics?.current_valuation,
      ),
    }));

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
    },
    {
      title: 'Valuation',
      dataIndex: 'current_valuation',
      key: 'current_valuation',
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
              onClick={() => {
                const fullProfile = startupAllProfile.find(
                  (item) => item?.id === record.id,
                );
                if (fullProfile) {
                  setEditingStartupProfile({
                    ...fullProfile.startup,
                    userId: fullProfile.id,
                  });
                  setMode('form');
                  console.log('Full Startup Profile:', fullProfile.startup);
                } else {
                  console.error('Startup profile not found');
                }
              }}
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

  const filteredData =
    Array.isArray(startupAllProfile) &&
    startupData?.filter((record) =>
      ['startup_name', 'industry'].some((key) =>
        record[key]
          ?.toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()),
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
      {loading ? (
        <Flex gap="middle" vertical>
          <Spin tip="Loading..." size="large" />
        </Flex>
      ) : (
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
            showTotal: (total) => `Total ${total} Startups`,
            pageSizeOptions: ['5', '10', '20'],
            onShowSizeChange: (_, size) => setPageSize(size),
          }}
        />
      )}
    </>
  );
};

export default StartupUserTable;
