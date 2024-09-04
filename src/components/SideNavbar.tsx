import React, { useState } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

const SideNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 p-4 z-40 md:hidden border border-white rounded-full bg-[#bc1823] hover:bg-[#a3161f]"
      >
        {isSidebarOpen ? <MdClose size={24} color="#fff" /> : <HiMenuAlt1 size={24} color="#fff" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-[#bc1823] w-64 shadow-md z-30 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-700 bg-[#ffc0cb]">  
            <img src="/tblogo.png" alt="Your Logo" className="h-40 w-auto" />  
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-6 py-2">
              <a href="/home" className="text-gray-300 hover:text-white">Home</a>
            </li>
            <li className="px-6 py-2">
              <a href="/about" className="text-gray-300 hover:text-white">About</a>
            </li>
            <li className="px-6 py-2">
              <a href="/services" className="text-gray-300 hover:text-white">Services</a>
            </li>
            <li className="px-6 py-2">
              <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNavbar;
