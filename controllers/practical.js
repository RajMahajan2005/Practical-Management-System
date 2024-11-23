import Practical from "../models/practical.js";
import Subject from "../models/subject.js";
import User from "../models/user.js"




export const createPractical = async (req, res) => {
  try {
    const { subjectName, title, description } = req.body;

    
    if (!subjectName || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields (subjectName, title, description) are required.",
      });
    }

    const subject = await Subject.findOne({ name: subjectName });
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: `Subject '${subjectName}' not found.`,
      });
    }

    const practical = new Practical({
      subject: subject._id, 
      title,
      description,
    });


    await practical.save();

    res.status(201).json({
      success: true,
      message: "Practical added successfully.",
      practical,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
    });
  }
};


export const getAllPracticals = async (req, res) => {
  try {
    
    const practicals = await Practical.find()
      .populate("subject", "name code") 
      .populate({
        path: "enrolledStudents",
        select: "name email role", 
        match: { role: "student" }, 
      });

    res.status(200).json({
      success: true,
      message: "Practicals fetched successfully.",
      practicals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
    });
  }
};


export const enrollStudentInPractical = async (req, res) => {
  try {
    const { practicalName, studentEmail } = req.body;

    console.log("Input data:", { practicalName, studentEmail });

    const practical = await Practical.findOne({ 
      title: { $regex: new RegExp(practicalName, "i") } 
    });

    if (!practical) {
      return res.status(404).json({
        success: false,
        message: "Practical not found.",
      });
    }

    console.log("Found practical:", practical);

    const student = await User.findOne({ email: studentEmail });

    if (!student || student.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "Invalid student email or student role.",
      });
    }

    console.log("Found student:", student);

    if (practical.enrolledStudents.includes(student._id)) {
      return res.status(400).json({
        success: false,
        message: "Student is already enrolled in this practical.",
      });
    }

    practical.enrolledStudents.push(student._id);
    await practical.save();

    res.status(200).json({
      success: true,
      message: "Student enrolled in the practical successfully.",
    });
  } catch (error) {

    console.error("Error in enrolling student:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
      error: error.message,  
    });
  }
};