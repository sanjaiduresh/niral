import React
//  { useState } 
 from "react";
// import { allocateBed } from '../api';

const BedAllocation = () => {
  // const [severityLevel, setSeverityLevel] = useState("");
  // const [bedAvailability, setBedAvailability] = useState("");
  // const [expectedStay, setExpectedStay] = useState("");
  // const [bedAssigned, setBedAssigned] = useState("");

//   const handleAllocate = async () => {
//     // const data = await allocateBed(severityLevel, bedAvailability, expectedStay);
//     // setBedAssigned(data.bed_assigned);
//   };

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-3">Bed Allocation</h2>
      <input
        type="text"
        placeholder="Severity Level"
        // onChange={(e) => setSeverityLevel(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Bed Availability"
        // onChange={(e) => setBedAvailability(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Expected Stay (days)"
        // onChange={(e) => setExpectedStay(e.target.value)}
        className="border p-2 m-2"
      />
      <button
        // onClick={handleAllocate}
        className="bg-green-500 text-white p-2 rounded"
      >
        Allocate
      </button>
      {/* {bedAssigned && <p className="mt-3">Bed Assigned: {bedAssigned}</p>} */}
    </div>
  );
};

export default BedAllocation;
