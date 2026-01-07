"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { PlayCircle, Plus, Trash2 } from "lucide-react"

const ManageRecorded = () => {
  const { batchId } = useParams()
  const navigate = useNavigate()
  const batch = storage.getBatchById(batchId)
  const recorded = storage.getRecorded().filter((r) => r.batchId === batchId)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newVideo = {
      id: Date.now().toString(),
      ...formData,
      batchId,
      createdAt: new Date().toISOString(),
    }

    storage.addRecorded(newVideo)
    setFormData({ title: "", description: "", videoUrl: "" })
    setShowForm(false)
  }

  const handleDelete = (videoId) => {
    if (confirm("Are you sure you want to delete this recorded class?")) {
      const allRecorded = storage.getRecorded().filter((r) => r.id !== videoId)
      storage.setRecorded(allRecorded)
      window.location.reload()
    }
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
    <DashboardLayout title="Manage Recorded Classes">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Recorded Classes</h2>
            <p className="text-slate-400">For: {batch.name}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Video
          </button>
        </div>

        {showForm && (
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Add Recorded Class</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Video Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Algebra Lecture 1"
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
                  placeholder="Brief description of the video content..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Video URL *</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
                <p className="text-slate-500 text-xs mt-2">
                  YouTube, Vimeo, or direct video URL (students can watch in-app)
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ title: "", description: "", videoUrl: "" })
                  }}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                  Add Video
                </button>
              </div>
            </form>
          </div>
        )}

        {recorded.length === 0 ? (
          <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
            <PlayCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h4 className="text-xl font-medium text-white mb-2">No recorded classes yet</h4>
            <p className="text-slate-400 mb-6">Add recorded videos for students to watch anytime</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              <Plus className="w-5 h-5" />
              Add Video
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {recorded.map((video) => (
              <div key={video.id} className="bg-slate-900 rounded-xl p-6 border border-slate-800 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">{video.title}</h4>
                    {video.description && <p className="text-slate-400 text-sm mb-4">{video.description}</p>}
                  </div>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition"
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch Video
                </a>
                <p className="text-slate-500 text-xs mt-4">
                  Uploaded on {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate(`/teacher/batch/${batchId}`)}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition"
        >
          Back to Batch
        </button>
      </div>
    </DashboardLayout>
  )
}

export default ManageRecorded
