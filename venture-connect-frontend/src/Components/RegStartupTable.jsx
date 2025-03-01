import { Table, Button } from "antd";
import { DeleteOutlined, EyeFilled } from "@ant-design/icons";

const StartupTable = ({ data }) => {
  const columns = [
    {
      title: "Startup Name",
      dataIndex: "name",
      key: "name",
      
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
       
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      
    },
    {
      title: "Annual Revenue",
      dataIndex: "revenue",
      key: "revenue",
      
    },
    {
      title: "Current Valuation",
      dataIndex: "valuation",
      key: "valuation",
      
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button 
            type="default" 
            variant="outlined"
            color="primary"
            size="small"
            icon={<EyeFilled />} 
            className="border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
            View
        </Button>
          <Button icon={<DeleteOutlined />} danger size="small">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto"> {/* Makes table scrollable */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="name"
        scroll={{ x: "max-content" }} // Enables horizontal scrolling
      />
    </div>
  );
};

export default StartupTable;
