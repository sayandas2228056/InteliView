import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const InterviewPrepResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preparationData, setPreparationData] = useState(null);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const generateInterviewPrep = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to access this feature');
          return;
        }

        const response = await axios.post(
          `${backendurl}/api/interview-prep/generate`,
          location.state.formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.data || !response.data.data) {
          throw new Error('Invalid response format from server');
        }

        setPreparationData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to generate interview preparation content');
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.formData) {
      generateInterviewPrep();
    } else {
      setError('No interview preparation data found');
      setLoading(false);
    }
  }, [location.state]);

  const QuestionSection = ({ title, questions, icon }) => (
    <div className="group">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-black via-zinc-900 to-black rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        <div className="relative bg-gradient-to-r from-black via-zinc-900 to-black/60 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-8 hover:border-orange-400/30 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-orange-100">{title}</h3>
          </div>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="group/item">
                <div className="flex items-start p-4 bg-black/60 rounded-xl border border-orange-500/10 hover:border-orange-400/20 hover:bg-black/80 transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center mr-4 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-orange-100/90 leading-relaxed">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
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
          </svg>
        </div>

        <div className="relative z-10 py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 rounded-2xl blur-sm opacity-50"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-12">
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500/30 border-t-orange-500 mx-auto"></div>
                    <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-orange-500/20 border-t-orange-500/50 mx-auto animate-spin" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
                  </div>
                  <h2 className="text-2xl font-medium mb-4 text-white">
                    Generating Your Interview Guide
                  </h2>
                  <p className="text-white/70 text-lg">
                    Creating personalized questions and tips based on your profile...
                  </p>
                  <div className="mt-6 flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-500/70 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-orange-500/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-900 via-red-800 to-red-900 rounded-2xl blur-sm opacity-10"></div>
            <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-red-900/50 shadow-2xl p-12">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-red-900/20 rounded-full flex items-center justify-center">
                    <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
                <p className="text-red-300/80 mb-8 text-lg">{error}</p>
                <button
                  onClick={() => navigate('/interview-prep')}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!preparationData) {
    return (
      <div className="min-h-screen bg-black text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl blur-sm opacity-10"></div>
            <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl p-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-200 mb-4">No Data Available</h3>
                <p className="text-slate-300/80 mb-8 text-lg">Please try generating the interview preparation guide again.</p>
                <button
                  onClick={() => navigate('/interview-prep')}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        </svg>
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500/20 to-orange-500/10 rounded-2xl mb-6">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Your Interview
              <br />
              <span className="font-normal">Guide</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Personalized questions, tips, and strategies to help you ace your upcoming interview
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 mb-12">
            {preparationData.technicalQuestions && preparationData.technicalQuestions.length > 0 && (
              <QuestionSection
                title="Technical Questions"
                questions={preparationData.technicalQuestions}
                icon={
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                }
              />
            )}

            {preparationData.behavioralQuestions && preparationData.behavioralQuestions.length > 0 && (
              <QuestionSection
                title="Behavioral Questions"
                questions={preparationData.behavioralQuestions}
                icon={
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              />
            )}

            {preparationData.companySpecificQuestions && preparationData.companySpecificQuestions.length > 0 && (
              <QuestionSection
                title="Company-Specific Questions"
                questions={preparationData.companySpecificQuestions}
                icon={
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />
            )}

            {preparationData.tipsForSuccess && preparationData.tipsForSuccess.length > 0 && (
              <QuestionSection
                title="Tips for Success"
                questions={preparationData.tipsForSuccess}
                icon={
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                }
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/interview-prep')}
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-slate-800/25 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-700/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Generate New Guide</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepResults; 