import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LxologyTools from '@/components/LxologyTools';

export default function Tools() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#F6F9FF' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#26006B] mb-5">
              Tools
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Practical planning tools to help you scope work, build capability, and move
              initiatives forward with confidence.
            </p>
          </div>
        </section>

        {/* Featured: Free Timeline Estimator */}
        <LxologyTools />
      </main>
      <Footer />
    </div>
  );
}
