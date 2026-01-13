import mongoose from "mongoose";
import Role from "../models/Role.js";
import User from "../models/User.js";

const MONGO_URI = 'mongodb://127.0.0.1:27017/erp';
const COMPANY_ID = new mongoose.Types.ObjectId(
  "6964b7367e3b34601b2d9e00"
);

const migrate = async () => {
  try {
    console.log("Tenant migration started");

    await mongoose.connect(MONGO_URI);

    // 1. Update roles
    const roles = await Role.find({ companyId: null });

    for (const role of roles) {
      if (role.name === "SUPER_ADMIN") {
        role.isSystemRole = true;
        role.companyId = null;
      } else {
        role.companyId = COMPANY_ID;
      }
      await role.save();
    }

    console.log(`Roles updated: ${roles.length}`);

    // 2. Update users
    const users = await User.find({
      $or: [{ companyId: { $exists: false } }, { companyId: null }],
    });

    for (const user of users) {
      if (user.isSuperAdmin) {
        user.companyId = null;
      } else {
        user.companyId = COMPANY_ID;
      }
      await user.save();
    }

    console.log(`Users updated: ${users.length}`);

    console.log("Tenant migration completed");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
