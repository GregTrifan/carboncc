// MetricToggler.tsx
import { useMetric } from '@/contexts/MetricContext';
import React from 'react';

const MetricToggler = () => {
  const { isMetric, setIsMetric } = useMetric();

  return (
    <div className="flex items-center space-x-2 my-8">
      <span className="text-sm font-semibold text-gray-700">
        Use metric system?
      </span>
      <button
        onClick={() => setIsMetric(!isMetric)}
        className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors ${
          isMetric ? 'bg-emerald-800' : 'bg-gray-500/80'
        }`}
      >
        <span
          className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${
            isMetric ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default MetricToggler;
