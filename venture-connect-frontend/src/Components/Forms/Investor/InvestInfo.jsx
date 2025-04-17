import { forwardRef, useImperativeHandle, useEffect } from "react";
import { Form, Input, Button, Slider, Radio, Select, Typography } from "antd";
import { BankOutlined, DeleteOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { formatAmount } from "../../../utils/formatUtils";
import { useInvestorFormStore } from '../../../store/useInvestorFormStore';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const { Text } = Typography;

const domains = [
  "Technology", 
  "Healthcare", 
  "Fintech", 
  "E-commerce", 
  "AI/ML", 
  "SaaS", 
  "Clean Tech", 
  "EdTech", 
  "Others"
];

const InvestmentDetailsForm = forwardRef(({ initialData, isEdit }, ref) => {
  const [form] = Form.useForm();
  const {
    investmentDetails,
    previousInvestments,
    setInvestmentRange,
    setInvestmentField,
    addInvestment,
    removeInvestment,
    updateInvestment
  } = useInvestorFormStore();

  useEffect(() => {
    if (isEdit && initialData) {
      form.setFieldsValue({
        investmentRange: [initialData.mininvestment, initialData.maxinvestment],
        portfolioCompanies: initialData.portfolioCompanies !== undefined ? initialData.portfolioCompanies : undefined, // Prevent default value
        totalInvestment: initialData.totalInvestment !== undefined ? initialData.totalInvestment : undefined // Prevent default value
      });
    } else {
      form.setFieldsValue({
        investmentRange: investmentDetails.investmentRange,
        interestedDomains: investmentDetails.interestedDomains,
        mentorship: investmentDetails.mentorship ? "Yes" : "No",
        portfolioCompanies: investmentDetails.portfolioCompanies !== undefined ? investmentDetails.portfolioCompanies : undefined, // Prevent default value
        totalInvestment: investmentDetails.totalInvestment !== undefined ? investmentDetails.totalInvestment : undefined // Prevent default value
      });
    }
  }, [initialData, isEdit, form, investmentDetails]);

  const handleAddInvestment = () => {
    const newInvestment = { 
      year: "", 
      startupName: "", 
      domain: "", 
      description: "" 
    };
    addInvestment(newInvestment);
  };

  const handleRemoveInvestment = (index) => {
    removeInvestment(index);
  };

  const handleInvestmentChange = (index, field, value) => {
    updateInvestment(index, field, value);
  };

  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      try {
        const values = await form.validateFields();
        
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'investmentRange') {
            setInvestmentRange(value);
          } else if (key === 'mentorship') {
            setInvestmentField(key, value === "Yes");
          } else {
            setInvestmentField(key, value);
          }
        });

        const isValid = previousInvestments.every(inv =>
          inv.year && inv.startupName && inv.domain && inv.description
        );

        if (!isValid) {
          throw new Error("Please fill all fields in previous investments");
        }

        toast.success("Investment details validated successfully!");
        return true;
      } catch (error) {
        toast.error(error.message || "Please correct the errors in the form.");
        return false;
      }
    },
    getFormData: () => form.getFieldsValue()
  }));

  return (
    <Form 
      form={form} 
      layout="vertical" 
      className="mt-6 px-10"
      onValuesChange={(changedValues) => {
        Object.keys(changedValues).forEach(key => {
          if (key === 'investmentRange') {
            setInvestmentRange(changedValues[key]);
          } else if (key === 'mentorship') {
            setInvestmentField(key, changedValues[key] === "Yes");
          } else {
            setInvestmentField(key, changedValues[key]);
          }
        });
      }}
    >
      <h2 className="text-lg font-semibold text-gray-900">Investment Details</h2>

      <Form.Item
        label="Investment Range (₹20K - ₹20Cr+)"
        name="investmentRange"
        rules={[{ required: true, message: 'Please select investment range' }]}
      >
        <div className="mt-4">
          <Slider
            range
            min={20000}
            max={200000000}
            step={10000}
            tooltip={{ formatter: formatAmount }}
            onChange={(value) => {
              form.setFieldsValue({ investmentRange: value });
              setInvestmentRange(value);
            }}
          />
          <Text className="block mt-2">
            Selected Range: {formatAmount(investmentDetails.investmentRange[0])} -{' '}
            {formatAmount(investmentDetails.investmentRange[1])}
          </Text>
        </div>
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Portfolio Companies"
          name="portfolioCompanies"
          rules={[{ required: true, message: "Enter the number of companies" }, { pattern: /^[0-9]+$/, message: "Only numbers are allowed" }]}
        >
          <Input 
            prefix={<BankOutlined />} 
            placeholder="Number of companies" 
          />
        </Form.Item>

        <Form.Item
          label="Total Investments (₹)"
          name="totalInvestment"
          rules={[{ required: true, message: "Enter total investment amount" }, { pattern: /^[0-9]+$/, message: "Only numbers are allowed" }]}
        >
          <Input
            prefix={<FontAwesomeIcon icon={faIndianRupeeSign} size="sm" style={{ marginRight: "5px", color: "gray" }} />}
            placeholder="Enter amount"
          />
        </Form.Item>
      </div>

      <Form.Item 
        label="Interested Domains *" 
        name="interestedDomains"
        rules={[{ required: true, message: "Select at least one domain" }]}
      >
        <Select 
          mode="multiple" 
          placeholder="Select domains"
          options={domains.map(domain => ({ value: domain, label: domain }))}
        />
      </Form.Item>

      <Form.Item 
        label="Interested in Providing Mentorship?" 
        name="mentorship"
        rules={[{ required: true, message: "Select Yes or No" }]}
      >
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
        
        {previousInvestments.map((investment, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mt-2">
            <Form.Item
              name={['previousInvestments', index, 'year']}
              rules={[{ required: true, message: "Year is required" }, { pattern: /^(200\d|20[1-9]\d|2099)$/, message: "Year must be between 2000-2099" }]}
            >
              <Input 
                placeholder="YYYY" 
                onChange={(e) => handleInvestmentChange(index, 'year', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name={['previousInvestments', index, 'startupName']}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input 
                placeholder="Startup name" 
                onChange={(e) => handleInvestmentChange(index, 'startupName', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name={['previousInvestments', index, 'domain']}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input 
                placeholder="Domain" 
                onChange={(e) => handleInvestmentChange(index, 'domain', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name={['previousInvestments', index, 'description']}
              rules={[{ required: true, message: "Required" }, { max: 100, message: "Max 100 characters allowed" }]}
            >
              <Input 
                placeholder="Brief description" 
                onChange={(e) => handleInvestmentChange(index, 'description', e.target.value)}
              />
            </Form.Item>

            <Button 
              danger 
              onClick={() => handleRemoveInvestment(index)}
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
        
        <Button 
          type="dashed" 
          onClick={handleAddInvestment} 
          className="mt-2 w-full"
        >
          + Add Investment
        </Button>
      </div>
    </Form>
  );
});

InvestmentDetailsForm.displayName = 'InvestmentDetailsForm';

InvestmentDetailsForm.propTypes = {
  initialData: PropTypes.shape({
    mininvestment: PropTypes.number,
    maxinvestment: PropTypes.number,
    totalInvestment: PropTypes.number // Add totalInvestment to initialData propTypes
  }),
  isEdit: PropTypes.bool
};

InvestmentDetailsForm.defaultProps = {
  initialData: null,
  isEdit: false
};

export default InvestmentDetailsForm;
