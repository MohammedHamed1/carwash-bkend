import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

const LoadingSpinner = ({ size = "md", color = "green", text = "جاري التحميل..." }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div 
          className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center border-2 border-green-200 shadow-lg mx-auto mb-8"
          animate={{ 
            rotate: [0, 3, -3, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.img 
            src={logo} 
            alt="PayPass Logo" 
            className="w-20 h-20 object-contain"
            animate={{ 
              scale: [1, 1.08, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner; 