import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        
        {/* Left Section - Brand + Newsletter */}
        <div className="space-y-6">
          <h3 className="text-4xl font-extrabold text-white">InteliView.</h3>
          <p className="text-gray-400">AI-powered Interview Preparation Platform</p>
          
          <div className="flex space-x-4 pt-4">
            <a href="https://github.com/sayandas2228056" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sayan-das-b99810213/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:sayandas010124@gmail.com" className="text-gray-400 hover:text-orange-400 transition">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Middle Section - Navigation */}
        <div className="space-y-6">
          <ul className="space-y-2 text-white">
            <li><a href="/" className="hover:text-orange-400 font-semibold">Home</a></li>
            <li><a href="/about" className="hover:text-orange-400">About</a></li>
            <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
            <li><a href="/dashboard" className="hover:text-orange-400">Dashboard</a></li>
          </ul>
        </div>

        {/* Right Section - Locations */}
        <div className="space-y-8">
          <div>
            <h4 className="font-semibold text-white mb-1">Location</h4>
            <p className="text-gray-400">KIIT UNIVERSITY <br />Bhubaneswar ,India</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Made By </h4>
            <a href="https://sayan-das-03.vercel.app/"><p className="text-gray-400 font-bold"><br />Sayan Das</p></a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center text-gray-500 text-xs py-6 border-t border-gray-800">
        © Copyright 2025 – InteliView. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
