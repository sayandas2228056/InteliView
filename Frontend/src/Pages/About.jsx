import React from 'react';

const About = () => {
  return (
    <div className="bg-black text-white px-6 md:px-20 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About <span className="text-orange-500">InteliView</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 text-center">
          InteliView is an AI-powered interview preparation platform built to help job seekers master the art of technical interviews.
          From real-time mock interviews to advanced resume analysis, we provide everything you need to succeed.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">🎯 Our Mission</h2>
            <p className="text-gray-400">
              To democratize access to high-quality interview preparation tools using artificial intelligence,
              empowering individuals to crack their dream jobs with confidence and skill.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">⚙️ What We Offer</h2>
            <ul className="list-disc pl-5 text-gray-400">
              <li>AI-driven mock interviews with adaptive feedback</li>
              <li>Real-time resume analysis and ATS optimization</li>
              <li>Curated preparation modules with progress tracking</li>
              <li>Dashboard to monitor performance and growth</li>
              <li>Secure authentication and personalized experience</li>
            </ul>
          </div>
        </div>

        <div className="bg-white text-black p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">🚀 Technology Behind the Platform</h2>
          <p className="mb-4">
            InteliView is built using the powerful MERN stack – MongoDB, Express.js, React, and Node.js. Our platform leverages modern
            frameworks and tools to ensure performance, scalability, and responsiveness.
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-800 list-disc pl-5">
            <li>React.js & Tailwind CSS for a seamless UI/UX</li>
            <li>JWT-based authentication for secure login</li>
            <li>AI integrations for interview simulation and resume feedback</li>
            <li>Responsive design optimized for all devices</li>
          </ul>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-2 text-orange-400">💡 Built for Everyone</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you’re a student, a fresher, or a seasoned professional switching careers — InteliView tailors the experience to fit your journey.
            Our intelligent system adapts to your goals, ensuring you get the most out of every session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
