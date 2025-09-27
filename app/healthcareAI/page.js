



// // "use client";
// // import React, { useState, useRef, useEffect } from "react";
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// // export default function RecoveryAssistant() {
// //   const [mode, setMode] = useState("chat");
// //   const [message, setMessage] = useState("");
// //   const [responses, setResponses] = useState([]); 
// //   const [loading, setLoading] = useState(false);

// //   // journal fields
// //   const [mood, setMood] = useState(5);
// //   const [cravings, setCravings] = useState("low");
// //   const [sleep, setSleep] = useState(7);
// //   const [stress, setStress] = useState(5);
// //   const [notes, setNotes] = useState("");

// //   const [pastEntries, setPastEntries] = useState([]);

// //   const endRef = useRef(null);
// //   useEffect(() => {
// //     endRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [responses, loading]);
  
// //   const sendRequest = async (payload, userBubbleHtml = null) => {
// //     setLoading(true);
// //     try {
// //       if (userBubbleHtml) setResponses((p) => [...p, { type: "user", text: userBubbleHtml }]);
     



// //   const [user, setUser] = useState(null);
// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       try {
// //         const parsedUser = JSON.parse(storedUser);
// //         setUser(parsedUser);
// //       } catch (err) {
// //         console.error("Error parsing user from localStorage:", err);
// //       }
// //     }
// //   }, []);






// //       const res = await fetch("/api/healthcareAI", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json",
                 
// //          },
// //         body: JSON.stringify(payload),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) {
// //         const errText = data?.error || `Status ${res.status}`;
// //         setResponses((p) => [...p, { type: "bot", text: `<p style="color:red">Error: ${errText}</p>` }]);
// //       } else {
// //         setResponses((p) => [...p, { type: "bot", text: data.html || "<p>No response</p>" }]);
// //         if (data.pastEntries) setPastEntries(data.pastEntries);
// //       }
// //     } catch (err) {
// //       setResponses((p) => [...p, { type: "bot", text: `<p style="color:red">Network error: ${err.message}</p>` }]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChatSubmit = async (e) => {
// //     e?.preventDefault();
// //     if (!message.trim()) return;
// //     const userHtml = `<p>${escapeHtml(message)}</p>`;
// //     await sendRequest({ mode: "chat", message }, userHtml);
// //     setMessage("");
// //   };

// //   const handleJournalSubmit = async (e) => {
// //     e?.preventDefault();
// //     const summaryHtml = `<p><strong>Journal:</strong> Mood ${mood}/10 • Cravings ${cravings} • Sleep ${sleep}h • Stress ${stress}/10</p>
// //     <p>${escapeHtml(notes || "")}</p>`;
// //     const userId = JSON.parse(localStorage.getItem("user"))?.id || "";
// //     await sendRequest(
// //       { mode: "journal", journalEntry: { mood, cravings, sleep, stress, notes },userId },
// //       summaryHtml
// //     );
// //     setNotes("");
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto my-6 p-5 bg-white rounded-lg shadow">
// //       <div className="flex gap-2 mb-4">
// //         <button onClick={() => setMode("chat")} className={`px-4 py-2 rounded ${mode==="chat"?"bg-blue-600 text-white":"bg-gray-200"}`}>Chat Companion</button>
// //         <button onClick={() => setMode("journal")} className={`px-4 py-2 rounded ${mode==="journal"?"bg-blue-600 text-white":"bg-gray-200"}`}>Daily Journal</button>
// //       </div>

// //       <div className="h-[50vh] overflow-y-auto border rounded p-3 space-y-3 bg-gray-50">
// //         {responses.length === 0 && !loading && <p className="text-center text-gray-500">No messages yet. Start by sending a message or a journal entry.</p>}
// //         {responses.map((r, i) => (
// //           <div
// //             key={i}
// //             className={`max-w-[80%] p-3 rounded ${r.type === "user" ? "ml-auto bg-blue-600 text-white" : "bg-white text-gray-900 shadow"}`}
// //             dangerouslySetInnerHTML={{ __html: r.text }}
// //           />
// //         ))}
// //         {loading && <div className="text-gray-600">Thinking...</div>}
// //         <div ref={endRef} />
// //       </div>

