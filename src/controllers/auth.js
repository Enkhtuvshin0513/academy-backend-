import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmailService } from "../services/user.js";

const SECRET_KEY = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. User байгаа эсэх
  const user = await getUserByEmailService(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 2. Password шалгах
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 3. JWT token үүсгэх
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "1h" },
  );

  // 4. Token буцаах
  res.json({
    message: "Login successful",
    token,
  });
};

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 token-оос email авах
    req.email = decoded.email;
    req._id = decoded.id;

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
