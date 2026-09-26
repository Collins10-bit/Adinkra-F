import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/233244902287"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Adinkra Frontiers Ltd on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all group focus:outline-none focus:ring-3 focus:ring-[#25D366]/40"
    >
      <MessageSquare className="w-5 h-5 fill-white" />
      <span className="text-xs font-bold tracking-wide hidden sm:inline whitespace-nowrap">
        Chat on WhatsApp
      </span>
      {/* Pulse ping ring */}
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
      </span>
    </a>
  );
};
