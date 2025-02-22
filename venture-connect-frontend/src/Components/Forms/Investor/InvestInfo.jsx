import { useState } from "react";
import { Input, Button, Slider, Radio } from "antd";
import { DollarOutlined, BankOutlined, DeleteOutlined } from "@ant-design/icons";

const domains = ["Technology", "Healthcare", "Fintech", "E-commerce", "AI/ML", "SaaS", "Clean Tech", "EdTech", "Others"];

const InvestmentDetailsForm = () => {
  const [investmentRange, setInvestmentRange] = useState([0, 1000]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [mentorship, setMentorship] = useState(null);
  const [investments, setInvestments] = useState([{ year: "", name: "", startupName: "", domain: "", description: "" }]);

  const toggleDomain = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  const addInvestment = () => {
    setInvestments([...investments, { year: "", name: "", startupName: "", domain: "", description: "" }]);
  };

  const removeInvestment = (index) => {
    setInvestments(investments.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Investment Details</h2>

      {/* Investment Range Slider */}
      <div className="mt-4">
        <label className="block text-gray-700">Investment Range</label>
        <Slider range min={0} max={1000} defaultValue={investmentRange} onChange={setInvestmentRange} />
      </div>

      {/* Portfolio and Total Investments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-gray-700">Portfolio Companies</label>
          <Input prefix={<BankOutlined />} placeholder="Number of companies" />
        </div>
        <div>
          <label className="block text-gray-700">Total Investments</label>
          <Input prefix={<DollarOutlined />} placeholder="Enter amount" />
        </div>
      </div>

      {/* Interested Domains */}
      <div className="mt-4">
        <label className="block text-gray-700">Interested Domains *</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {domains.map((domain) => (
            <Button
              key={domain}
              type={selectedDomains.includes(domain) ? "primary" : "default"}
              onClick={() => toggleDomain(domain)}
            >
              {domain}
            </Button>
          ))}
        </div>
      </div>

      {/* Mentorship Radio */}
      <div className="mt-4">
        <label className="block text-gray-700">Interested in Providing Mentorship?</label>
        <Radio.Group onChange={(e) => setMentorship(e.target.value)} value={mentorship}>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </div>

      {/* Previous Investments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">Previous Investments</h3>
        <div className="grid grid-cols-5 gap-2 mt-2 font-medium text-gray-600">
          <span>Year</span>
          <span>Startup Name</span>
          <span>Domain</span>
          <span>Brief Description</span>
          <span>Action</span>
        </div>
        {investments.map((investment, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mt-2">
            <Input placeholder="YYYY" />
            <Input placeholder="Startup name" />
            <Input placeholder="Domain" />
            <Input placeholder="Brief description" />
            <Button danger onClick={() => removeInvestment(index)}> <DeleteOutlined /> </Button>
          </div>
        ))}
        <Button type="link" onClick={addInvestment} className="mt-2">
          + Add More
        </Button>
      </div>
    </div>
  );
};

export default InvestmentDetailsForm;
