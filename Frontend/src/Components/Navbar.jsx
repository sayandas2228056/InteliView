import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/Logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeNav, setActiveNav] = useState('Home');

    // Memoize nav items to prevent unnecessary re-renders
    const navItems = useMemo(() => [
        { name: 'Home', path: '/', isExternal: false },
        { name: 'About', path: '/about', isExternal: false },
        { name: 'Contact', path: '/contact', isExternal: false },
        { name: 'Resume-ATS', path: '/resume', isExternal: false },
        { name: 'Dashboard', path: '/dashboard', isExternal: false },
        { name: 'AI-Guide', path: '/interview-prep', isExternal: false },
        { name: 'AI-Test', path: '/mock-test', isExternal: false },
    ], []);

    // Update active nav based on current route
    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = navItems.find(item => 
            item.path === currentPath || 
            (item.path !== '/' && currentPath.startsWith(item.path))
        );
        if (activeItem) {
            setActiveNav(activeItem.name);
        }
    }, [location.pathname, navItems]);

    // Throttle scroll handler
    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 20);
    }, []);

    // Add scroll event listener with passive: true for better performance
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleLogout = useCallback(() => {
        logout();
        navigate('/');
        setIsOpen(false);
    }, [logout, navigate]);

    const handleNavClick = useCallback((name) => {
        setActiveNav(name);
        setIsOpen(false);
    }, []);

    const navLinkClass = useCallback((isActive) => 
        `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 group ${
            isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'
        }`, []);

    const mobileNavLinkClass = useCallback((isActive) => 
        `block w-full text-left px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 ${
            isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'
        }`, []);

    return (
        <nav 
            className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
                isScrolled ? 'py-2' : 'py-0'
            }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className={`transition-all duration-300 ease-out ${
                isScrolled 
                    ? 'bg-black/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 rounded-2xl mx-2' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo - Using picture element for responsive images */}
                        <Link to="/" className="shrink-0 flex items-center gap-3 group" aria-label="Home">
                            <div className="relative w-8 h-8">
                                <img 
                                    src={Logo} 
                                    alt="InteliView Logo" 
                                    className="w-full h-full object-cover rounded-2xl"
                                    width={32}
                                    height={32}
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>
                            <span className="text-xl font-semibold text-white hover:text-white/80 transition-colors duration-200">
                                InteliView
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <ul className="flex items-center space-x-1">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        {item.isExternal ? (
                                            <a
                                                href={item.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={navLinkClass(activeNav === item.name)}
                                                onClick={() => handleNavClick(item.name)}
                                            >
                                                {item.name}
                                            </a>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className={navLinkClass(activeNav === item.name)}
                                                onClick={() => handleNavClick(item.name)}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                                
                                <li className="ml-4 pl-4 border-l border-white/10">
                                    {user ? (
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                to="/profile"
                                                className="relative bg-orange-500 text-black hover:bg-orange-400 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden group"
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="relative border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden"
                                                aria-label="Logout"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="relative bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden"
                                        >
                                            Sign In
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-200 active:scale-95"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            {isOpen ? (
                                <X className="h-5 w-5 text-white" />
                            ) : (
                                <Menu className="h-5 w-5 text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div 
                    id="mobile-menu"
                    className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
                        isOpen 
                            ? 'max-h-screen opacity-100' 
                            : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isOpen}
                >
                    <div className="px-4 pb-6 space-y-2 bg-black/95 backdrop-blur-xl border-t border-white/10">
                        <ul className="space-y-2">
                            {navItems.map((item, index) => (
                                <li key={item.name}>
                                    {item.isExternal ? (
                                        <a
                                            href={item.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleNavClick(item.name)}
                                            className={mobileNavLinkClass(activeNav === item.name)}
                                            style={{ 
                                                transitionDelay: `${index * 30}ms`,
                                                transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                                                opacity: isOpen ? 1 : 0
                                            }}
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            onClick={() => handleNavClick(item.name)}
                                            className={mobileNavLinkClass(activeNav === item.name)}
                                            style={{ 
                                                transitionDelay: `${index * 30}ms`,
                                                transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                                                opacity: isOpen ? 1 : 0
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        
                        <div className="pt-4 border-t border-white/10 space-y-2">
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="block w-full bg-orange-500 text-black hover:bg-orange-400 px-6 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 text-center shadow-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10 px-6 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 text-center shadow-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block w-full bg-white text-black hover:bg-white/90 px-6 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 text-center shadow-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Navbar);