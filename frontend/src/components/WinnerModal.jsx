import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { X, Trash2 } from 'lucide-react';

const WinnerModal = ({ isOpen, onClose, winner, onRemove }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
        <div className="flex flex-col items-center py-8">
          {/* Celebration Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-green-400 to-blue-500 flex items-center justify-center mb-6 animate-pulse">
            <div className="w-10 h-10 bg-white rounded-full"></div>
          </div>
          
          {/* Winner Text */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">We have a winner!</h2>
          <p className="text-5xl font-bold text-blue-600 mb-8">{winner}</p>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onRemove(winner);
                onClose();
              }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal;
