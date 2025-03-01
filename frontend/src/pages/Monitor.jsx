// import { useState } from "react";
// import axios from "axios";

// function Monitor({ api_token }) {
//     const [url, setUrl] = useState("");
//     const [email, setEmail] = useState("")
//     const [message, setMessage] = useState("")
//     const [error, setError] = useState("");

//     const handleSubmit = async(e)=>{
//         e.preventDefault();
//         try {
//             const res = await axios.post(
//                 "http://localhost:8080/api/v1/monitor",
//                 { url, email },
//                 { headers: { "X-API-Key": api_token } }
//             );
//             setMessage(res.data.message)
//             setError("")
//             setUrl("");
//             setEmail("")
//         } catch (error) {
//             setError(error.response?.data?.error || "Failed to start monitoring");
//         }
//     }

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
//         <h1 className="text-2xl font-bold mb-4 text-center text-teal-700">Monitor a Backend</h1>
//         <form onSubmit={handleSubmit}>
//             <input
//             type="url"
//             placeholder="URL to Monitor (e.g., https://api.example.com)"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//             />
//             <input
//             type="email"
//             placeholder="Alert Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 mb-4 border border-gray-300 rounded placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//             />
//             <button
//             type="submit"
//             className="w-full p-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
//             >
//             Start Monitoring
//             </button>
//             {message && <p className="text-green-500 mt-2">{message}</p>}
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//         </form>
//     </div>
//     );
// }

// export default Monitor;


"use client"

import { useState } from "react"
import axios from "axios"

function Monitor({ api_token }) {
  const [url, setUrl] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/monitor",
        { url, email },
        { headers: { "X-API-Key": api_token } },
      )
      setMessage(res.data.message)
      setError("")
      setUrl("")
      setEmail("")
    } catch (error) {
      setError(error.response?.data?.error || "Failed to start monitoring")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-blue-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
        <h1 className="text-2xl font-bold text-gray-800">Monitor a Backend</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            ></path>
          </svg>
          <input
            type="url"
            placeholder="URL to Monitor (e.g., https://api.example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="relative">
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <input
            type="email"
            placeholder="Alert Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
            <svg
              className="w-5 h-5 inline mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          )}
          {isSubmitting ? "Starting..." : "Start Monitoring"}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
          <svg
            className="w-5 h-5 inline mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
          <svg
            className="w-5 h-5 inline mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  )
}

export default Monitor

