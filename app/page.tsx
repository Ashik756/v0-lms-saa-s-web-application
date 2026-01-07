"use client"

import { BrowserRouter } from "react-router-dom"
import dynamic from "next/dynamic"

const App = dynamic(() => import("../src/App"), { ssr: false })

export default function Page() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
