import React from 'react';
import { Target, ChevronDown, Lock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ManageOutputSection = ({ entries, selectedWinner, setSelectedWinner }) => {
  return (
    <div className="w-full bg-[#0d0d14] border-t border-gray-800/50 py-6">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-[#1e1e2e] rounded-xl p-5 border border-gray-800/50 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                Manage Output
                <Lock className="w-3.5 h-3.5 text-gray-500" />
              </h3>
              <p className="text-xs text-gray-500">Control the wheel outcome</p>
            </div>
          </div>
          
          <Select value={selectedWinner} onValueChange={setSelectedWinner}>
            <SelectTrigger className="w-full bg-[#12121a] border-gray-700/50 text-gray-200 rounded-lg py-3 hover:border-blue-500/50 transition-all duration-200">
              <SelectValue placeholder="Select predetermined winner..." />
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
          
          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            The wheel will always land on the selected name
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageOutputSection;
