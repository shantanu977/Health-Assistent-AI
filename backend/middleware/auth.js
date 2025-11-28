import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, "SECRET123");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
