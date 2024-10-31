
import Hero1 from '../assets/img/hero7.webp'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import { toast } from 'react-toastify';

const Events = () => {

  
  const en = useStore((state) => state.en);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  






useEffect(() => {
  

  async function events() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Events`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.status === 1) {
      setA_Event(data.data);

    } else {
      return;
    }
  }
  events();
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
          case 'Event':
            setEvent(item);
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
  }, [setEvent]);



return (
    <>

<div      className="container-fluid py-5  max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(55, 55, 55, 0.2)), url(${Hero1})` }}>
      <div className="container py-5 ">
        <div className="row g-5 flex ">
          <div className="col-lg-7 col-md-12 ">
            {en ?(
              
            <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-6xl  text-white text-center display-1 family-poppins font-black">Events</h1>
            ):(

              <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-7xl  text-white display-1 family-poppins font-black">ክስተቶች</h1>
            )}
            
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white">
        <div className="container flex flex-col justify-center mx-auto py-10 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        <div className="text-center max-w-2xl mx-auto">
            <h4 className="mb-4 inline-block p-2 border-b-4 text-2xl sm:text-2xl text-color1 -600 border-color1 -600 rounded-l-3xl rounded-r-md">
              {en ? "Our Events" :       'የሚቀጥሉ ክስተቶቻችን'}
            </h4>
            <h1 className="mb-5 text-[#d4aa3b] text-4xl sm:text-5xl display-1 font-bold">
              {en ? "Our Upcoming Events" :    'እኛ የምናቀርባቸው ክስተቶች'}
            </h1>
          </div>
          <div className="flex flex-wrap overflow-x-auto snap-x snap-mandatory  max-w-[100vw] justify-center gap-4 md:gap-8 py-16 px-2 ">
            {a_Event.map((event) => (
              <div
                key={event.id}
                className="bg-white mt-10 w-[20rem] relative shadow-2xl hover:shadow-secondary border-b-[20px] border-color1 rounded-md pb-10 hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-transform duration-300 snap-center"
                style={{ flexGrow: 0, flexShrink: 0 }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-color1 w-fit text-white px-2 py-1 rounded-xl text-center py-2">
                    {event.date}
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <div className="">
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}/${event.image}`}
                      alt="Event"
                      className="w-full object-cover h-[20rem]"
                    />
                  </div>

                  <div className="flex justify-between px-4 py-2 bg-color1 text-white">
                    <small>
                      <i className="fas fa-calendar-alt mr-1"></i>
                      {event.time}
                    </small>
                    <small>
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {en ? event.location : event.location_am}
                    </small>
                  </div>
                  <div className="p-4 bg-white flex justify-between flex-col h-[20rem] overflow-scroll">
                    <div>
                      <a href="#" className="text-lg sm:text-xl md:text-md  font-bold">
                        {en ? event.title : event.title_am}
                      </a>
                      <p className="mt-3 mb-0 text-base sm:text-md">
                        {en ? event.description : event.description_am}
                      </p>
                    </div>
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

export default Events;
