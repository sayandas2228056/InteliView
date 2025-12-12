'use client';

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  ExternalLink,
  Copy,
  Check,
  Linkedin,
  Github
} from "lucide-react";

/* -------------------- STATIC DATA (NO RE-RENDERS) -------------------- */

const EMAILS = [
  { label: "primary", email: "sayandas010124@gmail.com" },
  { label: "secondary", email: "offcsayantubecode@gmail.com" }
];

const QUICK_CONTACTS = [
  {
    id: "primary-card",
    title: "Primary Email",
    email: "sayandas010124@gmail.com",
    description:
        "Reach out for professional inquiries, project collaborations, or any questions about my work and services.",
    gradient: "from-orange-500 to-orange-700"
  },
  {
    id: "secondary-card",
    title: "Secondary Email",
    email: "offcsayantubecode@gmail.com",
    description:
        "Contact for general inquiries, personal collaborations, or informal discussions.",
    gradient: "from-orange-600 to-yellow-500"
  }
];

/* -------------------- COMPONENT -------------------- */

export default function Conx() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
      <section className="px-4 py-16 text-gray-100 sm:px-6 md:px-10 animate-fade-in-up">
        <div className="mx-auto max-w-7xl">
          {/* -------------------- HEADER -------------------- */}
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-3xl font-bold text-transparent sm:text-4xl md:text-5xl bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Get in Touch
            </h2>
            <p className="max-w-2xl mx-auto text-base text-gray-300 sm:text-lg">
              Feel free to reach out for collaborations, opportunities, or just a
              friendly chat. I’m always open to new ideas and connections!
            </p>
          </div>

          {/* -------------------- GRID -------------------- */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">

            {/* ==================== CONTACT INFO ==================== */}
            <div className="p-6 bg-black border border-gray-700 shadow-lg rounded-xl bg-opacity-30 backdrop-blur-md hover:shadow-orange-500/20 transition-all sm:p-8">
              <h3 className="mb-6 text-xl font-semibold text-orange-300 sm:text-2xl">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Phone */}
                <InfoRow
                    icon={<Phone />}
                    title="Phone"
                    value={
                      <a href="tel:+918918577218" className="hover:text-orange-300">
                        +91 8918577218
                      </a>
                    }
                />

                {/* Emails */}
                <div className="flex items-start">
                  <IconWrapper>
                    <Mail className="w-5 h-5 text-orange-400" />
                  </IconWrapper>

                  <div className="flex-1">
                    <h4 className="mb-1 text-sm text-gray-400">Email</h4>
                    <div className="space-y-3">
                      {EMAILS.map(({ label, email }) => (
                          <div key={label} className="flex items-center justify-between group">
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center text-gray-200 hover:text-orange-300"
                            >
                              {email}
                              <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition" />
                            </a>

                            <button
                                onClick={() => copyToClipboard(email, label)}
                                className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition hover:bg-gray-700"
                            >
                              {copied === label ? (
                                  <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                  <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <InfoRow
                    icon={<MapPin />}
                    title="Location"
                    value="KIIT University, Bhubaneswar-751024, India"
                />
              </div>

              {/* Socials */}
              <div className="mt-10">
                <h4 className="mb-4 text-sm text-gray-400">Connect with me</h4>
                <div className="flex flex-wrap gap-4">
                  <SocialIcon href="https://wa.me/918918577218" color="green">
                    <MessageCircle />
                  </SocialIcon>
                  <SocialIcon href="https://www.instagram.com/__sdx__007/" color="pink">
                    <Instagram />
                  </SocialIcon>
                  <SocialIcon href="https://www.facebook.com/offcsayantubecode" color="blue">
                    <Facebook />
                  </SocialIcon>
                  <SocialIcon href="https://github.com/sayandas2228056" color="gray">
                    <Github />
                  </SocialIcon>
                  <SocialIcon href="https://www.linkedin.com/in/sayan-das-b99810213/" color="blue">
                    <Linkedin />
                  </SocialIcon>
                </div>
              </div>
            </div>

            {/* ==================== QUICK CONTACT ==================== */}
            <div className="p-6 bg-black border border-gray-700 shadow-lg rounded-xl bg-opacity-30 backdrop-blur-md sm:p-8">
              <h3 className="mb-6 text-xl font-semibold text-orange-300 sm:text-2xl">
                Quick Contact
              </h3>

              <div className="space-y-8">
                {QUICK_CONTACTS.map(card => (
                    <div
                        key={card.id}
                        className="bg-gray-900 border border-gray-700 rounded-xl group hover:scale-[1.02] transition-all"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-600/20 group-hover:rotate-12 transition">
                            <Mail className="text-orange-400" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-semibold">{card.title}</h4>
                            <p className="text-sm text-gray-400">{card.email}</p>
                          </div>
                        </div>
                        <p className="text-gray-300">{card.description}</p>
                      </div>

                      <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-3">
                        <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${card.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 text-center py-3 rounded-lg bg-gradient-to-r ${card.gradient} hover:brightness-110 transition`}
                        >
                          Open Gmail
                        </a>

                        <button
                            onClick={() => copyToClipboard(card.email, card.id)}
                            className="px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                        >
                          {copied === card.id ? (
                              <Check className="text-green-400" />
                          ) : (
                              <Copy />
                          )}
                        </button>
                      </div>
                    </div>
                ))}
              </div>

              <div className="mt-8 p-4 border border-dashed border-gray-600 rounded-lg bg-gray-800/30">
                <h4 className="text-sm font-medium text-orange-300 mb-2">
                  Quick Tip
                </h4>
                <p className="text-sm text-gray-400">
                  Use “Open Gmail” to instantly compose an email or copy the
                  address with one click.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------- ANIMATION -------------------- */}
        <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
      </section>
  );
}

/* -------------------- SMALL REUSABLE COMPONENTS -------------------- */

function IconWrapper({ children }) {
  return (
      <div className="p-3 mr-4 bg-orange-600/20 rounded-lg">
        {children}
      </div>
  );
}

function InfoRow({ icon, title, value }) {
  return (
      <div className="flex items-start">
        <IconWrapper>{icon}</IconWrapper>
        <div>
          <h4 className="text-sm text-gray-400">{title}</h4>
          <p className="text-gray-200">{value}</p>
        </div>
      </div>
  );
}

function SocialIcon({ href, color, children }) {
  const colors = {
    green: "bg-green-600/20 text-green-400",
    pink: "bg-pink-600/20 text-pink-400",
    blue: "bg-blue-600/20 text-blue-400",
    gray: "bg-gray-600/20 text-gray-400"
  };

  return (
      <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-lg transition transform hover:scale-110 hover:rotate-6 ${colors[color]}`}
      >
        {children}
      </a>
  );
}
