import Head from "next/head";
import React, { useRef, useEffect } from "react";
import Animated from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import profilePic from "../../public/sorel-mizc/s-3.jpeg";
import Image from "next/image";
import { useMotionValue, useInView, useSpring } from "framer-motion";
import NavBar from "@/components/NavBars";
import TransitionEffect from "@/components/transition";

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

const About = () => {
  return (
    <>
      <Head>
        <title> Sorel-Mizzi | About Page </title>
        <meta name="description" content="any description" />
      </Head>
      <NavBar/>
      <main className="flex w-full  flex-col items-center justify-center dark:text-dark">
      <TransitionEffect/>
        <Layout className="pt-16">
       
          <Animated text=" Passion Fuels Purpose! " className="mb-16 dark:text-light" />
          <div className="grid w-full  min-h-screen
           grid-cols-8 gap-16 justify-items-center p-20
           bg-gradient-to-b from-gray-100 to-[#a5a2a2]
            md:ml-auto mr-auto  md:p-8 xs:p-4 xs:col-span-2">
               <div className="col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-4 md:order-1 lg:col-span-8 xs:col-span-7">
              <div className="absolute  top-0 -right-3 -z-10  rounded-[2rem] bg-dark" />
              <Image 
                style={{height:"60vh"}}
                src={profilePic}
                alt="nuamanali "
                layout="fixed"
                className="w-full h-full  rounded-2xl"
              />
            </div>
            <div className="col-span-4 flex flex-col items-start  md:order-2 lg:col-span-8 xs:col-span-7">
              <h2 className="mb-12  lg:mt-8 text-4xl font-bold uppercase text-dark/75  dark:text-dark">
                Sorel{"'"}s Story
              </h2>
              <p className="font-medium  m-b-4  2xl:mb-6 text-3xl xs:text-base md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl 2xl:mt-18">
                Sorel Mizzi, born April 16th, 1986, is a Canadian professional
                poker player. Having learned Texas Hold &apos;Em and
                establishing his online presence when he was 19, Sorel has
                devoted several years of his life to mastering the art of poker,
                and his success speaks to just how well he has accomplished that
                goal.
              </p>
              <p className="font-medium mt-6 mb-4 2xl:mt-12 2xl:mb-6 text-3xl xs:text-base md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl 2xl:mt-18">
                At one point, Sorel was ranked as the number one online poker
                player in the world, playing primarily under the monikers
                “Imper1um” and “Zangbezan24.” In 2010, Sorel picked up
                sponsorship by online poker room Titan Poker, and became the
                leader of their Pro Team.
                </p>
                <p className="font-medium mt-6 2xl:mt-12 text-3xl xs:text-base md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl 2xl:mt-18">
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
      
    </>
  );
};

export default About;
