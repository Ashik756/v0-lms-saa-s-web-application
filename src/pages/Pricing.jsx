"use client"

import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Check } from "lucide-react"

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "৳0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 2 batches",
        "10 students per batch",
        "Basic live classes",
        "Class notes",
        "5 MCQ tests",
        "Community support",
      ],
    },
    {
      name: "Teacher Pro",
      price: "৳999",
      period: "per month",
      description: "For serious educators",
      features: [
        "Unlimited batches",
        "Unlimited students",
        "HD live classes",
        "Advanced notes & PDFs",
        "Unlimited tests",
        "Recorded content",
        "Priority support",
        "Analytics dashboard",
      ],
      popular: true,
    },
    {
      name: "Institution",
      price: "৳4,999",
      period: "per month",
      description: "For coaching centers & schools",
      features: [
        "Everything in Pro",
        "Multiple teachers",
        "Branded platform",
        "Custom domain",
        "Advanced analytics",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the perfect plan for your teaching needs. All plans include core LMS features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-slate-900 rounded-2xl p-8 border ${
                plan.popular ? "border-blue-500 shadow-xl shadow-blue-500/20 scale-105" : "border-slate-800"
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400">/{plan.period}</span>
                </div>
              </div>

              <Link
                to="/register"
                className={`block w-full py-3 rounded-lg font-medium text-center mb-8 transition ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                }`}
              >
                Get Started
              </Link>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
