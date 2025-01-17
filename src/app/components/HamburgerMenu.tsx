"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden mt-1 relative ">
      {/* כפתור פתיחה/סגירה */}
      <button
        className="text-white focus:outline-none border-[#093028] border-2 bg-[#f3f2f2] rounded-md p-2"
        aria-label="פתח תפריט"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FiX className="h-6 w-6" />
        ) : (
          <FiMenu color="#093028" className=" h-6 w-6" />
        )}
      </button>

      {/* שכבת עמעום */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu} // סגירה בלחיצה על השכבה
        ></div>
      )}

      {/* תפריט נפתח */}
      <nav
        className={`fixed top-0 right-0 h-full bg-white w-64 p-6 shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-black focus:outline-none absolute top-4 left-4"
          onClick={toggleMenu}
        >
          <FiX className="h-6 w-6" />
        </button>
        <div className="flex flex-col mt-12 gap-6">
          <a href="/" className="hover:text-[#093028] text-lg">
            דף הבית
          </a>
          <a href="/about" className="hover:text-[#093028] text-lg">
            אודות
          </a>
          <a href="/products" className="hover:text-[#093028] text-lg">
            הזמנת משלוחים
          </a>
          <a href="/contact" className="hover:text-[#093028] text-lg">
            צור קשר
          </a>
        </div>
      </nav>
    </div>
  );
}

export default HamburgerMenu;
