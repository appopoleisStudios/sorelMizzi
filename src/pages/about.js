import Head from "next/head";
import React,{useRef,useEffect} from "react";
import Animated from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import profilePic from "../../public/images/profile/developer-pic-2.jpg";
import Image from "next/image";
import { useMotionValue,useInView, useSpring } from "framer-motion";


const AnimatedNumbers = ({value})=>{
  const ref = useRef(null); 
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue,{duration:3000});
  const isInview = useInView(ref);

useEffect(()=>{
  if(isInview){
    motionValue.set(value);
  }
},[isInview,value,motionValue])


useEffect(() =>{
  springValue.on("change",(latest) =>{
    console.log(latest)
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
  })

  
},[springValue,value])

  return <span ref={ref}></span>
}







const About = () => {
  return (
    <>
      <Head>
        <title> Nuamanali | About Page </title>
        <meta name="description" content="any description" />
      </Head>
      <main className="flex w-full  flex-col items-center justify-center">
        <Layout className="pt-16">
          <Animated text=" Passion Fuels Purpose! " className="mb-16" />
          <div className="grid w-full grid-cols-8 gap-16 ">
            <div className="col-span-3 flex flex-col items-start justify-start">
              <h2 className="mb-4 test-lg font-bold uppercase text-dark/75">
                Biography
              </h2>
              <p className="font-medium">
                
                Hi, I'm CodeBucks, a web developer and UI/UX designer with a
                passion for creating beautiful, functional, and user-centered
                digital experiences. With 4 years of experience in the field. I
                am always looking for new and innovative ways to bring my
                clients' visions to life.
              </p>
              <p className="my-4 font-medium">
                I believe that design is about more than just making things look
                pretty – it's about solving problems and creating intuitive,
                enjoyable experiences for users.
              </p>
              <p className="my-4 font-medium">
                Whether I'm working on a website, mobile app, or other digital
                product, I bring my commitment to design excellence and
                user-centered thinking to every project I work on. I look
                forward to the opportunity to bring my skills and passion to
                your next project.
              </p>
            </div> 
            <div className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8">
             <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark"/>
              <Image src={profilePic} alt="nuamanali " className="w-full h-auto rounded-2xl"/>
            </div>
            <div className="col-span-2 flex flex-end items-end justify-center">
              <div className="flex flex-col items-end justify-center">
                <span className="inline-block text-7xl font-bold">
                  <AnimatedNumbers value={50}/>+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75">statisfied clients</h2>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span  className="inline-block text-7xl font-bold">
                  40+
                </span>
                <h2 className="text-xl font-medium capitalize  text-dark/75">Projects Completed</h2>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span  className="inline-block text-7xl font-bold">
                  4+
                </span>
                <h2 className="text-xl font-medium capitalize  text-dark/75" >Years of experience</h2>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default About;
