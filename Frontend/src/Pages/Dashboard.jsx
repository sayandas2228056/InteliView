import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  CpuChipIcon, 
  DocumentTextIcon, 
  TrophyIcon,
  UserCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import StatsCard from '../Components/StatsCard';
import { WeeklyActivityChart, AccuracyChart, ScoreOverTimeChart } from '../Components/ProgressChart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Calendar, Clock, FileText, TrendingUp, 
  Activity, Shield, AlertCircle, CheckCircle, Award
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const navigate = useNavigate();
  const [showAllTests, setShowAllTests] = useState(false);

  useEffect(() => {
    fetchTestResults();
  }, []);

  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const fetchTestResults = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(
        `${backendurl}/api/mock-test/results`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Sort results by completion date, newest first
        const sortedResults = response.data.results.sort((a, b) => 
          new Date(b.completedAt) - new Date(a.completedAt)
        );
        setTestResults(sortedResults);
      }
    } catch (err) {
      console.error('Error fetching test results:', err);
      setError(err.response?.data?.message || 'Failed to fetch test results');
    } finally {
      setLoading(false);
    }
  };

  // Filter out tests with totalQuestions === 0 or invalid finalScore for stats and chart
  const validTests = testResults.filter(test => test.totalQuestions > 0 && !isNaN(test.finalScore) && test.finalScore !== null && test.finalScore !== undefined);

  // Calculate statistics
  const calculateStats = () => {
    if (!validTests.length) return {
      totalTests: 0,
      averageScore: 0,
      highestScore: 0,
      totalTime: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0
    };

    const totalTests = validTests.length;
    const averageScore = validTests.reduce((sum, test) => sum + test.finalScore, 0) / totalTests;
    const highestScore = Math.max(...validTests.map(test => test.finalScore));
    const totalTime = validTests.reduce((sum, test) => sum + (isNaN(test.duration) ? 0 : test.duration), 0);
    const totalQuestions = validTests.reduce((sum, test) => sum + (isNaN(test.totalQuestions) ? 0 : test.totalQuestions), 0);
    const correctAnswers = validTests.reduce((sum, test) => sum + (isNaN(test.correctAnswers) ? 0 : test.correctAnswers), 0);

    return {
      totalTests,
      averageScore: totalTests > 0 ? Math.round(averageScore) : 0,
      highestScore,
      totalTime,
      totalQuestions,
      correctAnswers,
      accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
    };
  };

  const stats = calculateStats();

  // Prepare chart data
  const chartData = validTests.map(test => ({
    name: test.company,
    score: test.totalQuestions > 0 ? Math.round((test.correctAnswers / test.totalQuestions) * 100) : (isNaN(test.finalScore) ? 0 : Math.round(test.finalScore)),
    date: new Date(test.completedAt).toLocaleDateString()
  }));

  // Sort validTests by completedAt descending (most recent first)
  const sortedTests = [...validTests].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const displayedTests = showAllTests ? sortedTests : sortedTests.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900/50 border border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-200">{error}</p>
            </div>
            <button
              onClick={fetchTestResults}
              className="mt-4 px-4 py-2 bg-red-800 text-red-100 rounded-md hover:bg-red-700 transition-colors"
            >
              Retry Please check your internet connection.
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => navigate('/mock-test')}
            className="px-4 py-2 bg-orange-600 text-black rounded-xl hover:bg-orange-700 transition-colors duration-200"
          >
            Take New Test
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-800/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-400/10 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Tests</p>
                <p className="text-2xl font-bold text-white">{stats.totalTests}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-800/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-400/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Accuracy</p>
                <p className="text-2xl font-bold text-white">{stats.accuracy}%</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-800/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-400/10 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Time</p>
                <p className="text-2xl font-bold text-white">{stats.totalTime} min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-800/50">
            <h2 className="text-xl font-bold text-white mb-6">Performance Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-800/50">
            <h2 className="text-xl font-bold text-white mb-6">Recent Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedTests.map((test) => (
                <div
                  key={test._id}
                  className="bg-gray-800/50 rounded-xl p-4 border border-black/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {test.company} - {test.role}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {new Date(test.completedAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-400 capitalize">
                        {test.testType} • {test.experience} Level
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-400">
                        {test.totalQuestions > 0 ? Math.round((test.correctAnswers / test.totalQuestions) * 100) : (isNaN(test.finalScore) ? 0 : Math.round(test.finalScore))}%
                      </p>
                      <p className="text-sm text-slate-400">{test.correctAnswers || 0}/{test.totalQuestions || 0} Correct</p>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
                    {test.answers.map((answer, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-lg p-2 text-center ${
                          answer.isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <p className="text-sm text-slate-300">Q{idx + 1}</p>
                        <p className={`text-lg font-semibold ${
                          answer.isCorrect ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {answer.score}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {validTests.length > 4 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAllTests((prev) => !prev)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  {showAllTests ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security Reminder */}
        
      </div>
    </div>
  );
};

export default Dashboard;
