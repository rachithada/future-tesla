import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MenuPage({ isOpen, onClose }) {
  const wheelContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const contentRef = useRef(null);

  // Each item now has: text, href, x, y, angle (optional), offset (fallback)
  const menuItems = [
    { text: "VECHILES", href: "/vechiles", angle: 390, x: -30, y: 25 },
    { text: "ENERGY", href: "/energy", angle: 310, x: -20, y: 44 },
    { text: "CHARGING", href: "/charging", angle: 230, x: 20, y: 44 },
    { text: "DISCOVER", href: "/discover", angle: 150, x: 13, y: -5 },
    { text: "SHOP", href: "/shop", angle: 80, x: 10, y: -3 },
  ];

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    if (
      wheelContainerRef.current &&
      scrollContainerRef.current &&
      contentRef.current
    ) {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      gsap.to(wheelContainerRef.current, {
        rotation: 360 * 3,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          scroller: scrollContainerRef.current,
        },
      });
    }

    return () => {
      document.body.style.overflow = "auto";
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const centerX = 410;
  const centerY = 390; // shifted slightly up
  const radius = 350; // adjust for better alignment

  // helper: convert angle (deg) → percentage of path length
  const angleToOffset = (angle) => {
    // 0° = right, 90° = bottom, 180° = left, 270° = top
    const normalized = ((angle % 360) + 360) % 360; 
    return `${(normalized / 360) * 100}%`;
  };

  return (
    <div className="h-screen w-screen bg-black fixed top-0 left-0 z-[600]">
      <div
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div ref={contentRef} className="h-[200vh] relative">
          {/* Wheel + menu container */}
          <div
            ref={wheelContainerRef}
            className="fixed bottom-[-430px] left-[550px] w-[820px] h-[820px]"
            style={{ transformOrigin: "50% 50%" }}
          >
            {/* Wheel Image */}
            <img
              src="/models/car_wheel.webp"
              alt="wheel"
              className="w-full h-full"
            />

            {/* Curved Menu Items */}
            <svg
              width="1200"
              height="1200"
              viewBox="0 0 1200 1200"
              className="absolute top-0 left-0 pointer-events-none"
            >
              <defs>
                <path
                  id="circlePath"
                  d={`
                    M ${centerX - radius},${centerY}
                    a ${radius},${radius} 0 1,1 ${radius * 2},0
                    a ${radius},${radius} 0 1,1 -${radius * 2},0
                  `}
                />
              </defs>

              {menuItems.map((item, index) => (
                <g key={index} transform={`translate(${item.x}, ${item.y})`}>
                  <text
                    fill="white"
                    fontSize="58"
                    className=" hover:fill-blue-400 transition-colors cursor-pointer font-extrabold oleo-script-bold"
                  >
                    <textPath
                      href="#circlePath"
                      startOffset={
                        item.angle
                          ? angleToOffset(item.angle)
                          : item.offset || "0%"
                      }
                      textAnchor="middle"
                      onClick={() => (window.location.href = item.href)}
                    >
                      {item.text}
                    </textPath>
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
