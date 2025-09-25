import React, { useState, useEffect } from "react";
import MenuPage from "../pages/MenuPage";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav
        id="main-navbar"
        className={`h-10 w-screen flex justify-center items-center px-6 sm:px-10 fixed top-0 z-700 transition-colors duration-300 ${
          menuOpen ? "bg-black" : "bg-gray-900"
        }`}
        style={{ cursor: "none", position: "relative" }}
        onMouseEnter={() => setShowCursor(true)}
        onMouseLeave={() => setShowCursor(false)}
      >
        {/* Tesla SVG (responsive size) */}
        <svg
          viewBox="0 0 342 35"
          xmlns="http://www.w3.org/2000/svg"
          className={`cursor-none ${
            menuOpen ? "text-white" : "text-gray-300"
          } h-3 sm:h-4 md:h-5 lg:h-5`} // Tesla logo color
        >
          <path
            fill="currentColor"
            d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7M308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7"
          />
        </svg>

        {/* Hamburger (responsive size) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute flex flex-col justify-between items-center right-8 cursor-none
                     w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-5" // responsive sizes
        >
          <span
            className={`block h-0.5 w-full transition duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-2 sm:translate-y-3 bg-white" : "bg-gray-300"
            }`} // Changed to bg-gray-300 when menu is closed
          />
          <span
            className={`block h-0.5 w-full transition duration-300 ease-in-out ${
              menuOpen ? "opacity-0 bg-white" : "opacity-100 bg-gray-300"
            }`} // Changed to bg-gray-300 when menu is closed
          />
          <span
            className={`block h-0.5 w-full transition duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-2 sm:-translate-y-3 bg-white" : "bg-gray-300"
            }`} // Changed to bg-gray-300 when menu is closed
          />
        </button>

        {/* Custom cursor circle (only inside navbar) */}
        {showCursor && (
          <div
            style={{
              position: "absolute",
              top: cursorPos.y - 15,
              left: cursorPos.x - 15,
              width: 30,
              height: 30,
              borderRadius: "50%",
              pointerEvents: "none",
              backgroundColor: "white",
              mixBlendMode: "difference",
              zIndex: 9999,
              transition: "background-color 0.3s ease",
            }}
          />
        )}
      </nav>

      {/* Fullscreen Menu */}
      <MenuPage isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}