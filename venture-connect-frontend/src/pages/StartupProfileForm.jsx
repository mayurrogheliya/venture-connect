import { Button, Form, message, Steps } from 'antd';
import SPBasicInfo from '../components/StartupProfileSteps/SPBasicInfo';
import { useState } from 'react';
import SPMatrices from '../components/StartupProfileSteps/SPMetrices';

const StartupProfileForm = () => {
  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Basic Info',
      content: <SPBasicInfo form={form} />,
    },
    {
      title: 'Metrices',
      content: <SPMatrices form={form} />,
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = async () => {
    await form.validateFields();
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <div className="bg-neutral-50 md:pt-10 md:pb-5 md:px-20 pt-5 pb-3 px-10 border-b border-gray-200">
        <h2 className="md:text-4xl text-3xl font-bold">
          Complete Your <span className="text-blue-500">Startup Profile</span>
        </h2>
        <p className="text-lg text-gray-600 font-normal mt-3 mb-6">
          Explore and Connect with innovative startups
        </p>
        <Steps current={current} items={items} />
      </div>

      <div className="md:py-8 md:px-20 py-4 px-5">
        {steps[current].content}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={async () => {
                await form.validateFields();
                message.success('Processing complete!');
                console.log(form.getFieldsValue(true));
              }}
            >
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default StartupProfileForm;
