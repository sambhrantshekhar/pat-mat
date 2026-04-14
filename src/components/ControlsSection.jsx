import React from 'react';
import { Play, Shuffle } from 'lucide-react';

export const ControlsSection = ({ 
  selectedAlgorithm, 
  setSelectedAlgorithm, 
  onRun, 
  onGenerateSample 
}) => {
  const algorithms = ['Naïve', 'KMP', 'Rabin-Karp', 'Run All'];

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6 transition-all hover:shadow-md">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Controls</h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {algorithms.map((algo) => (
            <label 
              key={algo} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer border transition-colors ${
                selectedAlgorithm === algo 
                  ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 font-medium' 
                  : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <input
                type="radio"
                name="algorithm"
                value={algo}
                checked={selectedAlgorithm === algo}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="hidden"
              />
              <span>{algo}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <button
            onClick={onGenerateSample}
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>Generate Sample</span>
          </button>
          
          <button
            onClick={onRun}
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-sm"
          >
            <Play className="w-4 h-4" />
            <span>Run</span>
          </button>
        </div>
      </div>
    </section>
  );
};
