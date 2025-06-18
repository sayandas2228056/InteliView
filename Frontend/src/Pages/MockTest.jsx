import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, AlertCircle, CheckCircle2, Clock, ChevronRight } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-black to-orange-900 py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800/50">
                            <div className="text-center space-y-6">
                                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                                <h2 className="text-3xl font-bold text-white">Something went wrong</h2>
                                <p className="text-slate-300">
                                    An error occurred while processing your test. Please try again.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200"
                                >
                                    Retry Test
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const MockTest = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [testDetails, setTestDetails] = useState({
        company: '',
        role: '',
        experience: '',
        jobDescription: '',
        skills: '',
        testType: 'technical', // technical, behavioral, or mixed
        duration: '30', // in minutes
    });
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [testId, setTestId] = useState(null);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [redirecting, setRedirecting] = useState(false);
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    // Timer effect
    useEffect(() => {
        let timer;
        if (testStarted && !testCompleted && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [testStarted, testCompleted, timeRemaining]);

    useEffect(() => {
        if (testCompleted) {
            setRedirecting(true);
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [testCompleted, navigate]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTimeUp = async () => {
        if (!answerSubmitted && selectedAnswer) {
            await submitAnswer();
        }
        await completeTest();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const startTest = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            console.log('Starting test with data:', testDetails);
            console.log('Using token:', token);

            const response = await axios.post(
                `${backendurl}/api/mock-test/start`,
                testDetails,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Test start response:', response.data);

            if (response.data.success) {
                setQuestions(response.data.test.questions);
                setTestId(response.data.test._id);
                setTestStarted(true);
                setCurrentQuestionIndex(0);
                setTimeRemaining(parseInt(testDetails.duration) * 60);
                setUserAnswers(new Array(response.data.test.questions.length).fill(''));
            }
        } catch (err) {
            console.error('Error starting test:', err);
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            setError(err.response?.data?.message || 'Failed to start test');
        } finally {
            setLoading(false);
        }
    };

    const submitAnswer = async () => {
        if (!selectedAnswer) return;
        
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            // Store the answer locally first
            const newAnswers = [...userAnswers];
            newAnswers[currentQuestionIndex] = selectedAnswer;
            setUserAnswers(newAnswers);
            setAnswerSubmitted(true);

            // Then try to submit to backend
            try {
                const response = await axios.post(
                    `${backendurl}/api/mock-test/submit-answer`,
                    {
                        testId,
                        questionId: questions[currentQuestionIndex]._id,
                        selectedOption: selectedAnswer
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.data.success) {
                    // If we're on the last question, complete the test
                    if (currentQuestionIndex === questions.length - 1) {
                        await completeTest();
                    }
                }
            } catch (err) {
                console.error('Error submitting answer to server:', err);
                // Don't show error to user since we've already stored the answer locally
                // Just log it for debugging
            }
        } catch (err) {
            console.error('Error in submitAnswer:', err);
            setError('Failed to submit answer');
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex === questions.length - 1) {
            // If we're on the last question and answer is submitted, complete the test
            if (answerSubmitted) {
                completeTest();
            } else {
                // If answer is not submitted, submit it first
                submitAnswer();
            }
        } else {
            // Move to next question
            setCurrentQuestionIndex(prev => prev + 1);
            // Set the selected answer to the previously saved answer for this question, if any
            setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || '');
            // Reset the answer submitted state for the new question
            setAnswerSubmitted(false);
        }
    };

    const completeTest = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            // Calculate score and prepare answer details
            let correctAnswers = 0;
            const answerDetails = questions.map((question, index) => {
                const selectedAnswer = userAnswers[index];
                // Safely handle undefined values
                const normalizedSelected = selectedAnswer ? selectedAnswer.toLowerCase().trim() : '';
                const normalizedCorrect = question?.correctAnswer ? question.correctAnswer.toLowerCase().trim() : '';
                const isCorrect = normalizedSelected === normalizedCorrect && normalizedCorrect !== '';
                
                if (isCorrect) correctAnswers++;
                
                return {
                    questionId: question?._id || `question_${index}`,
                    question: question?.question || 'Question not available',
                    selectedAnswer: selectedAnswer || 'Not answered',
                    correctAnswer: question?.correctAnswer || 'Answer not available',
                    isCorrect: isCorrect,
                    score: isCorrect ? 100 : 0
                };
            });
            
            const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
            
            // Prepare test result data
            const testResult = {
                testId,
                company: testDetails.company || 'Unknown Company',
                role: testDetails.role || 'Unknown Role',
                testType: testDetails.testType || 'technical',
                experience: testDetails.experience || 'entry',
                duration: parseInt(testDetails.duration) || 30,
                totalQuestions: questions.length,
                correctAnswers: correctAnswers,
                finalScore: calculatedScore,
                answers: answerDetails,
                completedAt: new Date().toISOString()
            };

            console.log('Submitting test result:', testResult);

            try {
                // Try the new endpoint first
                const response = await axios.post(
                    `${backendurl}/api/mock-test/submit-result`,
                    testResult,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log('Test completion response:', response.data);

                if (response.data.success) {
                    setTestCompleted(true);
                    // Navigate to dashboard after a short delay
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                } else {
                    // If the new endpoint fails, try the old one
                    const fallbackResponse = await axios.post(
                        `${backendurl}/api/mock-test/save-result`,
                        testResult,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );

                    if (fallbackResponse.data.success) {
                        setTestCompleted(true);
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 2000);
                    } else {
                        throw new Error('Failed to save test result');
                    }
                }
            } catch (err) {
                console.error('Error saving test result:', err);
                // Still show the score and complete the test
                setTestCompleted(true);
                // Show error message to user
                setError('Test completed but results may not be saved. Please check your dashboard.');
            }
        } catch (err) {
            console.error('Error in completeTest:', err);
            setError('Failed to complete test');
            // Still try to show the score if possible
            try {
                const correctAnswers = questions.reduce((count, q, i) => {
                    const selectedAnswer = userAnswers[i];
                    const normalizedSelected = selectedAnswer ? selectedAnswer.toLowerCase().trim() : '';
                    const normalizedCorrect = q?.correctAnswer ? q.correctAnswer.toLowerCase().trim() : '';
                    return count + (normalizedSelected === normalizedCorrect && normalizedCorrect !== '' ? 1 : 0);
                }, 0);
                const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
            } catch (fallbackErr) {
                console.error('Error in fallback score calculation:', fallbackErr);
            }
        } finally {
            setLoading(false);
        }
    };

    if (redirecting) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black to-orange-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
                    <p className="text-white text-xl font-semibold">Processing your test, please wait...</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black to-orange-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
                    <p className="text-white text-xl font-semibold">Processing your test, please wait...</p>
                </div>
            </div>
        );
    }

    if (testStarted && questions.length > 0) {
        const currentQuestion = questions[currentQuestionIndex];
        const timeColor = timeRemaining < 300 ? 'text-red-400' : timeRemaining < 600 ? 'text-yellow-400' : 'text-green-400';
        
        return (
            <div className="min-h-screen bg-gradient-to-br from-black to-black py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800/50">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </h2>
                                <div className={`flex items-center gap-2 ${timeColor} font-mono text-lg`}>
                                    <Clock className="w-5 h-5" />
                                    {formatTime(timeRemaining)}
                                </div>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="w-full bg-slate-800/50 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                            
                            <div className="bg-slate-800/50 rounded-xl p-6">
                                <p className="text-lg text-white mb-6">{currentQuestion.question}</p>
                                <div className="space-y-3">
                                    {currentQuestion.options.map((option, index) => (
                                        <label
                                            key={index}
                                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                                                selectedAnswer === option
                                                    ? 'bg-blue-600/30 border-blue-500'
                                                    : 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50'
                                            } border ${answerSubmitted ? 'opacity-60 pointer-events-none' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="answer"
                                                value={option}
                                                checked={selectedAnswer === option}
                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                className="hidden"
                                                disabled={answerSubmitted}
                                            />
                                            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                                selectedAnswer === option 
                                                    ? 'border-blue-500 bg-blue-500' 
                                                    : 'border-slate-400'
                                            }`}>
                                                {selectedAnswer === option && (
                                                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                                )}
                                            </div>
                                            <span className="text-white">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="text-slate-400">
                                    {answerSubmitted ? 'Answer submitted' : 'Select your answer'}
                                </div>
                                <div className="flex gap-3">
                                    {!answerSubmitted && (
                                        <button
                                            onClick={submitAnswer}
                                            disabled={loading || !selectedAnswer}
                                            className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Answer'
                                            )}
                                        </button>
                                    )}
                                    {answerSubmitted && (
                                        <button
                                            onClick={handleNextQuestion}
                                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                                        >
                                            {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-20 px-4">
             <h1 className="text-6xl font-light text-white mb-4 justify-center text-center">AI-Powered Practice Test</h1>
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
                    <div className="space-y-8">
                        <div className="text-center">
                           
                            <p className="text-slate-300">
                                Get personalized interview questions based on your target role and company.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-900/30 border border-red-800/50 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <p className="text-red-200">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={testDetails.company}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Google, Microsoft"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={testDetails.role}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Software Engineer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Experience Level
                                    </label>
                                    <select
                                        name="experience"
                                        value={testDetails.experience}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select experience level</option>
                                        <option value="entry">Entry Level (0-2 years)</option>
                                        <option value="mid">Mid Level (2-5 years)</option>
                                        <option value="senior">Senior Level (5+ years)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Test Duration
                                    </label>
                                    <select
                                        name="duration"
                                        value={testDetails.duration}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="10">10 minutes</option>
                                        <option value="15">15 minutes</option>
                                        <option value="30">30 minutes</option>
                                        <option value="45">45 minutes</option>
                                        <option value="60">60 minutes</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Job Description
                                    </label>
                                    <textarea
                                        name="jobDescription"
                                        value={testDetails.jobDescription}
                                        onChange={handleInputChange}
                                        className="w-full h-32 bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Paste the job description here..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Required Skills
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={testDetails.skills}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., React, Node.js, Python"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Test Type
                                    </label>
                                    <select
                                        name="testType"
                                        value={testDetails.testType}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="technical">Technical</option>
                                        <option value="behavioral">Behavioral</option>
                                        <option value="mixed">Mixed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={startTest}
                                disabled={loading || !testDetails.company || !testDetails.role || !testDetails.experience}
                                className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Starting Test...
                                    </div>
                                ) : (
                                    'Start Test'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MockTestWithErrorBoundary = () => {
    return (
        <ErrorBoundary>
            <MockTest />
        </ErrorBoundary>
    );
};

export default MockTestWithErrorBoundary; 