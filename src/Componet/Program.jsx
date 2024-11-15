import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Program = ({ isHome = false }) => {
  const {
    en,
    setProgram,
    setA_Program,
    a_Program
  } = useStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/programs`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        if (data.status === 1) {
          setA_Program(data.data);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchMainTitle = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/mainTitle`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (data.status === 1) {
          const sectionSetters = {
            'Program': setProgram,
          };

          data.data.forEach(item => {
            const setter = sectionSetters[item.name];
            if (setter) {
              setter(item);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching main title:", error);
      }
    };

    fetchMainTitle();
  }, [setProgram]);

  const filteredPrograms = a_Program
    .sort((a, b) => a.Course.localeCompare(b.Course))
    .filter((program) => program.title !== "Special class");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrograms = isHome ? filteredPrograms.slice(0, 9) : filteredPrograms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderDotPattern = () => (
    <svg width="400" height="100">
      {[...Array(10)].map((_, i) => (
        [...Array(10)].map((_, j) => (
          <circle 
            key={`${i}-${j}`}
            cx={i * 10 + 5} 
            cy={j * 10 + 5} 
            r="2" 
            fill="#FFA500"
          />
        ))
      ))}
    </svg>
  );

  return (
    <>
      
      <div className="bg-cover bg-center relative min-h-screen overflow-hidden bg-stone-100">
<div className='absolute top-10 left-4 w-full h-full'>


</div>

        <div className="container relative mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h4           className="inline-block px-8 py-3 bg-color1/10 text-color1 rounded-full text-xl font-bold mb-6">
              {en ? "🌟 Our Programs " : "✨ ክፍሎች ✨"}
            </h4>
            <h1 className="mb-8 text-3xl sm:text-4xl lg:text-5xl text-color1 font-bold py-10 px-10 display-1">
              {en ? "Join Our Wonderful World of Learning!" : "አስደሳች የትምህርት ዓለም ይቀላቀሉ!"}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:absolute lg:top-5 lg:-right-24 mx-4 lg:mx-0 mt-8 lg:mt-0 bg-gradient-to-r from-orange-500/90 to-orange-500/90 rounded-full p-4 lg:p-8 max-w-full lg:max-w-md shadow-2xl border-4 lg:border-8 border-dashed border-white/70"
          >
            <div className="text-white text-center space-y-2 lg:space-y-4">
              <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-4 animate-pulse">🎈 Special Announcement 🎈</h3>
              <p className="text-xs lg:text-sm leading-relaxed">
                Join Yeneta's Magical Adventure! 🌈<br/>
                🎯 New Classes: September 16, 2024<br/>
                🎁 Save $20 Monthly - Register Today!<br/>
                👨‍👩‍👧‍👦 Family Bonus: $10 off per additional child<br/>
                ✨ Discover Ethiopian Culture Through Fun & Play! ✨
              </p>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-8 justify-center mt-24">
            {currentPrograms.map((program, index) => (
              <motion.div 
                key={program.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-orange-200 h-[600px] flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}/${program.img_url}`}
                      alt="Program Image"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <motion.div 
                      className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl px-4 py-3 shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 0 }}
                      initial={{ rotate: 12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className="absolute -top-4 -right-4">
                          <motion.div 
                            className="relative group"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="absolute inset-0 bg-red-500 rounded-full blur-md animate-pulse"></div>
                            
                            <motion.div 
                              className="relative bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white text-xs font-bold py-2 px-3 rounded-full shadow-lg border border-white/20 backdrop-blur-sm"
                              animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                                background: ['linear-gradient(to right, #ef4444, #ec4899, #ef4444)']
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <span className="mix-blend-plus-lighter">
                                SAVE $20!
                              </span>
                              
                              <motion.span 
                                className="absolute -top-1 -right-1 text-yellow-300"
                                animate={{ 
                                  opacity: [0, 1, 0],
                                  scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              >
                                ✨
                              </motion.span>
                            </motion.div>
                          </motion.div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold opacity-90 line-through">
                            ${program.price + 20}/month
                          </div>
                          <div className="text-2xl font-bold">
                            ${program.price}
                            <span className="text-sm">/month</span>
                          </div>
                          <div className="text-xs mt-1 font-medium">
                            Limited Time Offer!
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-6 bg-gradient-to-b from-white/90 to-orange-50/90 backdrop-blur-sm flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-pink-600 bg-clip-text text-transparent mb-3">
                        {en ? program.title : program.title_am}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {en
                          ? program.description.substring(0, 160)
                          : program.description_am.substring(0, 120)}...
                      </p>
                    </div>
                    
                    <div className="mt-6 flex gap-3 items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={`${import.meta.env.VITE_IMG_URL}/${program.img_url}`}
                          alt="Teacher"
                          className="w-12 h-12 rounded-full border-4 border-pink-300 hover:border-pink-400 transition-colors duration-300"
                        />
                        <span className="font-medium text-orange-600">
                          {en ? program.teachers : program.teacher_am}
                        </span>
                      </div>
                      <Link
                        to="/details"
                        state={{ items: program }}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-pink-600"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Enroll
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {isHome ? (
            <div className="w-full text-center mt-8">
              <Link
                to="/programs"
                className="inline-block bg-color1 hover:bg-secondary btn2 text-white px-5 py-3 rounded transform scale-100 hover:scale-110 transition duration-300"
              >
                {en ? "View All Programs" : "ሁሉንም ፕሮግራሞች ይመልከቱ"}
              </Link>
            </div>
          ) : (
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i + 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                    currentPage === i + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-orange-500 hover:bg-orange-100'
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Program;
