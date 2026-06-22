import { Link } from 'wouter';
import EstimatorWizard from '@/components/estimator/EstimatorWizard';

export default function TimelineEstimator() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <a className="text-[#26006B] font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
              Lxology
            </a>
          </Link>
          <span className="text-xs text-gray-400 font-medium">Timeline Estimator™ Beta</span>
        </div>
      </header>

      {/* Tool */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <EstimatorWizard />
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Lxology. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy">
              <a className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/">
              <a className="hover:text-gray-600 transition-colors">lxology.com</a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
