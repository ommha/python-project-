import React from 'react';
import { Settings, FileText, FolderOpen, Save, Share2, Search, Maximize2, ChevronDown, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#1a1a2e" />
            <path d="M16 0 A16 16 0 0 1 32 16 L16 16 Z" fill="#3498db" />
            <path d="M32 16 A16 16 0 0 1 16 32 L16 16 Z" fill="#e74c3c" />
            <path d="M16 32 A16 16 0 0 1 0 16 L16 16 Z" fill="#f1c40f" />
            <path d="M0 16 A16 16 0 0 1 16 0 L16 16 Z" fill="#27ae60" />
          </svg>
        </div>
        <span className="text-lg font-semibold text-white">wheelofnames.com</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1">
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Settings className="w-4 h-4" />
          <span>Customize</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <FileText className="w-4 h-4" />
          <span>New</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <FolderOpen className="w-4 h-4" />
          <span>Open</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Save className="w-4 h-4" />
          <span>Save</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Search className="w-4 h-4" />
          <span>Gallery</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Maximize2 className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <span>More</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
          <Globe className="w-4 h-4" />
          <span>English</span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
