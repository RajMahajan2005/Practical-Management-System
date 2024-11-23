import User from "../models/user.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
      role: "teacher",
    });

    const savedUser = await user.save();

    res.json({
      savedUser,
      message: `${user.name} is created as Teacher`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "Error occured",
    });
  }
};


export const getAllTeacher = async (req, res) => {
  try {
    const getadmin = await User.find({ role: "teacher" });

    res.json({
      getadmin,
      message:"All Teacher Found Succesfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error occured",
      

    });
  }
};





