import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Target, Award } from 'lucide-react';
import '../index.css';

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: '',
    company: '',
    experience: '',
    jobDescription: '',
    skills: '',
    interviewType: 'technical',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/interview-prep/results', { state: { formData } });
  };

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
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500/20 to-orange-500/10 rounded-2xl mb-6">
              <Brain className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Interview
              <br />
              <span className="font-normal">Preparation</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Get personalized questions and tips for your upcoming interview
            </p>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 rounded-2xl blur-sm opacity-50"></div>
            <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Job Role</label>
                    <input
                      type="text"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      placeholder="e.g., Software Engineer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                      placeholder="e.g., Google"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Experience Level</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Job Description</label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors h-32 resize-none"
                    placeholder="Paste the job description here..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Key Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                    placeholder="e.g., React, Node.js, Python"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Interview Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="interviewType"
                        value="technical"
                        checked={formData.interviewType === 'technical'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer peer-checked:border-orange-500/50 peer-checked:bg-orange-500/10 transition-all">
                        <Target className="w-5 h-5 text-orange-500" />
                        <span>Technical</span>
                      </div>
                    </label>
                    <label className="relative">
                      <input
                        type="radio"
                        name="interviewType"
                        value="behavioral"
                        checked={formData.interviewType === 'behavioral'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer peer-checked:border-orange-500/50 peer-checked:bg-orange-500/10 transition-all">
                        <Award className="w-5 h-5 text-orange-500" />
                        <span>Behavioral</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full group px-8 py-4 rounded-xl bg-orange-500 text-black text-lg font-medium hover:bg-orange-400 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Generate Interview Guide
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep; 