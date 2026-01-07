"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { getMockSocket } from "../../services/socket"
import { Send, MessageSquare } from "lucide-react"

const StudentLiveClass = () => {
  const { classId } = useParams()
  const { user } = useAuth()
  const liveClass = storage.getLiveClassById(classId)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [socket, setSocket] = useState(null)
  const commentsEndRef = useRef(null)

  useEffect(() => {
    const mockSocket = getMockSocket()
    setSocket(mockSocket)
    mockSocket.connect()

    mockSocket.emit("join-class", { classId, userId: user.id, userName: user.name, userRole: user.role })

    mockSocket.on("class-history", (history) => {
      setComments(history)
    })

    mockSocket.on("comment-received", (comment) => {
      setComments((prev) => [...prev, comment])
    })

    mockSocket.on("comment-deleted", ({ commentId }) => {
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    })

    return () => {
      mockSocket.disconnect()
    }
  }, [classId, user.id, user.name, user.role])

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [comments])

  const handleSendComment = (e) => {
    e.preventDefault()
    if (!newComment.trim() || !socket) return

    const comment = {
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      text: newComment.trim(),
    }

    socket.emit("new-comment", { classId, comment })
    setNewComment("")
  }

  if (!liveClass) {
    return (
      <DashboardLayout title="Class Not Found">
        <div className="text-center py-12">
          <p className="text-slate-400">Live class not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title={liveClass.title}>
      <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)]">
        <div className="grid lg:grid-cols-3 gap-6 h-full">
          {/* Video Player */}
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">{liveClass.title}</h2>
              {liveClass.description && <p className="text-slate-400 text-sm mt-1">{liveClass.description}</p>}
              <p className="text-slate-500 text-xs mt-2">
                Teacher: {liveClass.teacherName} | {new Date(liveClass.scheduledAt).toLocaleString()}
              </p>
            </div>
            <div className="flex-1 relative bg-black">
              <iframe
                src={liveClass.embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="camera; microphone; fullscreen; display-capture"
                title="Live Class Video"
              />
            </div>
          </div>

          {/* Live Comments */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-full max-h-[calc(100vh-12rem)]">
            <div className="p-4 border-b border-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-white">Live Chat</h3>
              <span className="ml-auto text-sm text-slate-400">{comments.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No comments yet. Start the conversation!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{comment.userName}</p>
                        <p className="text-slate-400 text-xs capitalize">{comment.userRole}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm">{comment.text}</p>
                    {comment.timestamp && (
                      <p className="text-slate-500 text-xs mt-2">{new Date(comment.timestamp).toLocaleTimeString()}</p>
                    )}
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>

            <form onSubmit={handleSendComment} className="p-4 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StudentLiveClass
