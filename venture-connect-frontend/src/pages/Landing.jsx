import EventMain from '../components/EventMain/EventMain';
import FeatureMain from '../components/FeatureMain/FeatureMain';
import GuideStepMain from '../components/GuideStep/GuideStepMain';
import LandingHome from '../components/LandingHome';

function Landing() {
  return (
    <div>
      <LandingHome />
      <FeatureMain />
      <GuideStepMain />
      <EventMain />
    </div>
  );
}

export default Landing;
