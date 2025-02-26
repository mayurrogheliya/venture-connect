import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faBullseye, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

const OppInvestorCard = () => {
  return (
    <Card className="max-w-sm w-full p-5 rounded-lg shadow-md border border-gray-200 bg-white">
      {/* Title and Subtitle */}
      <h3 className="text-lg font-semibold text-gray-900">SaaS Growth Fund</h3>
      <p className="text-gray-500 text-sm">B2B Software Investment Opportunity</p>

      {/* Investment Range */}
      <div className="flex items-center gap-2 mt-3 text-gray-700">
        <FontAwesomeIcon icon={faDollarSign} className="text-lg text-gray-400" />
        <span className="text-sm font-medium">$100K - $500K</span>
      </div>

      {/* Series Stage */}
      <div className="flex items-center gap-2 mt-2 text-gray-700">
        <FontAwesomeIcon icon={faBullseye} className="text-lg text-gray-400" />
        <span className="text-sm font-medium">Series A</span>
      </div>

      {/* Domain */}
      <div className="flex items-center gap-2 mt-2 text-gray-700">
        <FontAwesomeIcon icon={faTableCellsLarge} className="text-lg text-gray-400" />
        <span className="text-sm font-medium">Technology</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
  <Button 
    icon={<EditOutlined />} 
    className="border border-gray-300 text-gray-700"
  >
    Edit
  </Button>

  <Button 
    icon={<DeleteOutlined />} 
    danger
  >
    Delete
  </Button>

  <Button 
    type="default" 
    variant="outlined"
    color="primary"
    icon={<EyeFilled />} 
    className="border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white transition"
  >
    View
  </Button>
</div>

    </Card>
  );
};

export default OppInvestorCard;
