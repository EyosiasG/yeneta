import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "../store/store";
import Hero from "./hero";

const Events = ({ isHome = false }) => {
  const en = useStore((state) => state.en);
  const [isLoading, setIsLoading] = useState(true);
  const { setEvent, setA_Event, a_Event } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/Events`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        if (data.status === 1) {
          setA_Event(data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchMainTitle = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/mainTitle`);
        if (!response.ok) throw new Error("Failed to fetch main title");
        const { status, data } = await response.json();
        
        if (status === 1) {
          data.forEach(item => {
            if (item.name === "Event") setEvent(item);
          });
        }
      } catch (error) {
        console.error("Error fetching main title:", error);
      }
    };

    fetchMainTitle();
  }, [setEvent]);

  const nextSlide = () => {
    if (!a_Event.length) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === a_Event.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (!a_Event.length) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? a_Event.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDifference = touchStart - touchEnd;

    if (Math.abs(swipeDifference) > swipeThreshold) {
      if (swipeDifference > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const renderEventCard = (event, index, offset = 0) => (
    <motion.div
      key={event.id}
      className={`w-full max-w-[90vw] sm:max-w-[26rem] md:max-w-[32rem] lg:max-w-2xl relative group snap-center rounded-[2rem] shadow-2xl hover:shadow-3xl transition-all duration-700 mx-auto bg-white/95 backdrop-blur-md`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: 1, 
        x: offset * (window.innerWidth < 768 ? 120 : 350),
        scale: 1 - Math.abs(offset) * (window.innerWidth < 768 ? 0.07 : 0.12),
        zIndex: 10 - Math.abs(offset)
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeInOut"
      }}
      style={{ 
        position: 'absolute',
        left: window.innerWidth < 768 ? '0%' : '30%',
        transform: `translate(-50%, 0) translateX(${offset * (window.innerWidth < 768 ? 60 : 120)}px)`,
        filter: `blur(${Math.abs(offset) * 1.2}px)`,
        pointerEvents: offset === 0 ? 'auto' : 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      whileHover={{ scale: offset === 0 ? 1.03 : 1 }}
    >
      <div className="rounded-[2rem] overflow-hidden transition-all duration-500">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div 
            className="bg-gradient-to-r from-color1 via-secondary to-color1 text-white px-10 py-4 rounded-full font-bold shadow-xl"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {event.date}
          </motion.div>
        </div>

        <div className="relative overflow-hidden group">
          <motion.img
            src={`${import.meta.env.VITE_IMG_URL}/${event.image}`}
            alt="Event"
            className="w-full object-cover h-[20rem] sm:h-[24rem] md:h-[28rem] transform hover:scale-110 transition-transform duration-700"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white p-10 backdrop-blur-sm">
            <motion.span 
              className="flex items-center justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 bg-white/15 px-5 py-3 rounded-full backdrop-blur-md hover:bg-white/25 transition-all duration-300">
                <i className="fas fa-calendar-alt text-secondary text-xl"></i>
                <span className="font-medium text-lg">{event.time}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/15 px-5 py-3 rounded-full backdrop-blur-md hover:bg-white/25 transition-all duration-300">
                <i className="fas fa-map-marker-alt text-secondary text-xl"></i>
                <span className="font-medium text-lg">{en ? event.location : event.location_am}</span>
              </div>
            </motion.span>
          </div>
        </div>

        <div className="p-10">
          <motion.h3 
            className="text-3xl font-bold bg-gradient-to-r from-color1 to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-color1 transition-all duration-500 mb-6 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            {en ? event.title : event.title_am}
          </motion.h3>
          <div className="h-72 overflow-auto custom-scrollbar pr-6">
            <motion.p 
              className="text-gray-700 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {en ? event.description : event.description_am}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <motion.div
          className="w-full flex justify-center items-center min-h-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-8">
            <motion.div 
              className="w-24 h-24 border-5 border-color1 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className="text-2xl text-color1 font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              Loading amazing events...
            </motion.p>
          </div>
        </motion.div>
      );
    }

    if (!a_Event.length) {
      return (
        <motion.div
          className="flex flex-col w-full justify-center items-center py-20 h-[45vh] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="mb-8"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <i className="fas fa-calendar-times text-8xl text-color1"></i>
          </motion.div>
          <motion.p 
            className="text-4xl text-color1 font-bold display-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            No events scheduled yet
          </motion.p>
          <motion.p 
            className="text-gray-600 mt-5 text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Check back soon for upcoming events!
          </motion.p>
        </motion.div>
      );
    }

    return (
      <div className="relative w-full flex justify-center items-center min-h-[800px] sm:min-h-[900px] md:min-h-[1000px]">
        {window.innerWidth < 768 
          ? [-1, 0, 1].map((offset) => {
              const index = (currentIndex + offset + a_Event.length) % a_Event.length;
              return renderEventCard(a_Event[index], index, offset);
            })
          : [-2, -1, 0, 1, 2].map((offset) => {
              const index = (currentIndex + offset + a_Event.length) % a_Event.length;
              return renderEventCard(a_Event[index], index, offset);
            })
        }
      </div>
    );
  };

  return (
    <>
      {!isHome && <Hero eng="Events" amh="ክስተቶች"/>}

      <section className="bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Enhanced Decorative SVG Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <svg className="absolute top-0 left-0 w-40 h-40 text-color1/15 animate-pulse" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
          <svg className="absolute top-1/4 right-0 w-56 h-56 text-secondary/15 animate-bounce" viewBox="0 0 100 100">
            <path d="M0,50 a1,1 0 0,0 100,0" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-0 left-1/4 w-48 h-48 text-color1/15 animate-pulse" viewBox="0 0 100 100">
            <polygon points="50,0 100,87 0,87" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-6 sm:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <motion.div
            className="absolute inset-0 opacity-80"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />

          <motion.div
            className="text-center max-w-5xl mx-auto mb-16 sm:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h4 
              className="inline-block px-10 py-4 bg-color1/10 text-color1 rounded-full text-2xl font-bold mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              {en ? "Our Events" : "የሚቀጥሉ ክስተቶቻችን"}
            </motion.h4>
            <motion.h1 
              className="bg-gradient-to-r from-secondary to-color1 bg-clip-text text-transparent text-5xl sm:text-7xl lg:text-8xl display-1 font-bold mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {en ? "Our Upcoming Events" : "እኛ የምናቀርባቸው ክስተቶች"}
            </motion.h1>
          </motion.div>

          <div className="relative flex justify-center items-center">
            <motion.button 
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-chevron-left text-3xl text-color1"></i>
            </motion.button>
            
            <motion.button 
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-chevron-right text-3xl text-color1"></i>
            </motion.button>

            <div className="w-full flex justify-center items-center py-8 sm:py-12 px-6 sm:px-8">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
