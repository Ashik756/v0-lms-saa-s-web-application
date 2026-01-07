"use client"

import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { BookOpen, Video, Users, Award, ArrowRight } from "lucide-react"

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Bangladesh's Leading <span className="text-blue-500">Academic LMS Platform</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Empower education with live classes, interactive content, and comprehensive batch management. Built for
              teachers and students across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Teach & Learn</h2>
            <p className="text-slate-400 text-lg">Comprehensive tools designed for modern education</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Classes</h3>
              <p className="text-slate-400">
                Conduct interactive live classes with embedded video streaming and real-time engagement.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Class Notes</h3>
              <p className="text-slate-400">Share comprehensive notes and study materials with PDF support.</p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Batch Management</h3>
              <p className="text-slate-400">Organize students into batches with easy enrollment and tracking.</p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">MCQ Tests</h3>
              <p className="text-slate-400">Create and manage tests with instant results and performance tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Teaching?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of educators and students using EduLMS to create engaging learning experiences.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-slate-100 font-semibold rounded-xl transition transform hover:scale-105"
            >
              Start Teaching Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-400">© 2026 EduLMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
