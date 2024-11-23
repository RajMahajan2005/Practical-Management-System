import User from "../models/user.js";

export const roleCheck = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
  
      if (user) {
        if (user.role === "admin") {
          return res.json({
            user,
            message: `The '${user.name}' is an admin`,
          });
        } else if (user.role === "teacher") {
          return res.json({
            message: `The '${user.name}' is a teacher`,
          });
        } else if (user.role === "student") {
          return res.json({
            message: `The '${user.name}' is a student`,
          });
        } else {
          return res.json({
            message: "Role is not recognized",
          });
        }
      } else {
        return res.json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error Occured",
      });
    }
  };

  export const createUser = async (req, res) => {
    try {
      const { name, email, password , role} = req.body;
  
      const user = new User({
        name,
        email,
        password,
        role,
      });
  
      const savedUser = await user.save();
  
      res.json({
        savedUser,
        message: `${user.name} is created successfully as ${user.role}`,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: "Error occured",
      });
    }
  };
  