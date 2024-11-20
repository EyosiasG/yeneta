import React, { useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import useStore from "../store/store";
import Hero from "./hero";

// Lazy load components
const Why = lazy(() => import("./whyHome"));
const About = lazy(() => import("./Aboutus")); 
const Service = lazy(() => import("./services"));
const Program = lazy(() => import("./Program"));
const Events = lazy(() => import("./Events"));
const Staff = lazy(() => import("./staff"));
const Testimonial = lazy(() => import("./testimonial"));

const Home = () => {
  const { setAdmin } = useStore();

  useEffect(() => {
    setAdmin(false);
  }, []);

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <>
      <Hero isHome={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div {...fadeInUp}>
          <Why isHome={true} />
        </motion.div>
        <motion.div {...fadeInUp}>
          <About isHome={true} />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Service isHome={true} />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Program isHome={true} />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Events isHome={true} />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Staff isHome={true} />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Testimonial isHome={true} />
        </motion.div>
      </Suspense>
    </>
  );
};

export default Home;
