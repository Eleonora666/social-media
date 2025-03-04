import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

import HackerAuth from "./Auth/Auth"; 
import Profile from "./profile/Profile";

function App() {
  return (
    <Router> {/* Use BrowserRouter as Router */}
      <Routes>
        <Route path="/" element={<HackerAuth />} /> 
        <Route path="/profile" element={<Profile />} /> 
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
