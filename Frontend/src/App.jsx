import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import ForgotPassword from './Pages/ForgotPassword'
import ResumeATS from './Pages/ResumeATS'
import InterviewPrep from './Pages/InterviewPrep'
import InterviewPrepResults from './Pages/InterviewPrepResults'
import MockTest from './Pages/MockTest'
import About from './Pages/About' 
import Footer from './Components/Footer'
import Contact from './Pages/Contact'
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/resume" element={<ProtectedRoute><ResumeATS /></ProtectedRoute>} />
            <Route path="/interview-prep" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
            <Route path="/interview-prep/results" element={<ProtectedRoute><InterviewPrepResults /></ProtectedRoute>} />
            <Route path="/mock-test" element={<ProtectedRoute><MockTest /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </AuthProvider>
  )
}

export default App
