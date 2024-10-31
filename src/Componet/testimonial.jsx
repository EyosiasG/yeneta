
import Hero1 from '../assets/img/hero7.png'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import Slider from 'react-slick';

const Testimonial = () => {
  const setService = useStore((state) => state.setService);
  const service = useStore((state) => state.service);
  const setGallery = useStore((state) => state.setGallery);
  const gallery = useStore((state) => state.gallery);
  const [isHovering, setIsHovering] = useState(false);  // State to track hover
  const en = useStore((state) => state.en);

  const setDrive_i = useStore((state) => state.setDrive_i);
  const drive_i = useStore((state) => state.drive_i);
  const { setAbout_link,setAboutImgUrl, setAboutDescriptionAm,setAboutDescription, setAboutus, setProgram, setEvent, setBlog, setStaff, setTestimonials ,about, program, event, blog, staff, testimonials ,about_link,about_description,about_description_am,about_imgurl } = useStore();
  const {  setA_Ceo, setA_Why, setA_Aboutus, setA_Service, setA_Program, setA_Blog, setA_Event ,a_Contactus,setA_Contactus, setA_Staff, setA_Gallery, setA_Testimonials, a_Why, a_Ceo, a_Aboutus,a_Event,  a_Service, a_Program, a_Blog, a_Staff, a_Gallery, a_Testimonials } = useStore();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };



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


  const [currentSlide, setCurrentSlide] = useState(0);
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
  
  return (
<>
<div  className="container-fluid py-5  max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(55, 55, 55, 0.2)), url(${Hero1})` }}>
      <div className="container py-5 ">
        <div className="row g-5 flex ">
          <div className="col-lg-7 col-md-12 ">
            {en ?(
              
            <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-6xl  text-white text-center display-1 family-poppins font-black">Testimonial</h1>
            ):(

              <h1 className="mb-5  lg:text-8xl text-6xl md:text-7xl sm:text-7xl  text-white display-1 family-poppins font-black">ምስክርነት</h1>
            )}
            
          </div>
        </div>
      </div>
    </div>

    <div 
    className="container mx-auto py-20 h-fit"
    onMouseEnter={() => setIsHovering(true)}  // Set isHovering to true when mouse enters
    onMouseLeave={() => setIsHovering(false)} // Set isHovering to false when mouse leaves
  >
    <div className="text-center mx-auto px-4">
      <h4 className="mb-4 inline-block p-2 border-b-4 text-xl md:text-2xl text-color1 -600 border-color1 -600 rounded-l-3xl rounded-r-md">
        {en ? "Our Testimonials": testimonials.title_am}
      </h4>
      <h1 className="mb-5 text-[#d4aa3b] text-3xl md:text-4xl lg:text-6xl font-bold">
        {en ? "Parents Say About Us" : testimonials.subTitle_am}
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
  
  </div>


</>
      );
};

export default Testimonial;
