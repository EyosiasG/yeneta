import Hero3 from "../assets/img/qqqq.webp";
import zzz from "../assets/img/zzz.webp";
import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import { Link } from "react-router-dom";
const Program = () => {
  const setService = useStore((state) => state.setService);
  const service = useStore((state) => state.service);
  const setGallery = useStore((state) => state.setGallery);
  const gallery = useStore((state) => state.gallery);
  
  
  const en = useStore((state) => state.en);

 const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  


useEffect(() => {
  
  async function programs() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/programs`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Program(data.data);
   
    } else {
      return;
    }
  }
  programs();
}, []);
useEffect(() => {

  async function fetchData() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/mainTitle`;

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
          case 'Aboutus':
            setAboutus(item);
            break;
          case 'Service':
            setService(item);
            break;
          case 'Program':
            setProgram(item);
            break;
          case 'Event':
            setEvent(item);
            break;
          case 'Blog':
            setBlog(item);
            break;
          case 'Staff':
            setStaff(item);
            break;
          case 'Testimonials':
            setTestimonials(item);
            break;
          case 'Gallery':
            setGallery(item);
            break;
          default:
            console.log('Unknown section:', item.name);
        }
      });
    }
    else {
     return;
   }
    }

  
    fetchData();
  }, [setAboutus, setService, setProgram, setEvent, setBlog, setStaff, setTestimonials, setGallery]);



return (
    <>
<div
        className="bg-cover bg-center relative "
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${Hero3})`,
        }}
      >
        <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h4 className="mb-4 inline-block p-2 border-b-4 border-color1 text-color1 text-lg rounded-l-3xl  rounded-r-md">
              {en ? "Our Programs" : "ክፍሎች"}
            </h4>
            <h1 className="mb-5 text-3xl sm:text-4xl lg:text-5xl text-[#d4aa3b] font-bold py-10">
              {en ? "We Offer An Exclusive Program For Kids" : "ለልጆች የተለየ እቅድ እናቀርባለን"}
            </h1>
          </div>
          <div className="absolute  top-0 sm:top-10 right-0  bg-secondary rounded-full h-96 w-96 shadow-md border-8 border-dotted border-white  text-[12px] text-center px-2  text-white ">
           <div className="relative flex justify-center items-center  py-24 ">

           <p className="font-extrabold">
        
        🎉 Yeneta Language and Cultural Academy: Second Round Registration Open Now! 🎉 <br/>
        
        🚀 Class Start Date: September 16, 2024   <br/>
        💰 Save $20/month on tuition when you register today   <br/>
        👨‍👩‍👧‍👦 Extra Savings: Get an additional $10 off for each child if you’re enrolling more than one   <br/>
        
        Give your kids the gift of Ethiopian language, cultural instruments and many more learning! Don’t miss out—enroll now and start saving! 📚🎶
                    </p>
            <div style={{ backgroundImage: `url(${zzz})`,  }} className=" absolute -top-9 -right-2 w-32 h-32 bg-contain bg-no-repeat ">

            </div>

           </div>
            
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {a_Program
              .sort((a, b) => a.Course.localeCompare(b.Course))
              .filter((program) => program.title !== "Special class")
              .map((program) => (
                <div key={program.id} className="p-1 py-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 ">
                  <div className="rounded-lg bg-white shadow-2xl hover:shadow-secondary transform hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
                    <div className="relative">
                      <div className="overflow-hidden rounded-l-3xl rounded-t-xl rounded-r-3xl">
                        <img
                          src={`${import.meta.env.VITE_IMG_URL}/${program.img_url}`}
                          alt="Program Image"
                          className="object-contain w-full h-48 sm:h-56 lg:h-64 "
                        />
                      </div>
                      <div className="absolute left-1/2 display-1 flex flex-row transform -translate-x-1/2 -top-16 px-1 py-2 rounded-2xl text-3xl bg-color1 font-bold w-fit text-white">
                        <span className="flex flex-col  items-center ">
                        <span className="line-through text-blue-900 font-poppins text-center flex items-center ">${parseInt(program.price) + 20}</span>
                        <span className="text-lg font-bold display-1 ml-2 flex flex-row">${program.price} <span className="text-lg font-bold display-1 flex items-end">/Month</span></span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-4 h-28 overflow-hidden">
                      <a href="#" className="text-xl sm:text-2xl font-bold display-1 text-secondary">

                        {en ? program.title : program.title_am}
                      </a>
                      <p className="mt-3 mb-0 overflow-hidden font-semibold">
                        {en
                          ? program.description.substring(0, 70)
                          : program.description_am.substring(0, 70)}
                        ...
                      </p>
                    </div>
                    <div className="flex items-center border-t border-orange-500 bg-white p-4 justify-between">
                      <div className="ml-1 gap-2 flex flex-row items-center">
                        <img
                          src={`${import.meta.env.VITE_IMG_URL}/${program.img_url}`}
                          alt="Teacher"
                          className="rounded-full p-2 border border-orange-500 w-12 h-12 sm:w-16 sm:h-16"
                        />
                        <h6 className="mb-0 text-lg text-color1">
                          {en ? program.teachers : program.teacher_am}
                        </h6>
                      </div>
                      <div>
                        <Link
                          to="/details"
                          state={{
                            items: program,
                          }}
                          className="inline-block bg-secondary font-bold btn2 text-white px-4 sm:px-6 py-2 sm:py-3 text-md sm:text-xl rounded"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Enroll
                        </Link>
                      </div>
                    </div>
                    <div className="flex justify-between px-4 items-center py-2 bg-color1 text-white rounded-b-lg">
                      <div>{program.start_date}</div>
                      <div>{program.end_date}</div>
                    </div>
                  </div>
                </div>
              ))}
        
          </div>
        </div>
      </div>      
     
</>
  );
};

export default Program;
