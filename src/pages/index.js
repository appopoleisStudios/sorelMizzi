import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import profilePic from "../../public/sorel-mizc/Landing-page.png";
import mainPic from "../../public/sorel-mizc/main-profil.png";
import sorelLogo from "../../public/sorel-mizc/Group 21.png";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon, TwitterIcon } from "../components/Icons";
import { motion } from "framer-motion";

import Transition from "@/components/transition";
import TransitionEffect from "@/components/transition";
import s6 from "../../public/sorel-mizc/s-6.jpg";
import s5 from "../../public/sorel-mizc/s-5.jpg";

const inter = Inter({ subsets: ["latin"] });
const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block  bg-light absolute left-0 -bottom-0.5 group-hover:w-full duration-300 ease transition-[width]
        ${router.asPath === href ? "w-full" : "w-0"}`}
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
      className={`${className} relative group text-white  my-2`}
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
export default function Home() {
  const [stats, setStats] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/statistics`;

  useEffect(() => {
    let isMounted = true; // Flag to indicate whether the component is mounted

    const fetchStats = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (isMounted) {
          setStats(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);
  console.log(stats, "fwnfnf");

  return (
    <>
      <Head>
        <title>Sorel Mizzi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TransitionEffect />
      <header className="w-full p-12 py-8 bg-black font-medium flex item-center justify-between relative ">
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
            className={`bg-yellow-500 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-yellow-500 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>

        <div className="w-full text-2xl bg-black flex justify-between items-center lg:hidden text-light">
          <nav>
            <CustomLink href="/" title="Home" className="mr-4 " />
            <CustomLink href="#about" title="About" className="mx-4" />
            <CustomLink
              href="#accomplish"
              title="Accomplishments"
              className="mx-4"
            />
            <CustomLink href="#media" title="Media" className="ml-4" />
            <CustomLink href="#blog" title="BLOG" className="ml-4" />
          </nav>
          <nav className="flex items-center justify-center flex-wrap">
            {/* <motion.a
              href="https://twitter.com"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3"
            >
              <TwitterIcon />
            </motion.a> */}

            {/* <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`ml-3 flex items-center justify-center rounded-full p-1
             ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}
            >
              {mode === "dark" ? (
                <SunIcon className={"fill-dark"} />
              ) : (
                <MoonIcon className={"fill-dark"} />
              )}
            </button> */}
          </nav>
        </div>

        {isOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
            className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-dark/90   rounded-lg backdrop-blur-md py-32"
          >
            <nav className="flex items-center flex-col justify-center ">
              <CustomMobileLink
                href="#"
                title="Home"
                className=""
                toggle={handleClick}
              />

              <CustomMobileLink
                href="#about"
                title="About"
                className=""
                toggle={handleClick}
              />

              <CustomMobileLink
                href="#accomplish"
                title="Accomplishments"
                className=""
                toggle={handleClick}
              />

              <CustomMobileLink
                href="#media"
                title="Media"
                className=""
                toggle={handleClick}
              />
              <CustomMobileLink
                href="#blog"
                title="BLOG"
                className=""
                toggle={handleClick}
              />
            </nav>
            <nav className="flex items-center justify-center flex-wrap">
              {/* <motion.a
                href="https://twitter.com"
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
      </header>
      <main className="flex items-center  bg-black text-white w-full min-h-screen xs:p-4">
        <Layout className=" pt-0 bg-black  ">
          <div className="flex items-center justify-between bg-black w-full md:block">
            <div className="w-full bg-black lg:w-0 ">
              <Image
                
                src={profilePic}
                alt="Nuamanali"
                className="w-full border-transparent  md:inline-block md:w-full"
              />
            </div>
            <div className="lg:w-full w-0 flex flex-col justify-center items-center r h-88   bg-black  md:w-full">
              <div>
                <Image
                  style={{ height: "auto", width: "auto" }}
                  src={mainPic}
                  className="border-transparent"
                />
              </div>
              <div>
                <Image
                  style={{ height: "auto", width: "auto" }}
                  src={sorelLogo}
                  className="border-transparent"
                />
              </div>
               
            </div> 
          </div>
          <div>
            <div className="bg-black p-14 shadow-lg ">
              <h2 className="text-6xl md:text-4xl text-center text-yellow-500 font-bold mb-4">
                Current Statistics
              </h2>
              {stats &&
                Array.isArray(stats.rankings) && ( // Check if stats and stats.rankings are available
                  <div className="flex  items-center justify-around  lg:block  md:text-4xl text-4xl xs:p-14 lg:p-20">
                    <div>
                      <ul>
                        <li className="mb-2">
                          Total Earnings:{" "}
                          <span className="font-semibold">
                            ${stats.earnings}
                          </span>
                        </li>
                        <li className="mb-2">
                          Poker National Rank:
                          <span className="font-semibold">
                            $
                            {stats.rankings.find(
                              (r) => r.rankingName === "Poker National"
                            )?.rankingPosition || "N/A"}
                            th
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li className="mb-2">
                          Poker International Rank:
                          <span className="font-semibold">
                            $
                            {stats.rankings.find(
                              (r) => r.rankingName === "Poker International"
                            )?.rankingPosition || "N/A"}
                            th
                          </span>
                        </li>
                        <li className="mb-2">
                          Popularity:{" "}
                          <span className="font-semibold">
                            ${stats.popularity}th
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </Layout>
      </main>

      <div className="p-20 bg-black xs:p-6 md:p-10" id="about">
        <div className="flex items-center justify-between m-6">
          <AnimatedText
            text="ABOUT"
            className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl text-yellow-500"
          />
        </div>
        <div className="flex items-center justify-between lg:block">
          <div className="w-full flex justify-center items-center">
            <Image
              style={{ height: "50vh", width: "auto" }}
              className="  xl:w-full  text-center"
              src={s6}
            />
          </div>
          -
          <div className="m-6 w-full text-3xl  h-full 2xl:text-lg text-light lg:pl-0 lg:pr-0   lg:m-0 ">
            <p className="mb-8">
              Sorel Mizzi, born April 16th, 1986, is a Canadian professional
              poker player. Having learned Texas Hold Em and establishing his
              online presence when he was 19, Sorel has devoted several years of
              his life to mastering the art of poker, and his success speaks to
              just how well he has accomplished that goal.
            </p>

            <Link
              href="/about"
              className="inline-block px-4 py-1  text-white rounded-full overflow-hidden relative group transition-all duration-500 ease-linear"
            >
              {/* Golden background that expands on hover */}
              <span className="absolute right-0 left-0 top-0 bottom-0 w-10 h-full bg-yellow-500 rounded-full group-hover:w-full transition-all duration-500 ease-linear"></span>

              <span className="relative flex items-center">
                {/* "See More" text with margin */}
                <span className="z-10 text-xl opacity-100 group-hover:text-black group-hover:font-bold group-hover:opacity-100 duration-300 ease-linear transition-opacity ml-8">
                  see more
                </span>

                {/* White Arrow Icon with adjusted margin */}
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
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-20 bg-black xs:p-6 md:p-10" id="accomplish">
        <div className="flex items-center justify-between m-6">
          <AnimatedText
            text="ACCOMPLISHMENT"
            className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl text-yellow-500"
          />
        </div>
        <div className="flex items-center justify-between lg:block lg:text-center">
          <div className="m-6 w-full text-3xl  h-full 2xl:text-lg text-light lg:pl-0 lg:pr-0   lg:m-0 ">
            <p className="mb-6">
              Sorel Mizzi has a track record that expresses just how talented he
              is. He took first place at the Wynn Classic and then followed it
              up by securing his first victories as Titan Team captain during
              EPT Snowfest with two event wins. Sorel also won a SCOOP title,
              pocketing $118,500 for 1st place in event #32 and second in the
              WPT High-Roller event.
            </p>
            <Link
              href="/accomplish"
              className="inline-block px-4 py-1  text-white rounded-full overflow-hidden relative group transition-all duration-500 ease-linear"
            >
              {/* Golden background that expands on hover */}
              <span className="absolute right-0 left-0 top-0 bottom-0 w-10 h-full bg-yellow-500 rounded-full group-hover:w-full transition-all duration-500 ease-linear"></span>

              <span className="relative flex items-center">
                {/* "See More" text with margin */}
                <span className="z-10 text-xl opacity-100 group-hover:text-dark group-hover:font-bold group-hover:opacity-100 duration-300 ease-linear transition-opacity ml-8">
                  see more
                </span>

                {/* White Arrow Icon with adjusted margin */}
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
              </span>
            </Link>
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              style={{ height: "50vh", width: "auto" }}
              className=" xl:w-full"
              src={s5}
            />
          </div>
        </div>
      </div>

      <div className="p-20 bg-black xs:p-6 md:p-10" id="media">
        <div className="flex items-center justify-between m-6">
          <AnimatedText
            text="MEDIA"
            className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl text-yellow-500"
          />
        </div>
        <div className="aspect-w-16 aspect-h-9   md:pl-0 md:pr-0">
          <iframe
            width="560"
            height="560"
            src="https://www.youtube.com/embed/LJJiy72N0ts?si=mNsoQyHc-nPl8sZq&autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full"
          ></iframe>
        </div>
        <div className="m-6 flex items-center justify-center">
          <Link
            href="/media"
            className="inline-block px-4 py-1  text-white rounded-full overflow-hidden relative group transition-all duration-500 ease-linear"
          >
            {/* Golden background that expands on hover */}
            <span className="absolute right-0 left-0 top-0 bottom-0 w-10 h-full bg-yellow-500 rounded-full group-hover:w-full transition-all duration-500 ease-linear"></span>

            <span className="relative flex items-center">
              {/* "See More" text with margin */}
              <span className="z-10 text-xl opacity-100 group-hover:text-black group-hover:font-bold group-hover:opacity-100 duration-300 ease-linear transition-opacity ml-8">
                see more
              </span>

              {/* White Arrow Icon with adjusted margin */}
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
            </span>
          </Link>
        </div>
      </div>

      <div className="p-20 bg-black xs:p-6 md:p-10" id="blog">
        <div className="flex justify-between m-6">
          <AnimatedText
            text="BLOG"
            className="text-6xl xl:text-5xl md:text-4xl sm:text-3xl text-yellow-500"
          />
        </div>
        <div className="m-6 text-lg text-center text-light pl-20 pr-20 md:pl-0 md:pr-0 ">
          <p>
            Sorel Mizzi writes about his experiences in his personal life as
            well as his professional poker career.
          </p>
        </div>
        <div className="m-6 flex items-center justify-center">
          <Link
            href="/blog"
            className="inline-block px-4 py-1  text-white rounded-full overflow-hidden relative group transition-all duration-500 ease-linear"
          >
            {/* Golden background that expands on hover */}
            <span className="absolute right-0 left-0 top-0 bottom-0 w-10 h-full bg-yellow-500 rounded-full group-hover:w-full transition-all duration-500 ease-linear"></span>

            <span className="relative flex items-center">
              {/* "See More" text with margin */}
              <span className="z-10 text-xl opacity-100 group-hover:text-black group-hover:font-bold group-hover:opacity-100 duration-300 ease-linear transition-opacity ml-8">
                see more
              </span>

              {/* White Arrow Icon with adjusted margin */}
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
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
