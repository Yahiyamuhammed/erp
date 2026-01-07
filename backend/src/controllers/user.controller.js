import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  if (!name || !email || !password || !roleId) {
    return res.status(400).json({
      message: "All fields (name, email, password, roleId) are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId,
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
  });
};
export const getUsers = async (req, res) => {
  const users = await User.find({ isActive: true })
    .select("name email isActive roleId createdAt")
    .populate("roleId", "name");

  res.json(users);
};
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, roleId } = req.body;

  const user = await User.findById(userId);
  if (!user || !user.isActive) {
    return res.status(404).json({ message: "User not found" });
  }

  // Email uniqueness check (excluding self)
  if (email && email !== user.email) {
    const emailExists = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (roleId) user.roleId = roleId;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
  });
};