import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secretKey = process.env.JWT_SECRET || "your_secret_key";

// User Signup
export const signup = async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, username, email, password: hashedPassword, role });

    res.status(201).json({ message: "Registration Successful", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Incorrect Password" });

    const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: "1d" });

    res.cookie("AuthToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
