import userModel from "../models/user.js";
import User from "../models/user.js";

export const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
      role: "student",
    });

    const savedUser = await user.save();

    res.json({
      savedUser,
      message: "Student Is created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "Error occured",
    });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }); 
    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching students",
    });
  }
};
