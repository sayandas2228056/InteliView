# InteliView - AI-Powered Interview Preparation Platform

InteliView is a comprehensive interview preparation platform that leverages artificial intelligence to help users prepare for technical interviews. The platform offers mock interviews, resume analysis, and personalized feedback to enhance users' interview skills.

## 🌟 Features

### Core Features
- **AI-Powered Mock Interviews**: Practice interviews with an AI interviewer that adapts to your responses
- **Resume Analysis**: Get detailed feedback on your resume with suggestions for improvement
- **Interview Preparation**: Access curated resources and practice questions
- **Dashboard**: Track your progress and performance
- **User Authentication**: Secure login and registration system
- **Profile Management**: Update and manage your profile information

### Technical Features
- **Real-time Feedback**: Instant feedback during mock interviews
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Secure Authentication**: JWT-based authentication system
- **File Upload**: Support for resume and document uploads
- **Progress Tracking**: Monitor your improvement over time

## 🏗️ Project Structure

```
InteliView/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── Components/      # Reusable UI components
│   │   ├── Pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── assets/         # Static assets
│   │   └── utils/          # Utility functions
│   └── public/             # Public assets
│
└── backend/                 # Node.js backend application
    ├── src/
    │   ├── controllers/    # Route controllers
    │   ├── models/         # Database models
    │   ├── routes/         # API routes
    │   └── utils/          # Utility functions
    └── uploads/            # File upload directory
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/InteliView.git
   cd InteliView
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   - Create `.env` file in the backend directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

5. **Start the Development Servers**
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd Frontend
     npm run dev
     ```

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer for file uploads

## 📱 Key Components

### Frontend Components

#### Pages Overview

1. **Landing Page** (`LandingPage.jsx`)
   - Hero section with platform introduction
   - Feature highlights and benefits
   - Call-to-action buttons for sign-up/login
   - Testimonials and success stories
   - Platform statistics and achievements
   - Responsive design for all devices

2. **Authentication Pages**
   - **Login** (`Login.jsx`)
     - Email/password authentication
     - Social login options
     - Remember me functionality
     - Forgot password link
     - Form validation and error handling
   
   - **Sign Up** (`SignUp.jsx`)
     - User registration form
     - Email verification
     - Password strength requirements
     - Terms and conditions acceptance
     - Profile completion wizard
   
   - **Forgot Password** (`ForgotPassword.jsx`)
     - Email-based password reset
     - Security verification
     - Password reset instructions
     - Success/error notifications

3. **Dashboard** (`Dashboard.jsx`)
   - User overview and statistics
   - Recent activity feed
   - Performance metrics
   - Quick access to features
   - Progress tracking
   - Upcoming interviews
   - Resume status
   - Personalized recommendations

4. **Profile** (`Profile.jsx`)
   - User information management
   - Profile picture upload
   - Skills and expertise
   - Education and experience
   - Interview preferences
   - Notification settings
   - Account security settings
   - Activity history

5. **Interview Preparation** (`InterviewPrep.jsx`)
   - Interview type selection
   - Difficulty level options
   - Topic selection
   - Time duration settings
   - Preparation guidelines
   - Practice mode options
   - Real-time feedback system
   - Progress tracking

6. **Interview Results** (`InterviewPrepResults.jsx`)
   - Detailed performance analysis
   - Strengths and weaknesses
   - Improvement suggestions
   - Question-wise feedback
   - Time management analysis
   - Communication skills assessment
   - Downloadable reports
   - Comparison with previous attempts

7. **Resume Analysis** (`ResumeATS.jsx`)
   - Resume upload interface
   - ATS compatibility check
   - Keyword optimization
   - Format analysis
   - Content suggestions
   - Industry-specific recommendations
   - Score and ranking
   - Download optimized resume

8. **Mock Test** (`MockTest.jsx`)
   - Comprehensive test interface
   - Multiple question types
   - Timer functionality
   - Auto-save feature
   - Progress tracking
   - Question navigation
   - Review mode
   - Results and analytics

### Page Features and Functionality

#### Common Features Across Pages
- Responsive design for all screen sizes
- Loading states and animations
- Error handling and notifications
- Navigation breadcrumbs
- User session management
- Accessibility features
- Dark/Light mode support

#### User Experience Elements
- Toast notifications for actions
- Modal dialogs for confirmations
- Progress indicators
- Form validation feedback
- Success/error messages
- Loading spinners
- Smooth transitions
- Interactive elements

#### Security Features
- Protected routes
- Session management
- Input sanitization
- CSRF protection
- Rate limiting
- Secure file uploads
- Data encryption

### Backend Components
1. **Authentication System**
   - JWT-based authentication
   - Password hashing
   - User session management

2. **File Management**
   - Resume upload handling
   - File storage
   - File type validation

3. **AI Integration**
   - Interview simulation
   - Resume analysis
   - Feedback generation

## 🔒 Security Features
- JWT-based authentication
- Password hashing
- Protected routes
- File upload validation
- CORS configuration
- Rate limiting

## 🎨 UI/UX Features
- Responsive design
- Dark/Light mode
- Smooth animations
- Loading states
- Error handling
- Toast notifications

## 📈 Future Enhancements
- Video interview support
- Real-time collaboration
- Advanced analytics
- Custom interview scenarios
- Integration with job platforms

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors
- Your Name - Initial work

## 🙏 Acknowledgments
- List any resources, libraries, or tools that you used or were inspired by 