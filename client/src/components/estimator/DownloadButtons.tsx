import { useState } from 'react';
import { ScoringResult } from '@/lib/estimator/types';
import { downloadPDF, downloadPPTX, downloadWord } from '@/lib/estimator/downloads';

interface DownloadButtonsProps {
  result: ScoringResult;
}

type Format = 'pdf' | 'pptx' | 'word';

export default function DownloadButtons({ result }: DownloadButtonsProps) {
  const [loading, setLoading] = useState<Format | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload(format: Format) {
    setLoading(format);
    setError(null);
    try {
      if (format === 'pdf') await downloadPDF(result);
      else if (format === 'pptx') await downloadPPTX(result);
      else await downloadWord(result);
    } catch (e) {
      console.error(e);
      setError('Download failed. Please try again.');
    } finally {
      setLoading(null);
    }
  }

  const buttons: { format: Format; label: string; icon: string; desc: string }[] = [
    { format: 'pdf', label: 'PDF', icon: '📄', desc: 'Polished 2-page summary' },
    { format: 'pptx', label: 'PowerPoint', icon: '📊', desc: '5-slide executive deck' },
    { format: 'word', label: 'Word', icon: '📝', desc: 'Detailed planning record' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {buttons.map(({ format, label, icon, desc }) => (
          <button
            key={format}
            onClick={() => handleDownload(format)}
            disabled={loading !== null}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-[#26006B]/20 hover:border-[#26006B] hover:bg-[#26006B]/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span className="text-2xl">{loading === format ? '⏳' : icon}</span>
            <span className="font-semibold text-[#26006B] text-sm">
              {loading === format ? 'Preparing…' : `Download ${label}`}
            </span>
            <span className="text-xs text-gray-500">{desc}</span>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
