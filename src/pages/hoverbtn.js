import React, { useState } from "react";
import Link from "next/link";


const Hoverbtn = ({link}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      href={link}
      className="inline-block px-4 py-1  text-white rounded-full overflow-hidden relative group transition-all duration-500 ease-linear"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Golden background that expands on hover */}
      <span className="absolute right-0 left-0 top-0 bottom-0 w-10 h-full bg-gold rounded-full group-hover:w-full transition-all duration-500 ease-linear"></span>

      <span className="relative flex items-center">
        {/* "See More" text with margin */}
        <span
          className={`z-10 text-xl opacity-100 ${
            isHovered ? "text-dark font-bold opacity-100" : "opacity-100"
          } duration-500 ease-linear transition-opacity ml-8`}
        >
          See more
        </span>

        {/* Conditional rendering of SVG based on hover state */}
        {isHovered ? (
          <svg
          className="w-6 h-4 text-black absolute"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M4 12h24M20 5l7 7-7 7"
          />
        </svg>
        ) : (
          <svg
            className="w-4 h-4 text-black absolute"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M4 5l7 7-7 8"
            />
          </svg>
        )}
      </span>
    </Link>
  );
};

export default Hoverbtn;
