import React, { useState } from 'react';
import { Settings, Shuffle } from 'lucide-react';

const RANDOM_OPTION = "__RANDOM__";

const ManageOutputSection = ({ entries, selectedWinner, setSelectedWinner }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedWinner(value);
    setIsDropdownOpen(false);
  };

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
              
              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-[#12121a] border border-gray-700/50 text-gray-200 rounded-lg py-3 px-4 hover:border-blue-500/50 transition-all duration-200 flex items-center justify-between"
                >
                  {selectedWinner === RANDOM_OPTION ? (
                    <span className="flex items-center gap-2 text-green-400">
                      <Shuffle className="w-4 h-4" />
                      Random (True Random)
                    </span>
                  ) : (
                    <span>{selectedWinner || 'Select winner...'}</span>
                  )}
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1e1e2e] border border-gray-700/50 rounded-xl shadow-2xl z-[100] max-h-64 overflow-y-auto">
                    {/* Random Option */}
                    <div
                      onClick={(e) => { e.stopPropagation(); handleSelect(RANDOM_OPTION); }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-green-500/20 transition-colors cursor-pointer ${
                        selectedWinner === RANDOM_OPTION ? 'bg-green-500/20 text-green-400' : 'text-green-400'
                      }`}
                    >
                      <Shuffle className="w-4 h-4" />
                      Random (True Random)
                    </div>
                    
                    {/* Divider */}
                    <div className="h-px bg-gray-700/50 mx-2"></div>
                    
                    {/* Name Options */}
                    {entries.map((entry, index) => (
                      <div
                        key={index}
                        onClick={(e) => { e.stopPropagation(); handleSelect(entry); }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-500/20 transition-colors cursor-pointer ${
                          selectedWinner === entry ? 'bg-blue-500/20 text-blue-400' : 'text-gray-200'
                        }`}
                      >
                        {entry}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-600 mt-3 text-center">
                {selectedWinner === RANDOM_OPTION 
                  ? "Wheel will land on a truly random name"
                  : "Wheel lands on selected name"
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOutputSection;