// //       {pastEntries.length > 0 && (
// //         <div className="mt-4">
// //           <h3 className="text-lg font-semibold mb-2">Last 7 Days Progress</h3>
// //           <JournalGraph entries={pastEntries} />
// //         </div>
// //       )}

// //       {mode === "chat" && (
// //         <form onSubmit={handleChatSubmit} className="flex gap-2 mt-3">
// //           <input type="text" placeholder="Share how you're feeling..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 border rounded p-2" disabled={loading} />
// //           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading || !message.trim()}>Send</button>
// //         </form>
// //       )}

// //       {mode === "journal" && (
// //         <form onSubmit={handleJournalSubmit} className="space-y-2 mt-3 border-t pt-3">
// //           <div className="grid grid-cols-2 gap-2">
// //             <label>Mood (1-10)<input type="number" min="1" max="10" value={mood} onChange={(e) => setMood(Number(e.target.value))} className="w-full border p-2 rounded" /></label>
// //             <label>Cravings<select value={cravings} onChange={(e) => setCravings(e.target.value)} className="w-full border p-2 rounded"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>
// //             <label>Sleep (hrs)<input type="number" min="0" max="24" value={sleep} onChange={(e) => setSleep(Number(e.target.value))} className="w-full border p-2 rounded" /></label>
// //             <label>Stress (1-10)<input type="number" min="1" max="10" value={stress} onChange={(e) => setStress(Number(e.target.value))} className="w-full border p-2 rounded" /></label>
// //           </div>
// //           <div>
// //             <label>Notes</label>
// //             <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full border p-2 rounded" />
// //           </div>
// //           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>Submit Journal</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }

// // // Journal Graph Component
// // function JournalGraph({ entries }) {
// //   const data = entries.map((e, i) => ({
// //     day: `Day ${i + 1}`,
// //     Mood: e.mood,
// //     Stress: e.stress,
// //     Sleep: e.sleep,
// //     Cravings: e.cravings === "low" ? 1 : e.cravings === "medium" ? 2 : 3,
// //   }));

// //   return (
// //     <ResponsiveContainer width="100%" height={250}>
// //       <LineChart data={data}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="day" />
// //         <YAxis />
// //         <Tooltip />
// //         <Legend />
// //         <Line type="monotone" dataKey="Mood" stroke="#8884d8" />
// //         <Line type="monotone" dataKey="Stress" stroke="#ff7300" />
// //         <Line type="monotone" dataKey="Sleep" stroke="#82ca9d" />
// //         <Line type="monotone" dataKey="Cravings" stroke="#ff0000" />
// //       </LineChart>
// //     </ResponsiveContainer>
// //   );
// // }

// // // Escape user input
// // function escapeHtml(str) {
// //   if (!str) return "";
// //   return str.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m]));
// // }
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import Navbar from "../components/navbar";

// export default function RecoveryAssistant() {
//   const [mode, setMode] = useState("chat");
//   const [message, setMessage] = useState("");
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // journal fields
//   const [mood, setMood] = useState(5);
//   const [cravings, setCravings] = useState("low");
//   const [sleep, setSleep] = useState(7);
//   const [stress, setStress] = useState(5);
//   const [notes, setNotes] = useState("");

//   const [pastEntries, setPastEntries] = useState([]);

