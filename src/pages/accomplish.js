import Head from "next/head";
import React, { useRef, useEffect, useState } from "react";
import Animated from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import s5 from "../../public/sorel-mizc/s-5.jpg";
import Image from "next/image";
import { useMotionValue, useInView, useSpring } from "framer-motion";
import NavBar from "@/components/NavBars";
import TransitionEffect from "@/components/transition";
const getOrdinalIndicator = (i) => {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};

const Accomplish = () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accomplishment`;
  const [accomplishments, setAccomplishments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        console.log(response, "hhh");
        const result = await response.json();
        console.log(result, "hhh");
        setAccomplishments(result);
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(accomplishments, "hsdfhdsfhdsh");
  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <>
      <Head>
        <title> Accomplishment </title>
        <meta name="description" content="any description" />
      </Head>
      <TransitionEffect />
      <NavBar />
      <main className="flex bg-black w-full p-16 lg:p-4 min-h-screen flex-col items-center  xs:p-4 ">
        <Layout>
          <Animated
            text=" Passion Fuels Purpose! "
            className="mb-12 text-center text-gold"
          />
          <div className="grid w-full h-30vh grid-cols-6 gap-16 justify-items-center ">
            <div className="col-span-3 flex flex-col items-start justify-start text-xl xl:order-2 xl:col-span-6 xs:col-span-6">
              <p className="font-medium  lg:pl-0 text-3xl text-light">
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
            <div className="col-span-3 relative h-max p-2 xl:order-1 xl:col-span-6 md:col-span-6 xs:col-span-6">
              <div className="absolute  top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-black" />
              <Image
                style={{ height: "50vh" ,width:"auto"}}
                src={s5}
                alt="nuamanali "
                layout="fixed"
                className="w-full h-30vh  "
                
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl mt-24 font-bold mb-4 text-gold text-center">
              In addition to these notable events, a few of his other wins are
              as follows:
            </h2>

            {/* Use Tailwind classes for responsive grid layout */}
            <div className="grid h-auto grid-cols-2 text-light lg:grid-cols-1">
              {accomplishments.map((acc) => (
                <div key={acc.id} className="mb-4">
                  <p className="text-sm font-medium">
                    {getYearFromDate(acc.accomplishmentDate)} - {acc.title} -{" "}
                    {getOrdinalIndicator(acc.position)} - $
                    {acc.prize.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-medium mt-12 text-center text-gold">
              This list is not all-inclusive, and continues to grow as Sorel
              puts his skills to good use in the world of poker.
            </p>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Accomplish;
