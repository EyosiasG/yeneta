import Hero1 from '../assets/img/hero7.webp'
import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store/store';
import PopOutPlayer from './PopOutPlayer';
import bg from '../assets/img/abvid.webp'
import { motion } from 'framer-motion';

const Cast = () => {
  const en = useStore((state) => state.en);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      title: "Early Life & Cultural Roots",
      content: "Born in the vibrant city of Addis Ababa, Ethiopia, Rakeb grew up immersed in the rich tapestry of Ethiopian traditions, music, and languages. Her childhood was marked by the melodious sounds of traditional instruments and the warmth of community gatherings, which would later inspire her life's mission. After completing her early education in Ethiopia, she pursued an unconventional path that combined her passion for culture with formal academic achievements. Her academic journey includes specialized training in Marketing Management, an innovative degree in Management Information Systems, and expertise in Medical Technology - a unique combination that reflects her multifaceted approach to education and community building."
    },
    {
      title: "The Birth of a Vision",
      content: "While working in the healthcare sector, Rakeb noticed a growing disconnect between young Ethiopian-Americans and their cultural heritage. This observation sparked a transformative idea: creating a space where children could experience the magic of Ethiopian culture through interactive learning. This led to the establishment of Yeneta Language and Cultural Academy in Silver Spring, Maryland - not just as a school, but as a cultural sanctuary where young minds aged 4-14 can explore their roots through language, music, and traditions."
    },
    {
      title: "Innovative Teaching Philosophy",
      content: "Rakeb's teaching methodology is revolutionary in its approach. She has developed a unique curriculum that weaves together language instruction, musical training, and cultural storytelling. Her students don't just learn Amharic or Tigrinya; they experience it through traditional songs, interactive plays, and cultural festivals. The academy's signature program includes hands-on experience with traditional Ethiopian instruments, making it one of the few institutions in America offering such comprehensive cultural education."
    },
    {
      title: "Community Impact & Leadership",
      content: "Beyond the classroom, Rakeb has emerged as a cultural ambassador, bridging generational and cultural gaps within the Ethiopian-American community. She organizes cultural showcases, parent-child workshops, and community events that bring together families to celebrate their heritage. Her work has created a ripple effect, inspiring other communities to establish similar cultural education programs. Through her leadership, she has built a network of cultural educators and mentors who share her vision of preserving Ethiopian heritage in the diaspora."
    },
    {
      title: "Future Aspirations",
      content: "Looking ahead, Rakeb envisions expanding the academy's impact through digital learning platforms and satellite campuses. She is developing an innovative online curriculum that will make Ethiopian cultural education accessible to families worldwide. Her ultimate goal is to create a global network of cultural learning centers that preserve and celebrate Ethiopian heritage while adapting to modern educational needs. Through these initiatives, she continues to build bridges between generations and cultures, ensuring that Ethiopian traditions remain vibrant and relevant in the 21st century."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${bg})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1 
            className="text-6xl font-bold text-center text-yellow-500 mb-20 font-serif"
            {...fadeIn}
          >
            A Journey of Cultural Preservation
          </motion.h1>

          <div className="space-y-16 ">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-white/75 backdrop-blur-sm rounded-2xl shadow-2xl p-10 hover:shadow-yellow-200/20 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h2 className="text-4xl font-semibold text-secondary mb-8 border-b-4 border-yellow-100 pb-4 font-serif">
                  {section.title}
                </h2>
                <p className="text-gray-800 leading-loose text-xl font-light">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cast;
