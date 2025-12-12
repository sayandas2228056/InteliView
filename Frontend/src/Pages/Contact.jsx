import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Conx from '../Components/Contx';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-800 to-black">
      

      
      {/* Contact Information Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Conx />
      </motion.div>

      
    </div>
  );
};

export default Contact;
