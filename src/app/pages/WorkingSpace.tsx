import React, { useState } from "react";

const EX: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Navbar Button */}
      <button
        className="fixed left-0 top-0 z-50 p-4 bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      {/* Popup */}
      <div
        className={`fixed left-0 top-0 z-40 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navbar Content */}
        <div className="absolute left-0 top-0 w-64 bg-white h-full shadow-lg">
          {/* Add your navbar links or content here */}
          <ul className="py-4">
            <li className="px-6 py-2 hover:bg-gray-200">Link 1</li>
            <li className="px-6 py-2 hover:bg-gray-200">Link 2</li>
            <li className="px-6 py-2 hover:bg-gray-200">Link 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EX;