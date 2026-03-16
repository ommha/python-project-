import React, { useState } from 'react';
import Header from '../components/Header';
import SpinningWheel from '../components/SpinningWheel';
import Sidebar from '../components/Sidebar';
import WinnerModal from '../components/WinnerModal';
import { defaultEntries } from '../data/mock';
import { Pencil, Flag, X } from 'lucide-react';

const HomePage = () => {
  const [entries, setEntries] = useState(defaultEntries);
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(entries[0] || '');
  const [isSpinning, setIsSpinning] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleSpinEnd = (winningEntry) => {
    setWinner(winningEntry);
    setResults(prev => [winningEntry, ...prev]);
    setShowWinnerModal(true);
  };

  const handleRemoveWinner = (winnerToRemove) => {
    const newEntries = entries.filter(e => e !== winnerToRemove);
    setEntries(newEntries);
    if (selectedWinner === winnerToRemove && newEntries.length > 0) {
      setSelectedWinner(newEntries[0]);
    }
  };

  // Update selectedWinner when entries change
  React.useEffect(() => {
    if (entries.length > 0 && !entries.includes(selectedWinner)) {
      setSelectedWinner(entries[0]);
    }
  }, [entries, selectedWinner]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #fce4e4 0%, #f8e1e1 25%, #f5e6e6 50%, #e8e4f0 75%, #dde8f4 100%)' }}>
      <Header />
      
      <div className="flex-1 flex">
        {/* Left Side - Floating Button */}
        <div className="w-16 flex flex-col items-center pt-4">
          <button className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Pencil className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Ad placeholder - Left */}
          <div className="absolute left-4 top-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Flag className="w-4 h-4" />
                Report bad ad
              </span>
              <span className="flex items-center gap-1">
                Close ads
                <X className="w-4 h-4" />
              </span>
            </div>
          </div>
          
          {/* Wheel */}
          <SpinningWheel
            entries={entries}
            onSpinEnd={handleSpinEnd}
            selectedWinner={selectedWinner}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
          />
        </div>
        
        {/* Right Sidebar */}
        <div className="w-96 p-4">
          <Sidebar
            entries={entries}
            setEntries={setEntries}
            results={results}
            selectedWinner={selectedWinner}
            setSelectedWinner={setSelectedWinner}
            showAdminPanel={showAdminPanel}
            setShowAdminPanel={setShowAdminPanel}
          />
        </div>
      </div>
      
      {/* Winner Modal */}
      <WinnerModal
        isOpen={showWinnerModal}
        onClose={() => setShowWinnerModal(false)}
        winner={winner}
        onRemove={handleRemoveWinner}
      />
    </div>
  );
};

export default HomePage;
