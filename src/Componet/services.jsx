import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './hero';

const Service = ({ isHome = false }) => {
  const { setService, en, setA_Service, a_Service } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/Services`);
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      if (data.status === 1) setA_Service(data.data);
      return data;
    } catch (err) {
      setError("Failed to load services. Please try again later.");
      throw err;
    }
  };

  const fetchTitle = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/mainTitle`);
      if (!response.ok) throw new Error("Failed to fetch title");
      const data = await response.json();
      if (data.status === 1) {
        const serviceTitle = data.data.find(item => item.name === 'Service');
        if (serviceTitle) setService(serviceTitle);
      }
      return data;
    } catch (err) {
      setError("Failed to load title. Please try again later.");
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchServices(), fetchTitle()]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 10
        }
      }
    }
  };

  const ServiceCard = ({ service }) => (
    <motion.div
      variants={animations.item}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(39%-1rem)] lg:w-[calc(25%-1rem)] p-6"
    >
      <div className="relative h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-color1/20 to-transparent rounded-bl-[50%]" />
        
        <div className="p-8">
          <div className="mb-6 text-color1">
            <i className={`fas ${service.icon} text-5xl md:text-6xl`} />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {en ? service.title : service.title_am}
          </h3>
          
          <p className="text-gray-600 mb-8 min-h-[80px]">
            {en ? service.description : service.description_am}
          </p>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-color1 text-white rounded-xl font-semibold
                     hover:bg-color1/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>{en ? "Learn More" : "ተጨማሪ ያንብቡ"}</span>
            <i className="fas fa-arrow-right ml-2" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );

  const ServiceHeader = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <span className="inline-block px-4 py-2 bg-color1/10 text-color1 rounded-full text-sm font-medium mb-4">
        {en ? "Our Services" : "አገልግሎታችን"}
      </span>
      
      <h2 className="text-4xl md:text-5xl font-bold text-color1 display-1 mb-6">
        {en ? "What We Offer" : "የምናቀርባቸው አገልግሎቶች"}
      </h2>
      
      <p className="max-w-2xl mx-auto text-gray-600">
        {en 
          ? "Discover our comprehensive range of educational services designed to nurture and develop young minds."
          : "ለወጣት አእምሮዎች እድገትና እድገት የተዘጋጁ ሁሉንም የሚያካትቱ የትምህርት አገልግሎቶቻችንን ይፋ አድርገናል።"
        }
      </p>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-color1/20 border-t-color1 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isHome && <Hero eng="Services" amh="አገልግሎታችን"/>}
      
      <div className="bg-gradient-to-b from-white to-gray-50 py-20 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-1/3 h-full bg-gradient-to-l from-color1/10 to-transparent skew-x-12"></div>
      <div className="sm:block hidden absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-color1/10 to-transparent skew-x-12 overflow-hidden"></div>
        <div className=" mx-0 px-4 py-10">
          <ServiceHeader />
          
          <AnimatePresence>
            <motion.div
              variants={animations.container}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-8"
            >
              {a_Service.slice(1,4).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Service;
