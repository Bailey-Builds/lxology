import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EstimatorWizard from '@/components/estimator/EstimatorWizard';

export default function TimelineEstimator() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="py-10" style={{ paddingLeft: 'clamp(1.5rem, 8vw, 8rem)', paddingRight: 'clamp(1.5rem, 8vw, 8rem)' }}>
          <EstimatorWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
