import React, { useCallback, useEffect, useState, useMemo } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  ExternalLink,
  Copy,
  Check,
  Linkedin,
  Github
} from "lucide-react";

const Conx = () => {
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Memoize contact information
  const contactInfo = useMemo(() => [
    { 
      type: 'phone',
      label: 'Phone',
      value: '+91 8918577218',
      icon: Phone,
      href: 'tel:+918918577218',
      color: 'orange'
    },
    {
      type: 'email',
      label: 'Email',
      value: 'sayandas010124@gmail.com',
      secondaryValue: 'offcsayantubecode@gmail.com',
      icon: Mail,
      color: 'orange'
    },
    {
      type: 'location',
      label: 'Location',
      value: 'KIIT University, Bhubaneshwar-751024, India',
      icon: MapPin,
      color: 'orange'
    }
  ], []);

  // Memoize social links
  const socialLinks = useMemo(() => [
    {
      platform: 'WhatsApp',
      url: 'https://wa.me/918918577218',
      icon: MessageCircle,
      color: 'green'
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/__sdx__007/',
      icon: Instagram,
      color: 'pink'
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/offcsayantubecode',
      icon: Facebook,
      color: 'blue'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/sayandas2228056',
      icon: Github,
      color: 'gray'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sayan-das-b99810213/',
      icon: Linkedin,
      color: 'blue'
    }
  ], []);

  // Memoize contact cards
  const contactCards = useMemo(() => [
    {
      label: "primary-card",
      color: "from-orange-500 to-orange-700",
      email: "sayandas010124@gmail.com",
      description: "Reach out for professional inquiries, project collaborations, or any questions about my work and services."
    },
    {
      label: "secondary-card",
      color: "from-orange-600 to-yellow-500",
      email: "offcsayantubecode@gmail.com",
      description: "Contact for general inquiries, personal collaborations, or informal discussions about potential opportunities."
    }
  ], []);

  // Handle copy to clipboard
  const copyToClipboard = useCallback((text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedEmail(type);
      
      const timer = setTimeout(() => {
        setCopiedEmail(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
      
      return () => {
        elements.forEach(el => observer.unobserve(el));
        observer.disconnect();
      };
    }
  }, []);

  // Contact info item component
  const ContactInfoItem = useCallback(({ icon: Icon, label, value, secondaryValue, href, color }) => (
    <div className="flex items-start transition-all duration-300 transform hover:translate-x-2">
      <div className={`p-2.5 mr-3 sm:mr-4 transition-all duration-300 bg-${color}-600 rounded-lg bg-opacity-20 hover:bg-opacity-40 hover:scale-110`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${color}-400`} />
      </div>
      <div className="flex-1">
        <h4 className="mb-1 text-xs sm:text-sm text-gray-400">{label}</h4>
        {href ? (
          <a 
            href={href} 
            className="flex items-center text-sm sm:text-base font-medium text-gray-200 transition-colors hover:text-orange-300"
          >
            {value}
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transition-transform duration-300 opacity-70 group-hover:translate-x-0.5" />
          </a>
        ) : label === 'Email' ? (
          <div className="space-y-2">
            {[value, secondaryValue].filter(Boolean).map((email, idx) => (
              <div key={idx} className="flex flex-wrap items-center justify-between gap-1.5 group">
                <a 
                  href={`mailto:${email}`} 
                  className="relative flex items-center overflow-hidden text-sm sm:text-base font-medium text-gray-200 transition-colors hover:text-orange-300"
                >
                  <span className="relative z-10">{email}</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transition-transform duration-300 opacity-70 group-hover:translate-x-0.5" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <button 
                  onClick={() => copyToClipboard(email, `${label}-${idx}`)}
                  className="p-1 transition-all duration-300 transform rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-700 hover:scale-110"
                  aria-label={`Copy ${email}`}
                >
                  {copiedEmail === `${label}-${idx}` ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm sm:text-base font-medium text-gray-200">{value}</p>
        )}
      </div>
    </div>
  ), [copiedEmail, copyToClipboard]);

  // Social link component
  const SocialLink = useCallback(({ icon: Icon, url, color, platform }) => (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 sm:p-3 transition-all duration-300 transform bg-${color}-600 rounded-lg bg-opacity-20 hover:bg-opacity-30 hover:scale-110 hover:rotate-6`}
      aria-label={platform}
    >
      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${color}-400`} />
    </a>
  ), []);

  // Contact card component
  const ContactCard = useCallback(({ label, color, email, description }) => (
    <div 
      className={`overflow-hidden transition-all duration-300 bg-gray-900 border border-gray-700 shadow-md bg-opacity-40 rounded-xl group hover:border-orange-500 transform ${
        activeCard === label ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setActiveCard(label)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <div 
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 transition-all duration-500 rounded-full bg-opacity-20 group-hover:scale-110 ${
              activeCard === label ? 'animate-pulse' : ''
            }`}
            style={{ backgroundColor: label === "primary-card" ? "rgba(249, 115, 22, 0.2)" : "rgba(234, 88, 12, 0.2)" }}
          >
            <Mail className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-400 transition-all duration-500 ${
              activeCard === label ? 'animate-bounce' : ''
            }`} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-200">
              {label === "primary-card" ? "Primary Email" : "Secondary Email"}
            </h4>
            <p className="text-xs sm:text-sm text-gray-400">{email}</p>
          </div>
        </div>
        <p className="mb-4 sm:mb-6 text-sm text-gray-300">{description}</p>
        <div className="p-3 sm:p-4 transition-all duration-300 bg-gray-800 border-t border-gray-700 bg-opacity-40 group-hover:bg-opacity-60">
          <div className="flex flex-col gap-2 sm:gap-3">
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Hello+from+your+website`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center bg-linear-to-r ${color} text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:brightness-110 transition-all duration-300 transform hover:translate-y-1 hover:shadow-lg text-sm sm:text-base`}
            >
              <Mail className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 ${
                activeCard === label ? 'animate-pulse' : ''
              }`} />
              <span>Open Gmail</span>
            </a>
            <button 
              onClick={() => copyToClipboard(email, label)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-200 transition-all duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 hover:scale-105 text-sm sm:text-base"
              aria-label={`Copy ${email}`}
            >
              {copiedEmail === label ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-bounce mx-auto" />
              ) : (
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  ), [activeCard, copyToClipboard]);

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <section 
      className={`px-4 py-12 sm:py-16 text-gray-100 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div 
          className="mb-10 sm:mb-16 text-center animate-on-scroll" 
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
            Get in Touch
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 transition-all duration-700">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat. 
            I'm always open to new ideas and connections!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* Contact Information */}
          <div 
            className="p-4 sm:p-6 md:p-8 transition-all duration-500 bg-black border border-gray-700 shadow-lg backdrop-blur-md bg-opacity-30 rounded-xl animate-on-scroll hover:shadow-orange-500/20" 
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="relative mb-5 sm:mb-6 text-lg sm:text-xl font-semibold text-orange-300">
              Contact Information
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 animate-expand"></span>
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((item, index) => (
                <ContactInfoItem key={`${item.type}-${index}`} {...item} />
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8 sm:mt-10">
              <h4 className="mb-3 sm:mb-4 text-sm text-gray-400">Connect with me</h4>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {socialLinks.map((social) => (
                  <SocialLink key={social.platform} {...social} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div 
            className="p-4 sm:p-6 md:p-8 transition-all duration-500 bg-black border border-gray-700 shadow-lg backdrop-blur-md bg-opacity-30 rounded-xl animate-on-scroll hover:shadow-orange-500/20" 
            style={{ transitionDelay: "300ms" }}
          >
            <h3 className="relative mb-5 sm:mb-6 text-lg sm:text-xl font-semibold text-orange-300">
              Quick Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 animate-expand"></span>
            </h3>

            <div className="space-y-5 sm:space-y-8">
              {contactCards.map((card, index) => (
                <ContactCard key={`${card.label}-${index}`} {...card} />
              ))}
            </div>

            <div className="p-3 sm:p-4 mt-6 sm:mt-8 transition-all duration-300 bg-gray-800 border border-gray-600 border-dashed rounded-lg bg-opacity-30 backdrop-blur-sm hover:bg-opacity-50 hover:border-orange-500">
              <h4 className="mb-1.5 text-xs sm:text-sm font-medium text-orange-300">Quick Tip</h4>
              <p className="text-xs sm:text-sm text-gray-400">
                Click the "Open Gmail" button to start composing an email directly in your Gmail account.
                You can also click on the copy button to easily copy the email address to your clipboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-expand {
          animation: expandWidth 1.5s ease-in-out infinite alternate;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Optimize transitions for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(Conx);