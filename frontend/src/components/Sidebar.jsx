import React, { useState, useEffect } from 'react';
import { Shuffle, ArrowUpDown, Image, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

const Sidebar = ({ 
  entries, 
  setEntries, 
  results
}) => {
  const [activeTab, setActiveTab] = useState('entries');
  const [textValue, setTextValue] = useState(entries.join('\n'));

  useEffect(() => {
    setTextValue(entries.join('\n'));
  }, [entries]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setTextValue(value);
    const newEntries = value.split('\n').filter(entry => entry.trim() !== '');
    setEntries(newEntries);
  };

  const shuffleEntries = () => {
    const shuffled = [...entries].sort(() => Math.random() - 0.5);
    setEntries(shuffled);
    setTextValue(shuffled.join('\n'));
  };

  const sortEntries = () => {
    const sorted = [...entries].sort();
    setEntries(sorted);
    setTextValue(sorted.join('\n'));
  };

  return (
    <div className="w-80 bg-[#1e1e2e] rounded-xl shadow-2xl flex flex-col border border-gray-800/50" style={{ maxHeight: 'calc(100vh - 100px)' }}>
      {/* Tabs */}
      <div className="flex border-b border-gray-700/50">
        <button
          className={`flex-1 py-3.5 px-4 flex items-center justify-center gap-2 transition-all duration-200 ${
            activeTab === 'entries'
              ? 'text-white border-b-2 border-blue-500 bg-blue-500/10'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }`}
          onClick={() => setActiveTab('entries')}
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'entries' ? 'text-blue-400' : ''}`} />
          <span className="font-medium">Entries</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            activeTab === 'entries' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-400'
          }`}>
            {entries.length}
          </span>
        </button>
        <button
          className={`flex-1 py-3.5 px-4 flex items-center justify-center gap-2 transition-all duration-200 ${
            activeTab === 'results'
              ? 'text-white border-b-2 border-blue-500 bg-blue-500/10'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
          }`}
          onClick={() => setActiveTab('results')}
        >
          <span className="font-medium">Results</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            activeTab === 'results' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-400'
          }`}>
            {results.length}
          </span>
        </button>
      </div>

      {activeTab === 'entries' && (
        <>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-4 border-b border-gray-700/50">
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-200"
              onClick={shuffleEntries}
            >
              <Shuffle className="w-3.5 h-3.5" />
              Shuffle
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-200"
              onClick={sortEntries}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-200"
            >
              <Image className="w-3.5 h-3.5" />
              Add image
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
          
          {/* Advanced checkbox */}
          <div className="px-4 py-2 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <Checkbox id="advanced" className="border-gray-600 data-[state=checked]:bg-blue-600" />
              <label htmlFor="advanced" className="text-sm text-gray-400 cursor-pointer">Advanced</label>
            </div>
          </div>

          {/* Entries Textarea */}
          <div className="flex-1 p-4 overflow-hidden">
            <textarea
              className="w-full h-56 p-4 bg-[#12121a] border border-gray-700/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-200 placeholder-gray-500 text-sm leading-relaxed transition-all duration-200 overflow-y-auto"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Enter names, one per line..."
            />
          </div>
        </>
      )}

      {activeTab === 'results' && (
        <div className="flex-1 p-4 overflow-auto">
          {results.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                <ChevronRight className="w-8 h-8 text-gray-600" />
              </div>
              <p className="font-medium">No results yet</p>
              <p className="text-sm mt-1 text-gray-600">Spin the wheel to see results here</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className="flex items-center justify-between px-4 py-3 bg-[#12121a] hover:bg-gray-800/50 rounded-xl transition-all duration-200 border border-gray-700/30">
                  <span className="text-gray-200 font-medium">{result}</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">#{results.length - index}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Add Wheel Button */}
      <div className="p-4 border-t border-gray-700/50">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center justify-center gap-2 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200">
          <Plus className="w-4 h-4" />
          Add wheel
          <span className="text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full font-semibold ml-1">Beta</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </Button>
      </div>

      {/* Version */}
      <div className="px-4 py-3 border-t border-gray-700/50 flex items-center justify-between text-sm">
        <span className="text-gray-500">Version 405</span>
        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Changelog</a>
      </div>
    </div>
  );
};

export default Sidebar;
