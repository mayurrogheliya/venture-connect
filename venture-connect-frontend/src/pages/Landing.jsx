import EventMain from '../components/EventMain/EventMain';
import FeatureMain from '../components/FeatureMain/FeatureMain';
import Home from '../Layouts/Home';

function Landing() {
  return (
    <div>
      <Home />
      <FeatureMain />
      <EventMain />
    </div>
  );
}

export default Landing;
