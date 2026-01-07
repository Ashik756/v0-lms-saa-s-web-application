"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { CheckCircle, XCircle, Award } from "lucide-react"

const TakeTest = () => {
  const { testId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const test = storage.getTestById(testId)

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let correctCount = 0
    test.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    setScore(correctCount)
    setSubmitted(true)

    const submission = {
      id: Date.now().toString(),
      testId,
      studentId: user.id,
      answers,
      score: correctCount,
      submittedAt: new Date().toISOString(),
    }

    storage.addSubmission(submission)
  }

  if (!test) {
    return (
      <DashboardLayout title="Test Not Found">
        <div className="text-center py-12">
          <p className="text-slate-400">Test not found</p>
        </div>
      </DashboardLayout>
    )
  }

  if (submitted) {
    const percentage = ((score / test.questions.length) * 100).toFixed(0)
    const passed = percentage >= 60

    return (
      <DashboardLayout title="Test Results">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 text-center">
            <div
              className={`w-20 h-20 rounded-full ${passed ? "bg-green-600" : "bg-red-600"} flex items-center justify-center mx-auto mb-6`}
            >
              {passed ? <Award className="w-10 h-10 text-white" /> : <XCircle className="w-10 h-10 text-white" />}
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">{passed ? "Congratulations!" : "Keep Trying!"}</h2>
            <p className="text-slate-400 mb-8">You completed {test.title}</p>

            <div className="bg-slate-800 rounded-xl p-8 mb-8">
              <div className="text-6xl font-bold text-white mb-2">
                {score}/{test.questions.length}
              </div>
              <div className="text-slate-400">Correct Answers</div>
              <div className={`text-2xl font-bold mt-4 ${passed ? "text-green-500" : "text-red-500"}`}>
                {percentage}%
              </div>
            </div>

            <div className="space-y-6 text-left">
              <h3 className="text-xl font-bold text-white">Review Answers</h3>
              {test.questions.map((question, qIndex) => {
                const userAnswer = answers[qIndex]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <div key={qIndex} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-start gap-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-3">
                          {qIndex + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => {
                            const isUserAnswer = userAnswer === oIndex
                            const isCorrectAnswer = question.correctAnswer === oIndex

                            return (
                              <div
                                key={oIndex}
                                className={`px-4 py-2 rounded-lg text-sm ${
                                  isCorrectAnswer
                                    ? "bg-green-600/20 text-green-400 border border-green-600"
                                    : isUserAnswer
                                      ? "bg-red-600/20 text-red-400 border border-red-600"
                                      : "bg-slate-700 text-slate-400"
                                }`}
                              >
                                {option}
                                {isCorrectAnswer && " ✓ (Correct Answer)"}
                                {isUserAnswer && !isCorrectAnswer && " ✗ (Your Answer)"}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => navigate("/student/tests")}
              className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title={test.title}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{test.title}</h2>
            <p className="text-slate-400">{test.questions.length} questions • Answer all questions and submit</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {test.questions.map((question, qIndex) => (
              <div key={qIndex} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <p className="text-white font-medium mb-4">
                  {qIndex + 1}. {question.question}
                </p>
                <div className="space-y-3">
                  {question.options.map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition ${
                        answers[qIndex] === oIndex
                          ? "bg-blue-600/20 border border-blue-600"
                          : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={answers[qIndex] === oIndex}
                        onChange={() => handleAnswerChange(qIndex, oIndex)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                        required={qIndex === 0}
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/student/tests")}
                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                disabled={Object.keys(answers).length !== test.questions.length}
              >
                Submit Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TakeTest
