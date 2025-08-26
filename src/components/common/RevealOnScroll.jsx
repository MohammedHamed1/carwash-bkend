import React from 'react';
import { motion } from 'framer-motion';

const RevealOnScroll = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: "easeOut"
    }}
  >
    {children}
  </motion.div>
);

export default RevealOnScroll; 