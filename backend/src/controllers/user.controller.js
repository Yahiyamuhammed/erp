import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  const { name, email, password, roleId, companyId } = req.body;

  const finalCompanyId = req.user.isSuperAdmin ? companyId : req.companyId;

  if (!finalCompanyId) {
    return res.status(400).json({
      message: "Company is required to create user",
    });
  }

  const existingUser = await User.findOne({
    email,
    companyId: finalCompanyId,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists in this company",
    });
  }

  const role = await Role.findOne({
    _id: roleId,
    companyId: finalCompanyId,
  });

  if (!role) {
    return res.status(400).json({
      message: "Invalid role for this company",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId,
    companyId: finalCompanyId,
    isSuperAdmin: false,
  });

  res.status(201).json({
    message: "User created successfully",
    userId: user._id,
  });
};

export const getUsers = async (req, res) => {
  const filter = req.user.isSuperAdmin ? {} : { companyId: req.companyId };

  const users = await User.find({
    ...filter,
    isActive: true,
  })
    .select("name email isActive roleId createdAt")
    .populate("roleId", "name");

  res.status(200).json({ users });
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, roleId } = req.body;

  const filter = req.user.isSuperAdmin
    ? { _id: userId }
    : { _id: userId, companyId: req.companyId };

  const user = await User.findOne(filter);

  if (!user || !user.isActive) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.isSuperAdmin) {
    return res.status(403).json({
      message: "Super admin cannot be modified",
    });
  }

  if (email && email !== user.email) {
    const emailExists = await User.findOne({
      email,
      companyId: user.companyId,
      _id: { $ne: userId },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already used in this company",
      });
    }
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (roleId) user.roleId = roleId;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();

  res.status(200).json({
    message: "User updated successfully",
  });
};
