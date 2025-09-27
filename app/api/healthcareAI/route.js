
import dbConnect from "../../lib/config/db";
import Journal from "../../lib/models/journalModel";

export async function POST(req) {
  try {
    const { mode, message, journalEntry, model = "gemini-2.5-flash" } = await req.json();

    if (!mode || !["chat", "journal"].includes(mode)) {
      return new Response(
        JSON.stringify({ error: "Invalid mode: must be 'chat' or 'journal'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await dbConnect();

    // 🟣 Journal Mode
    if (mode === "journal") {
      const { mood, cravings, sleep, stress, notes } = journalEntry || {};
      if (!mood || !cravings || !sleep || !stress) {
        return new Response(
          JSON.stringify({ error: "Incomplete journal entry" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      await Journal.create({  mood, cravings, sleep, stress, notes });

      const pastEntries = await Journal.find({}).sort({ createdAt: -1 }).limit(7).lean();

      const journalText = pastEntries
        .map(
          (e, i) =>
            `Day ${pastEntries.length - i}: Mood ${e.mood}/10, Cravings: ${e.cravings}, Sleep: ${e.sleep} hrs, Stress: ${e.stress}/10. Notes: ${e.notes || "none"}`
        )
        .join("\n");

      const prompt = `You are a compassionate addiction recovery assistant. 
The user is logging their recovery journal. 
Here are their last ${pastEntries.length} entries:

${journalText}

1. Predict relapse risk (Low, Medium, or High).
2. Explain patterns in simple, supportive words.
3. Suggest 2–3 coping strategies for today (mindfulness, sponsor call, exercise, etc.).
4. Format the response in HTML with headings and bullet points.
5. End with a motivational message that feels personal and encouraging.
Always be supportive and never judgmental.`;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const result = await geminiRes.json();
      const html =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "<p>No response from Gemini</p>";

      return new Response(JSON.stringify({ html, pastEntries }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🟣 Chat Mode
    if (mode === "chat") {
      if (!message || message.trim().length === 0) {
        return new Response(
          JSON.stringify({ error: "Message is required for chat" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const prompt = `You are a 24/7 recovery companion helping someone overcome drug addiction. 
The user may share cravings, emotions, or stress. 
Respond with:
- Empathy and encouragement
- Short coping strategies (breathing, journaling, calling a friend)
- Motivational reinforcement
Format your response in HTML with headings and bullet points.
If they mention relapse or high-risk behavior, gently suggest contacting their doctor, support hotline, or sponsor.
Keep messages friendly, short, and human-like.

The user said: "${message}"`;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const result = await geminiRes.json();
      const html =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "<p>No response from Gemini</p>";

      return new Response(JSON.stringify({ html }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("AI error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


// import dbConnect from "../../lib/config/db";
// import Journal from "../../lib/models/journalModel";

// export async function POST(req) {
//   try {
//     // Expect userId sent in headers or extracted from auth middleware/session 
    
//     const userId = req.headers.get("x-user-id");
//     console.log(userId)
//     if (!userId) {
//       return new Response(
//         JSON.stringify({ error: "Unauthorized: Missing user ID" }),
//         { status: 401, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const { mode, message, journalEntry, model = "gemini-2.5-flash" } = await req.json();

//     if (!mode || !["chat", "journal"].includes(mode)) {
//       return new Response(
//         JSON.stringify({ error: "Invalid mode: must be 'chat' or 'journal'" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     await dbConnect();

//     // 🟣 Journal Mode
//     if (mode === "journal") {
//       const { mood, cravings, sleep, stress, notes } = journalEntry || {};
//       if (!mood || !cravings || !sleep || !stress) {
//         return new Response(
//           JSON.stringify({ error: "Incomplete journal entry" }),
//           { status: 400, headers: { "Content-Type": "application/json" } }
//         );
//       }

//       await Journal.create({ userId, mood, cravings, sleep, stress, notes });
// await new Promise(resolve => setTimeout(resolve, 50));
//       const pastEntries = await Journal.find({ userId }).sort({ createdAt: -1 }).limit(7).lean();

//       // ...rest of your prompt and AI call code unchanged...

//       const journalText = pastEntries
//         .map(
//           (e, i) =>
//             `Day ${pastEntries.length - i}: Mood ${e.mood}/10, Cravings: ${e.cravings}, Sleep: ${e.sleep} hrs, Stress: ${e.stress}/10. Notes: ${e.notes || "none"}`
//         )
//         .join("\n");

//       const prompt = `You are a compassionate addiction recovery assistant. 
// The user is logging their recovery journal. 
// Here are their last ${pastEntries.length} entries:


// ${journalText}


// 1. Predict relapse risk (Low, Medium, or High).
// 2. Explain patterns in simple, supportive words.
// 3. Suggest 2–3 coping strategies for today (mindfulness, sponsor call, exercise, etc.).
// 4. Format the response in HTML with headings and bullet points.
// 5. End with a motivational message that feels personal and encouraging.
// Always be supportive and never judgmental.`;


//       const geminiRes = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               {
//                 role: "user",
//                 parts: [{ text: prompt }],
//               },
//             ],
//           }),
//         }
//       );

//       const result = await geminiRes.json();
//       const html =
//         result?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "<p>No response from Gemini</p>";

//       return new Response(JSON.stringify({ html, pastEntries }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // 🟣 Chat Mode
//     if (mode === "chat") {
//       if (!message || message.trim().length === 0) {
//         return new Response(
//           JSON.stringify({ error: "Message is required for chat" }),
//           { status: 400, headers: { "Content-Type": "application/json" } }
//         );
//       }

//       const prompt = `You are a 24/7 recovery companion helping someone overcome drug addiction. 
// The user may share cravings, emotions, or stress. 
// Respond with:
// - Empathy and encouragement
// - Short coping strategies (breathing, journaling, calling a friend)
// - Motivational reinforcement
// Format your response in HTML with headings and bullet points.
// If they mention relapse or high-risk behavior, gently suggest contacting their doctor, support hotline, or sponsor.
// Keep messages friendly, short, and human-like.

// The user said: "${message}"`;

//       const geminiRes = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               {
//                 role: "user",
//                 parts: [{ text: prompt }],
//               },
//             ],
//           }),
//         }
//       );

//       const result = await geminiRes.json();
//       const html =
//         result?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "<p>No response from Gemini</p>";

//       return new Response(JSON.stringify({ html }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   } catch (error) {
//     console.error("AI error:", error);
//     return new Response(
//       JSON.stringify({ error: error.message || "Internal server error" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