//   // ✅ User state moved to top level
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (err) {
//         console.error("Error parsing user from localStorage:", err);
//       }
//     }
//   }, []);

//   const endRef = useRef(null);
//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [responses, loading]);

//   const sendRequest = async (payload, userBubbleHtml = null) => {
//     setLoading(true);
//     try {
//       if (userBubbleHtml)
//         setResponses((p) => [...p, { type: "user", text: userBubbleHtml }]);

//       // ✅ Add userId to payload
//       const fullPayload = {
//         ...payload,
//         userId: user?.id || "",
//       };

//       const res = await fetch("/api/healthcareAI", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(fullPayload),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         const errText = data?.error || `Status ${res.status}`;
//         setResponses((p) => [
//           ...p,
//           { type: "bot", text: `<p style="color:red">Error: ${errText}</p>` },
//         ]);
//       } else {
//         setResponses((p) => [
//           ...p,
//           { type: "bot", text: data.html || "<p>No response</p>" },
//         ]);
//         if (data.pastEntries) setPastEntries(data.pastEntries);
//       }
//     } catch (err) {
//       setResponses((p) => [
//         ...p,
//         {
//           type: "bot",
//           text: `<p style="color:red">Network error: ${err.message}</p>`,
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChatSubmit = async (e) => {
//     e?.preventDefault();
//     if (!message.trim()) return;
//     const userHtml = `<p>${escapeHtml(message)}</p>`;
//     await sendRequest({ mode: "chat", message }, userHtml);
//     setMessage("");
//   };

//   const handleJournalSubmit = async (e) => {
//     e?.preventDefault();
//     const summaryHtml = `<p><strong>Journal:</strong> Mood ${mood}/10 • Cravings ${cravings} • Sleep ${sleep}h • Stress ${stress}/10</p>
//     <p>${escapeHtml(notes || "")}</p>`;
//     await sendRequest(
//       {
//         mode: "journal",
//         journalEntry: { mood, cravings, sleep, stress, notes },
//       },
//       summaryHtml
//     );
//     setNotes("");
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="max-w-2xl mx-auto my-6 p-5 bg-white rounded-lg shadow">
//       <div className="flex gap-2 mb-4">
//         <button
//           onClick={() => setMode("chat")}
//           className={`px-4 py-2 rounded ${
//             mode === "chat" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//         >
//           Chat Companion
//         </button>
//         <button
//           onClick={() => setMode("journal")}
//           className={`px-4 py-2 rounded ${
//             mode === "journal" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//         >
//           Daily Journal
//         </button>
//       </div>

      

//       {pastEntries.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2">Last 7 Days Progress</h3>
//           <JournalGraph entries={pastEntries} />
//         </div>
//       )}

//       {mode === "chat" && (
//         <form onSubmit={handleChatSubmit} className="flex gap-2 mt-3">
//           <input
//             type="text"
//             placeholder="Share how you're feeling..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 border rounded p-2"
//             disabled={loading}
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             disabled={loading || !message.trim()}
//           >
//             Send
//           </button>
//         </form>
        
//       )}
//          <div className=" mt-5 h-[50vh] overflow-y-auto border rounded p-3 space-y-3 bg-gray-50">
//         {responses.length === 0 && !loading && (
//           <p className="text-center text-gray-500">
//             No messages yet. Start by sending a message or a journal entry.
//           </p>
//         )}
//         {responses.map((r, i) => (
//           <div
//             key={i}
//             className={`max-w-[80%] p-3 rounded ${
//               r.type === "user"
//                 ? "ml-auto bg-blue-600 text-white"
//                 : "bg-white text-gray-900 shadow"
//             }`}
//             dangerouslySetInnerHTML={{ __html: r.text }}
//           />
//         ))}
//         {loading && <div className="text-gray-600">Thinking...</div>}
//         <div ref={endRef} />
//       </div>

//       {mode === "journal" && (
//         <form
//           onSubmit={handleJournalSubmit}
//           className="space-y-2 mt-3 border-t pt-3"
//         >
//           <div className="grid grid-cols-2 gap-2">
//             <label>
//               Mood (1-10)
//               <input
//                 type="number"
//                 min="1"
//                 max="10"
//                 value={mood}
//                 onChange={(e) => setMood(Number(e.target.value))}
//                 className="w-full border p-2 rounded"
//               />
//             </label>
//             <label>
//               Cravings
//               <select
//                 value={cravings}
//                 onChange={(e) => setCravings(e.target.value)}
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </label>
//             <label>
//               Sleep (hrs)
//               <input
//                 type="number"
//                 min="0"
//                 max="24"
//                 value={sleep}
//                 onChange={(e) => setSleep(Number(e.target.value))}
//                 className="w-full border p-2 rounded"
//               />
//             </label>
//             <label>
//               Stress (1-10)
//               <input
//                 type="number"
//                 min="1"
//                 max="10"
//                 value={stress}
//                 onChange={(e) => setStress(Number(e.target.value))}
//                 className="w-full border p-2 rounded"
//               />
//             </label>
//           </div>
//           <div>
//             <label>Notes</label>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={3}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             disabled={loading}
//           >
//             Submit Journal
//           </button>
//         </form>
//       )}
//     </div>
//     </>
//   );
// }

// // Journal Graph Component
// function JournalGraph({ entries }) {
//   const reversedEntries = [...entries].reverse();
//   const data = reversedEntries.map((e, i) => ({
//     day: `Day ${i + 1}`,
//     Mood: e.mood,
//     Stress: e.stress,
//     Sleep: e.sleep,
//     Cravings:
//       e.cravings === "low" ? 1 : e.cravings === "medium" ? 2 : e.cravings === "high" ? 3 : 0,
//   }));

//   return (
//     <ResponsiveContainer width="100%" height={250}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="day" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="Mood" stroke="#8884d8" />
//         <Line type="monotone" dataKey="Stress" stroke="#ff7300" />
//         <Line type="monotone" dataKey="Sleep" stroke="#82ca9d" />
//         <Line type="monotone" dataKey="Cravings" stroke="#ff0000" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

// // Escape user input
// function escapeHtml(str) {
//   if (!str) return "";
//   return str.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
// }
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../components/navbar";

export default function RecoveryAssistant() {
  const [mode, setMode] = useState("chat");
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // journal fields
  const [mood, setMood] = useState(5);
  const [cravings, setCravings] = useState("low");
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState("");

  const [pastEntries, setPastEntries] = useState([]);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses, loading]);

  const sendRequest = async (payload, userBubbleHtml = null) => {
    setLoading(true);
    try {
      if (userBubbleHtml)
        setResponses((p) => [...p, { type: "user", text: userBubbleHtml }]);

      const fullPayload = {
        ...payload,
        userId: user?.id || "",
      };

      const res = await fetch("/api/healthcareAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        const errText = data?.error || `Status ${res.status}`;
        setResponses((p) => [
          ...p,
          { type: "bot", text: `<p class="text-red-600 font-semibold">Error: ${errText}</p>` },
        ]);
      } else {
        setResponses((p) => [
          ...p,
          { type: "bot", text: data.html || "<p>No response</p>" },
        ]);
        if (data.pastEntries) setPastEntries(data.pastEntries);
      }
    } catch (err) {
      setResponses((p) => [
        ...p,
        {
          type: "bot",
          text: `<p class="text-red-600 font-semibold">Network error: ${err.message}</p>`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e) => {
    e?.preventDefault();
    if (!message.trim()) return;
    const userHtml = `<p>${escapeHtml(message)}</p>`;
    await sendRequest({ mode: "chat", message }, userHtml);
    setMessage("");
  };

  const handleJournalSubmit = async (e) => {
    e?.preventDefault();
    const summaryHtml = `<p><strong>Journal:</strong> Mood ${mood}/10 • Cravings ${cravings} • Sleep ${sleep}h • Stress ${stress}/10</p>
    <p>${escapeHtml(notes || "")}</p>`;
    await sendRequest(
      {
        mode: "journal",
        journalEntry: { mood, cravings, sleep, stress, notes },
      },
      summaryHtml
    );
    setNotes("");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-purple-200">
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setMode("chat")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              mode === "chat"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            Chat Companion
          </button>
          <button
            onClick={() => setMode("journal")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              mode === "journal"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            Daily Journal
          </button>
        </div>

        {pastEntries.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">
              Last 7 Days Progress
            </h3>
            <JournalGraph entries={pastEntries} />
          </div>
        )}

        {mode === "chat" && (
          <>
            <form onSubmit={handleChatSubmit} className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="How are you feeling today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border-2 border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-300 transition shadow-sm"
                disabled={loading}
              />
              <button
                type="submit"
                className="px-5 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-shadow shadow-md disabled:opacity-60"
                disabled={loading || !message.trim()}
              >
                Send
              </button>
            </form>
          </>
        )}

        <div className="h-[50vh] overflow-y-auto rounded-lg p-4 space-y-4 bg-purple-50 border border-purple-200 shadow-inner">
          {responses.length === 0 && !loading && (
            <p className="text-center text-purple-500 italic select-none">
              No messages yet. Start by sending a message or a journal entry.
            </p>
          )}
          {responses.map((r, i) => (
            <div
              key={i}
              className={`max-w-[85%] p-4 rounded-2xl break-words ${
                r.type === "user"
                  ? "ml-auto bg-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-900 shadow"
              }`}
              dangerouslySetInnerHTML={{ __html: r.text }}
            />
          ))}
          {loading && (
            <p className="text-center text-purple-600 italic font-semibold">
              Thinking...
            </p>
          )}
          <div ref={endRef} />
        </div>

        {mode === "journal" && (
          <form
            onSubmit={handleJournalSubmit}
            className="space-y-5 mt-6 border-t pt-6 border-purple-200"
          >
            <div className="grid grid-cols-2 gap-6">
              <label className="block">
                <span className="text-purple-700 font-semibold mb-1 block">
                  Mood (1-10)
                </span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={mood}
                  onChange={(e) => setMood(Number(e.target.value))}
                  className="w-full rounded-md border-2 border-purple-300 px-3 py-2 text-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
                />
              </label>

              <label className="block">
                <span className="text-purple-700 font-semibold mb-1 block">
                  Cravings
                </span>
                <select
                  value={cravings}
                  onChange={(e) => setCravings(e.target.value)}
                  className="w-full rounded-md border-2 border-purple-300 px-3 py-2 text-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label className="block">
                <span className="text-purple-700 font-semibold mb-1 block">
                  Sleep (hrs)
                </span>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={sleep}
                  onChange={(e) => setSleep(Number(e.target.value))}
                  className="w-full rounded-md border-2 border-purple-300 px-3 py-2 text-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
                />
              </label>

              <label className="block">
                <span className="text-purple-700 font-semibold mb-1 block">
                  Stress (1-10)
                </span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={stress}
                  onChange={(e) => setStress(Number(e.target.value))}
                  className="w-full rounded-md border-2 border-purple-300 px-3 py-2 text-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-purple-700 font-semibold mb-1 block">Notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-md border-2 border-purple-300 p-3 text-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-300 transition resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-shadow shadow-md disabled:opacity-60 w-full"
            >
              Submit Journal
            </button>
          </form>
        )}
      </div>
    </>
  );
}

// Journal Graph Component
function JournalGraph({ entries }) {
  const reversedEntries = [...entries].reverse();
  const data = reversedEntries.map((e, i) => ({
    day: `Day ${i + 1}`,
    Mood: e.mood,
    Stress: e.stress,
    Sleep: e.sleep,
    Cravings:
      e.cravings === "low" ? 1 : e.cravings === "medium" ? 2 : e.cravings === "high" ? 3 : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Mood" stroke="#7c3aed" />
        <Line type="monotone" dataKey="Stress" stroke="#f97316" />
        <Line type="monotone" dataKey="Sleep" stroke="#22c55e" />
        <Line type="monotone" dataKey="Cravings" stroke="#ef4444" />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Escape user input
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
