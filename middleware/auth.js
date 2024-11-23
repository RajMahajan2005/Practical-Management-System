import user from "../models/user.js";

export const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userInfo = await user.findOne({ email });

    if (userInfo && userInfo.role === "admin") {
      req.user = userInfo;
      next();
    } else {
      return res.status(403).json({
        message: "Access Denied. Only admins can create subjects.",
      });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
    });
  }
};

export const isAdminTeacher = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userInfo = await User.findOne({ email });

    if (
      userInfo &&
      (userInfo.role === "admin" || userInfo.role === "teacher")
    ) {
      req.user = userInfo;
      next();
    } else {
      return res.status(403).json({
        message:
          "Access Denied. Only admins or teachers can access student details.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
    });
  }
};

export const isTeacher = async (req, res, next) => {
  try {
    const { email } = req.user;
    const userInfo = await User.findOne({ email });
    if (userInfo && userInfo.role === "teacher") {
      req.user = userInfo;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Only teachers can add practicals.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred.",
    });
  }
};
