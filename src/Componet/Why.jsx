import mission from '../assets/img/mission.webp'
import values from '../assets/img/values.webp'
import vision from '../assets/img/vision.webp'
import Hero1 from '../assets/img/hero7.webp'
import React, { useEffect } from 'react';
import useStore from '../store/store';
import { motion } from 'framer-motion';
import Hero from './hero';

const Why = () => {
  const en = useStore((state) => state.en);
  const { setA_Why, a_Why } = useStore();

  const fetchWhy = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/why`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.status === 1) setA_Why(data.data);
    } catch (error) {
      console.error("Error fetching why data:", error);
    }
  };

  useEffect(() => {
    fetchWhy();
  }, []);

  return (
    <>
      <Hero eng="Why Yeneta" amh="ለምን የኔታ"/>

      <div className="bg-gradient-to-b from-gray-100 to-white py-20 about">
        <div className="max-w-7xl mx-auto px-4">
          {a_Why.map((Why, index) => (
            <div key={index} className="space-y-20">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/40 bg-blend-color-burn bg-blur-lg rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="flex items-center justify-center">
                    <img src={mission} className="w-64 h-64 rounded-full shadow-xl object-cover transform hover:rotate-3 transition-transform duration-300" alt="Mission" />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-yellow-500">
                      {en ? "Our Mission" : "ተልእኮታችን"}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {en ? Why.mission : Why.mission_am}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/40 bg-blend-color-burn bg-blur-lg rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="flex items-center justify-center md:order-2">
                    <img src={vision} className="w-64 h-64 rounded-full shadow-xl object-cover transform hover:rotate-3 transition-transform duration-300" alt="Vision" />
                  </div>
                  <div className="space-y-6 md:order-1">
                    <h2 className="text-4xl font-bold text-yellow-500">
                      {en ? "Our Vision" : "ራዕያችን"}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {en ? Why.Vision : Why.Vision_am}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/40 bg-blend-color-burn bg-blur-lg rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="flex items-center justify-center">
                    <img src={values} className="w-64 h-64 rounded-full shadow-xl object-cover transform hover:rotate-3 transition-transform duration-300" alt="Values" />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-yellow-500">
                      {en ? "Our Goals" : "እንዲህ ነው ዓላማችን"}
                    </h2>
                    <div className="text-gray-700 leading-relaxed">
                      {en 
                        ? Why.value.split('\n').map((line, i) => (
                            <p key={i} className="mb-2">{line}</p>
                          ))
                        : Why.value_am.split('\n').map((line, i) => (
                            <p key={i} className="mb-2">{line}</p>
                          ))
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Why;
