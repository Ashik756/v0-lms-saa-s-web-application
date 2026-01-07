"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { TestTube, Clock, CheckCircle } from "lucide-react"

const StudentTests = () => {
  const { user } = useAuth()
  const enrollments = storage.getEnrollments().filter((e) => e.studentId === user.id)
  const enrolledBatchIds = enrollments.map((e) => e.batchId)
  const tests = storage.getTests().filter((t) => enrolledBatchIds.includes(t.batchId))
  const submissions = storage.getSubmissions().filter((s) => s.studentId === user.id)

  return (
    <DashboardLayout title="My Tests">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Your Tests</h2>
          <p className="text-blue-100">View available tests and your completed submissions</p>
        </div>

        {tests.length === 0 ? (
          <div className="bg-slate-900 rounded-xl p-12 text-center border border-slate-800">
            <TestTube className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h4 className="text-xl font-medium text-white mb-2">No tests available</h4>
            <p className="text-slate-400">Your teachers haven't created any tests yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tests.map((test) => {
              const batch = storage.getBatchById(test.batchId)
              const submission = submissions.find((s) => s.testId === test.id)

              return (
                <div
                  key={test.id}
                  className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-blue-500 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{test.title}</h4>
                      <p className="text-blue-500 text-sm">{batch?.name}</p>
                    </div>
                    {submission ? (
                      <span className="px-3 py-1 bg-green-600/20 text-green-500 text-xs rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-orange-600/20 text-orange-500 text-xs rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="text-slate-400 text-sm mb-4">
                    <p>{test.questions.length} questions</p>
                  </div>

                  {submission ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Your Score:</span>
                        <span className="text-2xl font-bold text-green-500">
                          {submission.score}/{test.questions.length}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">
                        Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <Link
                      to={`/student/test/${test.id}`}
                      className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-medium transition"
                    >
                      Take Test
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default StudentTests
