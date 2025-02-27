import { Tabs } from 'antd';
import StartupUser from './StartupUser';
import InvestorUser from './InvestorUser';

const UserMain = () => {
  const users = { Startups: <StartupUser />, Investors: <InvestorUser /> };
  return (
    <>
      <Tabs
        type="card"
        items={Object.entries(users).map(([key, component], i) => ({
          label: key,
          key: String(i),
          children: component,
        }))}
      />
    </>
  );
};

export default UserMain;
