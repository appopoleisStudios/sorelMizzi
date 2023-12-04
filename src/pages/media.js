import Animated from "@/components/AnimatedText";
import React from "react";
import s1 from "../../public/sorel-mizc/s-1.jpg";
import s2 from "../../public/sorel-mizc/s-2.jpg";
import s3 from "../../public/sorel-mizc/s-3.jpeg";

import s5 from "../../public/sorel-mizc/s-5.jpg";
import s6 from "../../public/sorel-mizc/s-6.jpg";
import s7 from "../../public/sorel-mizc/s-7.jpg";
import s8 from "../../public/sorel-mizc/s-8.jpg";
import s9 from "../../public/sorel-mizc/s-9.jpeg";
import s10 from "../../public/sorel-mizc/s-10.jpg";

import Image from "next/image";

const media = () => {
  const impMedia = [s1, s2, s3, , s5, s6, s7, s8, s9, s10];

  return (
    <>
      <Animated text=" Media " className="mb-16 dark:text-light" />
      <div className="bg-gradient-to-b from-gray-100 to-[#403e3e] p-4 min-h-screen">
        <div className="flex flex-wrap justify-center gap-4">
          {impMedia.map((img, index) => (
            <div
              key={index}
              className="w-[400px] h-[400px] overflow-hidden relative mb-4"
            >
              <Image
                src={img}
                alt={`Image ${index}`}
                layout="fill" // Fills the parent container
                objectFit="cover" // Image will cover the entire area of the container
                className="rounded-md" // Add rounded corners if needed
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default media;
