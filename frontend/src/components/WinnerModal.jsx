import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { X, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const WinnerModal = ({ isOpen, onClose, winner, onRemove }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isOpen && winner) {
      // Trigger confetti
      const duration = 4000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // Confetti from left side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500']
        });
        
        // Confetti from right side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500']
        });
      }, 250);

      // Play clapping sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }

      return () => clearInterval(interval);
    }
  }, [isOpen, winner]);

  return (
    <>
      {/* Hidden audio element for clapping sound */}
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3"
        preload="auto"
      />
      
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-transparent border-0 shadow-2xl">
          <div className="rounded-lg overflow-hidden">
            {/* Yellow Header */}
            <div className="bg-yellow-400 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                We have a winner!
              </h2>
            </div>
            
            {/* Dark Body */}
            <div className="bg-gray-900 px-8 py-10">
              {/* Winner Name */}
              <p className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
                {winner}
              </p>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    onRemove(winner);
                    onClose();
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WinnerModal;
