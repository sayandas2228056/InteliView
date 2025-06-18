import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/Logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navItems = [
        { name: 'Home', path: '/', isExternal: false },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Resume-ATS', path: '/resume', isExternal: false },
        { name: 'Dashboard', path: '/dashboard', isExternal: false },
        { name: 'AI-Guide', path: '/interview-prep', isExternal: false },
        { name: 'AI-Test', path: '/mock-test', isExternal: false },
    ];

    const handleNavClick = (name) => {
        setActiveNav(name);
        setIsOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
            isScrolled 
                ? 'p-4' 
                : ''
        }`}>
            <div className={`transition-all duration-500 ease-out ${
                isScrolled 
                    ? 'bg-black/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 rounded-2xl' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a href="/">
                        <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                    <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <span className="text-xl font-semibold text-white hover:text-white/80 transition-colors duration-200">
                                InteliView
                            </span>
                        </div>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-1">
                                {navItems.map((item) => (
                                    item.isExternal ? (
                                        <a
                                            key={item.name}
                                            href={item.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 group ${
                                                activeNav === item.name
                                                    ? 'text-white bg-white/10'
                                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                            }`}
                                            onClick={() => handleNavClick(item.name)}
                                        >
                                            <span className="relative z-10">{item.name}</span>
                                            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 group ${
                                                activeNav === item.name
                                                    ? 'text-white bg-white/10'
                                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                            }`}
                                            onClick={() => handleNavClick(item.name)}
                                        >
                                            <span className="relative z-10">{item.name}</span>
                                            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                        </Link>
                                    )
                                ))}
                                
                                <div className="ml-4 pl-4 border-l border-white/10">
                                    {user ? (
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                to="/profile"
                                                className="relative bg-orange-500 text-black hover:bg-orange-400 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden group"
                                            >
                                                <span className="relative z-10">Profile</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="relative border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden group"
                                            >
                                                <span className="relative z-10">Logout</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="relative bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl overflow-hidden group"
                                        >
                                            <span className="relative z-10">Sign In</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200 active:scale-95"
                            >
                                {isOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-out ${
                    isOpen 
                        ? 'max-h-[calc(100vh-4rem)] opacity-100' 
                        : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                    <div className="px-4 pb-6 space-y-2 bg-black/95 backdrop-blur-xl border-t border-white/10">
                        {navItems.map((item, index) => (
                            item.isExternal ? (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleNavClick(item.name)}
                                    className={`block w-full text-left px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 transform ${
                                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                                    } ${
                                        activeNav === item.name
                                            ? 'text-white bg-white/10'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => handleNavClick(item.name)}
                                    className={`block w-full text-left px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 transform ${
                                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                                    } ${
                                        activeNav === item.name
                                            ? 'text-white bg-white/10'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                        
                        <div className="pt-4 border-t border-white/10 space-y-2">
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="block w-full bg-orange-500 text-black hover:bg-orange-400 px-6 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 text-center shadow-lg"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10 px-6 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 text-center shadow-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block w-full bg-white text-black hover:bg-white/90 px-6 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 active:scale-98 text-center shadow-lg"
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

export default Navbar;
