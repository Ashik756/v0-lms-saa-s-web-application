"use client"

import { Link, useParams } from "react-router-dom"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { Video, BookOpen, FileText, Calendar, PlayCircle } from "lucide-react"

const StudentBatchView = () => {
  const { batchId } = useParams()
  const batch = storage.getBatchById(batchId)

  if (!batch) {
    return (
      <DashboardLayout title="Batch Not Found">
        <div className="text-center py-12">
          <p className="text-slate-400">Batch not found</p>
        </div>
      </DashboardLayout>
    )
  }

  const liveClasses = storage.getLiveClasses().filter((c) => c.batchId === batchId)
  const notes = storage.getNotes().filter((n) => n.batchId === batchId)
  const recorded = storage.getRecorded().filter((r) => r.batchId === batchId)

  const upcomingClasses = liveClasses
    .filter((c) => new Date(c.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))

  const pastClasses = liveClasses
    .filter((c) => new Date(c.scheduledAt) <= new Date())
    .sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt))

  return (
    <DashboardLayout title={batch.name}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Batch Info */}
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-2">{batch.name}</h2>
          <p className="text-slate-400 mb-4">{batch.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="text-blue-500">Subject: {batch.subject}</div>
            <div className="text-slate-400">Teacher: {batch.teacherName}</div>
          </div>
        </div>

        {/* Upcoming Live Classes */}
        {upcomingClasses.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Video className="w-6 h-6 text-green-500" />
              Upcoming Live Classes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingClasses.map((liveClass) => (
                <Link
                  key={liveClass.id}
                  to={`/student/live-class/${liveClass.id}`}
                  className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-green-500 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white group-hover:text-green-500 transition">
                      {liveClass.title}
                    </h4>
                    <span className="px-3 py-1 bg-green-600/20 text-green-500 text-xs rounded-full">Live Soon</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(liveClass.scheduledAt).toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Past Live Classes */}
        {pastClasses.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Video className="w-6 h-6 text-blue-500" />
              Past Live Classes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {pastClasses.slice(0, 4).map((liveClass) => (
                <Link
                  key={liveClass.id}
                  to={`/student/live-class/${liveClass.id}`}
                  className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-blue-500 transition group"
                >
                  <h4 className="text-lg font-semibold text-white group-hover:text-blue-500 transition mb-3">
                    {liveClass.title}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(liveClass.scheduledAt).toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recorded Classes */}
        {recorded.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-orange-500" />
              Recorded Classes
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recorded.map((video) => (
                <div key={video.id} className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                  <h4 className="text-lg font-semibold text-white mb-3">{video.title}</h4>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Watch Video
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {notes.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-500" />
              Class Notes
            </h3>
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                  <h4 className="text-lg font-semibold text-white mb-3">{note.title}</h4>
                  <p className="text-slate-400 mb-4">{note.content}</p>
                  {note.pdfUrl && (
                    <a
                      href={note.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition"
                    >
                      <FileText className="w-4 h-4" />
                      Download PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {liveClasses.length === 0 && notes.length === 0 && recorded.length === 0 && (
          <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No content available yet. Check back later!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default StudentBatchView
