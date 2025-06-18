import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, X, Eye, EyeOff, Linkedin, Github, Twitter, Facebook, Instagram } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      facebook: '',
      instagram: ''
    }
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [user, navigate]);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/profile/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFormData(prev => ({
        ...prev,
        ...response.data,
        socialLinks: {
          ...prev.socialLinks,
          ...response.data.socialLinks
        }
      }));
    } catch (err) {
      setError('Failed to fetch profile data');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const platform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords if changing password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }
      if (!formData.currentPassword) {
        setError('Current password is required to set new password');
        return;
      }
    }
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.put(
        `${backendurl}/api/profile/update`,
        {
          name: formData.name,
          email: formData.email,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          socialLinks: formData.socialLinks,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update auth context with new user data
      login(response.data, localStorage.getItem('token'));

      setSuccess('Profile updated successfully');
      setIsEditing(false);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <h1 className='text-6xl font-light text-white mb-4 justify-center text-center'>InteliView</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-orange-950/30 rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Profile Settings
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-300">Basic Information</h3>
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  className="w-full px-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                />
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                />
              </div>

              {/* Website Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-300">Social Links</h3>
              
              {/* LinkedIn */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">LinkedIn</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Linkedin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="social.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full pl-10 pr-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* GitHub */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">GitHub</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Github className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="social.github"
                    value={formData.socialLinks.github}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://github.com/your-profile"
                    className="w-full pl-10 pr-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Twitter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Twitter</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Twitter className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="social.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://twitter.com/your-profile"
                    className="w-full pl-10 pr-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Facebook */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Facebook</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Facebook className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="social.facebook"
                    value={formData.socialLinks.facebook}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://facebook.com/your-profile"
                    className="w-full pl-10 pr-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Instagram</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Instagram className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="social.instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://instagram.com/your-profile"
                    className="w-full pl-10 pr-4 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <>
                {/* Password Change Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-300">Change Password</h3>
                  
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Current Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-orange-950/50 border border-orange-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 group flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(prev => ({
                        ...prev,
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      }));
                    }}
                    className="flex-1 group flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 