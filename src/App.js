import React, { useState } from "react";
import BedAllocation from "./Components/BedAllocation";
import QueuePrediction from "./Components/QueuePrediction";
import Reception from "./Pages/Reception";
import Doctor from "./Pages/Doctor"; // Import Doctor component
import "./Style/app.css";

function App() {
  const [selectedComponent, setSelectedComponent] = useState("Reception");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Reception":
        return <Reception />;
      case "Doctor":
        return <Doctor />;
      case "BedAllocation":
        return <BedAllocation />;
      case "QueuePrediction":
        return <QueuePrediction />;
      default:
        return <Reception />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2 className="sidebar-title">PatientLink SmartCare</h2>
        <button onClick={() => setSelectedComponent("Reception")} className={`sidebar-btn ${selectedComponent === "Reception" ? "active" : ""}`}>
          Reception
        </button>
        <button onClick={() => setSelectedComponent("Doctor")} className={`sidebar-btn ${selectedComponent === "Doctor" ? "active" : ""}`}>
          Doctor's Dashboard
        </button>
        <button onClick={() => setSelectedComponent("BedAllocation")} className={`sidebar-btn ${selectedComponent === "BedAllocation" ? "active" : ""}`}>
          Bed Allocation
        </button>
        <button onClick={() => setSelectedComponent("QueuePrediction")} className={`sidebar-btn ${selectedComponent === "QueuePrediction" ? "active" : ""}`}>
          Queue Prediction
        </button>
        
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
