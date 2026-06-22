import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EstimatorWizard from '@/components/estimator/EstimatorWizard';

export default function TimelineEstimator() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
          <EstimatorWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
