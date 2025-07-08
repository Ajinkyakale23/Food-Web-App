import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Read token from Authorization header or token header
    const token =
      req.headers.authorization || req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    // If using Bearer token format (e.g. "Bearer <token>"), split and get token
    const jwtToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = decoded; // Attach user info (like userId) to the request

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;
