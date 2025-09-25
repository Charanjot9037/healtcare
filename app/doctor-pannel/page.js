
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "../lib/config/uploadToCloudiary";
export default function DoctorLandingPage() {
  const [user, setuser] = useState(null);
  const [doctorep,setdoctorrep]=useState(null);
  const[loading,setLoading]=useState(null)
const router=useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setuser(parsedUser.id);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);






  const handleReportClick = (e) => {
    const link = e.target.value;
    if (link) {
      window.open(link, "_blank"); // open in new tab
    }
  };
 
  const [app, setApp] = useState(null);
  useEffect(() => {
    const fetchAppointment = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/doctorsappt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user }),
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setApp(data.appointments || []);
        console.log(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointment();
  }, [user]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      time: "09:00 AM",
      patientName: "John Doe",
      reason: "Regular Checkup",
      status: "Confirmed",
    },
    {
      id: 2,
      time: "11:30 AM",
      patientName: "Jane Smith",
      reason: "Follow-up",
      status: "Pending",
    },
    {
      id: 3,
      time: "02:00 PM",
      patientName: "Alice Johnson",
      reason: "Consultation",
      status: "Cancelled",
    },
  ]);

  const [animate, setAnimate] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-200 text-green-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-900";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const generateMeetingLink = (meetingId) => {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    "/room/" +
    meetingId
  );
};


  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      appt.reason.toLowerCase().includes(search.toLowerCase()) ||
      appt.status.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || appt.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-blue-300 flex items-center justify-center p-6">
      {/* Only show center card if modal is NOT open */}
      {!showModal && (
        <div className="max-w-5xl w-full bg-white/25 backdrop-blur-xl shadow-2xl rounded-2xl p-10 border border-white/30 text-black transition-opacity duration-300">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold mb-2 drop-shadow-sm">
              {app?.[0]?.doctorName || "Doctor Name"}
            </h1>
            <p className="text-lg">Here are your appointments for today:</p>
          </header>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="🔍 Search by name, reason, or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 bg-white/60 backdrop-blur-md text-black placeholder-gray-600 rounded-xl shadow-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 bg-white/60 backdrop-blur-md text-black rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="All">All</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {filteredAppointments.length === 0 ? (
            <p className="text-center text-lg">No appointments found.</p>
          ) : (
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-sm uppercase tracking-wide">
                  <th className="text-left py-3 px-6">Time</th>
                  <th className="text-left py-3 px-6">Patient Name</th>
                  <th className="text-left py-3 px-6">Date</th>
                  <th className="text-left py-3 px-6">Status</th>
                    <th className="text-left py-3 px-6">Test Reports</th>
                  <th className="text-left py-3 px-6">Meeting</th>
                  <th className="text-left py-3 px-6">Give Prescription Report</th>
                </tr>
              </thead>
              <tbody>
                {app?.map((app, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer rounded-xl bg-white/40 backdrop-blur-md shadow-md
                    transition transform duration-500
                    ${
                      animate
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }
                    hover:scale-[1.01] hover:bg-white/60`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <td className="py-4 px-6 font-semibold">
                      {app.appointmentTime || "N/A"}
                    </td>
                    <td className="py-4 px-6">{app.firstName}</td>
                    <td className="py-4 px-6 italic">{app.appointmentDate}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${statusColor(
                          app.status
                        )}`}
                      >
                        {app?.appointmentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                   
    <div className="flex flex-col space-y-2">
    

      {app?.reports.length === 0 ? (
        <p className="text-gray-500">No reports</p>
      ) : (
        <select
          onChange={handleReportClick}
          className="p-2 border rounded-lg shadow-sm"
        >
          <option value="">View Report</option>
          {app.reports.map((link, index) => (
            <option key={index} value={link}>
              Report {index + 1}
            </option>
          ))}
        </select>
      )}
    </div>



                      

                    </td>
                    <td>
                      {app?.appointmentStatus === "confirm" ? (
  <button
    className="px-3 py-1 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
    onClick={() => {
      // redirect to meeting page with router
      router.push(`${app.meetinglink}`); 
      // or use meetingLink if you stored it in DB: router.push(app.meetingLink)
    }}
  >
    Join
  </button>
) : (
  <button
    className="px-3 py-1 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
    onClick={() => {
      setSelectedPatient({
        id: app._id,
        time: app.appointmentTime,
        patientName: app.firstName,
        status: app.status,
      });
      setShowModal(true);
    }}
  >
    Create
  </button>
)}
 



</td>
<td>
    <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Report</label>
         
            {doctorep && <p className="mt-2 text-sm text-gray-600">File uploaded</p>}

<input
  type="file"
  name="image"
  accept="image/*,application/pdf"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Upload to Cloudinary
      const url = await uploadToCloudinary(file);

      setdoctorrep(url);
      alert("File uploaded successfully");

      // Call API directly
      const res = await fetch("/api/doctorpres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: app._id,
          prescription: url,
        }),
      });

      if (!res.ok) throw new Error("Failed to save report");

      const data = await res.json();
      alert("Report submitted");
    } catch (err) {
      console.error(err);
      alert("Error uploading report");
    } finally {
      setLoading(false);
    }
  }}
/>




            
          </div>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Full-page Glassmorphic Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white/20 backdrop-blur-3xl border border-white/30 p-8 rounded-3xl shadow-xl max-w-2xl w-full text-black">
            <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-md">
              {selectedPatient.patientName}
            </h2>
            <p className="text-white/90">
              <strong>Time:</strong> {selectedPatient.time}
            </p>
            <p className="text-white/90">
              <strong>Payment Status:</strong> {selectedPatient.status}
            </p>
            <p className="mt-2 text-white/80">
              <strong>Notes:</strong> Lorem ipsum dolor sit amet.
            </p>
            <p className="mt-1 text-white/80">
              <strong>Prescription:</strong> Vitamin D, Paracetamol
            </p>

           
            <div className="mt-4 space-y-4">
         
              <div>
                
                  Update Status: Confirmed
                 
              </div>

              {/* Meeting Time */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/90">
                  Meeting Time:
                </label>
             <input
  type="time"
  value={selectedPatient.time || ""}
  onChange={(e) =>
    setSelectedPatient((prev) => ({
      ...prev,
      time: e.target.value,
    }))
  }
  required
  className="px-4 py-2 border border-white/50 bg-white/30 text-black rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
/>
              </div>

              {/* Meeting Link */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/90">
                  Meeting Link:
                </label>
              </div>

        <button
  className="bg-blue-500 px-2 py-1 text-white rounded-lg"
    disabled={!selectedPatient.time}
  onClick={async () => {
    const meetingId = app?.[0]?.doctorName; // or generate uuid if you want unique ID
    const meetingLink = generateMeetingLink(meetingId);
console.log(meetingLink);

    try {
      const res = await fetch("/api/updateappointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: selectedPatient.id,
          status:"confirm",
          time: selectedPatient.time,
          meetingLink,
          
        }),
      });

      if (!res.ok) throw new Error("Failed to save meeting link");

      const data = await res.json();
      console.log("Meeting link saved:", data);
      alert("Meeting link created: " + meetingLink);
    } catch (err) {
      console.error(err);
      alert("Error creating meeting link");
    }
  }}
>
  create meeting
</button>

        

        
            </div>

            <button
           
              onClick={() => setShowModal(false)}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}   
