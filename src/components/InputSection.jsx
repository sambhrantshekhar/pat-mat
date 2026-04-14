import React from 'react';

export const InputSection = ({ mainText, setMainText, pattern, setPattern }) => {
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6 transition-all hover:shadow-md">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Input Data</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Main Text
          </label>
          <textarea
            className="w-full h-32 p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow resize-none font-mono text-sm"
            placeholder="Enter the main text here..."
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Pattern to Search
          </label>
          <input
            type="text"
            className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow font-mono text-sm"
            placeholder="Enter pattern..."
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
