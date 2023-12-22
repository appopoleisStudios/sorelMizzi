import Head from "next/head";
import React, { useRef, useEffect } from "react";
import Animated from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import profilePic from "../../public/sorel-mizc/s-3.jpeg";
import profile from "../../public/sorel-mizc/s-5.jpg";
import Image from "next/image";
import { useMotionValue, useInView, useSpring } from "framer-motion";
import NavBar from "@/components/NavBars";
import Background from "./backround";

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInview = useInView(ref);

  useEffect(() => {
    if (isInview) {
      motionValue.set(value);
    }
  }, [isInview, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      console.log(latest);
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};
const backgroundImage = "/sorel-mizc/backgroundmain.jpg";

const About = () => {
  return (
    <>
      <Head>
        <title> Sorels Story | About Page </title>
        <meta name="description" content="any description" />
      </Head>
      <NavBar />
      <Background backgroundImage={backgroundImage}>
        <main className="flex w-full  flex-col  justify-center ">

          <Layout className="pt-16">
            <Animated text="Sorel's Story" className="mb-12 xs:text-3xl text-center text-gold" />
            <div
              className="grid w-full  min-h-screen
           grid-cols-8 gap-10 justify-items-center p-20
            md:ml-auto mr-auto   md:p-8 xs:col-span-2 text-light"
            >
              <div className="col-span-3 relative h-max  p-4 md:order-1 lg:col-span-8 xs:col-span-8">
                <div className="absolute  top-0 -right-3 -z-10  rounded-[2rem] bg-black" />
                <Image
                  style={{ height: "50vh", width: "auto" }}
                  src={profilePic}
                  alt="not found"
                  layout="fixed"
                  className="w-full h-full "
                />
              </div>

              <div className="col-span-5 flex flex-col text-justify items-start  md:order-2 lg:col-span-8 xs:col-span-8">
                {/* <h2 className="mb-12  lg:mt-8 text-4xl font-bold uppercase text-dark/75  dark:text-dark">
                Sorel{"'"}s Story
              </h2> */}
                <p className="font-medium  mb-4   text-3xl xs:text-base md:text-2xl  2xl:mt-18">
                  Sorel Mizzi, born April 16th, 1986, is a Canadian professional
                  poker player. Having learned Texas Hold Em and
                  establishing his online presence when he was 19, Sorel has
                  devoted several years of his life to mastering the art of poker,
                  and his success speaks to just how well he has accomplished that
                  goal.
                </p>
                <p className="font-medium mt-4 mb-4  text-3xl 2xl:mt-6  md:text-2xl xs:text-base 2xl:mt-18">
                  At one point, Sorel was ranked as the number one online poker
                  player in the world, playing primarily under the monikers
                  “Imper1um” and “Zangbezan24.” In 2010, Sorel picked up
                  sponsorship by online poker room Titan Poker, and became the
                  leader of their Pro Team.
                </p>
                <p className="font-medium mt-6 2xl:mt-6 text-3xl xs:text-base md:text-2xl  2xl:mt-18">
                  Sorel has also taken part in live tournament poker, with matched
                  success to his online achievements. He has scored wins on the
                  European Poker Tour, at the Borgata Spring Poker Open, Festa al
                  Lago, and Wynn Classic. In addition, he has had success at high
                  roller events, such as the Grand Prix de Paris, WPT Vienna, and
                  the PartyPoker Premier League, and has consistently finished
                  well at the Aussie Millions.
                </p>
              </div>

              {/* <div className="col-span-2 flex flex-end items-end justify-center">
             bg-gradient-to-b from-gray-100 to-[#a5a2a2]
              <div className="flex flex-col items-end justify-center">
                <span className="inline-block text-7xl font-bold">
                  <AnimatedNumbers value={50} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75">
                  statisfied clients
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="inline-block text-7xl font-bold">40+</span>
                <h2 className="text-xl font-medium capitalize  text-dark/75">
                  Projects Completed
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="inline-block text-7xl font-bold">4+</span>
                <h2 className="text-xl font-medium capitalize  text-dark/75">
                  Years of experience
                </h2>
              </div>
            </div> */}
            </div>
          </Layout>
        </main>
      </Background>
    </>
  );
};

export default About;
