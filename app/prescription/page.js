

// "use client";
// import { useRef } from "react";
// import html2canvas from "html2canvas";

// export default function DoctorPrescription() {
//   const prescriptionRef = useRef(null);

//   const takeScreenshot = async () => {
//     const element = prescriptionRef.current;
//     if (!element) return;

//     const canvas = await html2canvas(element, { scale: 2 });
//     const image = canvas.toDataURL("image/jpeg");

//     const a = document.createElement("a");
//     a.href = image;
//     a.download = "prescription.jpg";
//     a.click();
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#f3f3f3",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "20px",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {/* Prescription Card */}
//       <div
//         ref={prescriptionRef}
//         style={{
//           width: "100%",
//           maxWidth: "600px",
//           backgroundColor: "#fff",
//           padding: "20px",
//           borderRadius: "15px",
//           boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//           border: "1px solid #ccc",
//         }}
//       >
//         {/* Header */}
//         <div style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "15px" }}>
//           <h1 style={{ fontSize: "24px", color: "#1d4ed8", margin: "0 0 5px 0" }}>Heal Well</h1>
//           <p style={{ fontSize: "14px", margin: "0" }}>123 Main Street, Your City</p>
//           <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginTop: "5px" }}>
//             <p>Helpline: <span style={{ fontWeight: "bold", color: "#2563eb" }}>+91 98765 43210</span></p>
//             <p>Email: <span style={{ fontWeight: "bold", color: "#2563eb" }}>support@citycare.com</span></p>
//           </div>
//         </div>

//         {/* Patient & Prescription Details */}
//         <div style={{ marginBottom: "15px" }}>
//           <div style={{ marginBottom: "10px" }}>
//             <label>Patient Name:</label>
//             <input type="text" placeholder="Enter patient name" style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }}/>
//           </div>

//           <div style={{ marginBottom: "10px" }}>
//             <label>Disease:</label>
//             <textarea placeholder="Enter diagnosed disease" rows={2} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }} />
//           </div>

//           <div style={{ marginBottom: "10px" }}>
//             <label>Follow-up:</label>
//             <textarea placeholder="Enter follow-up instructions" rows={2} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }} />
//           </div>

//           <div style={{ marginBottom: "10px" }}>
//             <label>Recommendations:</label>
//             <textarea placeholder="Enter recommendations" rows={3} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }} />
//           </div>
//         </div>

//         {/* Doctor Signature */}
//         <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
//           <div style={{ textAlign: "right" }}>
//             <p style={{ fontSize: "14px", fontStyle: "italic", marginBottom: "5px" }}>Doctor’s Signature</p>
//             <div style={{ borderTop: "1px solid #666", width: "150px" }}></div>
//           </div>
//         </div>
//       </div>

