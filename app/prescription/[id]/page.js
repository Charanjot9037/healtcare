
// "use client";
// import { useRef } from "react";
// import html2canvas from "html2canvas";
// import { useParams } from "next/navigation";
// import { useState,useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// export default function DoctorPrescription() {
//   const prescriptionRef = useRef(null);
// const {id}=useParams();

//   const [prescribe, setprescribe] = useState(null);

// const router=useRouter();
// useEffect(() => {
//   const fetchappointment = async () => {
//     try {
//       const res = await fetch("/api/prescribeappointment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }), // make sure 'id' exists
//       });

//       if (!res.ok) throw new Error("Failed to fetch appointment");

//       const data = await res.json(); // parse JSON
//       console.log("Fetched data:", data);

//       setprescribe(data); // update state
//     } catch (err) {
//       console.error("Error fetching appointment:", err);
//     }
//   };

//   if (id) fetchappointment(); // only call if 'id' exists
// }, [id]); // add 'id' as dependency






// console.log(id)
//   const takeScreenshot = async () => {
//     const element = prescriptionRef.current;
//     if (!element) return;

//     // Use a higher scale for better resolution
//     const canvas = await html2canvas(element, { scale: 3 });
//     const image = canvas.toDataURL("image/jpeg");

//     const a = document.createElement("a");
//     a.href = image;
//     a.download = "prescription.jpg";
//     a.click();
// // router.push("/doctor-pannel")


//   };
// console.log("prescrine",prescribe)
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#f5f5f5",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "20px",
//         fontFamily: "Times New Roman, serif",
//       }}
//     >
//       {/* Prescription Card */}
//       <div
//         ref={prescriptionRef}
//         style={{
//           width: "100%",
//           maxWidth: "700px",
//           backgroundColor: "#fff",
//           padding: "30px",
//           borderRadius: "5px",
//           boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           border: "2px solid #000",
//           position: "relative",
//         }}
//       >
//         {/* Border and Top-Left Content */}
//         <div style={{ position: "absolute", top: "15px", left: "15px", display: "flex", alignItems: "center" }}>
//           <div style={{ width: "10px", height: "10px", border: "1px solid #000", marginRight: "5px" }}></div>
//           <div style={{ width: "10px", height: "10px", border: "1px solid #000" }}></div>
//         </div>
     
//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h2 style={{ fontSize: "40px", fontWeight: "bold", margin: "0", color: "#000" }}>Heal well</h2>
//           <h1 style={{ fontSize: "36px", color: "#000", margin: "0", fontWeight: "bold" }}>
             
//            DR.{prescribe?.app?.doctorName ||"dr.name"}
//           </h1>
//           <p style={{ fontSize: "16px", margin: "5px 0 0 0" }}>
//             Reg. No. 12345 (Delhi Medical Council)
//           </p>
//           <p style={{ fontSize: "16px", margin: "5px 0 0 0" }}>
//             123, Vasant Vihar, New Delhi - 110057
//           </p>
//           <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "14px", marginTop: "5px" }}>
//             <p style={{ margin: 0 }}>Tel: 011-2614XXXX</p>
//             <p style={{ margin: 0 }}>Mob: 9810XXXXXX</p>
//             <p style={{ margin: 0 }}>Email: drakjain@gmail.com</p>
//           </div>
//           <p style={{ fontSize: "14px", fontStyle: "italic", marginTop: "5px" }}>
//             Timing: 10:00 AM - 1:00 PM (Monday-Saturday)
//           </p>
//           <div style={{ borderBottom: "1px solid #000", marginTop: "10px" }}></div>
//         </div>

//         {/* Patient Details */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "10px",
//             fontSize: "16px",
//             marginBottom: "20px",
//           }}
//         >
//           <div style={{ display: "flex", gap: "5px" }}>
//             <span style={{ fontWeight: "bold" }}>Name:{prescribe?.app?.firstName}</span>
           
//           </div>
//           <div style={{ display: "flex", gap: "5px" }}>
//             <span style={{ fontWeight: "bold" }}>Age/Sex:{prescribe?.app?.gender}</span>
           
//           </div>
//           <div style={{ display: "flex", gap: "5px" }}>
//             <span style={{ fontWeight: "bold" }}>Date:{prescribe?.app?.appointmentDate.split("T")[0]}</span>
            
//           </div>
//           <div style={{ display: "flex", gap: "5px" }}>
//             <span style={{ fontWeight: "bold" }}>mobile:{prescribe?.app?.mobile}</span>
          
//           </div>
//         </div>

//         {/* Prescription Symbol */}
  

