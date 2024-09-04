// SideNavbar.tsx
import React from "react";

interface SideNavbarProps {
  isOpen: boolean;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed h-full bg-[#7c3732] w-64 shadow-md z-30 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0`}
    >
      <nav>
        <ul>
          <li className="px-6 py-2">
            <a href="/home" className="text-gray-300 hover:text-white">
              Home
            </a>
          </li>
          <li className="px-6 py-2">
            <a href="/about" className="text-gray-300 hover:text-white">
              About
            </a>
          </li>
          <li className="px-6 py-2">
            <a href="/services" className="text-gray-300 hover:text-white">
              Services
            </a>
          </li>
          <li className="px-6 py-2">
            <a href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
