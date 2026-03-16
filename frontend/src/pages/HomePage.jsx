import React, { useState } from 'react';
import Header from '../components/Header';
import SpinningWheel from '../components/SpinningWheel';
import Sidebar from '../components/Sidebar';
import WinnerModal from '../components/WinnerModal';
import FAQSection from '../components/FAQSection';
import ManageOutputSection from '../components/ManageOutputSection';
import { defaultEntries } from '../data/mock';
import { Pencil, Flag, X } from 'lucide-react';

const HomePage = () => {
  const [entries, setEntries] = useState(defaultEntries);
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState('Kylie'); // Default to Kylie
  const [isSpinning, setIsSpinning] = useState(false);

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

  // Update selectedWinner when entries change - but keep special options (Kylie, __RANDOM__)
  React.useEffect(() => {
    const specialOptions = ['__RANDOM__', 'Kylie'];
    if (entries.length > 0 && !specialOptions.includes(selectedWinner) && !entries.includes(selectedWinner)) {
      setSelectedWinner(entries[0]);
    }
  }, [entries, selectedWinner]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d14]">
      <Header />
      
      <div className="flex-1 flex">
        {/* Left Side - Floating Button */}
        <div className="w-16 flex flex-col items-center pt-6">
          <button className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-200 hover:shadow-blue-500/40">
            <Pencil className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Ad placeholder - Left */}
          <div className="px-4 py-3 text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-400 transition-colors">
                <Flag className="w-4 h-4" />
                Report bad ad
              </span>
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-400 transition-colors">
                Close ads
                <X className="w-4 h-4" />
              </span>
            </div>
          </div>
          
          {/* Wheel Section */}
          <div className="flex-1 flex items-center justify-center py-6">
            <SpinningWheel
              entries={entries}
              onSpinEnd={handleSpinEnd}
              selectedWinner={selectedWinner}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
            />
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-96 p-5">
          <Sidebar
            entries={entries}
            setEntries={setEntries}
            results={results}
          />
        </div>
      </div>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Manage Output Section - At the very bottom */}
      <ManageOutputSection
        entries={entries}
        selectedWinner={selectedWinner}
        setSelectedWinner={setSelectedWinner}
      />
      
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