//         {/* Medication Table */}
//         <div style={{ marginTop: "10px" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
//             <thead>
//               <tr style={{ borderBottom: "1px solid #000" }}>
//                 <th style={{ textAlign: "left", padding: "8px 0" }}>Medicine</th>
//                 <th style={{ textAlign: "left", padding: "8px 0" }}>Dosage</th>
//                 <th style={{ textAlign: "left", padding: "8px 0" }}>Frequency</th>
//                 <th style={{ textAlign: "left", padding: "8px 0" }}>Days</th>
//                 <th style={{ textAlign: "left", padding: "8px 0" }}>Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td style={{ padding: "8px 0", verticalAlign: "top" }}>
//                   <input
//                     type="text"
//                     placeholder="Enter medicine"
//                     style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
//                   />
//                 </td>
//                 <td style={{ padding: "8px 0", verticalAlign: "top" }}>
//                   <input
//                     type="text"
//                     placeholder="Enter dosage"
//                     style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
//                   />
//                 </td>
//                 <td style={{ padding: "8px 0", verticalAlign: "top" }}>
//                   <input
//                     type="text"
//                     placeholder="Enter freq"
//                     style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
//                   />
//                 </td>
//                 <td style={{ padding: "8px 0", verticalAlign: "top" }}>
//                   <input
//                     type="text"
//                     placeholder="Enter days"
//                     style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
//                   />
//                 </td>
//                 <td style={{ padding: "8px 0", verticalAlign: "top" }}>
//                   <input
//                     type="text"
//                     placeholder="Enter remarks"
//                     style={{ width: "100%", border: "none", borderBottom: "1px dotted #ccc", outline: "none" }}
//                   />
//                 </td>
//               </tr>
//               {/* Add more rows here if needed */}
//             </tbody>
//           </table>
//         </div>

//         {/* Instructions and Signature */}
//         <div style={{ marginTop: "30px", borderTop: "1px solid #000", paddingTop: "15px" }}>
//           <div style={{ marginBottom: "15px" }}>
//             <label style={{ fontWeight: "bold" }}>Advice/Instructions:</label>
//             <textarea
//               placeholder="Enter advice or instructions"
//               rows={3}
//               style={{ width: "100%", padding: "5px", borderRadius: "3px", border: "1px solid #ccc", marginTop: "5px", resize: "none" }}
//             />
//           </div>
//        <div style={{ textAlign: "right", marginTop: "20px" }}>
 
//    <Image src={prescribe?.app.doctorId.signature } 
//                   alt="dioedk"
//                   width={200}
//                   height={200}
//                   className=" object-cover rounded-xl"
//                      style={{ float: "right" }}
//                 />
//                 <div>
//  <p style={{ fontSize: "16px", fontStyle: "italic", margin: "0" }}>
//     <span style={{ fontWeight: "bold" }}>Signature of Consulting Physician</span>
//   </p>
//                 </div>

// </div>
 
          
//         </div>
//       </div>

//       {/* Screenshot Button */}
//       <button
//         onClick={takeScreenshot}
//         style={{
//           marginTop: "20px",
//           padding: "12px 24px",
//           backgroundColor: "#2563eb",
//           color: "#fff",
//           border: "none",
//           borderRadius: "10px",
//           cursor: "pointer",
//           fontWeight: "bold",
//           fontSize: "16px",
//           transition: "background-color 0.3s",
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
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation";

export default function DoctorPrescription() {
  const prescriptionRef = useRef(null);
  const { id } = useParams();
  const [prescribe, setprescribe] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchappointment = async () => {
      try {
        const res = await fetch("/api/prescribeappointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!res.ok) throw new Error("Failed to fetch appointment");

        const data = await res.json();
        console.log("Fetched data:", data);
        setprescribe(data);
      } catch (err) {
        console.error("Error fetching appointment:", err);
      }
    };

    if (id) fetchappointment();
  }, [id]);

  const takeScreenshot = async () => {
    const element = prescriptionRef.current;
    if (!element) return;

    // Wait for all images to load
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((res) => {
            if (img.complete) res();
            else img.onload = res;
          })
      )
    );

    // Capture screenshot
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
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "40px", fontWeight: "bold", margin: "0", color: "#000" }}>
            Heal well
          </h2>
          <h1 style={{ fontSize: "36px", color: "#000", margin: "0", fontWeight: "bold" }}>
            DR. {prescribe?.app?.doctorName || "dr.name"}
          </h1>
          <p style={{ fontSize: "16px", margin: "5px 0 0 0" }}>Reg. No. 12345 (Delhi Medical Council)</p>
          <p style={{ fontSize: "16px", margin: "5px 0 0 0" }}>123, Vasant Vihar, New Delhi - 110057</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontSize: "14px",
              marginTop: "5px",
            }}
          >
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
            <span style={{ fontWeight: "bold" }}>Name: {prescribe?.app?.firstName}</span>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontWeight: "bold" }}>Age/Sex: {prescribe?.app?.gender}</span>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontWeight: "bold" }}>
              Date: {prescribe?.app?.appointmentDate?.split("T")[0]}
            </span>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ fontWeight: "bold" }}>Mobile: {prescribe?.app?.mobile}</span>
          </div>
        </div>

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
              style={{
                width: "100%",
                padding: "5px",
                borderRadius: "3px",
                border: "1px solid #ccc",
                marginTop: "5px",
                resize: "none",
              }}
            />
          </div>

          {/* Signature */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: "20px" }}>
            <img
              src={prescribe?.app?.doctorId?.signature}
              alt="Doctor Signature"
              width={200}
              height={100}
              style={{ objectFit: "cover", borderRadius: "12px" }}
            />
            <p style={{ fontSize: "16px", fontStyle: "italic", fontWeight: "bold", marginTop: "5px" }}>
              Signature of Consulting Physician
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
