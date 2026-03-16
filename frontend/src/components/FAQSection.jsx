import React from 'react';
import { faqData } from '../data/mock';

const FAQSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#0d0d14] to-[#080810] py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#1e1e2e]/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/30 hover:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Wheel icon */}
                <div className="w-8 h-8 rounded-lg flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#1a1a2e" />
                    <path d="M12 0 A12 12 0 0 1 24 12 L12 12 Z" fill="#3498db" />
                    <path d="M24 12 A12 12 0 0 1 12 24 L12 12 Z" fill="#e74c3c" />
                    <path d="M12 24 A12 12 0 0 1 0 12 L12 12 Z" fill="#f1c40f" />
                    <path d="M0 12 A12 12 0 0 1 12 0 L12 12 Z" fill="#27ae60" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {faq.title}
                </h3>
              </div>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line pl-12">
                {faq.content}
              </div>
              {faq.title === "Is the wheel truly random?" && (
                <div className="pl-12 mt-4">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-200 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg">
                    Run 10,000 Spins
                  </button>
                </div>
              )}
              {faq.title === "Can I close the ads?" && (
                <div className="pl-12 mt-3">
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                    Ads policy →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
