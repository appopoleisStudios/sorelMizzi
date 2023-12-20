import React, { useState } from "react";
import Link from "next/link";
import arrow from "../../public/sorel-mizc/right-arrow.png";
import fullarrow from "../../public/sorel-mizc/fullright-arrow.png";
import Image from "next/image";

const Hoverbtn = ({ link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      href={link || "/"} 
      className="inline-block px-4 py-1 text-white rounded-full overflow-hidden relative group transition-all duration-500 ease-linear"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Golden background that expands on hover */}
      <span className="absolute right-0 left-0 top-0 bottom-0 w-10 h-full bg-gradient-to-r from-gold via-darkyellow  to-darkyellow rounded-full group-hover:w-full transition-all duration-500 ease-linear"></span>


      <span className="relative flex items-center">
        {/* "See More" text with margin */}
        <span
          className={`z-10 text-xl mb-1 opacity-100 ${
            isHovered ? "text-dark font-bold opacity-100" : "opacity-100"
          } duration-500 ease-linear transition-opacity ml-8`}
        >
         See More
        </span>

        {/* Conditional rendering of images based on hover state */}
        <Image
          className="w-3 h-4 text-black absolute"
          src={isHovered ? fullarrow : arrow}
          alt={isHovered ? "Full Arrow" : "Arrow"}
          width={2}
          height={2}
          style={{ transform: `scaleX(${isHovered ? 1.5 : 1})` }}
        />
      </span>
    </Link>
  );
};

export default Hoverbtn;
