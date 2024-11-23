import mongoose from "mongoose";

const practicalSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const practical = mongoose.model("Practical", practicalSchema);

export default practical;
