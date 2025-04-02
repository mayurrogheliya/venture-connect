import { useState,useEffect } from "react";
import { Form, Input, Button, Slider, Radio, message, Select ,Typography} from "antd";
import { BankOutlined, DeleteOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { formatAmount } from "../../../utils/formatUtils";

const { Option } = Select;
const {Text } = Typography;
const domains = ["Technology", "Healthcare", "Fintech", "E-commerce", "AI/ML", "SaaS", "Clean Tech", "EdTech", "Others"];

const InvestmentDetailsForm = (initialData,isEdit) => {
  const [form] = Form.useForm();
  const [investments, setInvestments] = useState([{ year: "", startupName: "", domain: "", description: "" }]);
  const [investmentRange, setInvestmentRange] = useState([20000, 200000000]);


  useEffect(() => {
      if (isEdit && initialData) {
        form.setFieldsValue({
          ...initialData,
          investmentRange: [initialData.mininvestment, initialData.maxinvestment],
        });
  
        setInvestmentRange([
          initialData.mininvestment,
          initialData.maxinvestment,
        ]);
      }
    }, [initialData, isEdit, form]);

  const addInvestment = () => {
    setInvestments([...investments, { year: "", startupName: "", domain: "", description: "" }]);
  };

  const removeInvestment = (index) => {
    setInvestments(investments.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    form
      .validateFields()
      .then(() => message.success("Form submitted successfully!"))
      .catch(() => message.error("Please correct the errors in the form."));
  };

  return (
    <Form form={form} layout="vertical" className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900">Investment Details</h2>


      <Form.Item
                      label="Investment Range (₹20K - ₹20Cr+)"
                      name="investmentRange"
                    >
                      <div>
                        <Slider
                          range
                          min={20000}
                          max={200000000}
                          step={10000}
                          value={investmentRange}
                          onChange={setInvestmentRange}
                          tooltip={{ formatter: formatAmount }}
                        />
                        <Text>
                          Selected Range: {formatAmount(investmentRange[0])} -{' '}
                          {formatAmount(investmentRange[1])}
                        </Text>
                      </div>
                    </Form.Item>
      

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Portfolio Companies"
          name="portfolioCompanies"
          rules={[{ required: true, message: "Enter the number of companies" },
                  { pattern: /^[0-9]+$/, message: "Only numbers are allowed" }]}
        >
          <Input prefix={<BankOutlined />} placeholder="Number of companies" />
        </Form.Item>

        <Form.Item
          label="Total Investments (₹)"
          name="totalInvestment"
          rules={[{ required: true, message: "Enter total investment amount" },
                  { pattern: /^[0-9]+$/, message: "Only numbers are allowed" }]}
        >
          <Input
            prefix={<FontAwesomeIcon icon={faIndianRupeeSign} size="sm" style={{ marginRight: "5px", color: "gray" }} />}
            placeholder="Enter amount"
          />
        </Form.Item>
      </div>

      
      <Form.Item label="Interested Domains *" name="interestedDomains"
        rules={[{ required: true, message: "Select at least one domain" }]}>
        <Select mode="multiple" placeholder="Select domains">
          {domains.map((domain) => (
            <Option key={domain} value={domain}>
              {domain}
            </Option>
          ))}
        </Select>
      </Form.Item>

      
      <Form.Item label="Interested in Providing Mentorship?" name="mentorship"
        rules={[{ required: true, message: "Select Yes or No" }]}>
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

     
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
            <Form.Item
              name={["investments", index, "year"]}
              rules={[
                { required: true, message: "Year is required" },
                { pattern: /^(200\d|20[1-9]\d|2099)$/, message: "Year must be between 2000-2099" }
              ]}
            >
              <Input placeholder="YYYY" />
              
            </Form.Item>

            <Form.Item name={["investments", index, "startupName"]} rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="Startup name" />
            </Form.Item>

            <Form.Item name={["investments", index, "domain"]} rules={[{ required: true, message: "Required" }]}>
              <Input placeholder="Domain" />
            </Form.Item>

            <Form.Item
              name={["investments", index, "description"]}
              rules={[
                { required: true, message: "Required" },
                { max: 100, message: "Max 10 words allowed" }
              ]}
            >
              <Input placeholder="Brief description (max 10 words)" />
            </Form.Item>

            <Button danger onClick={() => removeInvestment(index)}>
              <DeleteOutlined />
            </Button>
          </div>
        ))}
        <Button type="link" onClick={addInvestment} className="mt-2">
          + Add More
        </Button>
      </div>

      {/* Submit Button */}
      <Button type="primary" className="mt-6" onClick={validateForm}>
        Submit
      </Button>
    </Form>
  );
};

InvestmentDetailsForm.validateForm = async () => {
  return await InvestmentDetailsForm.form.validateFields();
};

export default InvestmentDetailsForm;
