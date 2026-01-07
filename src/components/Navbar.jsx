"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            EduLMS
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/features" className="hover:text-blue-400 transition">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-blue-400 transition">
              Pricing
            </Link>
            <Link to="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to={`/${user.role}/dashboard`}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
