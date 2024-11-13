import why1 from "../assets/img/why/1.webp";
import why2 from "../assets/img/why/2.webp";
import why3 from "../assets/img/why/3.webp";
import why4 from "../assets/img/why/4.webp";
import why5 from "../assets/img/why/5.webp";
import why6 from "../assets/img/why/6.webp";
import why7 from "../assets/img/why/7.webp";
import wel from "../assets/img/w-bg.webp";
import React, { useEffect } from 'react';
import useStore from '../store/store';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Why = () => {
  const en = useStore((state) => state.en);
  const { setA_Why } = useStore();
  
  const images = [why1, why2, why3, why4, why5, why6, why7];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
          autoplaySpeed: 2000
        }
      }
    ]
  };

  const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const titleAnimation = {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, delay: 0.2 }
  };

  const contentAnimation = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.7, delay: 0.3 }
  };

  useEffect(() => {
    const fetchWhy = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/why`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        if (data.status === 1) setA_Why(data.data);
      } catch (error) {
        console.error("Error fetching why data:", error);
      }
    };

    fetchWhy();
  }, [setA_Why]);

  return (
    <motion.div
      {...containerAnimation}
      className="min-h-screen relative bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 pt-40 md:pt-20 "
    >
       <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-color1/10 to-transparent skew-x-12 blur-sm"></div>
       <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-color1/10 to-transparent skew-x-12 blur-sm"></div>
      <motion.h1
        {...titleAnimation}
        className="text-3xl sm:text-4xl md:text-5xl text-color1 text-center font-bold  relative"
      >
        <span           className="inline-block px-8 py-3 bg-color1/10 text-color1 rounded-full text-xl font-bold mb-6">
          {en ? "Why Choose Yeneta?" : "ለምን የኔታን መረጡ?"}
        </span>
      </motion.h1>
      <motion.div
        {...titleAnimation}
        className="text-center   mb-8 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary display-1">
          {en ? "Empowering Through Education" : "በትምህርት የሚያበረታታ"}
        </h2>
        
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto bg-white rounded-lg sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.9)), url(${wel})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-8">
          <motion.div
            {...contentAnimation}
            className="lg:w-1/2 space-y-4 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary display-1">
                {en ? (
                  "Welcome to Yeneta Language & Cultural Academy"
                ) : (
                  "እንኳን ወደ የኔታ ቋንቋና ባህል አካዳሚ በደህና መጡ"
                )}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {en ? (
                  "Experience excellence in education where culture meets modern learning. Our academy provides a unique blend of language mastery and cultural understanding in a nurturing environment."
                ) : (
                  "ባህልና ዘመናዊ ትምህርት በሚገናኙበት ምርጥ ትምህርት ያግኙ። አካዳሚያችን በምቹ አካባቢ የቋንቋ ብቃትና የባህል ግንዛቤን በ独特 መንገድ ያቀናጃል።"
                )}
              </p>
            </div>
            
            <motion.button
              onClick={() => window.location.href = '/Why'}
              className="inline-block bg-secondary hover:bg-color1 text-white text-lg rounded-br-2xl rounded-tl-2xl rounded-tr-xs rounded-bl-xs display-1 sm:text-xl px-6 sm:px-10 py-3 sm:py-4 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {en ? "Discover More" : "ተጨማሪ ይወቁ"}
            </motion.button>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg">
              <Slider {...sliderSettings}>
                {images.map((image, index) => (
                  <div key={index} className="outline-none">
                    <img
                      src={image}
                      alt={`Yeneta Academy ${index + 1}`}
                      className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Why;
