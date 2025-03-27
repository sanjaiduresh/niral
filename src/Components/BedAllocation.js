import React, { useState, useEffect } from "react";
import "../Style/bedAllocation.css";

const initialBeds = [       
    { id: 1, status: "available", patientName: "", allocatedAt: null, vacateAt: null },
    { id: 2, status: "occupied", patientName: "John Doe", allocatedAt: "10:30", vacateAt: "14:00" },
    { id: 3, status: "available", patientName: "", allocatedAt: null, vacateAt: null },
    { id: 4, status: "occupied", patientName: "Alice Smith", allocatedAt: "11:00", vacateAt: "11:45" },
    { id: 5, status: "occupied", patientName: "Alice Smith", allocatedAt: "11:00", vacateAt: "12:30" },
    { id: 6, status: "available", patientName: "", allocatedAt: null, vacateAt: null },
];

const BedAllocation = () => {
    const [beds, setBeds] = useState(initialBeds);
    const [showModal, setShowModal] = useState(false);
    const [currentBed, setCurrentBed] = useState(null);
    const [formData, setFormData] = useState({ name: "", allocatedAt: "", vacateAt: "" });

    // Check vacate time and update bed status color
    useEffect(() => {
        const checkVacateTime = () => {
            const currentTime = new Date();
            setBeds((prevBeds) =>
                prevBeds.map((bed) => {
                    if (bed.vacateAt) {
                        const [hours, minutes] = bed.vacateAt.split(":");
                        const vacateTime = new Date();
                        vacateTime.setHours(hours, minutes, 0);

                        const diff = (vacateTime - currentTime) / (1000 * 60); // in minutes

                        if (diff <= 30 && bed.status === "occupied") {
                            return { ...bed, status: "warning" }; // Change color if vacate time is near
                        }
                    }
                    return bed;
                })
            );
        };

        const interval = setInterval(checkVacateTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const openModal = (bedId) => {
        setCurrentBed(bedId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ name: "", allocatedAt: "", vacateAt: "" });
    };

    const allocateBed = () => {
        setBeds(beds.map(bed =>
            bed.id === currentBed
                ? {
                      ...bed,
                      status: "occupied",
                      patientName: formData.name,
                      allocatedAt: formData.allocatedAt,
                      vacateAt: formData.vacateAt,
                  }
                : bed
        ));
        closeModal();
    };

    return (
        <div className="container">
            <h1>Hospital Bed Allocation</h1>
            <div className="bed-grid">
                {beds.map((bed) => (
                    <div key={bed.id} className={`bed ${bed.status}`}>
                        <p>Bed {bed.id}</p>
                        {bed.status === "available" && (
                            <button className="allocate-btn" onClick={() => openModal(bed.id)}>Allocate</button>
                        )}
                        {bed.status !== "available" && (
                            <div className="time-info">
                                <p>🛏 Patient: {bed.patientName}</p>
                                <p>🕒 Allocated At: {bed.allocatedAt}</p>
                                <p>⏳ Vacate At: {bed.vacateAt}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>Allocate Bed {currentBed}</h3>
                        <label>Patient Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <label>Allocation Time:</label>
                        <input type="time" onChange={(e) => setFormData({ ...formData, allocatedAt: e.target.value })}/>
                        <label>Vacate Time:</label>
                        <input type="time" onChange={(e) => setFormData({ ...formData, vacateAt: e.target.value })}/>
                        <button onClick={allocateBed}>Confirm Allocation</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BedAllocation;
