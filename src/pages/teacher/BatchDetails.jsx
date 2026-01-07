"use client"

import { Link, useParams } from "react-router-dom"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { Users, Video, BookOpen, FileText, TestTube, Copy, Check } from "lucide-react"
import { useState } from "react"

const BatchDetails = () => {
  const { batchId } = useParams()
  const batch = storage.getBatchById(batchId)
  const [copied, setCopied] = useState(false)

  if (!batch) {
    return (
      <DashboardLayout title="Batch Not Found">
        <div className="text-center py-12">
          <p className="text-slate-400">Batch not found</p>
        </div>
      </DashboardLayout>
    )
  }

  const enrollments = storage.getEnrollments().filter((e) => e.batchId === batchId)
  const liveClasses = storage.getLiveClasses().filter((c) => c.batchId === batchId)
  const notes = storage.getNotes().filter((n) => n.batchId === batchId)
  const recorded = storage.getRecorded().filter((r) => r.batchId === batchId)
  const tests = storage.getTests().filter((t) => t.batchId === batchId)

  const inviteLink = `${window.location.origin}/student/join/${batch.inviteCode}`

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout title={batch.name}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Batch Info */}
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{batch.name}</h2>
              <p className="text-slate-400">{batch.description}</p>
              <p className="text-blue-500 text-sm mt-2">Subject: {batch.subject}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Invite Link for Students</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm"
              />
              <button
                onClick={copyInviteLink}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-white">{enrollments.length}</div>
            <div className="text-slate-400 text-sm">Students</div>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <Video className="w-8 h-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold text-white">{liveClasses.length}</div>
            <div className="text-slate-400 text-sm">Live Classes</div>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
            <div className="text-2xl font-bold text-white">{notes.length}</div>
            <div className="text-slate-400 text-sm">Notes</div>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <FileText className="w-8 h-8 text-orange-500 mb-2" />
            <div className="text-2xl font-bold text-white">{recorded.length}</div>
            <div className="text-slate-400 text-sm">Recordings</div>
          </div>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <TestTube className="w-8 h-8 text-red-500 mb-2" />
            <div className="text-2xl font-bold text-white">{tests.length}</div>
            <div className="text-slate-400 text-sm">Tests</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to={`/teacher/batch/${batchId}/live-class/create`}
            className="bg-slate-900 hover:bg-slate-800 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition group"
          >
            <Video className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-medium mb-1">Create Live Class</h3>
            <p className="text-slate-400 text-sm">Schedule a new live session</p>
          </Link>

          <Link
            to={`/teacher/batch/${batchId}/notes`}
            className="bg-slate-900 hover:bg-slate-800 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition group"
          >
            <BookOpen className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-medium mb-1">Manage Notes</h3>
            <p className="text-slate-400 text-sm">Add or edit class notes</p>
          </Link>

          <Link
            to={`/teacher/batch/${batchId}/recorded`}
            className="bg-slate-900 hover:bg-slate-800 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition group"
          >
            <FileText className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-medium mb-1">Recorded Classes</h3>
            <p className="text-slate-400 text-sm">Upload video content</p>
          </Link>

          <Link
            to={`/teacher/batch/${batchId}/test/create`}
            className="bg-slate-900 hover:bg-slate-800 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition group"
          >
            <TestTube className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="text-white font-medium mb-1">Create Test</h3>
            <p className="text-slate-400 text-sm">Add MCQ tests</p>
          </Link>
        </div>

        {/* Students List */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Enrolled Students</h3>
          {enrollments.length === 0 ? (
            <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
              <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No students enrolled yet. Share the invite link above.</p>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {enrollments.map((enrollment) => {
                      const users = JSON.parse(localStorage.getItem("users") || "[]")
                      const student = users.find((u) => u.id === enrollment.studentId)
                      return (
                        <tr key={enrollment.id}>
                          <td className="px-6 py-4 text-white">{student?.name || "Unknown"}</td>
                          <td className="px-6 py-4 text-slate-400">{student?.email || "N/A"}</td>
                          <td className="px-6 py-4 text-slate-400">
                            {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BatchDetails
