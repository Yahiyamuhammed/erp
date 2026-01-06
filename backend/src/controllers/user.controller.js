import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId,
  });

  res.status(201).json(user);
};
export const getUsers = async (req, res) => {
  const users = await User.find({ isActive: true })
    .select("name email isActive roleId createdAt")
    .populate("roleId", "name");

  res.json(users);
};
