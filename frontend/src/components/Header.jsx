import React from 'react';
import { Settings, FileText, FolderOpen, Save, Share2, Search, Maximize2, ChevronDown, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#0d0d14] border-b border-gray-800/50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shadow-lg">
          <svg width="36" height="36" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="18" fill="#1a1a2e" />
            <path d="M18 0 A18 18 0 0 1 36 18 L18 18 Z" fill="#3498db" />
            <path d="M36 18 A18 18 0 0 1 18 36 L18 18 Z" fill="#e74c3c" />
            <path d="M18 36 A18 18 0 0 1 0 18 L18 18 Z" fill="#f1c40f" />
            <path d="M0 18 A18 18 0 0 1 18 0 L18 18 Z" fill="#27ae60" />
          </svg>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">wheelofnames.com</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1">
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Customize</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <FileText className="w-4 h-4" />
          <span className="text-sm">New</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <FolderOpen className="w-4 h-4" />
          <span className="text-sm">Open</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <Save className="w-4 h-4" />
          <span className="text-sm">Save</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <Search className="w-4 h-4" />
          <span className="text-sm">Gallery</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <Maximize2 className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <span className="text-sm">More</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200">
          <Globe className="w-4 h-4" />
          <span className="text-sm">English</span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
