import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EstimatorWizard from '@/components/estimator/EstimatorWizard';

export default function TimelineEstimator() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="py-10" style={{ paddingLeft: '8%', paddingRight: '8%' }}>
          <EstimatorWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
