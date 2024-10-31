import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const FadeRight = ({ children }) => {
    const { ref, inView } = useInView({
      triggerOnce: true, // Trigger animation only once
      threshold: 0.5, // Trigger when 50% of the element is in view
    });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };
  
  export default FadeRight;
