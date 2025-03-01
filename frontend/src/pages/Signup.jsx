import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/signup", { email, password, name });
      navigate("/login")
      console.log("Signup successful, API Key:", res.data.api_key);
      // For now, log the API key—update to redirect/store later
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-teal-700">Signup</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="name"
          placeholder="Enter your full name e.g John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          Sign Up
        </button>
        <small className="text-black text-center">Already have an account? <a href="http://localhost:5173/login" className="text-blue-500">Login</a></small>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;