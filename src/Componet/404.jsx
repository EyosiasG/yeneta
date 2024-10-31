
import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import PopOutPlayer from './PopOutPlayer';
import bg from '../assets/img/abvid.jpeg'

const T404 = () => {
  const setService = useStore((state) => state.setService);
  const service = useStore((state) => state.service);
  const setGallery = useStore((state) => state.setGallery);
  const gallery = useStore((state) => state.gallery);
  
  const en = useStore((state) => state.en);

  const setDrive_i = useStore((state) => state.setDrive_i);
  const drive_i = useStore((state) => state.drive_i);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  
const scrollContainerRef = useRef(null);

useEffect(() => {
  async function fetchData() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/dispatcher/all_rides?dispatcher_id=${userid}`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.status === "1") {
      setallRides(data.rides);
    } else {
      return;
    }
  }
  fetchData();
}, []);

useEffect(() => {
  
  async function Testimonials() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Testimonial`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.status === 1) {
      setA_Testimonials(data.data);

    } else {
      return;
    }
  }
  Testimonials();
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
      console.log(a_Aboutus);

    } else {
      return;
    }
  }
  aboutus();
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
  async function staff() {
    const allRides = `${
      import.meta.env.VITE_API
    }/api/Staff`;

    const response = await fetch(allRides, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.status === 1) {
     setA_Staff(data.data);

     data.data.forEach((item) => {
      if (item.position === "CEO") {
        setA_Ceo(item)
        console.log(a_Ceo,"ddasasasa");
      }
      
    });


      return;
    }
  }
  staff();
}, []);
useEffect(() => {
  async function contactus() {
 const allRides = `${import.meta.env.VITE_API}/api/contactus`;

 try {
     const response = await fetch(allRides, {
         method: "GET",
     });

     if (!response.ok) {
         throw new Error("Network response was not ok");
     }

     const data = await response.json();

     if (data.status === 1) {
         setA_Contactus(data.data);
         console.log(a_Contactus);
         return;
     }
 } catch (error) {
     console.error("Error fetching contactus data:", error);
 }
}
 contactus();
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


<div className="container-fluid py-5 flex justify-center items-center bg-white" style={{ backgroundImage: `linear-gradient(rgba(255,255, 255, 0.8), rgba(255, 255, 255, 0.7)), url(${bg})` }}>
  <div className="container py-5">
    <div className="row g-5">
      <div className="col-lg-8 col-md-10 mx-auto text-black px-8 rounded-md shadow-xl my-10 py-10 bg-white border">
        <h1 className="text-3xl font-bold text-center display-1 text-color1 mb-4">Oops! Page Not Found</h1>
        <p className="text-xl text-center mb-4">We can't seem to find the page you're looking for.</p>
        <div className="text-center">
          <a href="/" className="inline-block bg-color1 text-white font-semibold px-6 py-3 rounded-md hover:bg-color2 transition-colors duration-300">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
     
</>
  );
};

export default T404;
