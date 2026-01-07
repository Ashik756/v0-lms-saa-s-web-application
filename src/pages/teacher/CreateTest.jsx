"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { storage } from "../../utils/storage"
import DashboardLayout from "../../components/DashboardLayout"
import { Plus, Trash2, TestTube } from "lucide-react"

const CreateTest = () => {
  const { batchId } = useParams()
  const navigate = useNavigate()
  const batch = storage.getBatchById(batchId)

  const [testTitle, setTestTitle] = useState("")
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ])

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ])
  }

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions]
    newQuestions[index].question = value
    setQuestions(newQuestions)
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options[oIndex] = value
    setQuestions(newQuestions)
  }

  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].correctAnswer = oIndex
    setQuestions(newQuestions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTest = {
      id: Date.now().toString(),
      title: testTitle,
      batchId,
      questions,
      createdAt: new Date().toISOString(),
    }

    storage.addTest(newTest)
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
    <DashboardLayout title="Create Test">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <TestTube className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Test</h2>
              <p className="text-slate-400">For: {batch.name}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Test Title *</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Chapter 1 Quiz"
                required
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Questions</h3>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </button>
              </div>

              {questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-white font-medium">Question {qIndex + 1}</h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIndex)}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your question..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-slate-400">Options (select the correct answer)</p>
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={q.correctAnswer === oIndex}
                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder={`Option ${oIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
                Create Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTest
