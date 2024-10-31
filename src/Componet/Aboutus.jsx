
import Hero1 from '../assets/img/hero7.webp'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import PopOutPlayer from './PopOutPlayer';

const About = () => {
  
  const en = useStore((state) => state.en);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  



useEffect(() => {
  
  async function aboutus() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/aboutus`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.status === 1) {
      setA_Aboutus(data.data);
      setAbout_link(data.data[0].link);
      setAboutImgUrl(data.data[0].img_url);
      setAboutDescriptionAm(data.data[0].description_am);
      setAboutDescription(data.data[0].description);


    } else {
      return;
    }
  }
  aboutus();
}, []);

useEffect(() => {
  async function fetchData() {
    const allRides = `${import.meta.env.VITE_API}/api/mainTitle`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data1 = await response.json();

    if (data1.status === 1) {
      data1.data.forEach((item) => {
        switch (item.name) {
          case "Aboutus":
            setAboutus(item);
            break;
        
          default:
            console.log("Unknown section:", item.name);
        }
      });
    } else {
      return;
    }
  }

  fetchData();
}, [
  setAboutus,
  ]);





return (
    <>


<div  className="container-fluid py-5  max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(55, 55, 55, 0.2)), url(${Hero1})` }}>
      <div className="container py-5 ">
        <div className="row g-5 flex ">
          <div className="col-lg-7 col-md-12 ">
            {en ?(
              
            <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-6xl  text-white text-center display-1 family-poppins font-black">About Us</h1>
            ):(

              <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-7xl  text-white display-1 family-poppins font-black">ስለ እኛ</h1>
            )}
            
          </div>
        </div>
      </div>
    </div>


    <div className=" py-20 about">
            <div className= " container mx-auto py-20">
                <div className="flex flex-wrap  mx-8 items-center">
                    <div className="  w-full lg:w-1/2 px-4 wow fadeIn" data-wow-delay="0.1s">
                    <div className="video border flex justify-center items-center">
       
                        
       <div className="absolute qqq bottom-[30%] left-[38%] bg-blue-400/30 p-4 rounded-full  text-white hover:bg-opacity-50 ">
           <div>
               <PopOutPlayer videoId={about_link} />
           </div>
       </div>

</div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4 wow fadeIn" data-wow-delay="0.3s">
                      
                    <div className="w-full flex justify-center">
            <h4 className="text-color1 -600  px-2 mb-4 border-b-4 font-bold border-color1 -600  text-2xl  inline-block py-2 rounded-l-2xl rounded-r-md">
                {en ? about.title : about.title_am}
              </h4>
            </div>  <h1 className="text-[#393d72] mb-4 text-[darkblue] display-1  text-4xl font-bold">{en ? about.subTitle : about.subTitle_am}</h1>
                        {en ? about_description.split('\n').map((paragraph, index) => (
               
               <p className="text-dark text-[darkblue] mb-4" key={index}>{paragraph}</p>
           )) : about_description_am.split('\n').map((paragraph, index) => (
  
               
                            <p className="text-dark text-[darkblue] mb-4" key={index}>{paragraph}</p>
                        ))}
                        <div className="flex flex-wrap -mx-4 mb-10  text-[darkblue]">
                            <div className="w-full lg:w-1/2 px-4">
                                <h6 className="mb-3 flex items-center"><i className="fas fa-check-circle mr-2 text-pink-400"></i>Language Practicing</h6>
                                <h6 className="mb-3 flex  items-center"><i className="fas fa-check-circle mr-2 au"></i>Learn History</h6>
                                <h6 className="mb-3 flex text-[#00008b ] items-center"><i className="fas fa-check-circle mr-2 text-color1 -600  "></i>Learn Art and Music</h6>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <h6 className="mb-3 text-[ #090a4a] flex items-center"><i className="fas fa-check-circle mr-2 text-blue-500"></i>Highly Secured</h6>
                                <h6 className="mb-3 text-[ #090a4a] flex items-center"><i className="fas fa-check-circle mr-2 au"></i>Friendly Environment</h6>
                                <h6 className="flex text-[ #090a4a] items-center"><i className="fas fa-check-circle mr-2 text-secondary"></i>Qualified Teacher</h6>
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
