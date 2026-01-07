"use client"

import dynamic from "next/dynamic"
import "../src/index.css"

// Dynamically import the App component to avoid SSR issues with React Router
const App = dynamic(() => import("../src/App"), { ssr: false })

export default function Page() {
  return <App />
}
