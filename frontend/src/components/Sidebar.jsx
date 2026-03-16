import React, { useState, useEffect } from 'react';
import { Shuffle, ArrowUpDown, Image, Plus, ChevronDown, ChevronRight, Settings, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Sidebar = ({ 
  entries, 
  setEntries, 
  results, 
  selectedWinner, 
  setSelectedWinner,
  showAdminPanel,
  setShowAdminPanel
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
    <div className="w-80 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg flex flex-col" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'entries'
              ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/50'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('entries')}
        >
          <ChevronRight className={`w-4 h-4 ${activeTab === 'entries' ? 'text-blue-400' : ''}`} />
          <span>Entries</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === 'entries' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-400'
          }`}>
            {entries.length}
          </span>
        </button>
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'results'
              ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/50'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('results')}
        >
          <span>Results</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === 'results' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-400'
          }`}>
            {results.length}
          </span>
        </button>
      </div>

      {activeTab === 'entries' && (
        <>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-3 border-b border-gray-700">
            <Button
              variant="default"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 text-xs px-3"
              onClick={shuffleEntries}
            >
              <Shuffle className="w-3 h-3" />
              Shuffle
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 text-xs px-3"
              onClick={sortEntries}
            >
              <ArrowUpDown className="w-3 h-3" />
              Sort
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 text-xs px-3"
            >
              <Image className="w-3 h-3" />
              Add image
              <ChevronDown className="w-3 h-3" />
            </Button>
            <div className="flex items-center gap-1 ml-auto">
              <Checkbox id="advanced" className="border-gray-600" />
              <label htmlFor="advanced" className="text-xs text-gray-400">Advanced</label>
            </div>
          </div>

          {/* Entries Textarea */}
          <div className="flex-1 p-3 overflow-hidden">
            <textarea
              className="w-full h-48 p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-500"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Enter names, one per line..."
            />
          </div>

          {/* Settings Section */}
          <div className="p-3 border-t border-gray-700">
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 w-full"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showAdminPanel ? 'rotate-180' : ''}`} />
            </button>
            
            {showAdminPanel && (
              <div className="mt-3 space-y-3">
                {/* Manage Output Section */}
                <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <label className="text-sm font-medium text-gray-300">
                      Manage Output
                    </label>
                  </div>
                  <Select value={selectedWinner} onValueChange={setSelectedWinner}>
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-200">
                      <SelectValue placeholder="Select winner..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {entries.map((entry, index) => (
                        <SelectItem key={index} value={entry} className="text-gray-200 hover:bg-gray-700">
                          {entry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    The wheel will always land on the selected name.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'results' && (
        <div className="flex-1 p-3 overflow-auto min-h-[200px]">
          {results.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No results yet</p>
              <p className="text-sm mt-1">Spin the wheel to see results here</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((result, index) => (
                <li key={index} className="flex items-center justify-between px-3 py-2 hover:bg-gray-800 rounded transition-colors">
                  <span className="text-gray-200">{result}</span>
                  <span className="text-xs text-gray-500">#{results.length - index}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Add Wheel Button */}
      <div className="p-3 border-t border-gray-700">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add wheel
          <span className="text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded ml-1">Beta</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </Button>
      </div>

      {/* Version */}
      <div className="p-3 border-t border-gray-700 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Version 405</span>
        </div>
        <a href="#" className="text-blue-400 hover:underline">Changelog</a>
      </div>
    </div>
  );
};

export default Sidebar;
