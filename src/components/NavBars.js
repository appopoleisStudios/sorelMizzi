import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import {
  MoonIcon,
  PinterestIcon,
  SunIcon,
  TwitterIcon,
} from "./Icons";
import { motion } from "framer-motion";
import useThemeswithcer from "./hooks/useThemeswithcer";
import TransitionEffect from "./transition";

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block  bg-light text-light absolute left-0 -bottom-0.5 group-hover:w-full duration-300 ease transition-[width]
        ${router.asPath === href ? "w-full" : "w-0"}  `}
      >
        &nbsp;
      </span>
    </Link>
  );
};
const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };
  return (
    <button
      href={href}
      className={`${className} relative group text-light  my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block  bg-light  absolute left-0 -bottom-0.5 group-hover:w-full duration-300 ease transition-[width]

        ${router.asPath === href ? "w-full" : "w-0"} `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode,setMode]  = useThemeswithcer();


  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <TransitionEffect/>
      <header className="w-full p-12 py-8 font-medium flex item-center justify-between relative bg-black ">
        <button
          className=" flex-col justify-center items-center hidden lg:flex "
          onClick={handleClick}
        >
          <span
            className={`bg-yellow-500 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-yellow-500  block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-yellow-500 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>

        <div className="w-full text-2xl flex justify-between items-center lg:hidden text-light">
          <nav>
            <CustomLink href="/"  title="Home" className="mr-4 " />
            <CustomLink href="/about"  title="About" className="mx-4" />
            <CustomLink
              href="/accomplish"
              title="Accomplishments"
              className="mx-4"
            />
            <CustomLink href="/media" title="Media" className="ml-4" />
            <CustomLink href="/blog" title="Blog" className="ml-4" />
          </nav>
          <nav className="flex items-center justify-center flex-wrap">
            {/* <motion.a
              href="twitter.com/sorelmizzi"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3"
            >
              <TwitterIcon />
            </motion.a> */}
          
          </nav>
        </div>

        {isOpen ? (
          <motion.div
            initial={{scale:0,opacity:0,x:"-50%",y:"-50%"}}
            animate={{scale:1,opacity:1}}
            className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-dark/90 rounded-lg backdrop-blur-md py-32"
          >
            <nav className="flex items-center flex-col justify-center">
              
              <CustomMobileLink
                href="/"
                title="Home"
                className=""
                toggle={handleClick}
              />
              
              <CustomMobileLink
                href={'/about'}
                title="About"
                className=""
                toggle={handleClick}
              />
             
              
              <CustomMobileLink
                href="/accomplish"
                title="Accomplishments"
                className=""
                toggle={handleClick}
              />
         
              <CustomMobileLink
                href="/media"
                title="Media"
                className=""
                toggle={handleClick}
              />
              <CustomMobileLink
                href="/blog"
                title="Blog"
                className=""
                toggle={handleClick}
              />
            </nav>
            <nav className="flex items-center justify-center flex-wrap">
              {/* <motion.a
                href="twitter.com/sorelmizzi"
                target="_blank"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-6 mr-3 sm:mx-1"
              >
                <TwitterIcon />
              </motion.a> */}
              
              
              
            </nav>
          </motion.div>
        ) : null}
        {/* <div className="absolute left-[50%] top-2 translate-x-[0%] lg:translate-x-[-50%] ">
          <Logo />
        </div> */}
      </header>
    </>
  );
};

export default NavBar;
