import { motion } from 'framer-motion';
import useStore from '../store/store';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import hero from '../assets/img/hero0.jpeg'

const Hero = ({ eng, amh }) => {
  const en = useStore((state) => state.en);
  const location = useLocation();
    const isHome = location.pathname === '/';

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 }
  };

  const slideUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.5, duration: 0.8 }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, ease: "easeInOut" }
  };

  const heroImages = {
    subpage: hero,
    home: hero
  };

  return (
    <>
      {!isHome ? (
        <motion.div 
          {...fadeIn}
          className="container-fluid py-5 max-h-[16rem] sm:max-h-[26rem] md:max-h-[36rem] min-h-fit bg-cover bg-center hero-header flex justify-center items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 140, 0, 0.3), rgba(255, 140, 0, 0.3)), url('${heroImages.subpage}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <div className='flex flex-col items-center'>
            <motion.h1 
              {...fadeIn}
              className="text-6xl md:text-8xl font-black display-6 text-white tracking-tight text-center"
            >
              {en ? eng : amh}
            </motion.h1>
            <motion.div 
              {...slideUp}
              className="w-32 h-2 bg-orange-500 rounded-full mt-6"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div 
          {...pageTransition}
          className="relative w-full h-screen overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center transform"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 140, 0, 0.2), rgba(255, 140, 0, 0.2)), url('${heroImages.home}')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/40 to-orange-400/40" />
          </motion.div>

          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                {en ? (
                  <motion.div className="space-y-8">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-black leading-tight"
                    >
                      Yeneta <br/>
                      <span className="text-orange-500 inline-block transform hover:scale-105 transition-transform duration-300">
                        Multicultural
                      </span> <br/>
                      School
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 1.2 }}
                      className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed"
                    >
                      Nurturing young minds with Ethiopian values and global perspectives
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div className="space-y-8">
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-black leading-tight"
                    >
                      ለልጆችዎ <br/>
                      <span className="text-orange-500 inline-block transform hover:scale-105 transition-transform duration-300">
                        በጣም ጥሩ ቦታ
                      </span> <br/>
                      እና የተሻለ እንክብካቤ የሚያገኙበት
                    </motion.h1>
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="flex flex-wrap gap-6 mt-12"
                >
                  {en ? (
                    <>
                      <motion.a
                        whileHover={buttonHover}
                        whileTap={{ scale: 0.95 }}
                        href="/programs"
                        className="px-8 py-4 text-lg font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg transition duration-300 flex items-center gap-2"
                      >
                        <span>Explore Programs</span>
                        <i className="fas fa-arrow-right"></i>
                      </motion.a>
                      <motion.a
                        whileHover={buttonHover}
                        whileTap={{ scale: 0.95 }}
                        href="/about"
                        className="px-8 py-4 text-lg font-bold text-white border-2 border-white hover:bg-white/10 rounded-full shadow-lg transition duration-300"
                      >
                        Learn More
                      </motion.a>
                    </>
                  ) : (
                    <>
                      <motion.a
                        whileHover={buttonHover}
                        whileTap={{ scale: 0.95 }}
                        href="/programs"
                        className="px-8 py-4 text-lg font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg transition duration-300 flex items-center gap-2"
                      >
                        <span>ፕሮግራሞችን ይመልከቱ</span>
                        <i className="fas fa-arrow-right"></i>
                      </motion.a>
                      <motion.a
                        whileHover={buttonHover}
                        whileTap={{ scale: 0.95 }}
                        href="/about"
                        className="px-8 py-4 text-lg font-bold text-white border-2 border-white hover:bg-white/10 rounded-full shadow-lg transition duration-300"
                      >
                        የበለጠ ለማወቅ
                      </motion.a>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Hero;
