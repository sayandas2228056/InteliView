import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Star, TrendingUp, Target, Zap, XCircle, BarChart2, Award, Lightbulb } from 'lucide-react';
import Typewriter from 'typewriter-effect';

const ResumeATSChecker = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [keywordAnalysis, setKeywordAnalysis] = useState({ found: [], missing: [] });
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // Check file type
    if (!selectedFile.type.match(/^(application\/pdf|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload your resume first!");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to analyze your resume');
        return;
      }

      // Check if backend is running
      try {
        const healthCheck = await fetch(`${backendurl}/api/health`);
        if (!healthCheck.ok) {
          throw new Error('Backend server is not responding');
        }
      } catch (error) {
        throw new Error('Cannot connect to the server. Please make sure the backend is running.');
      }

      const res = await fetch(`${backendurl}/api/resume/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 401) {
          setError('Your session has expired. Please log in again.');
        } else if (res.status === 413) {
          setError('File size is too large. Please upload a file smaller than 5MB.');
        } else {
          throw new Error(errorData.message || 'Failed to analyze resume');
        }
        return;
      }

      const data = await res.json();

      if (!data.isResume) {
        setError('The uploaded file does not appear to be a resume. Please upload a valid resume.');
        return;
      }

      setScore(data.score);
      setSuggestions(data.suggestions);
      setAnalysis(data.analysis);
      setStrengths(data.analysis.strengths || []);
      setWeaknesses(data.analysis.weaknesses || []);
      setKeywordAnalysis(data.analysis.keywordAnalysis || { found: [], missing: [] });
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-black p-3 rounded-full">
              <FileText className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="text-5xl font-light bg-white bg-clip-text text-transparent ml-4">
              Resume ATS Checker
            </h1>
          </div>
          <Typewriter options={{
                                            strings: [
                                                "Optimize your resume for Applicant Tracking Systems with AI-powered analysis and get actionable insights"                                            ],
                                            autoStart: true,
                                            loop: true,
                                            deleteSpeed: 50,
                                        }}/>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-800 rounded-lg p-4 max-w-3xl mx-auto">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-200">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-600 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="bg-gray-400/10 p-2 rounded-lg mr-3">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                Upload Your Resume
              </h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-orange-600 bg-black/10' 
                    : 'border-orange-600 hover:border-orange-500'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2 text-lg">
                      {file ? file.name : 'Drop your resume here or click to browse'}
                    </p>
                    <p className="text-sm text-gray-500">Supports PDF and DOCX files (max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-orange-600 hover:bg-orange-40 text-black px-8 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  loading || !file
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black transform hover:scale-105'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Resume...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Analyze Resume
                  </div>
                )}
              </button>
            </div>

            {/* Keyword Analysis - Moved here */}
            {score !== null && (
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <div className="bg-white/10 p-2 rounded-lg mr-3">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  Keyword Analysis
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Found Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {keywordAnalysis.found.map((keyword, index) => (
                        <span key={index} className="px-4 py-2 bg-green-900/30 text-green-400 rounded-full text-sm border border-green-500/20">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {keywordAnalysis.missing.map((keyword, index) => (
                        <span key={index} className="px-4 py-2 bg-red-900/30 text-red-400 rounded-full text-sm border border-red-500/20">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {score !== null ? (
              <div className="space-y-6">
                {/* Score Display */}
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <div className="bg-gray-400/10 p-2 rounded-lg mr-3">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    ATS Score
                  </h2>
                  
                  <div className="text-center">
                    <div className={`text-7xl font-bold ${getScoreColor(score)} mb-4`}>
                      {score}
                      <span className="text-3xl text-gray-400">/100</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-4 mb-4">
                      <div 
                        className={`h-4 rounded-full bg-gradient-to-r ${getScoreBg(score)} transition-all duration-1000`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-lg">
                      {score >= 80 ? 'Excellent! Your resume is well-optimized.' : 
                       score >= 60 ? 'Good, but there\'s room for improvement.' : 
                       'Needs improvement to pass ATS filters.'}
                    </p>
                  </div>
                </div>

                {/* Analysis Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <div className="bg-green-500/10 p-2 rounded-lg mr-3">
                        <Award className="w-5 h-5 text-green-400" />
                      </div>
                      Strengths
                    </h3>
                    <div className="space-y-3">
                      {strengths.map((strength, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <div className="bg-red-500/10 p-2 rounded-lg mr-3">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      </div>
                      Areas for Improvement
                    </h3>
                    <div className="space-y-3">
                      {weaknesses.map((weakness, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300 text-sm">{weakness}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <div className="bg-orange-500/10 p-2 rounded-lg mr-3">
                      <Lightbulb className="w-5 h-5 text-orange-400" />
                    </div>
                    Improvement Suggestions
                  </h3>
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                        <Target className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl text-center">
                <div className="bg-gray-800/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-400">Upload your resume to get detailed ATS compatibility insights</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeATSChecker;