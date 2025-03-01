// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ setApiKey }) {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {

//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:8080/login", { email, password });
//             localStorage.setItem("api_token", res.data.details.api_token);
//             setApiKey(res.data.details.api_token)
//             navigate("/monitor");
//         } catch (err) {
//             setError(err.response?.data?.error || "Login failed");
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
//             <h1 className="text-2xl font-bold mb-4 text-center text-teal-700">Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email" 
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     // className="w-full p-2 mb-4 border rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                 />
//                 <input 
//                     type="password"
//                     placeholder="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     // className="w-full p-2 mb-4 border rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="w-full p-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
//                 >
//                     Log In
//                 </button>
//                 <small className="text-black text-center">Don't have an account? <a href="http://localhost:5173/signup" className="text-blue-500">Sign up</a></small>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </form>

//         </div>
//     )
// }

// export default Login

"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login({ setApiKey }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const res = await axios.post("http://localhost:8080/login", { email, password })
      localStorage.setItem("apiKey", res.data.details.api_token)
      setApiKey(res.data.details.api_token)
      navigate("/monitor")
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <svg className="h-8 w-8 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          />
        </div>
        <div className="relative">
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          )}
          {isLoading ? "Logging In..." : "Log in"}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
          <svg className="w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  )
}

export default Login

