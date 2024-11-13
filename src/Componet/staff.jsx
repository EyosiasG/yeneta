import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useStore from '../store/store';
import Hero from './hero';

const Staff = ({ isHome = false }) => {
  const {
    en,
    setA_Testimonials,
    setA_Event,
    setA_Aboutus,
    setA_Program,
    setA_Staff,
    setA_Ceo,
    setA_Contactus,
    setAbout_link,
    setAboutImgUrl,
    setAboutDescriptionAm,
    setAboutDescription,
    setService,
    setProgram,
    setEvent,
    setBlog,
    setStaff,
    setTestimonials,
    setGallery,
    a_Staff,
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (endpoint) => {
    const response = await fetch(`${import.meta.env.VITE_API}/api/${endpoint}`);
    return response.json();
  };

  const handleEndpointData = (data, endpoint) => {
    if (data.status !== 1) return;

    const handlers = {
      Testimonial: () => setA_Testimonials(data.data),
      Events: () => setA_Event(data.data),
      aboutus: () => {
        setA_Aboutus(data.data);
        const aboutData = data.data[0];
        setAbout_link(aboutData.link);
        setAboutImgUrl(aboutData.img_url);
        setAboutDescriptionAm(aboutData.description_am);
        setAboutDescription(aboutData.description);
      },
      programs: () => setA_Program(data.data),
      Staff: () => {
        setA_Staff(data.data);
        const ceo = data.data.find(item => item.position === "CEO");
        if (ceo) setA_Ceo(ceo);
      },
      contactus: () => setA_Contactus(data.data),
      mainTitle: () => handleMainTitles(data.data)
    };

    handlers[endpoint]?.();
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = [
          'Testimonial',
          'Events', 
          'aboutus',
          'programs',
          'Staff',
          'contactus',
          'mainTitle'
        ];

        const responses = await Promise.all(
          endpoints.map(endpoint => fetchData(endpoint))
        );

        responses.forEach((data, index) => {
          handleEndpointData(data, endpoints[index]);
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleMainTitles = (data) => {
    const titleSetters = {
      'Aboutus': setAboutus,
      'Service': setService, 
      'Program': setProgram,
      'Event': setEvent,
      'Blog': setBlog,
      'Staff': setStaff,
      'Testimonials': setTestimonials,
      'Gallery': setGallery
    };

    data.forEach(item => {
      titleSetters[item.name]?.(item);
    });
  };

  const renderLoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-color1 rounded-full animate-ping absolute"></div>
        <div className="w-20 h-20 border-4 border-color1 rounded-full animate-pulse"></div>
      </div>
    </div>
  );

  const renderCEOSection = () => (
    a_Staff
      .filter(member => member.position === "CEO")
      .map((member, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-color1/10 to-transparent -skew-x-12"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-12 relative z-10">
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-color1 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}/${member.image}`}
                    className="relative w-full rounded-2xl shadow-xl"
                    alt={member.name}
                  />
                </div>
                <motion.a 
                  href="Biography"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block text-center bg-gradient-to-r from-color1 to-purple-600 text-white py-4 px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Biography
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-color1 to-purple-600">
                  {member.name}
                </h3>
                <p className="text-2xl font-semibold text-gray-700">{en ? member.subtitle : member.subtitle_am}</p>
                <p className="text-lg text-color1">{member.social_link}</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-inner">
                  <h4 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    ✨ Welcome to Yeneta Language and Cultural Academy ✨
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {en ? member.details : member.details_am}
                  </p>
                  <div className="mt-8 text-right border-t pt-6 border-gray-200">
                    <p className="font-bold text-gray-800 space-y-1">
                      <span className="block">Warm regards,</span>
                      <span className="block text-xl text-color1">{member.name}</span>
                      <span className="block text-gray-600">{en ? member.subtitle : member.subtitle_am}</span>
                      <span className="block italic">Yeneta Language and Cultural Academy</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))
  );

  const renderTeamMember = (member, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative transform transition-all duration-300 group-hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-r from-color1 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <motion.div
          className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
          style={{ width: '280px', height: '400px' }}
        >
          <div className="h-3/4 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${member.image}`}
              alt={en ? member.name : member.name_am}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-sm p-6 space-y-2">
            <h4 className="text-xl font-bold text-gray-800 group-hover:text-color1 transition-colors">
              {en ? member.name : member.name_am}
            </h4>
            <p className="text-color1 font-medium">
              {en ? member.position : member.position_am}
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="fas fa-envelope text-color1"></i>
              <p className="text-sm truncate">{member.social_link}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return renderLoadingSpinner();
  }

  return (
    <>
      {!isHome && <Hero eng="Staff" amh="ሰራተኞች"/>}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-6 py-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-20"
          >
            <h2 className="inline-block px-8 py-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-color1 to-purple-600 border-b-4 border-color1 rounded-xl">
              {en ? "Meet Our Leadership" : "የእኛ አመራር"}
            </h2>
          </motion.div>

          {renderCEOSection()}

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-32"
          >
            <h2 className="text-4xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-color1 to-purple-600">
              {en ? 'Our Amazing Team' : 'የእኛ ቡድኖች'}
            </h2>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 px-4 scrollbar-hide">
              <div className="flex gap-8">
                {a_Staff
                  .filter(member => member.position !== "CEO")
                  .map((member, index) => renderTeamMember(member, index))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Staff;