//       {/* Screenshot Button */}
//       <button
//         onClick={takeScreenshot}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           backgroundColor: "#2563eb",
//           color: "#fff",
//           border: "none",
//           borderRadius: "10px",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
//         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
//       >
//         Save Prescription as Image
//       </button>
//     </div>
//   );
// }
"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function DoctorPrescription() {
  const prescriptionRef = useRef(null);

  const takeScreenshot = async () => {
    const element = prescriptionRef.current;
    if (!element) return;

    // Use a higher scale for better resolution
    const canvas = await html2canvas(element, { scale: 3 });
    const image = canvas.toDataURL("image/jpeg");

    const a = document.createElement("a");
    a.href = image;
    a.download = "prescription.jpg";
    a.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Times New Roman, serif",
      }}
    >
      {/* Prescription Card */}
      <div
        ref={prescriptionRef}
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          border: "2px solid #000",
          position: "relative",
        }}
      >
        {/* Border and Top-Left Content */}
        <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "10px", height: "10px", border: "1px solid #000", marginRight: "5px" }}></div>
          <div style={{ width: "10px", height: "10px", border: "1px solid #000" }}></div>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "36px", color: "#000", margin: "0", fontWeight: "bold" }}>
            Dr. A. K. Jain, MBBS, MD
          </h1>
          <p style={{ fontSize: "16px", margin: "5px 0 0 0" }}>
            Reg. No. 12345 (Delhi Medical Council)
          </p>
          <p style={{ fontSize: "16px", margin: "5px 0 0 0" }}>
            123, Vasant Vihar, New Delhi - 110057
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "14px", marginTop: "5px" }}>
            <p style={{ margin: 0 }}>Tel: 011-2614XXXX</p>
            <p style={{ margin: 0 }}>Mob: 9810XXXXXX</p>
            <p style={{ margin: 0 }}>Email: drakjain@gmail.com</p>
          </div>
          <p style={{ fontSize: "14px", fontStyle: "italic", marginTop: "5px" }}>
            Timing: 10:00 AM - 1:00 PM (Monday-Saturday)
          </p>
          <div style={{ borderBottom: "1px solid #000", marginTop: "10px" }}></div>
        </div>

        {/* Patient Details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontWeight: "bold" }}>Name:</span>
            <input
              type="text"
              placeholder="______________________"
              style={{ border: "none", borderBottom: "1px solid #000", outline: "none", flex: "1" }}
            />
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontWeight: "bold" }}>Age/Sex:</span>
            <input
              type="text"
              placeholder="______________________"
              style={{ border: "none", borderBottom: "1px solid #000", outline: "none", flex: "1" }}
            />
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontWeight: "bold" }}>Date:</span>
            <input
              type="text"
              placeholder="______________________"
              style={{ border: "none", borderBottom: "1px solid #000", outline: "none", flex: "1" }}
            />
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontWeight: "bold" }}>BP:</span>
            <input
              type="text"
              placeholder="______________________"
              style={{ border: "none", borderBottom: "1px solid #000", outline: "none", flex: "1" }}
            />
          </div>
        </div>

        {/* Prescription Symbol */}
        <h2 style={{ fontSize: "40px", fontWeight: "bold", margin: "0", color: "#000" }}>Rx</h2>

        {/* Medication Table */}
        <div style={{ marginTop: "10px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #000" }}>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Medicine</th>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Dosage</th>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Frequency</th>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Days</th>
                <th style={{ textAlign: "left", padding: "8px 0" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "8px 0", verticalAlign: "top" }}>
                  <input
                    type="text"
                    placeholder="Enter medicine"
                    style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
                  />
                </td>
                <td style={{ padding: "8px 0", verticalAlign: "top" }}>
                  <input
                    type="text"
                    placeholder="Enter dosage"
                    style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
                  />
                </td>
                <td style={{ padding: "8px 0", verticalAlign: "top" }}>
                  <input
                    type="text"
                    placeholder="Enter freq"
                    style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
                  />
                </td>
                <td style={{ padding: "8px 0", verticalAlign: "top" }}>
                  <input
                    type="text"
                    placeholder="Enter days"
                    style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
                  />
                </td>
                <td style={{ padding: "8px 0", verticalAlign: "top" }}>
                  <input
                    type="text"
                    placeholder="Enter remarks"
                    style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
                  />
                </td>
              </tr>
              {/* Add more rows here if needed */}
            </tbody>
          </table>
        </div>

        {/* Instructions and Signature */}
        <div style={{ marginTop: "30px", borderTop: "1px solid #000", paddingTop: "15px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold" }}>Advice/Instructions:</label>
            <textarea
              placeholder="Enter advice or instructions"
              rows={3}
              style={{ width: "100%", padding: "5px", borderRadius: "3px", border: "1px solid #ccc", marginTop: "5px", resize: "none" }}
            />
          </div>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <p style={{ fontSize: "16px", fontStyle: "italic", margin: "0" }}>
              <span style={{ fontWeight: "bold" }}>Signature of Consulting Physician</span>
            </p>
            <p style={{ fontSize: "14px", marginTop: "5px", fontStyle: "italic" }}>
              (Signature and official seal)
            </p>
          </div>
        </div>
      </div>

      {/* Screenshot Button */}
      <button
        onClick={takeScreenshot}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
      >
        Save Prescription as Image
      </button>
    </div>
  );
}