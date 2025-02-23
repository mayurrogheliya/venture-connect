import { Form, Input, Select, Radio, Button, Card,Slider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";


const { TextArea } = Input;

// List of Interested Domains
const interestedDomains = [
  "Technology & Software",
  "E-Commerce & Retail",
  "FinTech (Financial Technology)",
  "HealthTech & MedTech",
  "EdTech (Education Technology)",
  "AgriTech (Agriculture Technology)",
  "PropTech (Real Estate Technology)",
  "GreenTech & Sustainability",
  "Mobility & Transportation",
  "Entertainment & Media",
  "HRTech & WorkTech",
  "LegalTech",
  "SpaceTech",
  "FoodTech",
  "Travel & Hospitality",
];

const PitchOpportunityForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Create Pitch <span className="text-blue-600">Opportunity</span>
      </h2>
      <p className="text-gray-600 mt-1">
        Fill in the details below to create a new pitch event for startups.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
       
        <div className="lg:col-span-2">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            
            <Form.Item
              label="Name of Pitch Event"
              name="pitchName"
              rules={[
                { required: true, message: "This field is required" },
                { max: 30, message: "Cannot exceed 30 characters" },
              ]}
            >
              <Input
                placeholder="e.g. Tech Startup Pitch 2024"
                maxLength={30} 
              />
            </Form.Item>

            <Form.Item label="Investment Range (₹20K - ₹20Cr+)" name="investmentRange">
                <Slider range min={20000} max={200000000} defaultValue={[20000, 200000000]} />
            </Form.Item>

           
            <Form.Item
              label="Interested Domain"
              name="domain"
              rules={[{ required: true, message: "Please select a domain" }]}
            >
              <Select placeholder="Select domain">
                {interestedDomains.map((domain) => (
                  <Select.Option key={domain} value={domain}>
                    {domain}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

           
            <Form.Item
              label="Preferred Startup Stage"
              name="stage"
              rules={[{ required: true, message: "Please select a stage" }]}
            >
              <Radio.Group>
                <Radio value="Seed Stage">Seed Stage</Radio>
                <Radio value="Early Stage">Early Stage</Radio>
                <Radio value="Growth Stage">Growth Stage</Radio>
                <Radio value="Series A">Series A</Radio>
                <Radio value="Series B and Above">Series B and Above</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Description of the Event"
              name="description"
              rules={[
                { required: true, message: "Description is required" },
                {
                  max: 150,
                  message: "Must be a short one-line description (~20 words)",
                },
              ]}
            >
              <TextArea
                rows={1} 
                maxLength={150} 
                placeholder="Describe your pitch event in one line (~20 words)..."
                className="resize-none overflow-hidden" // Prevents resizing
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Publish Opportunity
              </Button>
            </Form.Item>
          </Form>
        </div>

       
        <Card className="bg-gray-50 h-40 overflow-y-auto p-4">
          <h3 className="font-semibold text-gray-700">Guidelines</h3>
          <ul className="mt-2 text-gray-600 space-y-1">
            <li>
              <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500 mr-2" />
              Be specific about investment criteria
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500 mr-2" />
              Clearly state the stage preferences
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500 mr-2" />
              Include all relevant deadlines
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500 mr-2" />
              Specify any industry restrictions
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PitchOpportunityForm;
