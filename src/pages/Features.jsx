"use client"

import Navbar from "../components/Navbar"
import { Video, BookOpen, Users, Award, MessageSquare, PlayCircle, Calendar, Lock, Zap } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "Live Class Integration",
      description: "Embed live classes directly in the platform using Jitsi, Google Meet, or Facebook Live.",
      benefits: ["No external redirects", "In-app participation", "Seamless experience"],
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Real-time Comments",
      description: "Socket.IO powered live comments for instant engagement during classes.",
      benefits: ["Auto-updating feed", "Teacher moderation", "Student interaction"],
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Class Notes System",
      description: "Share comprehensive notes with text content and PDF attachments.",
      benefits: ["Rich text support", "PDF uploads", "Easy access for students"],
    },
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: "Recorded Content",
      description: "Upload and manage recorded class videos for on-demand learning.",
      benefits: ["Video URL support", "In-app playback", "Organized by batch"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Batch Management",
      description: "Create and manage multiple batches with invite link system.",
      benefits: ["Easy enrollment", "Student tracking", "Batch analytics"],
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "MCQ Test System",
      description: "Create tests and provide instant results to students.",
      benefits: ["Multiple choice questions", "Auto-grading", "Performance tracking"],
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule & Organize",
      description: "Plan classes with date and time scheduling for better organization.",
      benefits: ["Class calendar", "Upcoming reminders", "Time management"],
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Role-Based Access",
      description: "Separate dashboards and permissions for teachers and students.",
      benefits: ["Secure access", "Custom views", "Protected routes"],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-500 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Complete LMS Solution</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Features for Modern Education</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Everything you need to create engaging online learning experiences for students across Bangladesh.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition"
            >
              <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
