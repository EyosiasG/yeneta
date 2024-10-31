import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Ceo from "../assets/img/11/ccc.png";
import fot2 from '../assets/img/fot3.jpg';
import Hero3 from "../assets/img/qqqq.jpg";
const Staff = () => {
  const setService = useStore((state) => state.setService);
  const service = useStore((state) => state.service);
  const setGallery = useStore((state) => state.setGallery);
  const gallery = useStore((state) => state.gallery);
  
  const en = useStore((state) => state.en);

  const setDrive_i = useStore((state) => state.setDrive_i);
  const drive_i = useStore((state) => state.drive_i);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  const images = [
    "storage\/images\/oOzBPBWsECeacXm0tJ1pEEvNbA1wJ1vrnAhKAnQV.jpg",
    "storage\/images\/qIbjQwCrQeLz63D8oylkDo2p7u2QbQhWLadwnyz1.jpg",
    "storage\/images\/rgxFTgd045s56qRC9tCuDapT69i5KvUznkrINFhS.png",
    "storage\/images\/oOzBPBWsECeacXm0tJ1pEEvNbA1wJ1vrnAhKAnQV.jpg",
    "storage\/images\/qIbjQwCrQeLz63D8oylkDo2p7u2QbQhWLadwnyz1.jpg",
    "storage\/images\/rgxFTgd045s56qRC9tCuDapT69i5KvUznkrINFhS.png",
    // Add more images as needed
  ];
  
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  });

  useEffect(() => {
    const updateSliderSettings = () => {
      const width = window.innerWidth;
      setSliderSettings(prevSettings => ({
        ...prevSettings,
        slidesToShow: width > 1668 ? 6 : width > 1425 ? 5 : width > 1122 ? 4 : width > 865 ? 3 : width > 470 ? 2 : 1,
      }));
    };

    updateSliderSettings();
    window.addEventListener('resize', updateSliderSettings);

    return () => {
      window.removeEventListener('resize', updateSliderSettings);
    };
  }, []);

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

<div  className="container-fluid py-5  max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(55, 55, 55, 0.2)), url(${Hero1})` }}>
      <div className="container py-5 ">
        <div className="row g-5 flex ">
          <div className="col-lg-7 col-md-12 ">
            {en ?(
              
            <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-6xl  text-white text-center display-1 family-poppins font-black">Staff</h1>
            ):(

              <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-7xl  text-white display-1 family-poppins font-black">ሰራተኞች</h1>
            )}
            
          </div>
        </div>
      </div>
    </div>
    <div
        className=" bg-cover bg-center  "
        style={{
          backgroundImage: `linear-gradient(rgba(250,250, 250, 0.3), rgba(255, 255, 255, 0.2)), url(${fot2})`,
        }}
      >
        <div className=" flex flex-col justify-center items-center  mb-12 text-center  py-20">
          <h4 className="mb-8 inline-block px-4 py-2 border-b-4 border-color1 -500 text-3xl text-color1 -600   rounded-3xl px-2 rounded-lg text-center w-fit text-center ">
            {en ? "Our Staff" : "የእኛ ሰራተኞች"}
          </h4>
          {a_Staff
            .filter((member) => member.position === "CEO")
            .map((member, index) => (
              <div
                key={index}
                className="bg-white/80 rounded-2xl shadow-2xl w-full sm:w-[85vw] hover:shadow-lg hover:shadow-secondary py-10"
              >
                <div className="flex lg:flex-row flex-col w-full lg:items-center md:items-center gap-2 pt-4 px-8">
           
           <div className="flex flex-col">
                  <img
                   src={`${import.meta.env.VITE_IMG_URL}/${member.image}`}
                    className="max-w-full sm:max-w-[40vw] md:max-w-[30vw] max-w-[100vw] shadow-2xl hover:shadow-color1 max-h-[60vh] rounded-2xl"
                    alt=""
                    
                  />
                  <a href="cast"  className="text-white rounded-md border px-4 py-2 bg-color1 display-1 text-lg">My Biography</a>

</div>
                  <div className="p-4 pt-10">
                    <h4 className="text-4xl text-center font-bold display-1 text-[darkblue]">
                      {a_Ceo.name}
                    </h4>

                    <h6 className="mb-1 text-center py-1 text-xl text-orange-400">
                      {en ? a_Ceo.subtitle : a_Ceo.subtitle_am}
                    </h6>
                    <h6 className="mb-1 text-center py-1 md:text-xl text-orange-400">
                      {en ? a_Ceo.social_link : a_Ceo.social_link}
                    </h6>
                    <p className="w-full mt-2 px-0 md:px-4 text-normal md:text-2xl">
                      <p className="">
                        <span className="text-center  mb-10 font-bold display-1 text-xl md:text-3xl">🌟 Welcome to Yeneta Language and Cultural Academy! 🌟</span>. <br />. <br />

                       
                        {en ? member.details: member.details_am}
                        <br /><br />
                        <span className="font-bold text-secondary display-1">Warm regards,
                          <br />
                          {en ? member.name: member.name}
                          <br />
                          {en ? member.subtitle: member.subtitle_am}
                          <br />
                          Yeneta Language and Cultural Academy</span>
                      </p>
                    </p>
                  </div>
                </div>
              </div>
                ))}
        </div>
        
        <div className='my-16 p-8 shadow-lg rounded-lg bg-white/90'>
  <h1 className='text-center text-3xl md:text-4xl font-bold py-4 rounded-md shadow-lg shadow-color1 display-1  text-color1 '>{en ? 'Our Teams' : 'የእኛ ቡድኖች'}</h1>
  <div className="flex overflow-x-auto snap-x snap-mandatory  max-w-[100vw] justify-start xl:justify-center gap-4 md:gap-8 py-16 pl-2 -px-2 md:-px-8 ">
      {a_Staff
        .filter(member => member.position !== "CEO")
        .map((member, index) => (
          <div key={index} className="gap-8">
               <div
                key={event.id}
                className="bg-white w-[14rem] sm:min-w-[10rem] h-[5rem] md:h-[11rem]  max-w-xs sm:max-w-sm md:min-h-96 md:min-w-72 lg:max-w-sm relative shadow-2xl hover:shadow-secondary border-b-[10px] border-color1 rounded-md pb-10 hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-transform duration-300 snap-center"
                style={{ flexGrow: 0, flexShrink: 0 }}
              >
                <img
                src={`${import.meta.env.VITE_IMG_URL}/${member.image}`}
                alt={en ? member.name : member.name_am}
                className="w-full h-full object-contain bg-contain min-h-[80%]"
              />
              <div className="absolute bottom-0 text-center bg-white/70 w-full">
                <h4 className="display-1 text-xl md:text-2xl font-bold">{en ? member.name : member.name_am}</h4>
                <div className="flex flex-row justify-center gap-1 items-center">
                  <i className="fas fa-envelope text-blue-900"></i>
                  <p className="text-sm md:text-lg font-semibold text-blue-900">{member.social_link}</p>
                </div>
                <p className="text-sm display-1 md:text-lg font-semibold">
                  {en ? member.position : member.position_am}
                </p>
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

export default Staff;
