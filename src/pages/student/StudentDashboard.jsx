"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { BookOpen, Video, FileText, TestTube, Plus } from "lucide-react"
import { useState } from "react"

const StudentDashboard = () => {
  const { user } = useAuth()
  const [inviteCode, setInviteCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const enrollments = storage.getEnrollments().filter((e) => e.studentId === user.id)
  const enrolledBatchIds = enrollments.map((e) => e.batchId)
  const batches = storage.getBatches().filter((b) => enrolledBatchIds.includes(b.id))

  const handleJoinBatch = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const batch = storage.getBatches().find((b) => b.inviteCode === inviteCode.toUpperCase())

    if (!batch) {
      setError("Invalid invite code")
      return
    }

    const alreadyEnrolled = enrollments.some((e) => e.batchId === batch.id)
    if (alreadyEnrolled) {
      setError("You are already enrolled in this batch")
      return
    }

    storage.addEnrollment({
      id: Date.now().toString(),
      studentId: user.id,
      batchId: batch.id,
      enrolledAt: new Date().toISOString(),
    })

    setSuccess(`Successfully joined ${batch.name}!`)
    setInviteCode("")
    setTimeout(() => setSuccess(""), 3000)
    window.location.reload()
  }

  const stats = [
    { label: "Enrolled Batches", value: batches.length, icon: <BookOpen className="w-6 h-6" />, color: "bg-blue-600" },
    {
      label: "Live Classes",
      value: storage
        .getLiveClasses()
        .filter((c) => enrolledBatchIds.includes(c.batchId) && new Date(c.scheduledAt) > new Date()).length,
      icon: <Video className="w-6 h-6" />,
      color: "bg-green-600",
    },
    {
      label: "Notes Available",
      value: storage.getNotes().filter((n) => enrolledBatchIds.includes(n.batchId)).length,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-purple-600",
    },
    {
      label: "Tests",
      value: storage.getTests().filter((t) => enrolledBatchIds.includes(t.batchId)).length,
      icon: <TestTube className="w-6 h-6" />,
      color: "bg-red-600",
    },
  ]

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h2>
          <p className="text-blue-100 mb-6">Access your batches and continue learning.</p>

          <form onSubmit={handleJoinBatch} className="flex gap-3 max-w-md">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter invite code"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Join
            </button>
          </form>

          {error && <p className="mt-3 text-red-200 text-sm">{error}</p>}
          {success && <p className="mt-3 text-green-200 text-sm">{success}</p>}
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Batches */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">My Batches</h3>

          {batches.length === 0 ? (
            <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
              <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h4 className="text-xl font-medium text-white mb-2">No batches yet</h4>
              <p className="text-slate-400">Use an invite code from your teacher to join a batch</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch) => {
                const liveClassCount = storage.getLiveClasses().filter((c) => c.batchId === batch.id).length
                const noteCount = storage.getNotes().filter((n) => n.batchId === batch.id).length

                return (
                  <Link
                    key={batch.id}
                    to={`/student/batch/${batch.id}`}
                    className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-blue-500 transition group"
                  >
                    <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-500 transition">
                      {batch.name}
                    </h4>
                    <p className="text-slate-400 text-sm mb-1">Teacher: {batch.teacherName}</p>
                    <p className="text-blue-500 text-sm mb-4">Subject: {batch.subject}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Video className="w-4 h-4" />
                        <span>{liveClassCount} classes</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <FileText className="w-4 h-4" />
                        <span>{noteCount} notes</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StudentDashboard
