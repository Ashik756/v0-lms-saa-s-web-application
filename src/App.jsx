"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

// Public Pages
import Home from "./pages/Home"
import Features from "./pages/Features"
import Pricing from "./pages/Pricing"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import CreateBatch from "./pages/teacher/CreateBatch"
import BatchDetails from "./pages/teacher/BatchDetails"
import CreateLiveClass from "./pages/teacher/CreateLiveClass"
import LiveClassRoom from "./pages/teacher/LiveClassRoom"
import ManageNotes from "./pages/teacher/ManageNotes"
import ManageRecorded from "./pages/teacher/ManageRecorded"
import CreateTest from "./pages/teacher/CreateTest"

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard"
import StudentBatchView from "./pages/student/StudentBatchView"
import StudentLiveClass from "./pages/student/StudentLiveClass"
import StudentTests from "./pages/student/StudentTests"
import TakeTest from "./pages/student/TakeTest"

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/batch/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateBatch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/batch/:batchId"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <BatchDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/batch/:batchId/live-class/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateLiveClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/live-class/:classId"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <LiveClassRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/batch/:batchId/notes"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ManageNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/batch/:batchId/recorded"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <ManageRecorded />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/batch/:batchId/test/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <CreateTest />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/batch/:batchId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentBatchView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/live-class/:classId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLiveClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/tests"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentTests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/test/:testId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <TakeTest />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
