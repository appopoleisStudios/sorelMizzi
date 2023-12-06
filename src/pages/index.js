import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import profilePic from "../../public/images/profile/developer-pic-1.png";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  MoonIcon,
  SunIcon,
  TwitterIcon,
} from "../components/Icons";
import { motion } from "framer-motion";
import useThemeswithcer from "../components/hooks/useThemeswithcer";
import Transition from "@/components/transition";
import TransitionEffect from "@/components/transition";

const inter = Inter({ subsets: ["latin"] });
const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block  bg-dark absolute left-0 -bottom-0.5 group-hover:w-full duration-300 ease transition-[width]
        ${router.asPath === href ? "w-full" : "w-0"} dark:bg-light `}
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
      className={`${className} relative group text-light dark:text-dark my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block  bg-light dark:bg-black absolute left-0 -bottom-0.5 group-hover:w-full duration-300 ease transition-[width]

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
  const [mode,setMode]  = useThemeswithcer();


  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const apiUrl = "http://3.85.142.45:8000/api/statistics";

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
      <TransitionEffect/>
      <header className="w-full p-12 py-8 font-medium flex item-center justify-between relative dark:text-light">
        <button
          className=" flex-col justify-center items-center hidden lg:flex "
          onClick={handleClick}
        >
          <span
            className={`bg-dark dark:bg-light block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-dark dark:bg-light block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-dark dark:bg-light block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>

        <div className="w-full flex justify-between items-center lg:hidden dark:text-light">
          <nav>
            <CustomLink href="/" title="Home" className="mr-4 " />
            <CustomLink href="#about" title="About" className="mx-4" />
            <CustomLink
              href="#accomplish"
              title="Accomplishments"
              className="mx-4"
            />
            <CustomLink href="#media" title="Media" className="ml-4" />
            <CustomLink href="#blog" title="Blogs" className="ml-4" />
          </nav>
          <nav className="flex items-center justify-center flex-wrap">
            <motion.a
              href="https://twitter.com"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3"
            >
              <TwitterIcon />
            </motion.a>
           
            
            
            
            
            <button
             onClick={() => setMode(mode === "light" ? "dark" : "light")}
             className={`ml-3 flex items-center justify-center rounded-full p-1
             ${mode === "light" ? "bg-dark text-light":"bg-light text-dark"}`}
            >
              {
                mode === "dark"?
                <SunIcon className={"fill-dark"}/>:
                <MoonIcon className={"fill-dark"}/>
              }
            </button>
          </nav>
        </div>

        {isOpen ? (
          <motion.div
            initial={{scale:0,opacity:0,x:"-50%",y:"-50%"}}
            animate={{scale:1,opacity:1}}
            className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
          >
            <nav className="flex items-center flex-col justify-center">
           
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
                title="Blogs"
                className=""
                toggle={handleClick}
              />
            </nav>
            <nav className="flex items-center justify-center flex-wrap">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-6 mr-3 sm:mx-1"
              >
                <TwitterIcon />
              </motion.a>
              
              
              
            </nav>
          </motion.div>
        ) : null}
        {/* <div className="absolute left-[50%] top-2 translate-x-[0%] lg:translate-x-[-50%] ">
          <Logo />
        </div> */}
       
      </header>
      <main className="flex items-center p-8 text-dark w-full min-h-screen dark:text-light xs:p-4">
        <Layout className="pt-0 md:pt-16 sm-pt-8">
          <div className="flex items-center justify-between w-full md:block">
            <div className="w-1/2 lg:w-0 md:w-full">
              <Image
                src={profilePic}
                alt="Nuamanali"
                className="w-full   md:inline-block md:w-full"
              />
            </div>
            <div className="w-1/2 flex justify-center items-center h-88 bg-gray-100 p-4 dark:bg-dark lg:w-full md:w-full">
              <div className=" flex flex-col items-center">
                <AnimatedText
                  text="PROFESSIONAL POKER PLAYER."
                  className="!text-6xl !text-center 
                         xl:!text-5xl lg:text-6x1 md:text-5x1 sm:text3x1 dark:text-light"
                />
                <p className="my-4 text-xl font-semibold">Sorel Mizzi</p>
                <div className="flex flex-row items-center justify-center gap-4 mt-2 sm:flex sm:justify-center h-auto">
                  <div className="bg-white p-2 pt-8 rounded-lg shadow-lg text-center w-full h-64 sm:w-1/2 sm:h-72  dark:bg-dark  ">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-light">
                      Success Story
                    </h2>
                    <div className="h-28 xs:h-36">
                      <p>
                        More than just a poker face, see how Sorel Mizzi got his
                        career started, and taken to get to where he is today.
                      </p>
                    </div>
                    <Link
                      href="/about"
                      className="inline-block text-white bg-red-500 hover:bg-red-700 font-medium py-2 px-4 rounded-full transition-colors mt-2"
                      target="_blank"
                    >
                      My Story
                    </Link>
                  </div>
                  <div className="bg-white p-2 pt-8 rounded-lg shadow-lg text-center w-full h-64 sm:w-1/2 sm:h-72 sm:mt-0  dark:bg-dark ">
                    <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-light">
                      Accomplishments
                    </h2>
                    <div className="h-28 xs:h-36">
                      <p>
                        Sorel Mizzi has celebrated an accomplished career, and
                        continues to rack up wins.
                      </p>
                    </div>
                    <Link
                      href="/accomplish"
                      className="inline-block text-white bg-red-500 hover:bg-red-700 font-medium py-2 px-4 rounded-full transition-colors mt-2"
                    >
                      Read More
                    </Link>
                  </div>
                </div>

                {/* <div className="flex justify-center flex-row  items-center  gap-4 mt-2   sm:block h-auto ">
          <div className="bg-white p-2 pt-8 rounded-lg shadow-lg text-center w-1/2 h-full">
            <h2 className="text-lgfont-semibold mb-4 text-gray-700">Success Story</h2>
            <p className="mb-4 text-14
            ">
              More than just a poker face, see how Sorel Mizzi got his career started, and what it’s taken to get to where he is today.
            </p>
            <Link href="/about" className="inline-block text-white bg-red-500 hover:bg-red-700 font-medium py-2 px-4 rounded-full transition-colors mt-2" target="_blank">
                My Story
            </Link>
          </div>
          <div className="bg-white p-2 pt-8  rounded-lg shadow-lg text-center w-1/2 h-full sm:mt-4">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Accomplishments</h2>
            <p className="mb-16 ">
              Sorel Mizzi has celebrated an accomplished career, and continues to rack up wins.
            </p>
          <Link href="/accomplish" className="text-indigo-600 hover:text-indigo-800  font-semibold ">
                Read More
            </Link>
          </div>
        </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-dark dark:text-light lg:mt-20">
              <h2 className="text-2xl text-red-600 font-bold mb-4">
                Current Statistics
              </h2>
              {stats &&
                Array.isArray(stats.rankings) && ( // Check if stats and stats.rankings are available
                  <ul>
                    <li className="mb-2">
                      Total Earnings:{" "}
                      <span className="font-semibold">${stats.earnings}</span>
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
                    <li>
                      Popularity:{" "}
                      <span className="font-semibold">
                        ${stats.popularity}th
                      </span>
                    </li>
                  </ul>
                )}
            </div>
          </div>
        </Layout>
      </main>

      <div className="p-8 xs:p-4 md:p-8" id="about">
        <div className="flex items-center justify-between m-6">
          <AnimatedText
            text="ABOUT"
            className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl dark:text-light"
          />
        </div>
        <div className="m-6 text-lg  pl-20 pr-20 md:pl-0 md:pr-0 dark:text-light">
          <p>
            Sorel Mizzi, born April 16th, 1986, is a Canadian professional poker
            player. Having learned Texas Hold Em and establishing his online
            presence when he was 19, Sorel has devoted several years of his life
            to mastering the art of poker, and his success speaks to just how
            well he has accomplished that goal.
          </p>
        </div>
        <div className="m-6 flex items-center justify-center">
          <Link
            href={"/about"}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150"
            
          >
            See More
          </Link>
        </div>
      </div>

      <div className="p-8 xs:p-4 md:p-8" id="accomplish">
        <div className="flex items-center justify-between m-6">
          <AnimatedText
            text="ACCOMPLISH"
            className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl dark:text-light"
          />
        </div>
        <div className="m-6 text-lg  pl-20 pr-20 md:pl-0 md:pr-0 dark:text-light">
          <p>
            Sorel Mizzi has a track record that expresses just how talented he
            is. He took first place at the Wynn Classic and then followed it up
            by securing his first victories as Titan Team captain during EPT
            Snowfest with two event wins. Sorel also won a SCOOP title,
            pocketing $118,500 for 1st place in event #32 and second in the WPT
            High-Roller event. In 2011, Mizzi topped the FTOPS XX leaderboard
            after cashing in 17 of the series 45 events and earning 1,365
            points.
          </p>
        </div>
        <div className="m-6 flex items-center justify-center" >
          <Link
            href={"/accomplish"}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            See More
          </Link>
        </div>
      </div>

      <div className="p-8 xs:p-4 md:p-8" id="media">
        <div className="flex items-center justify-between m-6">
          <AnimatedText
            text="MEDIA"
            className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl dark:text-light"
          />
        </div>
        <div className="aspect-w-16 aspect-h-9  pl-20 pr-20 md:pl-0 md:pr-0">
    <iframe
      width="560"
      height="560"
      src="https://www.youtube.com/embed/LJJiy72N0ts?si=mNsoQyHc-nPl8sZq"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
     className="w-full"
    ></iframe>
  </div>
        <div className="m-6 flex items-center justify-center">
          <Link
            href={"/media"}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150"
            
          >
            See More
          </Link>
        </div>
      </div>

      <div className="p-8 xs:p-4 md:p-8" id="blog">
        <div className="flex justify-between m-6">
          <AnimatedText
            text="BLOG"
            className="text-6xl xl:text-5xl md:text-4xl sm:text-3xl dark:text-light"
          />
        </div>
        <div className="m-6 text-lg  pl-20 pr-20 md:pl-0 md:pr-0 dark:text-light">
          <p>
            Sorel Mizzi writes about his experiences in his personal life as
            well as his professional poker career.
          </p>
        </div>
        <div className="m-6 flex items-center justify-center">
          <Link
            href={"/blog"}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150"
           
          >
            See More
          </Link>
        </div>
      </div>
    </>
  );
}
