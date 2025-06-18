
import React, { useState } from 'react';
import { Star, ChevronRight, Brain, ArrowRight, Play, Users, Target, Award, Zap, Shield, Clock, CheckCircle, Menu } from 'lucide-react';
import Logo from '../assets/Logo.png';  

const InteliViewLanding = () => {
    const [currentSection, setCurrentSection] = useState(0);

    const handleGetStarted = () => {
        console.log("Get Started clicked");
    };

    const handleWatchDemo = () => {
        console.log("Watch Demo clicked");
    };

    const handleScrollDown = () => {
        const sections = document.querySelectorAll('section');
        const nextSection = sections[currentSection + 1];
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(currentSection + 1);
        }
    };

    const features = [
        {
            id: 1,
            title: "AI-Powered Mock Interviews",
            description: "Experience realistic interview scenarios with our advanced AI that adapts to your responses and provides instant feedback on your performance.",
            icon: <Brain className="w-8 h-8 text-white" />
        },
        {
            id: 2,
            title: "Personalized Question Bank",
            description: "Access thousands of role-specific questions tailored to your industry, experience level, and target companies for focused preparation.",
            icon: <Target className="w-8 h-8 text-white" />
        },
        {
            id: 3,
            title: "Performance Analytics",
            description: "Track your progress with detailed analytics, identify improvement areas, and monitor your readiness with comprehensive scoring.",
            icon: <Award className="w-8 h-8 text-white" />
        }
    ];

    const benefits = [
        {
            id: 1,
            title: "Real-time Feedback",
            description: "Get instant feedback on your responses, body language, and communication skills",
            icon: <Zap className="w-8 h-8 text-white" />
        },
        {
            id: 2,
            title: "Secure & Private",
            description: "Your interview sessions and data are completely private and secure",
            icon: <Shield className="w-8 h-8 text-white" />
        },
        {
            id: 3,
            title: "Time Efficient",
            description: "Practice anytime, anywhere with our on-demand interview platform",
            icon: <Clock className="w-8 h-8 text-white" />
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Geometric Background */}
            <div className="absolute inset-0 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <polygon points="200,100 400,50 600,200 500,300 300,250" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
                    <polygon points="700,150 900,100 1000,300 800,400 600,350" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
                    <polygon points="100,400 300,350 500,500 400,600 200,550" fill="none" stroke="white" strokeWidth="1" opacity="0.25"/>
                    <polygon points="800,500 1000,450 1100,600 950,700 750,650" fill="none" stroke="white" strokeWidth="1" opacity="0.15"/>
                </svg>
            </div>

            {/* Side Navigation */}
            <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 rotate-90 origin-center">
                <div className="text-xs tracking-wider text-white/60 font-light">HOMEPAGE</div>
            </div>

            {/* Scroll Indicator */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center">
                <div className="w-px h-20 bg-white/20 mb-4"></div>
                <button 
                    onClick={handleScrollDown}
                    className="w-8 h-8 rounded-full border border-orange-500 flex items-center justify-center bg-orange-500/20 hover:bg-orange-500/30 transition-all duration-300 cursor-pointer group"
                >
                    <ArrowRight className="w-4 h-4 text-orange-500 rotate-90 group-hover:translate-y-1 transition-transform" />
                </button>
                <div className="w-px h-20 bg-white/20 mt-4"></div>
                <div className="mt-8 rotate-90 origin-center">
                    <div className="text-xs tracking-wider text-white/60 font-light whitespace-nowrap">SCROLL DOWN</div>
                </div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center">
                            <div className="mb-12">
                                <img src={Logo} alt="InteliView Logo" className="h-60 mx-auto" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-light mb-8 leading-none">
                                Master <span className="font-normal">Interviews</span>
                                <br />
                                <span className="font-normal">with</span> InteliView
                            </h1>
                            
                            <div className="max-w-2xl mx-auto mb-12">
                                <p className="text-lg text-white/70 leading-relaxed">
                                    Transform your interview skills with cutting-edge AI technology. 
                                    Experience personalized coaching and land your dream job with confidence.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                                <a href="/signup"><button 
                                    onClick={handleGetStarted}
                                    className="group px-12 py-4 rounded-full bg-orange-500 text-black text-lg font-medium hover:bg-orange-400 transition-all duration-300 flex items-center gap-3"
                                >
                                    START FREE TODAY
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                </a>
                                <a href="/dashboard"><button 
                                    onClick={handleWatchDemo}
                                    className="group px-12 py-4 text-lg font-medium text-white hover:text-orange-500 transition-all duration-300 flex items-center gap-3"
                                >
                                    VIEW DASHBOARD
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section - White Theme */}
                <section className="min-h-screen flex items-center px-6 py-20 bg-white text-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-light mb-12 leading-tight text-black">
                                    Discover
                                    <br />
                                    <span className="font-normal">Our</span> Platform
                                </h2>
                                
                                <div className="space-y-8 text-black/70 leading-relaxed">
                                    <p>
                                        At InteliView, we are a collective of talented technologists 
                                        ignited by our unwavering passion for transforming interview 
                                        preparation. With advanced AI technology and innovative solutions, 
                                        we create compelling experiences for job seekers worldwide.
                                    </p>
                                    
                                    <p>
                                        Innovation is at the heart of what we do. Our AI thrives on 
                                        the synergy that arises when cutting-edge technology converges 
                                        with personalized learning, fostering an environment of boundless 
                                        growth. By harnessing our collective expertise, we produce 
                                        extraordinary results that consistently surpass expectations.
                                    </p>
                                </div>

                                <div className="mt-12 flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                                        <Play className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-lg text-black">Revolutionizing Interview Preparation:</div>
                                        <div className="text-black/70">Unleashing AI-Powered Success</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="aspect-square bg-black/5 rounded-2xl p-8 backdrop-blur-sm border border-black/10">
                                    <div className="h-full flex flex-col justify-center space-y-6">
                                        {features.map((feature) => (
                                            <div key={feature.id} className="flex items-center gap-4 p-4 rounded-lg bg-black/5 backdrop-blur-sm">
                                                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                                    {feature.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-black">{feature.title}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="min-h-screen flex items-center px-6 py-20 bg-black">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="mb-16">
                            <p className="text-white/60 mb-4">
                                AI-powered solutions focused on helping your career
                                <br />
                                grow and move forward.
                            </p>
                            
                            <h2 className="text-6xl md:text-8xl font-light mb-8 leading-none">
                                <span className="inline-flex items-center gap-8">
                                    <span className="w-32 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                                        <Users className="w-12 h-12 text-black" />
                                    </span>
                                    Unique
                                </span>
                                <span className="font-normal"> Solutions</span>
                                <br />
                                <span className="font-normal">For Your</span> Career.
                            </h2>
                            <a href="/about">
                            <button 
                                onClick={handleGetStarted}
                                className="group px-12 py-4 rounded-full bg-orange-500 text-black text-lg font-medium hover:bg-orange-400 transition-all duration-300 flex items-center gap-3 mx-auto"
                            >
                                WHAT WE DO
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            </a>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                            <div className="text-left">
                                <h3 className="text-xl font-medium mb-4 text-white">AI-Powered Mock</h3>
                                <h3 className="text-xl font-medium text-white/60">Interviews</h3>
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-medium mb-4 text-white">Personalized Question</h3>
                                <h3 className="text-xl font-medium text-white/60">Bank & Analytics</h3>
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-medium mb-4 text-white">Real-time Feedback</h3>
                                <h3 className="text-xl font-medium text-white/60">and Performance Tracking</h3>
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-medium mb-4 text-white">Career Coaching</h3>
                                <h3 className="text-xl font-medium text-white/60">and Development</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section - White Theme */}
                <section className="min-h-screen flex items-center px-6 py-20 bg-white text-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight text-black">
                                Why Choose
                                <br />
                                <span className="font-normal">InteliView?</span>
                            </h2>
                            <p className="text-lg text-black/70 max-w-2xl mx-auto">
                                Experience the future of interview preparation with our innovative platform
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-12">
                            {benefits.map((benefit) => (
                                <div key={benefit.id} className="text-center group">
                                    <div className="w-20 h-20 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-all duration-300">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-2xl font-medium mb-4 text-black">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-black/70 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section - White Theme */}
                <section className="min-h-screen flex items-center px-6 py-20 bg-black text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight ">
                            Ready to Transform
                            <br />
                            <span className="font-normal">Your Career?</span>
                        </h2>
                        <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of successful professionals who've mastered their interviews with InteliView
                        </p>
                        
                        <div className="flex items-center justify-center gap-8 mb-16">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">10+</div>
                                <div>Active Users</div>
                            </div>
                            <div className="w-px h-16 bg-black/20"></div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">80%</div>
                                <div>Success Rate</div>
                            </div>
                        </div>
                        <a href="/signup">
                        <button 
                            onClick={handleGetStarted}
                            className="group px-16 py-5 rounded-full bg-orange-500 text-white text-xl font-medium hover:bg-orange-400 transition-all duration-300 flex items-center gap-4 mx-auto"
                        >
                            START YOUR SUCCESS STORY
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                        </a>
                    </div>
                            
                </section>
            </div>
        </div>
    );
};

export default InteliViewLanding;