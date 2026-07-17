import { useLocation } from 'wouter';
import WelcomeScreen from './estimator/WelcomeScreen';

export default function LxologyTools() {
  const [, navigate] = useLocation();

  return (
    <section id="tools" className="py-20 md:py-32 bg-gradient-to-r from-[#26006B]/5 via-white to-[#F5C2D9]/10">
      <div className="container mx-auto px-4">
        <WelcomeScreen onStart={() => navigate('/timeline-estimator')} />
      </div>
    </section>
  );
}
