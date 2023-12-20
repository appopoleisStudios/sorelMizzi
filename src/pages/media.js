import Animated from "@/components/AnimatedText";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import NavBar from "@/components/NavBars";
import Background from "./backround";

const Media = () => {
  const [medias, setMedias] = useState([]);
  const [video, setVideo] = useState([]);
  const impMedia = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/images`;
  const impVideo = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/videos`;
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaResponse = await fetch(impMedia);
        const mediaData = await mediaResponse.json();
        setMedias(mediaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMedia();
  }, []);

  console.log(medias, "sdacbufsdkj");
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoResponse = await fetch(impVideo);
        const videoData = await videoResponse.json();
        setVideo(videoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchVideo();
  }, []);
  console.log(video, "sdacbufsdkj");
  const backgroundImage = "/sorel-mizc/backgroundmain.jpg";
  return (
    <>
      <NavBar />
      <Background backgroundImage={backgroundImage}>
      <main className="min-h-screen ">
      <Animated text=" Media " className="  text-center text-gold" />
        <div className="p-4 h-auto">
          <div className="flex items-center  mb-4 p-6 text-gold">
            <h2 className="text-2xl font-large">Video</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Rendering only the first video with modified dimensions and autoplay */}
            {video.slice(0, 1).map((videoObj, index) => (
              <div key={index} className="w-full overflow-hidden relative mb-4">
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
            ))}

            {/* Rendering the rest of the videos */}
            {video.slice(1).map((videoObj, index) => (
              <div
                key={index}
                className="w-[350px] h-[350px] overflow-hidden relative mb-4"
              >
                <iframe
                  src={videoObj.url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 h-auto mt-10 text-gold">
          <div>
            <h3 className="text-2xl font-large">Pictures</h3>
          </div>
          <div className="flex flex-wrap justify-center mt-20 gap-4">
            {medias.map((imgObj, index) => (
              <div
                key={index}
                className="w-[350px] h-[350px] overflow-hidden relative mb-4"
              >
                {/* Ensure imgObj.url is the correct path to the image */}
                <Image
                  src={imgObj.url} // Replace `imgObj.url` with the correct property path if necessary
                  alt={`Image ${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      </Background>
    </>
  );
};

export default Media;
