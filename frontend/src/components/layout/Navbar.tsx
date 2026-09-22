import React from 'react';
import Link from 'next/link';
import { Search, Bell } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 px-4 py-3 h-16 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-md"></div>
        <Link href="/" className="font-bold text-xl text-gray-900 tracking-tight">ConnectNow</Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search ConnectNow..." 
          className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-indigo-600 transition-colors relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden cursor-pointer">
          {/* Avatar Placeholder */}
          U
        </div>
      </div>
    </nav>
  );
};
