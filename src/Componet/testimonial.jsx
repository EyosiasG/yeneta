import { motion, AnimatePresence } from 'framer-motion';
import Hero1 from '../assets/img/hero7.png';
import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Hero from './hero';

const Testimonial = ({ isHome = false }) => {
  const {
    en,
    setService,
    service,
    setGallery,
    gallery,
    testimonials,
    setTestimonials,
    a_Testimonials,
    setA_Testimonials,
    setAboutus,
    setProgram,
    setEvent,
    setBlog,
    setStaff
  } = useStore();

  const [isHovering, setIsHovering] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
    responsive: [
      {
        breakpoint: 1668,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1122,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/Testimonial`);
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const data = await response.json();
        if (data.status === 1) {
          setA_Testimonials(data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    const fetchMainTitles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/mainTitle`);
        if (!response.ok) throw new Error('Failed to fetch main titles');
        const data = await response.json();
        
        if (data.status === 1) {
          const titleSetters = {
            Aboutus: setAboutus,
            Service: setService,
            Program: setProgram,
            Event: setEvent,
            Blog: setBlog,
            Staff: setStaff,
            Testimonials: setTestimonials,
            Gallery: setGallery
          };

          data.data.forEach(item => {
            if (titleSetters[item.name]) {
              titleSetters[item.name](item);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching main titles:', error);
      }
    };

    fetchTestimonials();
    fetchMainTitles();
  }, []);

  return (
    <>


      {!isHome && <Hero eng="Testimonials" amh="ምስክርነት"/>}
      <div className="container mx-auto py-24 px-4 ">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-8 py-3 bg-color1/10 text-color1 rounded-full text-xl font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            {en ? "Our Testimonials" : testimonials.title_am}
          </motion.span>
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-secondary display-1"
            whileHover={{ scale: 1.02 }}
          >
            {en ? "What Parents Say About Us" : testimonials.subTitle_am}
          </motion.h2>
        </motion.div>

        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Slider {...sliderSettings}>
            {a_Testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-6 mb-8">
                    <motion.div 
                      className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-color1"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}/${testimonial.image}`}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="text-2xl font-bold text-secondary mb-2">{testimonial.author}</h4>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.i 
                            key={i} 
                            className="fas fa-star text-yellow-400"
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>
                    </div>
                    <motion.i 
                      className="fas fa-quote-right text-5xl text-color1/20 ml-auto"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg italic">
                    {testimonial.professional}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </>
  );
};

export default Testimonial;
