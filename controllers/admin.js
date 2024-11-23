import User from "../models/user.js";

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
      role: "admin",
    });

    const savedUser = await user.save();

    res.json({
      savedUser,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "Error occured",
    });
  }
};


export const getAllAdmin = async (req, res) => {
  try {
    const getadmin = await User.find({ role: "admin" });

    res.json({
      getadmin,
      message:"All Admin Found Succesfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error occured",
      

    });
  }
};


