import Hero1 from "../assets/img/hero7.webp";
import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import PopOutPlayer from "./PopOutPlayer";
import Hero from "./hero";
import { motion } from "framer-motion";

const About = ({ isHome = false }) => {
  const en = useStore((state) => state.en);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setAbout_link,
    setAboutImgUrl,
    setAboutDescriptionAm,
    setAboutDescription,
    setAboutus,
    about,
    about_link,
    about_description,
    about_description_am,
    setA_Aboutus
  } = useStore();

  useEffect(() => {
    const fetchAboutUs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/aboutus`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        if (data.status === 1) {
          setA_Aboutus(data.data);
          setAbout_link(data.data[0].link);
          setAboutImgUrl(data.data[0].img_url);
          setAboutDescriptionAm(data.data[0].description_am);
          setAboutDescription(data.data[0].description);
        }
      } catch (error) {
        console.error("Error fetching about us data:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 1500); // Add slight delay for shimmer effect
      }
    };

    fetchAboutUs();
  }, []);

  const ShimmerEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="container mx-auto py-20">
        <div className="flex flex-wrap mx-8 items-center">
          <div className="w-full lg:w-1/2 px-4">
            <div className="relative overflow-hidden">
              <div className="h-[400px] bg-gray-200 rounded-lg"></div>
              <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="w-full flex justify-center">
              <div className="relative overflow-hidden">
                <div className="h-8 w-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="h-10 w-3/4 bg-gray-200 rounded-lg mb-4"></div>
              <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="space-y-4">
              {[1,2,3].map((i) => (
                <div key={i} className="relative overflow-hidden">
                  <div className="h-4 bg-gray-200 rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap -mx-4 mb-10 mt-8">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="w-full lg:w-1/2 px-4 mb-3">
                  <div className="relative overflow-hidden">
                    <div className="h-6 bg-gray-200 rounded-lg"></div>
                    <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return <ShimmerEffect />;
  }

  return (
    <>
      {!isHome && <Hero eng="About Us" amh="ስለ እኛ"/>}

      <div className=" py-20 about">
        <div className=" container mx-auto py-20">
          <div className="flex flex-wrap  mx-8 items-center">
            <div
              className="  w-full lg:w-1/2 px-4 wow fadeIn"
              data-wow-delay="0.1s"
            >
              <div className="video border flex justify-center items-center">
                <div className="absolute qqq bottom-[30%] left-[38%] bg-blue-400/30 p-4 rounded-full  text-white hover:bg-opacity-50 ">
                  <div>
                    <PopOutPlayer videoId={about_link} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-full lg:w-1/2 px-4 wow fadeIn"
              data-wow-delay="0.3s"
            >
              <div className="w-full flex justify-center">
                <h4 className="text-color1 -600  px-2 mb-4 border-b-4 font-bold border-color1 -600  text-2xl  inline-block py-2 rounded-l-2xl rounded-r-md">
                  {en ? about.title : about.title_am}
                </h4>
              </div>{" "}
              <h1 className="text-[#393d72] mb-4 text-secondary display-1  text-4xl font-bold">
                {en ? about.subTitle : about.subTitle_am}
              </h1>
              {en
                ? about_description.split("\n").slice(0, isHome ? 1 : 9).map((paragraph, index) => (
                    <p className="text-dark text-[darkblue] mb-4" key={index}>
                      {paragraph}
                    </p>
                  ))
                : about_description_am.split("\n").slice(0, isHome ? 1 : 9).map((paragraph, index) => (
                    <p className="text-dark text-[darkblue] mb-4" key={index}>
                      {paragraph}
                    </p>
                  ))}
                
              <div className="flex flex-wrap -mx-4 mb-10  text-[darkblue]">
                <div className="w-full lg:w-1/2 px-4">
                  <h6 className="mb-3 flex items-center">
                    <i className="fas fa-check-circle mr-2 text-pink-400"></i>
                    Language Practicing
                  </h6>
                  <h6 className="mb-3 flex  items-center">
                    <i className="fas fa-check-circle mr-2 au"></i>Learn History
                  </h6>
                  <h6 className="mb-3 flex text-[#00008b ] items-center">
                    <i className="fas fa-check-circle mr-2 text-color1 -600  "></i>
                    Learn Art and Music
                  </h6>
                </div>
                <div className="w-full lg:w-1/2 px-4">
                  <h6 className="mb-3 text-[ #090a4a] flex items-center">
                    <i className="fas fa-check-circle mr-2 text-blue-500"></i>
                    Highly Secured
                  </h6>
                  <h6 className="mb-3 text-[ #090a4a] flex items-center">
                    <i className="fas fa-check-circle mr-2 au"></i>Friendly
                    Environment
                  </h6>
                  <h6 className="flex text-[ #090a4a] items-center">
                    <i className="fas fa-check-circle mr-2 text-secondary"></i>
                    Qualified Teacher
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
