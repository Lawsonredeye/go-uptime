// import { useState, useEffect } from "react";
// import axios from "axios";

// function Status({ api_token }) {
//   const [endpoints, setEndpoints] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchStatus = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:8080/api/v1/status", {
//         headers: { "X-API-Key": api_token },
//       });
//       setEndpoints(res.data);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to fetch status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-4 text-center text-teal-700">Endpoint Status</h1>
//       <button
//         onClick={fetchStatus}
//         className="mb-4 p-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
//         disabled={loading}
//       >
//         {loading ? "Loading..." : "Refresh"}
//       </button>
//       {loading ? (
//         <p className="text-center">Loading status...</p>
//       ) : endpoints.length > 0 ? (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 border border-gray-300">URL</th>
//               <th className="p-2 border border-gray-300">Status</th>
//               <th className="p-2 border border-gray-300">Alert Count</th>
//             </tr>
//           </thead>
//           <tbody>
//             {endpoints.map((ep) => (
//               <tr key={ep.url} className="text-center">
//                 <td className="p-2 border border-gray-300">{ep.url}</td>
//                 <td className="p-2 border border-gray-300">
//                   {ep.status === 200 ? "Up" : "Down"}
//                 </td>
//                 <td className="p-2 border border-gray-300">{ep.alert_count}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center">No endpoints monitored yet.</p>
//       )}
//       {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
//     </div>
//   );
// }

// export default Status;


"use client"

import { useState, useEffect } from "react"
import axios from "axios"

function Status({ api_token }) {
  const [endpoints, setEndpoints] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:8080/api/v1/status", {
        headers: { "X-API-Key": api_token },
      })
      setEndpoints(res.data)
      setError("")
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch status")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, []) // Removed api_token as a dependency

  return (
    <div className="max-w-4xl mx-auto mt-10 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white text-center">Endpoint Status</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={fetchStatus}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Refresh
                </>
              )}
            </button>
            <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">
              {endpoints.length} Endpoints Monitored
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading status data...</p>
            </div>
          ) : endpoints.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left font-semibold text-gray-700 border border-gray-200">URL</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border border-gray-200 w-32">Status</th>
                    <th className="p-3 text-center font-semibold text-gray-700 border border-gray-200 w-32">
                      Alert Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((ep, index) => (
                    <tr key={ep.url} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 truncate">{ep.url}</td>
                      <td className="p-3 border border-gray-200 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            ep.status === 200 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {ep.status === 200 ? (
                            <>
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              Up
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              Down
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-200 text-center">
                        {ep.alert_count > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {ep.alert_count}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            0
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">No endpoints monitored yet.</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Status

