import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EstimatorWizard from '@/components/estimator/EstimatorWizard';

export default function TimelineEstimator() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="px-6 sm:px-10 lg:px-20 py-10">
          <EstimatorWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
