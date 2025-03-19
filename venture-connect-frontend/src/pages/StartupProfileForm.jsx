import { Button, Form, message, Steps } from 'antd';
import SPBasicInfo from '../components/StartupProfileSteps/SPBasicInfo';
import { useState } from 'react';
import SPMatrices from '../components/StartupProfileSteps/SPMetrices';
import SPTeam from '../components/StartupProfileSteps/SPTeam';
import { useStartupProfileStore } from '../store/useStartupProfileStore';
import { startupAPI } from '../api/endpoints/startup';
import { useNavigate } from 'react-router-dom';

const StartupProfileForm = () => {
  const [form] = Form.useForm();
  const userId = localStorage.getItem('userId');
  const { setLoading } = useStartupProfileStore();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Basic Info',
      content: <SPBasicInfo form={form} />,
    },
    {
      title: 'Metrices',
      content: <SPMatrices form={form} />,
    },
    {
      title: 'Team',
      content: <SPTeam form={form} />,
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

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setLoading(true);

      const formValues = form.getFieldsValue(true);
      const formData = new FormData();

      formData.append('userId', userId);
      formData.append('basicInfo', JSON.stringify(formValues.basicInfo));
      formData.append('metrics', JSON.stringify(formValues.metrics));
      formData.append('team', JSON.stringify(formValues.team));
      formData.append(
        'teamMembers',
        JSON.stringify(formValues.teamMembers || []),
      );

      console.log('form values ', formValues);

      if (formValues.basicInfo?.startupLogo?.[0]?.originFileObj) {
        formData.append(
          'startupLogo',
          formValues.basicInfo.startupLogo[0].originFileObj,
        );
      }

      if (formValues.team?.founderImage?.[0]?.originFileObj) {
        formData.append(
          'founderImage',
          formValues.team.founderImage[0].originFileObj,
        );
      }

      if (formValues.teamMembers) {
        formValues.teamMembers.forEach((member, index) => {
          if (member.profile_image?.[0]?.originFileObj) {
            formData.append(
              'teamMembersImages',
              member.profile_image[0].originFileObj,
            );
          }
        });
      }

      for (let pair of formData.entries()) {
        console.log(
          pair[0] +
            ': ' +
            (pair[1] instanceof File
              ? `File: ${pair[1].name}, size: ${pair[1].size}`
              : pair[1]),
        );
      }

      const response = await startupAPI.createStartupProfile(formData);
      console.log('response', response);
      if (response.data.success) {
        message.success(
          response?.data?.message || 'Startup Profile Created Successfully',
        );
        navigate('/startups-hub');
      } else {
        message.error(response?.data?.message || 'Failed to create profile');
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
            <Button type="primary" onClick={handleSubmit}>
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
