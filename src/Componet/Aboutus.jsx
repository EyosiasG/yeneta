import Hero1 from "../assets/img/hero7.webp";
import React, { useEffect } from "react";
import useStore from "../store/store";
import PopOutPlayer from "./PopOutPlayer";
import Hero from "./hero";

const About = ({ isHome = false }) => {
  const en = useStore((state) => state.en);
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
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/aboutus`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        if (data.status === 1) {
          
          setA_Aboutus(data.data);
          console.log(data.data[0].description_am , data.data[0].description , data.data[0].title_am , data.data[0].title , data.data[0].link , data.data[0].img_url , data.data[0].subTitle_am , data.data[0].subTitle, data.data[0].aboutus_am , data.data[0].aboutus,'D  ');
          setAbout_link(data.data[0].link);
          setAboutImgUrl(data.data[0].img_url);
          setAboutDescriptionAm(data.data[0].description_am);
          setAboutDescription(data.data[0].description);
        }
      } catch (error) {
        console.error("Error fetching about us data:", error);
      }
    };

    fetchAboutUs();
  }, []);


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
