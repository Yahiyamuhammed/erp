import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate({
    path: "roleId",
    populate: { path: "permissions" },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    id: user._id,
    roleId: user.roleId._id,
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    })
    .json({
      user: {
        name: user.name,
        role: user.roleId.name,
        permissions: user.roleId.permissions.map((p) => p.code),
      },
    });
};
