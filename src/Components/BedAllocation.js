import React, { useState, useEffect } from "react";
import "../Style/bedAllocation.css";

const BedAllocation = () => {
    const [selectedBed, setSelectedBed] = useState(null);
    const [patientName, setPatientName] = useState("");
    const sampleBeds = [
      { id: 1, status: "available" },
      { id: 2, status: "occupied" },
      { id: 3, status: "available" },
      { id: 4, status: "reserved" },
      { id: 5, status: "available" },
      { id: 6, status: "occupied" },
      { id: 7, status: "available" },
      { id: 8, status: "reserved" },
      { id: 9, status: "available" },
      { id: 10, status: "occupied" }
  ];
  
  const [beds, setBeds] = useState(sampleBeds);
  
    // Fetch bed data from backend
    useEffect(() => {
        // fetch("http://localhost:5000/api/beds")
        //     .then((res) => res.json())
        //     .then((data) => setBeds(data));
        // setBeds(10);
    }, []);

    // Handle bed selection
    const handleSelectBed = (bedId) => {
        setSelectedBed(bedId);
    };

    // Handle patient allocation
    const handleAllocateBed = () => {
        if (!selectedBed || !patientName) return;

        fetch(`http://localhost:5000/api/allocate-bed/${selectedBed}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientName }),
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            setBeds(data.updatedBeds);
            setSelectedBed(null);
            setPatientName("");
        });
    };

    return (
        <div className="container">
            <h2>Bed Allocation System</h2>
            <div className="bed-grid">
                {beds.map((bed) => (
                    <div 
                        key={bed.id} 
                        className={`bed ${bed.status}`} 
                        onClick={() => handleSelectBed(bed.id)}
                    >
                        <p>Bed {bed.id}</p>
                        <p>Status: {bed.status}</p>
                    </div>
                ))}
            </div>

            {selectedBed && (
                <div className="form-container">
                    <h3>Allocate Bed {selectedBed}</h3>
                    <input 
                        type="text" 
                        placeholder="Enter Patient Name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                    />
                    <button onClick={handleAllocateBed}>Allocate</button>
                </div>
            )}
        </div>
    );
};

export default BedAllocation;
