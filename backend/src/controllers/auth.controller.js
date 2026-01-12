import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import Company from "../models/Company.js";

export const login = async (req, res) => {
  const { email, password, companyCode } = req.body;

  const company = companyCode
    ? await Company.findOne({ code: companyCode, isActive: true })
    : null;

  const user = await User.findOne({
    email,
    companyId: company ? company._id : null,
  }).populate({
    path: "roleId",
    populate: { path: "permissions" },
  });

  if (!user || !user.isActive) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    id: user._id,
    companyId: user.companyId,
    roleId: user.roleId?._id || null,
    isSuperAdmin: user.isSuperAdmin,
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({
    user: {
      name: user.name,
      companyId: user.companyId,
      role: user.roleId?.name || null,
      permissions: user.roleId
        ? user.roleId.permissions.map((p) => p.code)
        : [],
      isSuperAdmin: user.isSuperAdmin,
    },
  });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: "roleId",
    populate: { path: "permissions" },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({
    user: {
      name: user.name,
      role: user.roleId.name,
      permissions: user.roleId.permissions.map((p) => p.code),
    },
  });
};
