import wel from "../assets/img/w-bg.webp";
import why1 from "../assets/img/why/1.webp";
import why2 from "../assets/img/why/2.webp";
import why3 from "../assets/img/why/3.webp";
import why4 from "../assets/img/why/4.webp";
import why5 from "../assets/img/why/5.webp";
import why6 from "../assets/img/why/6.webp";
import why7 from "../assets/img/why/7.webp";
import zzz from "../assets/img/zzz.webp";
import Ceo from "../assets/img/11/ccc.png";
import Hero1 from "../assets/img/hero7.webp";
import border from "../assets/img/bor2.jpg";
import { Link } from "react-router-dom";
import fot from '../assets/img/fot.webp';
import fot2 from '../assets/img/fot3.webp';
import Hero3 from "../assets/img/qqqq.webp";
import ProgramModal from "./details";
import Hero2 from "../assets/img/prog.jpg";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Modal from 'react-modal';
import PopOutPlayer from './PopOutPlayer';

const Home = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const openVideoModal = (url) => {
    setVideoUrl(url);
    console.log("www")
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
 
  const setService = useStore((state) => state.setService);
  const service = useStore((state) => state.service);
  const setGallery = useStore((state) => state.setGallery);
  const gallery = useStore((state) => state.gallery);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };  
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  const handleClose = () => {
    setSelectedProgram(null);
  };

  const handleMoreClick = (programId) => {
    navigate(`/details/${programId}`);
  };
  const en = useStore((state) => state.en);

  const setDrive_i = useStore((state) => state.setDrive_i);
  const drive_i = useStore((state) => state.drive_i);
  const {
    setAbout_link,
    setAboutImgUrl,
    setAboutDescriptionAm,
    setAboutDescription,
    setAboutus,
    setProgram,
    setEvent,
    setBlog,
    setStaff,
    setTestimonials,
    about,
    program,
    event,
    blog,
    staff,
    testimonials,
    about_link,
    about_description,
    about_description_am,
    about_imgurl,
  } = useStore();
  const {
    setA_Ceo,
    setA_Why,
    setA_Aboutus,
    setA_Service,
    setA_Program,
    setA_Blog,
    setA_Event,
    a_Contactus,
    setA_Contactus,
    setA_Staff,
    setA_Gallery,
    setA_Testimonials,
    a_Why,
    a_Ceo,
    a_Aboutus,
    a_Event,
    a_Service,
    a_Program,
    a_Blog,
    a_Staff,
    a_Gallery,
    a_Testimonials,
    setAdmin,
    admin,
  } = useStore();

  useEffect(() => {
 
    setAdmin(false);


  
}, []);
  const images = [
    why1,
    why2,
    why3,
    why4,
    why5,
    why6,
    why7,
    ];

  const scrollContainerRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);  // State to track hover
  const itemsPerPage = 3; // Number of testimonials per slide
  const autoRotateTime = 5000; // Auto-rotate every 5000 milliseconds (5 seconds)

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide + itemsPerPage >= a_Testimonials.length ? 0 : prevSlide + itemsPerPage
    );
  };

  useEffect(() => {
    if (!isHovering) {  // Only set the interval if not hovering
      const slideInterval = setInterval(nextSlide, autoRotateTime);
      return () => clearInterval(slideInterval);
    }
  }, [currentSlide, itemsPerPage, a_Testimonials.length, isHovering]); 
  

  useEffect(() => {
    async function Testimonials() {
      const allRides = `${import.meta.env.VITE_API}/api/Testimonial`;

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
      const allRides = `${import.meta.env.VITE_API}/api/Events`;

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
      const allRides = `${import.meta.env.VITE_API}/api/Services`;

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
      const allRides = `${import.meta.env.VITE_API}/api/aboutus`;

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
      const allRides = `${import.meta.env.VITE_API}/api/programs`;

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
      const allRides = `${import.meta.env.VITE_API}/api/Staff`;

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
            setA_Ceo(item);
            console.log(a_Ceo, "ddasasasa");jy
          }
        });

        return;
      }
    }
    staff();
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
            case "Service":
              setService(item);
              break;
            case "Program":
              setProgram(item);
              break;
            case "Event":
              setEvent(item);
              break;
            case "Blog":
              setBlog(item);
              break;
            case "Staff":
              setStaff(item);
              break;
            case "Testimonials":
              setTestimonials(item);
              break;
            case "Gallery":
              setGallery(item);
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
    setService,
    setProgram,
    setEvent,
    setBlog,
    setStaff,
    setTestimonials,
    setGallery,
  ]);



  return (
    <>
    <div className="max-w-screen ">
      <div
        className="container-fluid py-5 max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(55, 55, 55, 0.4)), url(${Hero1})`,
        }}
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-12 col-md-12 col-sm-12 col-lg-7 px-md-5 py-5">
              {en ? (
                <h1 className="mb-5 text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl p-3 md:p-10 md:px-44 sm:w-[70%] md:w-[80%] text-white display-1 family-poppins font-black">
                Yeneta Multicultural school for your kids!
                </h1>
              ) : (
                <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl xl:text-8xl p-3 md:p-10 md:px-44 sm:w-full md:w-[80%] text-white display-1 family-poppins font-black">
                     ለልጆችዎ በጣም ጥሩ ቦታ እና የተሻለ እንክብካቤ የሚያገኙበት
                </h1>
              )}
              <div className="flex flex-wrap justify-start px-7 md:px-44">
                {en ? (
                  <>
                    <a
                      href="/programs"
                      className="mb-2 md:mb-0 inline-block bg-secondary display-1 text-white font-bold text-sm sm:text-xl md:text-2xl py-2 px-2 md:py-3 md:px-4 mr-4 font-poppins rounded-lg hover:bg-secondary/80 transition duration-300 ease-in-out"
                    >
                      Get Started
                    </a>
                    <a
                      href="/about"
                      className="mb-2 md:mb-0 inline-block bg-secondary display-1 text-white font-bold text-sm sm:text-xl  md:text-2xl py-2 px-2 md:py-3 md:px-4 mr-4 font-poppins rounded-lg hover:bg-secondary/80 transition duration-300 ease-in-out"
                      >
                      Learn More
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="program.html"
                      className="mb-2 md:mb-0 inline-block bg-secondary display-1 text-white font-bold text-xl md:text-2xl py-3 px-4 mr-4 font-poppins rounded-lg hover:bg-secondary/80 transition duration-300 ease-in-out"
                      >
                   ለመገመር
                    </a>
                    <a
                      href="about.html"
                      className="mb-2 md:mb-0 inline-block bg-secondary display-1 text-white font-bold text-xl md:text-2xl py-3 px-4 mr-4 font-poppins rounded-lg hover:bg-secondary/80 transition duration-300 ease-in-out"
                      >
                      የበለጠ ለማወቅ
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-6 bg-gray-50 min-h-[100vh] flex-col ">
  <h1 className="text-3xl text-color1 mb-12 px-4 border-b-4 border-color1 inline-block py-3 rounded-l-2xl rounded-r-md font-bold">{en ? 'Why Yeneta' : 'ለምን የኔታ'}</h1>
  <div
    className="w-full md:w-[90vw] md:h-[60vh] h-auto text-xl rounded-2xl bg-cover bg-center bg-no-repeat shadow-lg"
    style={{
      backgroundImage: `url(${wel})`,
    }}
  >
    <div className="flex flex-col md:flex-row justify-between items-center h-full text-gray-900">
      <div className="w-full md:w-3/5 lg:2/5 p-6 flex flex-col items-center md:items-start justify-center m-4 bg-white bg-opacity-50 rounded-lg">
     {en ? <>  <h2 className="text-yellow-500 text-3xl md:text-4xl lg:text-5xl display-1 font-bold mb-10">
          Welcome to <br/>Yeneta Language and Cultural Academy
        </h2>
        <p className="text-gray-700 text-base md:text-xl font-semibold text-center md:text-left">
          Don't miss out on our next event where we bring together like-minded individuals to discuss, learn, and grow. Join us now!
        </p>
        </>
        
        :
       
        
        <>
           <h2 className="text-yellow-500 text-3xl md:text-4xl lg:text-5xl display-1 font-bold mb-10">
          እንኳን ወደ <br/>የኔታ ቋንቋና ባህል ተመሃሮ ተቋም በደህና መጡ
        </h2>
        <p className="text-gray-700 text-base md:text-xl font-semibold text-center md:text-left">
          እንደ አንድ ሆነን ለመወያየት፣ ለመማርና ለመእድገት የምንገናኝበትን ቀጣይ ክስተት አትንሱ። አሁን ይቀላቀሉ!
        </p>
        </>}
        <a
          href="/Why"
          className="mt-4 inline-block bg-secondary hover:bg-color1 text-white py-3 px-8 rounded-lg display-1 text-2xl transition duration-300"
        >
       {en ? 'Why Yeneta ?' : 'ለምን የኔታ ?' }
        </a>
      </div>
      <div className=" md:w-3/5 w-full  min-h-1/3">
      <div className=" p-0 ">
      <Slider {...settings1}>
        <div className="p-0">
          <img src={why1} alt="Slide 1" className=" w-[100vw] md:h-auto h-[30vh]  rounded-lg shadow-xl" />
        </div>
        <div className="p-0">
          <img src={why2} alt="Slide 1" className=" w-[100vw] md:h-auto h-[30vh]  rounded-lg shadow-xl" />
        </div>
        <div className="p-0">
          <img src={why3} alt="Slide 1" className=" w-[100vw] md:h-auto h-[30vh]  rounded-lg shadow-xl" />
        </div>
        <div className="p-0">
          <img src={why4} alt="Slide 1" className=" w-[100vw] md:h-auto h-[30vh]  rounded-lg shadow-xl" />
        </div>
        <div className="p-0">
          <img src={why5} alt="Slide 1" className=" w-[100vw] md:h-auto h-[30vh]  rounded-lg shadow-xl" />
        </div>
        <div className="p-0">
          <img src={why6} alt="Slide 1" className=" w-[100vw] md:h-auto h-[30vh]  rounded-lg shadow-xl" />
        </div>
        <div className="p-0">
          <img src={why7} alt="Slide 1" className=" w-[100vw] md:h-auto h-[30vh]  rounded-lg shadow-xl" />
        </div>
      </Slider>
    </div>
      </div>
    </div>
  </div>
</div>

      <div className=" py-20 about">
        <div className=" container mx-auto py-20">
          <div className="flex flex-wrap  mx-8 items-center">
            <div
              className="w-full lg:w-1/2 px-4 wow fadeIn"
              data-wow-delay="0.1s"
            >
              <div className="video border flex justify-center items-center">
       
                        
                        <div className="absolute qqq bottom-[30%] left-[38%] bg-blue-400/30 p-4 rounded-full  text-white hover:bg-opacity-50">
                            <div>
                                <PopOutPlayer videoId={about_link} />
                            </div>
                        </div>
            
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Video Modal"
              className="Modal"
              overlayClassName="Overlay"
            >
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={`${videoUrl}?autoplay=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              </div>
              <button onClick={closeModal}>Close</button>
            </Modal>
            <div
            
              className="w-full lg:w-1/2 px-4 wow fadeIn"
              data-wow-delay="0.3s"
            >
            <div className="w-full flex justify-center">
            <h4 className="text-color1 -600  px-2 mb-4 border-b-4 font-bold border-color1 -600  text-2xl  inline-block py-2 rounded-l-2xl rounded-r-md">
                {en ? about.title : about.title_am}
              </h4>
            </div>
              <h1 className="text-[#393d72] mb-4 text-[darkblue] display-1  text-4xl font-bold">
                {en ? about.subTitle : about.subTitle_am}
              </h1>
              {en
                ? about_description
                    .split("\n")
                    .slice(0, 1)
                    .map((paragraph, index) => (
                      <p className="text-dark text-[darkblue] mb-4" key={index}>
                        {paragraph}
                      </p>
                    ))
                : about_description_am
                    .split("\n")
                    .slice(0, 1)
                    .map((paragraph, index) => (
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
              <a
                href="/about"
                className=" bg-color1 hover:bg-secondary -600  px-10 py-4 mt-4 border-2 btn2 "
              >
                Learn More
              </a>
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
{/* programs section */}
    

    
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
                    <div className="bg-white p-4 h-28">
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
        
        <div className="w-full text-center mt-8">
              <a
                href="./programs"
                className="inline-block bg-color1 hover:bg-secondary btn2 text-white px-5 py-3 rounded transform scale-100 hover:scale-110 transition duration-300"
              >
                {en ? "View All Programs" : "ሁሉንም ፕሮግራሞች ይመልከቱ"}
              </a>
            </div>

          </div>
        </div>
      </div>      
      {/* Event Section */}
      
    
  {/**/}
      
      <div className="bg-white">
        <div className="mx-8 py-10 sm:py-20 md:py-24 lg:py-28 xl:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="mb-4 inline-block p-2 border-b-4 text-2xl sm:text-2xl text-color1 -600 border-color1 -600 rounded-l-3xl rounded-r-md">
              {en ? "Our Events" :       'የሚቀጥሉ ክስተቶቻችን'}
            </h4>
            <h1 className="mb-5 text-[#d4aa3b] text-4xl sm:text-5xl display-1 font-bold">
              {en ? "Our Upcoming Events" :    'እኛ የምናቀርባቸው ክስተቶች'}
            </h1>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory  max-w-[100vw] justify-start md:justify-start sm gap-4 md:gap-8 py-16 px-8 ">
            {a_Event.length > 0 ? (
              a_Event.map((event) => (
                <div
                  key={event.id}
                  className="bg-white min-w-[20rem] max-w-xs sm:max-w-sm md:min-h-96 md:min-w-96 lg:max-w-sm relative shadow-2xl hover:shadow-secondary border-b-[20px] border-color1 rounded-md pb-1 hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-transform duration-300 snap-center"
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
                    <div className="p-4 -pb-4 bg-white flex justify-between flex-col h-full">
                      <div>
                        <a href="#" className="text-lg sm:text-xl md:text-md font-bold">
                          {en ? event.title : event.title_am}
                        </a>
                        <p className="mt-3 mb-0 text-base overflow-scroll h-72 sm:text-md">
                          {en ? event.description : event.description_am}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col w-full justify-center items-center py-10 h-[35vh]  rounded-lg shadow-md">
                <p className="text-2xl text-color1 font-semibold display-1  mb-4">No events scheduled</p>
             
              </div>
            )}
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
                  <a href="Biography"  className="text-white rounded-md border px-4 py-2 bg-color1 display-1 text-lg">My Biography</a>

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
                    <p className="w-full mt-2 px-0 md:px-4 text-left md:text-2xl">
                      <p className="text-left">
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
                className="bg-white w-[14rem] sm:min-w-[10rem] h-[11rem] md:h-[11rem]  max-w-xs sm:max-w-sm md:min-h-96 md:min-w-72 lg:max-w-sm relative shadow-2xl hover:shadow-secondary border-b-[10px] border-color1 rounded-md pb-10 hover:bg-white transform hover:scale-105 hover:-translate-y-1 transition-transform duration-300 snap-center"
                style={{ flexGrow: 0, flexShrink: 0 }}
              >
                <img
                src={`${import.meta.env.VITE_IMG_URL}/${member.image}`}
                alt={en ? member.name : member.name_am}
                className="w-full h-full object-contain bg-contain   sm:min-h-[80%]"
              />
              <div className="absolute bottom-0 text-center bg-white/70 w-full">
                <h4 className="display-1 text-sm sm:text-xl md:text-2xl font-bold">{en ? member.name : member.name_am}</h4>
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
      <div 
      className="container  mx-8 sm:mx-auto py-20 h-fit"
      onMouseEnter={() => setIsHovering(true)}  // Set isHovering to true when mouse enters
      onMouseLeave={() => setIsHovering(false)} // Set isHovering to false when mouse leaves
    >
  <div className="text-center mx-auto px-4">
      <h4 className="mb-4 inline-block p-2 border-b-4 text-xl md:text-2xl text-color1 -600 border-color1 -600 rounded-l-3xl rounded-r-md">
        {en ? "Our Testimonials" : "መልካም ምስክርነቶቻችን"}
      </h4>
      <h1 className="mb-5 display-1 text-[#d4aa3b] text-3xl md:text-4xl lg:text-6xl font-bold">
        {en ? "Parents Say About Us" : "የወላጆች ማስታወሻ ስለ እኛ"}
      </h1>
    </div>
      <div className="flex flex-wrap justify-center items-center h-3/4">
        <Slider
         {...settings}
         slidesToShow={
           window.innerWidth > 1668
             ? 3
             : window.innerWidth > 1122
             ? 2
             : window.innerWidth > 470
             ? 
             1
             :1
         }
          infinite={true}
          className='flex justify-center w-full'
        >
          {a_Testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="p-4 w-full flex justify-center">
              <div className="bg-primary-500 border card1 bg-white max-h-[16rem] border border-dashed border-secondary p-4 rounded-lg w-full">
                <div className="relative p-4">
                  <i className="fa fa-quote-right text-2xl absolute top-4 right-4 text-color1-600"></i>
                  <div className="flex items-center">
                    <div className="border-4 border-red-500 rounded-full w-20 h-20">
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}/${testimonial.image}`}
                        alt=""
                        className="rounded-full pb-2 border border-dashed border-orange-500"
                        style={{ width: "80px", height: "80px" }}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-secondary">{testimonial.author}</h4>
                      <div className="flex mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-color1-600"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="border-t border-orange-500 mt-4 pt-3 text-gray-600">
                    {testimonial.professional}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    
      </div></div>
    </>
  );
};

export default Home;
