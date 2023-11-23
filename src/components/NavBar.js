import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { DribbbleIcon, GithubIcon, LinkedInIcon, PinterestIcon, TwitterIcon } from "./Icons";
import {motion} from "framer-motion";

const CustomLink = ({ href,title, className = "" }) => {
  const router=useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block  bg-dark absolute left-0 -bottom-0.5 group-hover:w-full duration-300 ease transition-[width]
        ${router.asPath === href ? "w-full" : "w-0"} `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const NavBar = () => {
  return (
    <>
      <header className="w-full px-32 py-8 font-medium flex item-center justify-between">
        <nav>
          <CustomLink href="/" title="Home" className="mr-4" />
          <CustomLink href="/about" title="About" className="mx-4" />
          <CustomLink href="/accomplish" title="Accomplishments" className="mx-4" />
          <CustomLink href="/media" title="Media" className="ml-4" />
          <CustomLink href="/article" title="BLogs" className="ml-4" />
        </nav>
        <nav className="flex items-center justify-center flex-wrap">
          <motion.a href="https://twitter.com" target="_blank"
          whileHover={{y:-2}}
          whileTap={{scale:0.9}}
          className="w-6 mr-3"
          >
            <TwitterIcon/>
          </motion.a>
          <motion.a href="https://twitter.com" target="_blank"
            whileHover={{y:-2}}
            whileTap={{scale:0.9}}
            className="w-6 mx-3"
            >
            <DribbbleIcon/>
          </motion.a>
           <motion.a href="https://twitter.com" target="_blank"
             whileHover={{y:-2}}
             whileTap={{scale:0.9}}
             className="w-6 mx-3"
             >
            <GithubIcon/>
          </motion.a>
          <motion.a href="https://twitter.com" target="_blank"
            whileHover={{y:-2}}
            whileTap={{scale:0.9}}
            className="w-6 mx-3"
            >
            <LinkedInIcon/>
          </motion.a>
          <motion.a href="https://twitter.com" target="_blank"
            whileHover={{y:-2}}
            whileTap={{scale:0.9}}
            className="w-6 ml-3"
          >
            <PinterestIcon/>
          </motion.a>
        </nav>
        <div className="absolute left-[50%] top-2 translate-x-[-50%]">
          <Logo />
        </div>
      </header>
    </>
  );
};

export default NavBar;
