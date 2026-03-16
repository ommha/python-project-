import React from 'react';
import { faqData } from '../data/mock';

const FAQSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-gray-900/80 rounded-lg p-6 border border-gray-800">
            <div className="flex items-start gap-3 mb-4">
              {/* Wheel icon */}
              <div className="w-6 h-6 rounded-full flex-shrink-0 overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#1a1a2e" />
                  <path d="M12 0 A12 12 0 0 1 24 12 L12 12 Z" fill="#3498db" />
                  <path d="M24 12 A12 12 0 0 1 12 24 L12 12 Z" fill="#e74c3c" />
                  <path d="M12 24 A12 12 0 0 1 0 12 L12 12 Z" fill="#f1c40f" />
                  <path d="M0 12 A12 12 0 0 1 12 0 L12 12 Z" fill="#27ae60" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                {faq.title}
              </h3>
            </div>
            <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {faq.content}
            </div>
            {faq.title === "Is the wheel truly random?" && (
              <button className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                Run 10,000 Spins
              </button>
            )}
            {faq.title === "Can I close the ads?" && (
              <a href="#" className="text-blue-400 hover:underline text-sm mt-2 inline-block">
                Ads policy
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
