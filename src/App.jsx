import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ControlsSection } from './components/ControlsSection';
import { ResultsSection } from './components/ResultsSection';
import { naiveSearch, kmpSearch, rabinKarpSearch } from './utils/algorithms';

function App() {
  const [mainText, setMainText] = useState('');
  const [pattern, setPattern] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Naïve');
  const [results, setResults] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark class to html
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const generateSampleData = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    // Generate a 5000 character string
    for (let i = 0; i < 5000; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Pick a random substring of length 5 to 15
    const patternLen = Math.floor(Math.random() * 10) + 5;
    const startIndex = Math.floor(Math.random() * (text.length - patternLen));
    const newPattern = text.substring(startIndex, startIndex + patternLen);

    setMainText(text);
    setPattern(newPattern);
    setResults(null);
    setComparisonData([]);
  };

  const runAlgorithm = () => {
    if (!mainText || !pattern) {
      alert("Please provide both main text and a pattern to search.");
      return;
    }

    if (selectedAlgorithm === 'Run All') {
      const naiveRes = naiveSearch(mainText, pattern);
      const kmpRes = kmpSearch(mainText, pattern);
      const rkRes = rabinKarpSearch(mainText, pattern);

      setComparisonData([
        { algorithm: 'Naïve', ...naiveRes, matches: naiveRes.indices.length },
        { algorithm: 'KMP', ...kmpRes, matches: kmpRes.indices.length },
        { algorithm: 'Rabin-Karp', ...rkRes, matches: rkRes.indices.length },
      ]);
      setResults(null);
    } else {
      let res;
      switch (selectedAlgorithm) {
        case 'Naïve':
          res = naiveSearch(mainText, pattern);
          break;
        case 'KMP':
          res = kmpSearch(mainText, pattern);
          break;
        case 'Rabin-Karp':
          res = rabinKarpSearch(mainText, pattern);
          break;
        default:
          res = naiveSearch(mainText, pattern);
      }
      setResults(res);
      setComparisonData([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 pb-16 relative">
        <InputSection 
          mainText={mainText} 
          setMainText={setMainText}
          pattern={pattern}
          setPattern={setPattern}
        />
        <ControlsSection 
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          onRun={runAlgorithm}
          onGenerateSample={generateSampleData}
        />
        <ResultsSection 
          selectedAlgorithm={selectedAlgorithm}
          results={results}
          comparisonData={comparisonData}
          isDarkMode={isDarkMode}
        />
      </main>
      
      {/* Footer Watermark */}
      <div className="fixed bottom-3 right-4 text-lg font-medium text-slate-400 dark:text-slate-300 opacity-60 select-none z-50 pointer-events-none">
        Sambhrant Shekhar | 24BCE1500
      </div>
    </div>
  );
}

export default App;
