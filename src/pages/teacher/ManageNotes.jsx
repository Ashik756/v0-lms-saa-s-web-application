"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { BookOpen, Plus, Trash2, FileText } from "lucide-react"

const ManageNotes = () => {
  const { batchId } = useParams()
  const navigate = useNavigate()
  const batch = storage.getBatchById(batchId)
  const notes = storage.getNotes().filter((n) => n.batchId === batchId)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    pdfUrl: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newNote = {
      id: Date.now().toString(),
      ...formData,
      batchId,
      createdAt: new Date().toISOString(),
    }

    storage.addNote(newNote)
    setFormData({ title: "", content: "", pdfUrl: "" })
    setShowForm(false)
  }

  const handleDelete = (noteId) => {
    if (confirm("Are you sure you want to delete this note?")) {
      const allNotes = storage.getNotes().filter((n) => n.id !== noteId)
      storage.setNotes(allNotes)
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
    <DashboardLayout title="Manage Notes">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Class Notes</h2>
            <p className="text-slate-400">For: {batch.name}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Note
          </button>
        </div>

        {showForm && (
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">New Note</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Note Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Chapter 1: Introduction"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="8"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write your notes here..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">PDF URL (Optional)</label>
                <input
                  type="url"
                  name="pdfUrl"
                  value={formData.pdfUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/notes.pdf"
                />
                <p className="text-slate-500 text-xs mt-2">Provide a direct link to a PDF file</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ title: "", content: "", pdfUrl: "" })
                  }}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        )}

        {notes.length === 0 ? (
          <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h4 className="text-xl font-medium text-white mb-2">No notes yet</h4>
            <p className="text-slate-400 mb-6">Add your first class note to help students learn</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              <Plus className="w-5 h-5" />
              Add Note
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="bg-slate-900 rounded-xl p-6 border border-slate-800 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">{note.title}</h4>
                    <p className="text-slate-300 whitespace-pre-wrap">{note.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {note.pdfUrl && (
                  <a
                    href={note.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition"
                  >
                    <FileText className="w-4 h-4" />
                    View PDF
                  </a>
                )}
                <p className="text-slate-500 text-xs mt-4">Added on {new Date(note.createdAt).toLocaleDateString()}</p>
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

export default ManageNotes
