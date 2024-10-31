
import mission from '../assets/img/mission.webp'
import values from '../assets/img/values.webp'
import vision from '../assets/img/vision.webp'
import Hero1 from '../assets/img/hero7.webp'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';

const Why = () => {
  const en = useStore((state) => state.en);

  const setDrive_i = useStore((state) => state.setDrive_i);
  const drive_i = useStore((state) => state.drive_i);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  

  const fetchWhy =   async () => {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/why`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Why(data.data);
   
    } else {
      return;
    }
  }
  





useEffect(() => {

  fetchWhy();
   
  }, []);



return (
    <>


<div  className="container-fluid py-5  max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(55, 55, 55, 0.2)), url(${Hero1})` }}>
      <div className="container py-5 ">
        <div className="row g-5 flex ">
          <div className="col-lg-7 col-md-12 ">
            {en ?(
              
            <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-6xl  text-white text-center display-1 family-poppins font-black">Why Yeneta</h1>
            ):(

              <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-7xl  text-white display-1 family-poppins font-black">ለምን የኔታ</h1>
            )}
            
          </div>
        </div>
      </div>
    </div>
    <div className="py-20 about">
        <div className="py-20">
            <div className="flex flex-wrap mx-8 justify-center items-center">
            {a_Why.map((Why, index) => (
                <div key={index} className="w-full lg:w-3/4 px-4 text-2xl wow fadeIn gap-4 flex flex-col justify-center" data-wow-delay="0.3s">
                  
                    <h4 className="text-color1 -600 px-2 mb-12 border-b-4 border-color1 text-4xl font-black md:ml-[45%] w-fit py-2 rounded-l-2xl mb-20 rounded-r-md">
                        {en ? <h1 className='font-black display-1 text-yellow-500 text-center'>Why Yeneta</h1> : <h1 className='font-black display-1 text-yellow-500 text-center'>Why Yeneta AM</h1>}
                    </h4>
                    <div className='bg-white/40 shadow-xl rounded-3xl p-6 px-8 md:px-32 text-justify text-sm md:text-lg md:container mx-auto mb-10 hover:shadow-2xl hover:shadow-color1'>
                       <div className='flex justify-center mb-8'>
                       <img src={mission} className='h-52 rounded-full shadow-xl hover:shadow-secondary' alt="" />
                       </div>
                        <h1 className="text-[#393d72] mb-12 text-[darkblue] display-1 text-4xl font-bold">
                            {en ? <h1 className='font-bold text-yellow-500 text-center'>Our Mission</h1> : <h1 className='font-bold text-yellow-500 text-center'>ተልእኮታችን</h1>}
                        </h1>
                        {en ? (
                        
                        <p className="text-dark text-[darkblue]  mb-4">{Why.mission}</p>
                        
              
                            ) : (
                            <p className="text-dark text-[darkblue] mb-4" key={index}>{Why.mission_am}</p>
                        )}
                    </div>
                    <div className='bg-white/40 shadow-xl rounded-3xl p-6 px-8 md:px-32 text-justify text-sm md:text-lg mb-10 md:container mx-auto hover:shadow-2xl hover:shadow-color1'>
                        <div className='flex justify-center mb-8'>
                            <img src={vision} className='h-52 rounded-full shadow-xl hover:shadow-secondary' alt="" />
                        </div>
                            
                        <h1 className="text-[#393d72] mb-12 text-[darkblue] display-1 text-4xl font-bold">
                            {en ? <h1 className='font-bold text-yellow-500 text-center'>Our Vision</h1> : <h1 className='font-bold text-yellow-500 text-center'>ራዕያችን</h1>}
                        </h1>
                        {en ? (
                        
                        <p className="text-dark text-[darkblue] mb-4">{Why.Vision}</p>
                        
              
                             ) : (
                            <p className="text-dark text-[darkblue] mb-4" key={index}>{Why.Vision_am}</p>
                        )}
                    </div>
                    <div className='bg-white/40 shadow-xl rounded-3xl p-6 px-8 md:px-32 text-justify text-sm md:text-lg mb-10 container border mx-auto hover:shadow-2xl hover:shadow-color1'>
                        <div className='flex justify-center mb-8'>
                            <img src={values} className='h-52 rounded-full shadow-xl hover:shadow-secondary' alt="" />
                        </div>
                        <h1 className="text-[#393d72] mb-12 text-[darkblue] display-1 text-4xl font-bold">
                            {en ? <h1 className='font-bold text-yellow-500 text-center'>Our Goals</h1> : <h1 className='font-bold text-yellow-500 text-center'>እንዲህ ነው ዓላማችን</h1>}
                        </h1>
                        {en ? (
                        
                        <p className="text-dark text-[darkblue] mb-4">
                            {Why.value.split('\n').map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                        </p>
                        
              
                      ) : (
                        <p className="text-dark text-[darkblue] mb-4">
                        {Why.value_am.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </p>
                        )}
                    </div>
                </div>
            ))}
            </div>
        </div>
        </div>
        </>
  );
};

export default Why;
