import Hero1 from '../assets/img/hero7.webp'
import { motion } from 'framer-motion';
import useStore from '../store/store';
import { useLocation } from 'react-router-dom';

const Hero = ({ eng, amh }) => {
  const en = useStore((state) => state.en);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    transition: { duration: 0.3 }
  };

  return (
    <>
    {!isHome ? (
      <motion.div 
        {...fadeIn}
        className="container-fluid py-5 max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Hero1})`,
        }}
      >
        <motion.h1 
          {...slideUp}
          className="text-6xl md:text-8xl font-black display-6 text-white tracking-tight"
        >
          {en ? eng : amh}
        </motion.h1>
      </motion.div>
    ) : (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative w-full md:h-[calc(100vh-4rem)] overflow-hidden"
      >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="container-fluid py-5 max-h-[16rem] sm:max-h-[26rem] md:max-h-[56rem] min-h-fit bg-contain bg-center hero-header flex justify-center items-center"
            style={{
              backgroundImage: `linear-gradient(rgba(204, 85, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Hero1})`,
            }}
          >
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  className="max-w-6xl"
                >
                  {en ? (
                    <motion.h1 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="text-3xl sm:text-4xl md:text-5xl  display-6 lg:text-[6rem] xl:text-[8rem] text-white font-black leading-tight mb-8 transition-all duration-300"
                    >
                      Yeneta <br /> Multicultural School <br />
                      for Your Kids!
                    </motion.h1>
                  ) : (
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-black leading-tight mb-8 transition-all duration-300"
                    >
                      ለልጆችዎ በጣም ጥሩ ቦታ እና የተሻለ እንክብካቤ የሚያገኙበት
                    </motion.h1>
                  )}

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="flex flex-wrap gap-4"
                  >
                    {en ? (
                      <>
                        <motion.a
                          whileHover={buttonHover}
                          href="/programs"
                          className="inline-flex items-center px-6 py-3 text-base sm:text-lg md:text-xl font-bold text-white bg-secondary  hover:bg-secondary/90 transition duration-300 rounded-full rounded-tr-[1px] rounded-bl-[10px]"
                        >
                          Get Started
                        </motion.a>
                        <motion.a
                          whileHover={buttonHover}
                          href="/about"
                          className="inline-flex items-center px-6 py-3 text-base sm:text-lg md:text-xl font-bold text-white bg-secondary  hover:bg-secondary/90 transition  rounded-tl-[20px] rounded-br-[20px] duration-300 display-1"
                        >
                          Learn More
                        </motion.a>
                      </>
                    ) : (
                      <>
                        <motion.a
                          whileHover={buttonHover}
                          href="/programs"
                          className="inline-flex items-center px-6 py-3 text-base sm:text-lg md:text-xl font-bold text-white bg-secondary rounded-lg hover:bg-secondary/90 transition duration-300"
                        >
                          ለመገመር
                        </motion.a>
                        <motion.a
                          whileHover={buttonHover}
                          href="/about"
                          className="inline-flex items-center px-6 py-3 text-base sm:text-lg md:text-xl font-bold text-white bg-secondary rounded-lg hover:bg-secondary/90 transition duration-300 "
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
        </motion.div>
    )}
    </>
  );
};

export default Hero;
