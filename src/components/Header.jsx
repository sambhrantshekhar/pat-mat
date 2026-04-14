import React from 'react';
import { Activity, Sun, Moon } from 'lucide-react';

export const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm py-5 px-6 md:px-10 flex items-center justify-between sticky top-0 z-10 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
          <Activity className="text-indigo-600 dark:text-indigo-400 h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          String Matching Visualizer
        </h1>
      </div>
      
      <button 
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 focus:outline-none transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
};
