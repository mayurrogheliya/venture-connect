import EventMain from '../components/EventMain/EventMain';
import FeatureMain from '../components/FeatureMain/FeatureMain';
import GuideStepMain from '../components/GuideStep/GuideStepMain';
import Home from '../Layouts/Home';

function Landing() {
  return (
    <div>
      <Home />
      <FeatureMain />
      <GuideStepMain />
      <EventMain />
    </div>
  );
}

export default Landing;
