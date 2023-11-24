import Head from "next/head";
import React, { useRef, useEffect } from "react";
import Animated from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import profilePic from "../../public/images/profile/developer-pic-2.jpg";
import Image from "next/image";
import { useMotionValue, useInView, useSpring } from "framer-motion";
const accomplish = () => {
  return (
    <>
      <Head>
        <title> Accomplishment </title>
        <meta name="description" content="any description" />
      </Head>
      <main className="flex w-full p-16  flex-col items-center justify-center">
        <Layout className="pt-16">
          <Animated text=" Passion Fuels Purpose! " className="mb-16" />
          <div className="grid w-full grid-cols-6 gap-16 justify-items-center ">
            <div className="col-span-3 flex flex-col items-start justify-start pl-5 md:order-2 md:col-span-8">
              <h2 className=" test-lg font-bold uppercase text-dark/75 pl-48 text-4xl mb-10 md:pl-0">
                Accomplishments
              </h2>
              <p className="font-medium pl-48 md:pl-0">
                Sorel Mizzi has a track record that expresses just how talented
                he is. He took first place at the Wynn Classic and then followed
                it up by securing his first victories as Titan Team captain
                during EPT Snowfest with two event wins. Sorel also won a SCOOP
                title, pocketing $118,500 for 1st place in event #32 and second
                in the WPT High-Roller event. In 2011, Mizzi topped the FTOPS XX
                leaderboard after cashing in 17 of the series 45 events and
                earning 1,365 points.
              </p>
            </div>
            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-4 md:order-1 md:col-span-8">
              <div className="absolute  top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark" />
              <Image
                src={profilePic}
                alt="nuamanali "
                className="w-full h-40vh  rounded-2xl"
              />
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

export default accomplish;
