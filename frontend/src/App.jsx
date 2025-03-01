
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Monitor from "./pages/Monitor"
import Status from './pages/Status';
import { useState } from 'react';
import Navbar from './pages/Navbar';


function App() {
  const [api_token, setApiKey] = useState(localStorage.getItem("api_token") || "")

  const handleLogout = () => {
    localStorage.removeItem("api_token");
    setApiKey("")
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray">
        <Navbar apiKey={api_token} onLogout={handleLogout} />
        <Routes>
          <Route path="/signup" element={<Signup setApiKey={setApiKey} />} />
          <Route path="/login" element={<Login setApiKey={setApiKey}/>} />
          <Route path="/monitor" 
          element={api_token != "" ? <Monitor api_token={api_token}/> : <Navigate to="/login"/>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/status"
            element={api_token != "" ? <Status api_token={api_token} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
