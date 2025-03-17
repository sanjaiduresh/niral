import React, { useState } from "react";
import "../Style/doctor.css"; 

const Doctor = () => {
  // Sample patient reports
  const [patients, ] = useState([
    { id: 1, name: "Alice Johnson", age: 30, ailment: "Flu", prescription: "Paracetamol", lastVisit: "2025-03-10" },
    { id: 2, name: "Bob Williams", age: 45, ailment: "Fractured Arm", prescription: "Painkillers", lastVisit: "2025-02-28" },
    { id: 3, name: "Charlie Davis", age: 29, ailment: "Migraine", prescription: "Ibuprofen", lastVisit: "2025-03-05" },
    { id: 4, name: "David Smith", age: 50, ailment: "Diabetes", prescription: "Insulin", lastVisit: "2025-02-15" },
    { id: 5, name: "Emma Brown", age: 36, ailment: "Hypertension", prescription: "Amlodipine", lastVisit: "2025-02-20" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter patients based on search input
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.ailment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toString().includes(searchTerm)
  );

  return (
    <div className="doctor-container">
      <h2 className="doctor-title">Doctor's Dashboard</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, Ailment, or ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Patient Reports Table */}
      <table className="doctor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Ailment</th>
            <th>Prescription</th>
            <th>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.ailment}</td>
              <td>{patient.prescription}</td>
              <td>{patient.lastVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctor;
