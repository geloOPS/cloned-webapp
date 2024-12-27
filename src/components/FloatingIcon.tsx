import React, { useState } from "react";

const FloatingIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`fixed bottom-6 left-6 flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 z-50 transition-all ${
        isHovered ? "w-14 h-14" : "w-10 h-10"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isHovered ? "pointer" : "default" }} // Change cursor on hover
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        JL
      </span>
    </div>
  );
};

export default FloatingIcon;
