import React, { useMemo } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  // Memoize social links data
  const socialLinks = useMemo(() => [
    {
      name: 'GitHub',
      url: 'https://github.com/sayandas2228056',
      icon: Github,
      label: 'Visit GitHub profile'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sayan-das-b99810213/',
      icon: Linkedin,
      label: 'Connect on LinkedIn'
    },
    {
      name: 'Email',
      url: 'mailto:sayandas010124@gmail.com',
      icon: Mail,
      label: 'Send an email'
    }
  ], []);

  // Memoize navigation links
  const navLinks = useMemo(() => [
    { path: '/', label: 'Home', isActive: true },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/dashboard', label: 'Dashboard' }
  ], []);

  // Memoize current year
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Memoized social icons
  const renderSocialIcons = useMemo(() => (
    <div className="flex space-x-4 pt-4">
      {socialLinks.map(({ url, icon: Icon, label, name }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-gray-400 hover:text-orange-400 transition-colors duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded-full p-1"
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </a>
      ))}
    </div>
  ), [socialLinks]);

  // Memoized navigation links
  const renderNavLinks = useMemo(() => (
    <ul className="space-y-2">
      {navLinks.map(({ path, label, isActive }) => (
        <li key={path}>
          <a 
            href={path}
            className={`block transition-colors duration-300 hover:text-orange-400 focus:outline-none focus:text-orange-400 ${
              isActive ? 'font-semibold text-orange-400' : 'text-white'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  ), [navLinks]);

  return (
    <footer className="bg-black text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left Section - Brand + Social */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            <span className="sr-only">InteliView</span>
            <span aria-hidden="true">InteliView.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            AI-powered Placement Preparation Platform
          </p>
          {renderSocialIcons}
        </div>

        {/* Middle Section - Navigation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Navigation</h3>
          {renderNavLinks}
        </div>

        {/* Right Section - Contact */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
            <address className="not-italic text-gray-400">
              KIIT UNIVERSITY<br />
              Bhubaneswar, India
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Made By</h3>
            <a 
              href="https://sayan-das-03.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-orange-400 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded"
              aria-label="Visit Sayan Das's portfolio"
            >
              Sayan Das
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © {currentYear} – InteliView. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);