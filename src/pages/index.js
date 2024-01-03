import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import profilePic from "../../public/sorel-mizc/landingSS.png";
import mainPic from "../../public/sorel-mizc/cards.png";
import sorelLogo from "../../public/sorel-mizc/logo.png";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon, TwitterIcon } from "../components/Icons";
import { motion } from "framer-motion";
import s6 from "../../public/sorel-mizc/s6.png";
import s5 from "../../public/sorel-mizc/s5.png";
import Background from "./backround";
import Hoverbtn from "./hoverbtn";
import TransitionEffect from "@/components/transition";

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
  const backgroundImage = "/sorel-mizc/backgroundmain.jpg";
  return (
    <>
      <Head>
        <title>Sorel Mizzi</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full p-8 bg-black font-medium flex item-center justify-between relative ">
        <button
          className=" flex-col justify-center items-center hidden lg:flex "
          onClick={handleClick}
        >
          <span
            className={`bg-yellow-500 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
          ></span>
          <span
            className={`bg-yellow-500 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"
              }`}
          ></span>
          <span
            className={`bg-yellow-500 block h-0.5 w-6 transition-all duration-300 ease-out rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
          ></span>
        </button>

        <div className="w-full text-2xl bg-black flex justify-between items-center lg:hidden text-light">
          <nav>
            <CustomLink href="/" title="Home" className="p-1 m-3" />
            <CustomLink href="#about" title="About" className="p-1 m-3" />
            <CustomLink
              href="#accomplish"
              title="Accomplishments"
              className="p-1 m-3"
            />
            <CustomLink href="#media" title="Media" className="p-1 m-3" />
            <CustomLink href="#blog" title="Blog" className="p-1 m-3" />
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
                title="Blog"
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
      <Background backgroundImage={backgroundImage}>
        <main className="flex items-center border-0  text-white w-full lg:p-8">
          <Layout className="   ">
            <div className="flex h-[100vh] items-center justify-between  w-full md:block">
              <div className="w-full h-[100vh] lg:w-0 lg:h-0">
                <Image
                  src={profilePic}
                  alt="Nuamanali"
                  className="w-full h-auto mr-4 border-transparent  md:inline-block md:w-full"
                />
              </div>
              <div className="hidden lg:flex flex-col justify-center items-center md:w-full">
                <div>
                  <Image
                    style={{ height: "auto", width: "auto" }}
                    src={mainPic}
                    className="border-transparent"
                  />
                </div>
                <div>
                  <Image
                    style={{ height: "auto", width: "70vw" }}
                    src={sorelLogo}
                    className="border-transparent"
                  />
                  <div
                    style={{
                      height: "2px",
                      backgroundColor: "#efefef",
                      margin: "48px auto 0",
                    }}
                  ></div>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "9vw",
                      textAlign: "left",
                      margin: "32px 0 0 0",
                    }}
                  >
                    PROFESSIONAL
                    <br />
                    <span class="text-style">POKER PLAYER</span>
                  </p>
                </div>
              </div>
            </div>

            <div className=" shadow-lg xs:text-start mt-4 lg:mt-44 md:mt-28 sm:mt-0">
              <h2 className="text-6xl md:text-4xl text-center text-gold font-bold mb-4">
                Current Statistics
              </h2>
              {stats &&
                Array.isArray(stats.rankings) && ( // Check if stats and stats.rankings are available
                  <div className="p-8 lg:p-0 flex  items-center justify-between  lg:block  md:text-3xl text-4xl  ">
                    <div>
                      <ul>
                        <li className="mb-2">
                          Total Earnings:{" "}
                          <span className="font-semibold">
                            ${stats.earnings.toLocaleString()}
                          </span>
                        </li>
                        <li className="mb-2">
                          Best Live Cash:{" "}
                          <span className="font-semibold">
                            ${stats.popularity.toLocaleString()}
                          </span>
                        </li>

                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li className="mb-2">
                          All Time Money List:{" "}
                          <span className="font-semibold">
                            {stats.rankings.find(
                              (r) => r.rankingName === "All Time Money List"
                            )?.rankingPosition || "N/A"}
                            nd
                          </span>
                        </li>
                        <li className="mb-2 mr-4">
                          Canada All Time Money List:{" "}
                          <span className="font-semibold">
                            {stats.rankings.find(
                              (r) => r.rankingName === "Canada All Time Money List"
                            )?.rankingPosition || "N/A"}
                            th
                          </span>
                        </li>

                      </ul>
                    </div>
                  </div>
                )}
            </div>
          </Layout>
        </main>
      </Background>

      <Background backgroundImage={backgroundImage}>
        <div className="p-8  xs:p-8" id="about">
          <div className="w-full flex items-center justify-between lg:flex-col lg:text-center">
            <div className="w-1/4 lg:w-full flex justify-center items-center">
              <Image
                style={{ height: "auto", width: "auto" }}
                className="xl:w-full text-center lg:h-auto lg:w-auto"
                src={s6}
              />
            </div>

            <div className="m-6 w-3/4 lg:w-full text-4xl 2xl:text-3xl xl:text-2xl   md:text-xl h-full  text-light lg:text-center  ">
              <AnimatedText
                text="ABOUT"
                className="text-6xl 2xl:text-5xl xl:text-3xl text-gold"
              />
              <p className="mb-4 text-justify">
                Sorel Mizzi, born April 16th, 1986, is a Canadian professional
                poker player. Having learned Texas Hold Em and establishing his
                online presence when he was 19, Sorel has devoted several years
                of his life to mastering the art of poker, and his success
                speaks to just how well he has accomplished that goal.
              </p>
              <Hoverbtn link={"/about"} />
            </div>
          </div>
        </div>

        <div className="p-8  xs:p-8  text-justify" id="accomplish">
          <div className="w-full flex items-center justify-between lg:flex-col lg:text-center">
            <div className="pr-4 w-3/4 lg:w-full text-4xl 2xl:text-3xl xl:text-2xl  md:text-xl h-full  text-light  lg:text-center">
              <AnimatedText
                text="ACCOMPLISHMENT"
                className="text-6xl 2xl:text-5xl xl:text-3xl text-gold"
              />
              <p className="mb-6 text-justify">
                Sorel Mizzi has a track record that expresses just how talented
                he is. He took first place at the Wynn Classic and then followed
                it up by securing his first victories as Titan Team captain
                during EPT Snowfest with two event wins. Sorel also won a SCOOP
                title, pocketing $118,500 for 1st place in event #32 and second
                in the WPT High-Roller event.
              </p>
              <Hoverbtn link={"/accomplish"} />
            </div>
            <div className="w-1/4 mr-8 lg:w-full flex justify-center items-center">
              <Image
                style={{ height: "auto", width: "auto" }}
                className=" xl:w-full ml-4 lg:h-auto lg:w-auto"
                src={s5}
              />
            </div>
          </div>
        </div>

        <div className="p-8  xs:p-8 md:p-10 text-justify" id="media">
          <div className="flex items-center justify-between m-6">
            <AnimatedText
              text="MEDIA"
              className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl text-gold"
            />
          </div>
          <div className="aspect-w-16 aspect-h-9  pr-6 md:pl-0 md:pr-0">
            <iframe
              width="560"
              height="560"
              src="https://www.youtube.com/embed/9yEmMFRz5Ew?si=7p-r0-cI9epMrpnV"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>
          <div className="m-6 flex items-center justify-center">
            <Hoverbtn link={"/media"} />
          </div>
        </div>

        <div className="p-8  xs:p-6 md:p-10 text-justify" id="blog">
          <div className="flex justify-between text-4xl m-6">
            <AnimatedText
              text="BLOG"
              className="text-6xl text-center xl:text-5xl md:text-4xl sm:text-3xl text-gold"
            />
          </div>
          <div className="m-6 text-4xl text-justify lg:text-center lg:text-3xl text-light px-44 md:pl-0 md:pr-0 ">
            <p>
              Sorel Mizzi writes about his experiences in his personal life as
              well as his professional poker career.
            </p>
          </div>
          <div className="m-6 flex items-center justify-center">
            <Hoverbtn link={"/blog"} />
          </div>
        </div>
      </Background>
    </>
  );
}
