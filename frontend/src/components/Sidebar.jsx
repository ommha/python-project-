import React, { useState } from 'react';
import { Shuffle, ArrowUpDown, Image, Plus, ChevronDown, ChevronRight, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
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
    <div className="w-80 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'entries'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('entries')}
        >
          <ChevronRight className={`w-4 h-4 ${activeTab === 'entries' ? 'text-blue-600' : ''}`} />
          <span>Entries</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === 'entries' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
          }`}>
            {entries.length}
          </span>
        </button>
        <button
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'results'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('results')}
        >
          <span>Results</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === 'results' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
          }`}>
            {results.length}
          </span>
        </button>
      </div>

      {activeTab === 'entries' && (
        <>
          {/* Action Buttons */}
          <div className="flex items-center gap-2 p-3 border-b border-gray-100">
            <Button
              variant="default"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
              onClick={shuffleEntries}
            >
              <Shuffle className="w-4 h-4" />
              Shuffle
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
              onClick={sortEntries}
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
            >
              <Image className="w-4 h-4" />
              Add image
              <ChevronDown className="w-3 h-3" />
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <Checkbox id="advanced" />
              <label htmlFor="advanced" className="text-sm text-gray-600">Advanced</label>
            </div>
          </div>

          {/* Entries Textarea */}
          <div className="flex-1 p-3 overflow-hidden">
            <textarea
              className="w-full h-full min-h-[300px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Enter names, one per line..."
            />
          </div>

          {/* Admin Panel - Secret Winner Control */}
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-2"
            >
              <Settings className="w-4 h-4" />
              <span>Manage Output</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdminPanel ? 'rotate-180' : ''}`} />
            </button>
            
            {showAdminPanel && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Select Winner (Pre-determined)
                </label>
                <Select value={selectedWinner} onValueChange={setSelectedWinner}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select winner..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {entries.map((entry, index) => (
                      <SelectItem key={index} value={entry}>
                        {entry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">
                  The wheel will always land on the selected name.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'results' && (
        <div className="flex-1 p-3 overflow-auto">
          {results.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No results yet</p>
              <p className="text-sm mt-1">Spin the wheel to see results here</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{result}</span>
                  <span className="text-sm text-gray-400">#{results.length - index}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Add Wheel Button */}
      <div className="p-3 border-t border-gray-100">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add wheel
          <span className="text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded ml-1">Beta</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </Button>
      </div>

      {/* Version */}
      <div className="p-3 border-t border-gray-100 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Version 405</span>
          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">New!</span>
        </div>
        <a href="#" className="text-blue-500 hover:underline">Changelog</a>
      </div>
    </div>
  );
};

export default Sidebar;
