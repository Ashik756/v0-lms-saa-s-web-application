// LocalStorage helper functions for managing app data

export const storage = {
  // Batches
  getBatches: () => JSON.parse(localStorage.getItem("batches") || "[]"),
  setBatches: (batches) => localStorage.setItem("batches", JSON.stringify(batches)),
  addBatch: (batch) => {
    const batches = storage.getBatches()
    batches.push(batch)
    storage.setBatches(batches)
    return batch
  },
  getBatchById: (id) => storage.getBatches().find((b) => b.id === id),
  updateBatch: (id, updates) => {
    const batches = storage.getBatches()
    const index = batches.findIndex((b) => b.id === id)
    if (index !== -1) {
      batches[index] = { ...batches[index], ...updates }
      storage.setBatches(batches)
    }
  },

  // Live Classes
  getLiveClasses: () => JSON.parse(localStorage.getItem("liveClasses") || "[]"),
  setLiveClasses: (classes) => localStorage.setItem("liveClasses", JSON.stringify(classes)),
  addLiveClass: (liveClass) => {
    const classes = storage.getLiveClasses()
    classes.push(liveClass)
    storage.setLiveClasses(classes)
    return liveClass
  },
  getLiveClassById: (id) => storage.getLiveClasses().find((c) => c.id === id),

  // Notes
  getNotes: () => JSON.parse(localStorage.getItem("notes") || "[]"),
  setNotes: (notes) => localStorage.setItem("notes", JSON.stringify(notes)),
  addNote: (note) => {
    const notes = storage.getNotes()
    notes.push(note)
    storage.setNotes(notes)
    return note
  },

  // Recorded Classes
  getRecorded: () => JSON.parse(localStorage.getItem("recorded") || "[]"),
  setRecorded: (recorded) => localStorage.setItem("recorded", JSON.stringify(recorded)),
  addRecorded: (video) => {
    const recorded = storage.getRecorded()
    recorded.push(video)
    storage.setRecorded(recorded)
    return video
  },

  // Tests
  getTests: () => JSON.parse(localStorage.getItem("tests") || "[]"),
  setTests: (tests) => localStorage.setItem("tests", JSON.stringify(tests)),
  addTest: (test) => {
    const tests = storage.getTests()
    tests.push(test)
    storage.setTests(tests)
    return test
  },
  getTestById: (id) => storage.getTests().find((t) => t.id === id),

  // Enrollments
  getEnrollments: () => JSON.parse(localStorage.getItem("enrollments") || "[]"),
  setEnrollments: (enrollments) => localStorage.setItem("enrollments", JSON.stringify(enrollments)),
  addEnrollment: (enrollment) => {
    const enrollments = storage.getEnrollments()
    enrollments.push(enrollment)
    storage.setEnrollments(enrollments)
  },

  // Comments
  getComments: () => JSON.parse(localStorage.getItem("comments") || "[]"),
  setComments: (comments) => localStorage.setItem("comments", JSON.stringify(comments)),
  addComment: (comment) => {
    const comments = storage.getComments()
    comments.push(comment)
    storage.setComments(comments)
    return comment
  },

  // Test Submissions
  getSubmissions: () => JSON.parse(localStorage.getItem("submissions") || "[]"),
  setSubmissions: (submissions) => localStorage.setItem("submissions", JSON.stringify(submissions)),
  addSubmission: (submission) => {
    const submissions = storage.getSubmissions()
    submissions.push(submission)
    storage.setSubmissions(submissions)
    return submission
  },
}
