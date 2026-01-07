"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"

const CreateBatch = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBatch = {
      id: Date.now().toString(),
      ...formData,
      teacherId: user.id,
      teacherName: user.name,
      createdAt: new Date().toISOString(),
      inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
    }

    storage.addBatch(newBatch)
    navigate(`/teacher/batch/${newBatch.id}`)
  }

  return (
    <DashboardLayout title="Create New Batch">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6">Batch Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Batch Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., SSC 2026 Batch"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mathematics"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe what this batch is about..."
                required
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/teacher/dashboard")}
                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
              >
                Create Batch
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateBatch
