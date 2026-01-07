"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"

const CreateLiveClass = () => {
  const { user } = useAuth()
  const { batchId } = useParams()
  const navigate = useNavigate()
  const batch = storage.getBatchById(batchId)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    embedUrl: "",
    scheduledAt: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newClass = {
      id: Date.now().toString(),
      ...formData,
      batchId,
      teacherId: user.id,
      teacherName: user.name,
      createdAt: new Date().toISOString(),
    }

    storage.addLiveClass(newClass)
    navigate(`/teacher/batch/${batchId}`)
  }

  if (!batch) {
    return (
      <DashboardLayout title="Batch Not Found">
        <div className="text-center py-12">
          <p className="text-slate-400">Batch not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Create Live Class">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-2">New Live Class</h2>
          <p className="text-slate-400 mb-6">For batch: {batch.name}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Class Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Introduction to Algebra"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="What will you cover in this class?"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Embed URL (Jitsi/Meet/Facebook) *</label>
              <input
                type="url"
                name="embedUrl"
                value={formData.embedUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://meet.jit.si/your-room"
                required
              />
              <p className="text-slate-500 text-xs mt-2">
                Provide an embeddable URL from Jitsi, Google Meet, or Facebook Live
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Schedule Date & Time *</label>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/teacher/batch/${batchId}`)}
                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
              >
                Create Live Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateLiveClass
