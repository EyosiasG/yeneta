import Hero3 from "../assets/img/qqqq.jpg";
import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import { Link } from "react-router-dom";
const Special = () => {
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
  className="bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/path/to/hero3.jpg')`,
  }}
>
  <div className="container mx-auto py-20">
    <div className="text-center max-w-3xl mx-auto">
      <h4 className="mb-4 inline-block p-2 border-b-4 border-color1-500 text-color1-600 text-lg rounded-l-3xl rounded-r-md">
        Our Programs
      </h4>
      <h1 className="mb-5 text-5xl lg:text-5xl text-[#d4aa3b] display-1 font-bold py-10">
        We Offer An Exclusive Program For Kids
      </h1>
    </div>
    <div className="flex flex-wrap gap-2 justify-center -mx-1 md:-mx-4">
      <div className="p-1 py-10">
        <div className="rounded-lg w-[24rem] md:w-[31rem] bg-white shadow-2xl hover:shadow-secondary transform hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
          <div className="relative">
            <div className="overflow-hidden rounded-l-3xl rounded-t-xl rounded-r-3xl">
              <img
                src="${import.meta.env.VITE_API}/path/to/program_image.jpg"
                alt="Program Image"
                className="object-contain w-full h-72"
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 px-1 py-2 rounded-2xl text-3xl bg-color1-600 font-bold w-fit text-white">
              $100<span className="text-lg font-bold">/Month</span>
            </div>
          </div>
          <div className="bg-white p-4 h-28">
            <a href="#" className="text-2xl font-bold text-secondary">
              Program Title
            </a>
            <p className="mt-3 mb-0 overflow-hidden font-bold">
              Program description goes here...
            </p>
          </div>
          <div className="flex items-center border-t border-orange-500 bg-white p-4 justify-between">
            <img
              src="${import.meta.env.VITE_API}/path/to/teacher_image.jpg"
              alt="Teacher"
              className="rounded-full p-2 border border-orange-500 w-16 h-16"
            />
            <div className="ml-3">
              <h6 className="mb-0 text-lg text-color1-600">
                Teacher Name
              </h6>
              <small className="text-secondary text-xs font-bold"></small>
            </div>
            <div className="">
              <Link
                to="/details"
                state={{
                  items: {
                    id: 1,
                    title: "Program Title",
                    description: "Program description goes here...",
                    img_url: "path/to/program_image.jpg",
                    price: 100,
                    teachers: "Teacher Name",
                    start_date: "2023-01-01",
                    end_date: "2023-12-31",
                  },
                }}
                className="inline-block bg-secondary-600 font-bold btn2 text-white px-3 py-2 text-md display-1 rounded"
                onClick={() => window.scrollTo(0, 0)}
              >
                Enroll
              </Link>
            </div>
          </div>
          <div className="flex justify-between px-4 items-center py-2 bg-color1-600 text-white rounded-b-lg">
            <div>2023-01-01</div>
            <div>2023-12-31</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     
</>
  );
};

export default Special;
