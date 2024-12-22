// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostPortal from "./components/HostPortal";
import ParticipantForm from "./components/ParticipantForm";
import DataView from "./components/DataView";
import SearchPage from "./components/SearchPage"; // Import the SearchPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HostPortal />} />
        <Route path="/form/:linkId" element={<ParticipantForm />} />
        <Route path="/data/:linkId" element={<DataView />} />
        <Route path="/search" element={<SearchPage />} /> {/* Add the search route */}
      </Routes>
    </Router>
  );
}

export default App;
