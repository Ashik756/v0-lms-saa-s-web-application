"use client"

import Navbar from "../components/Navbar"
import { GraduationCap, Target, Heart, Users } from "lucide-react"

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About EduLMS</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We're on a mission to transform education in Bangladesh through innovative technology and accessible online
            learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800">
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              To empower teachers and students across Bangladesh with a comprehensive, easy-to-use learning management
              system that makes quality education accessible to everyone, everywhere.
            </p>
          </div>

          <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800">
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">
              To become Bangladesh's leading educational technology platform, connecting millions of teachers and
              students through innovative digital learning solutions that enhance educational outcomes.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center mb-20">
          <GraduationCap className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built for Bangladesh</h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
            EduLMS is specifically designed to address the unique challenges of education in Bangladesh. From supporting
            Bengali language content to accommodating varying internet speeds, we understand your needs because we're
            part of the same community.
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-500 px-6 py-3 rounded-full mb-6">
            <Users className="w-5 h-5" />
            <span className="font-medium">Join Our Growing Community</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose EduLMS?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">10,000+</div>
              <div className="text-slate-400">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
              <div className="text-slate-400">Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">50,000+</div>
              <div className="text-slate-400">Classes Conducted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
