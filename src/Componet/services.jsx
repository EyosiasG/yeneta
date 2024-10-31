
import Hero1 from '../assets/img/hero7.webp'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';

const Service = () => {
  const setService = useStore((state) => state.setService);
  const service = useStore((state) => state.service);

  
  const en = useStore((state) => state.en);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  

useEffect(() => {
  

  async function Services() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Services`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.status === 1) {
      setA_Service(data.data);

    } else {
      return;
    }
  }
  Services();
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
  }, [setService,]);



return (
    <>


<div className="container-fluid py-5  max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(55, 55, 55, 0.2)), url(${Hero1})` }}>
      <div className="container py-5 ">
        <div className="row g-5 flex ">
          <div className="col-lg-7 col-md-12 ">
            {en ?(
              
            <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-6xl  text-white text-center display-1 family-poppins font-black">Services</h1>
            ):(

              <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-7xl  text-white display-1 family-poppins font-black">አገልግሎታችን</h1>
            )}
            
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid flex justify-center py-20 bg-white ">
        <div className="container py-20" style={{ maxWidth: "1500px" }}>
          <div className="mx-auto text-center" style={{ maxWidth: "700px" }}>
            <h4 className="mb-4 inline-block p-2 px-6 border-b-4 rounded-l-2xl rounded-r-md border-color1 -500  text-2xl text-color1 -600  ">
              {en ? "What We Do" : 'ምን እናደርጋለን'}</h4>
            <h1 className="mb-5 text-4xl lg:text-6xl  text-[#d4aa3b] display-1 font-extrabold">
              {en ? "Thanks To Get Started With Our School" : '  ከትምህርት ቤታችን ጋር ለመጀመር እናመሰግናለን'}
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-6 px-2 -mx-1">
            {a_Service.map((service, index) => (
              <div
                key={index}
                className="p-4 max-w-[22rem] h-[42rem] min-h-fit  service-item "
                style={{ flexgrow: 0, flexShrink: 0 }}
              >
                <div className="text-center border card1 max-h-[38rem] border shadow-xl hover:shadow-secondary border-secondary  text-secondary min-h-[40rem] p-4 hover:bg-white transform hover:scale-110 hover:-translate-y-1 transition-transform duration-300">
                  <div className={`py-4 text-secondary ${service.iconSize}`}>
                    <i className={`fas ${service.icon} text-[10rem]`}></i>
                  </div>
                  <a
                    href="#"
                    className="block text-lg text-color1 display-1 font-bold"
                  >
                    {en ? service.title : service.title_am}
                  </a>
                  <p className="text-gray-500 font-semibold">
                    {en ? service.description : service.description_am}
                  </p>
                  <a
                    href={service.link}
                    target="_blank"
                    className="inline-block bg-color1 hover:bg-secondary  mx-8 btn2 text-white px-4 py-2 mt-2 rounded"
                  >
                    Readmore
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     
</>
  );
};

export default Service;
