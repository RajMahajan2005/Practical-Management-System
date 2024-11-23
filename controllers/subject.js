import Subject from "../models/subject.js";

export const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;

    const createdBy = req.user._id;

    const newSubject = new Subject({
      name,
      code,
      createdBy,
    });

    const savedSubject = await newSubject.save();

    res.status(201).json({
      subject: savedSubject,
      message: `Subject created successfully by ${req.user.name}`,
    });
  } catch (error) {
    console.error(error);
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Error occurred while creating the subject.",
    });
  }
};

export const getAllSubject = async (req, res) => {
  try {
    const subjects = await Subject.find().populate(
      "createdBy",
      "name email role"
    );
    res.json({
      subjects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occurred while fetching subjects",
    });
  }
};
