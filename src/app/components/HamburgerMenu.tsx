"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden w-full mt-4">
      {/* כפתור פתיחה/סגירה */}
      <button
        className="text-white focus:outline-none"
        aria-label="פתח תפריט"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FiX className="h-6 w-6" />
        ) : (
          <FiMenu className="h-6 w-6" />
        )}
      </button>

      {/* תפריט נפתח */}
      {isMenuOpen && (
        <nav className="flex flex-col gap-4 bg-[#093028] p-4 rounded-lg shadow-lg">
          <a href="/" className="hover:text-[#ff9770]">
            דף הבית
          </a>
          <a href="/about" className="hover:text-[#ff9770]">
            אודות
          </a>
          <a href="/contact" className="hover:text-[#ff9770]">
            צור קשר
          </a>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
