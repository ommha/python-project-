import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ManageOutputSection = ({ entries, selectedWinner, setSelectedWinner }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-[#080810] py-8">
      <div className="max-w-6xl mx-auto px-8">
        {/* Small icon button at the bottom */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isExpanded 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-gray-800/50 text-gray-500 hover:bg-gray-700/50 hover:text-gray-400'
            }`}
            title="Manage Output"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        {/* Expandable panel */}
        {isExpanded && (
          <div className="mt-6 max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#1e1e2e] rounded-xl p-5 border border-gray-800/50 shadow-xl">
              <p className="text-xs text-gray-500 mb-3 text-center">Manage Output</p>
              
              <Select value={selectedWinner} onValueChange={setSelectedWinner}>
                <SelectTrigger className="w-full bg-[#12121a] border-gray-700/50 text-gray-200 rounded-lg py-3 hover:border-blue-500/50 transition-all duration-200">
                  <SelectValue placeholder="Select winner..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1e1e2e] border-gray-700/50 rounded-xl shadow-2xl">
                  {entries.map((entry, index) => (
                    <SelectItem 
                      key={index} 
                      value={entry} 
                      className="text-gray-200 hover:bg-blue-500/20 focus:bg-blue-500/20 rounded-lg cursor-pointer"
                    >
                      {entry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <p className="text-xs text-gray-600 mt-3 text-center">
                Wheel lands on selected name
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOutputSection;
