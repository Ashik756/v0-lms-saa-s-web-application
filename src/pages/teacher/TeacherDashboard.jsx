"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { Plus, Users, Video, BookOpen } from "lucide-react"

const TeacherDashboard = () => {
  const { user } = useAuth()
  const batches = storage.getBatches().filter((b) => b.teacherId === user.id)
  const liveClasses = storage.getLiveClasses().filter((c) => c.teacherId === user.id)

  const stats = [
    { label: "Total Batches", value: batches.length, icon: <Users className="w-6 h-6" />, color: "bg-blue-600" },
    {
      label: "Live Classes",
      value: liveClasses.length,
      icon: <Video className="w-6 h-6" />,
      color: "bg-green-600",
    },
    {
      label: "Total Students",
      value: storage.getEnrollments().filter((e) => batches.some((b) => b.id === e.batchId)).length,
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-600",
    },
    {
      label: "Notes Shared",
      value: storage.getNotes().filter((n) => batches.some((b) => b.id === n.batchId)).length,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-orange-600",
    },
  ]

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-blue-100 mb-6">Manage your batches and engage with your students.</p>
          <Link
            to="/teacher/batch/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            <Plus className="w-5 h-5" />
            Create New Batch
          </Link>
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

        {/* Batches List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Your Batches</h3>
            <Link
              to="/teacher/batch/create"
              className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              New Batch
            </Link>
          </div>

          {batches.length === 0 ? (
            <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
              <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h4 className="text-xl font-medium text-white mb-2">No batches yet</h4>
              <p className="text-slate-400 mb-6">Create your first batch to start teaching</p>
              <Link
                to="/teacher/batch/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                Create Batch
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch) => {
                const enrollmentCount = storage.getEnrollments().filter((e) => e.batchId === batch.id).length
                const classCount = storage.getLiveClasses().filter((c) => c.batchId === batch.id).length

                return (
                  <Link
                    key={batch.id}
                    to={`/teacher/batch/${batch.id}`}
                    className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-blue-500 transition group"
                  >
                    <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-500 transition">
                      {batch.name}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{batch.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{enrollmentCount} students</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Video className="w-4 h-4" />
                        <span>{classCount} classes</span>
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

export default TeacherDashboard
