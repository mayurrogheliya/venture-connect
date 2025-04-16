import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, message, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useInvestorProfileStore } from '../../store/useInvestorProfileStore';
import { investoAPI } from '../../api/endpoints/investor';

const InvestorUserTable = () => {
  const {
    getAllInvestorProfiles,
    investorAllProfile,
    setEditingInvestorProfile,
    setLoading,
    loading,
    setMode,
  } = useInvestorProfileStore();
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
        await getAllInvestorProfiles();
      } catch (error) {
        console.error('Error fetching investor profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAllInvestorProfiles]);

  console.log('investor all profiles: ', investorAllProfile);

  const investorData =
    Array.isArray(investorAllProfile) &&
    investorAllProfile?.map((item) => ({
      id: item?.id,
      investorId: item?.investor?.id,
      name: item?.investor?.investorBasicInfo?.name,
      investor_type: item?.investor?.investorBasicInfo?.investor_type,
      location: item?.investor?.investorBasicInfo?.location,
      investmentRange: item?.investor?.investmentDetails?.investmentRange,
      interestedDomain: item?.investor?.investmentDetails?.interestedDomain,
    }));

  const handleDelete = async (investorId) => {
    try {
      const response = await investoAPI.deleteInvestorProfile(investorId);
      message.success(response?.data?.message || 'Deleted investor profile');
      getAllInvestorProfiles();
    } catch (error) {
      console.error('Error deleting investor profile:', error);
      message.error(
        error?.response?.message || 'Error deleting investor profile',
      );
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => highlightText(text, searchText),
    },
    {
      title: 'Type',
      dataIndex: 'investor_type',
      key: 'investor_type',
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
      dataIndex: 'interestedDomain',
      key: 'interestedDomain',
      render: (domains) =>
        domains &&
        domains.map((domain, index) => (
          <span
            key={index}
            className="text-blue-700 mr-1 md:text-base bg-blue-100 rounded-full px-2 py-1"
          >
            {highlightText(domain, searchText)}
          </span>
        )),
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
              onClick={() => {
                const fullProfile = investorAllProfile.find(
                  (item) => item?.id === record.id,
                );
                if (fullProfile) {
                  setEditingInvestorProfile({
                    ...fullProfile.investor,
                    userId: fullProfile.id,
                    email: fullProfile.email,
                  });
                  setMode('form');
                } else {
                  console.error('Investor profile not found');
                }
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Investor">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: '#e74c3c' }}
              onClick={() => {
                handleDelete(record?.investorId);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData =
    Array.isArray(investorAllProfile) &&
    investorData?.filter((record) =>
      ['name', 'investor_type', 'location', 'interestedDomain'].some((key) =>
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
          showTotal: (total) => `Total ${total} Investors`,
          pageSizeOptions: ['5', '10', '20'],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
      />
    </>
  );
};

export default InvestorUserTable;
