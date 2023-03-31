import jwt from "jsonwebtoken";
import User from "../models/User";

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", token: token });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Add the user object to the request object
    req.user = user;

    // Call the next middleware function
    // next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authMiddleware;
