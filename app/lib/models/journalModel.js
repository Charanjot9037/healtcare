import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    mood: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    cravings: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    sleep: {
      type: Number,
      required: true,
      min: 0,
      max: 24,
    },
    stress: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true } // auto adds createdAt + updatedAt
);

// Prevent model overwrite in dev (hot reload fix)
const Journal =
  mongoose.models.Journal || mongoose.model("Journal", journalSchema);

export default Journal;

// import mongoose from "mongoose";

// const journalSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true }, // Add userId to link entries to a user
//     mood: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 10,
//     },
//     cravings: {
//       type: String,
//       enum: ["low", "medium", "high"],
//       required: true,
//     },
//     sleep: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 24,
//     },
//     stress: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 10,
//     },
//     notes: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// const Journal =
//   mongoose.models.Journal || mongoose.model("Journal", journalSchema);

// export default Journal;
