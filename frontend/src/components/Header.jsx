import React from 'react';
import { Settings, FileText, FolderOpen, Save, Share2, Search, Maximize2, ChevronDown, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-green-400 to-blue-500 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <span className="text-lg font-semibold text-gray-800">wheelofnames.com</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1">
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Settings className="w-4 h-4" />
          <span>Customize</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <FileText className="w-4 h-4" />
          <span>New</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <FolderOpen className="w-4 h-4" />
          <span>Open</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Save className="w-4 h-4" />
          <span>Save</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Search className="w-4 h-4" />
          <span>Gallery</span>
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Maximize2 className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <span>More</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Globe className="w-4 h-4" />
          <span>English</span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
