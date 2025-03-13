import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(404)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id) {
      req.body.userId = decodedToken.id;
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Not Authorized. Login Again" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth
