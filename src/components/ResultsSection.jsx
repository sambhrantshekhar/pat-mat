import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ResultsSection = ({ selectedAlgorithm, results, comparisonData, isDarkMode }) => {
  if (!results && (!comparisonData || comparisonData.length === 0)) return null;

  const isRunAll = selectedAlgorithm === 'Run All';

  const formatTime = (timeInMs) => {
    if (timeInMs === 0) return '0.000 ms';
    if (timeInMs >= 0.001) {
      return `${timeInMs.toFixed(3)} ms`;
    } else {
      const inMicro = timeInMs * 1000;
      if (inMicro < 0.001) {
        return `${timeInMs.toExponential(3)} ms`;
      }
      return `${inMicro.toFixed(3)} µs`;
    }
  };

  const chartTextColor = isDarkMode ? '#cbd5e1' : '#475569';
  const chartGridColor = isDarkMode ? '#334155' : '#cbd5e1';
  const chartAxisColor = isDarkMode ? '#475569' : '#94a3b8';

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6 transition-all">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Results & Metrics</h2>
      
      {!isRunAll && results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Algorithm Selected" 
            value={selectedAlgorithm} 
            color="text-indigo-600 dark:text-indigo-400" 
          />
          <MetricCard 
            title="Matches Found" 
            value={results.indices.length} 
            color="text-emerald-600 dark:text-emerald-400" 
          />
          <MetricCard 
            title="Comparisons Made" 
            value={results.comparisons.toLocaleString()} 
            color="text-amber-600 dark:text-amber-400" 
          />
          <MetricCard 
            title="Time Taken" 
            value={formatTime(results.timeTaken)} 
            color="text-rose-600 dark:text-rose-400" 
          />
        </div>
      )}

      {isRunAll && comparisonData && comparisonData.length > 0 && (
        <div className="space-y-8 mt-6">
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-4 text-center">Comparisons Made</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                  <XAxis dataKey="algorithm" tick={{fill: chartTextColor}} axisLine={{stroke: chartAxisColor}} />
                  <YAxis tick={{fill: chartTextColor}} axisLine={{stroke: chartAxisColor}} />
                  <Tooltip wrapperClassName="rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200" cursor={{fill: isDarkMode ? '#1e293b' : '#f1f5f9'}} />
                  <Legend />
                  <Bar dataKey="comparisons" name="Comparisons" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-4 text-center">Actual Time Taken (ms)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                  <XAxis dataKey="algorithm" tick={{fill: chartTextColor}} axisLine={{stroke: chartAxisColor}} />
                  <YAxis tick={{fill: chartTextColor}} axisLine={{stroke: chartAxisColor}} />
                  <Tooltip 
                    formatter={(value) => formatTime(value)} 
                    wrapperClassName="rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200" cursor={{fill: isDarkMode ? '#1e293b' : '#f1f5f9'}} 
                  />
                  <Legend />
                  <Bar dataKey="timeTaken" name="Time (ms)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {comparisonData.map(data => (
              <div key={data.algorithm} className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{data.algorithm} Detail</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2"><strong>Comparisons:</strong> {data.comparisons.toLocaleString()}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Time:</strong> {formatTime(data.timeTaken)}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400"><strong>Matches Found:</strong> {data.matches}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Complexity:</strong> {getComplexity(data.algorithm)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isRunAll && results && results.indices.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Match Found at Indices:</h3>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
            {results.indices.map((idx, index) => (
              <span key={index} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-mono rounded border border-indigo-200 dark:border-indigo-800">
                idx: {idx}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {!isRunAll && results && (
        <div className="mt-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
           <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Theoretical Time Complexity for {selectedAlgorithm}</h3>
           <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{getComplexity(selectedAlgorithm)}</p>
        </div>
      )}
    </section>
  );
};

const MetricCard = ({ title, value, color }) => (
  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center transition-colors">
    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{title}</span>
    <span className={`text-xl font-bold ${color}`}>{value}</span>
  </div>
);

const getComplexity = (algo) => {
  switch (algo) {
    case 'Naïve':
      return 'Best: O(n) | Worst: O(n * m)';
    case 'KMP':
      return 'Best/Worst: O(n + m)';
    case 'Rabin-Karp':
      return 'Best/Avg: O(n + m) | Worst: O(n * m)';
    default:
      return '';
  }
};
