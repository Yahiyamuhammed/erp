import mongoose from "mongoose";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";

await mongoose.connect(process.env.MONGO_URI);

const permissions = await Permission.insertMany([
  { code: "CREATE_USER", description: "Create users" },
  { code: "CREATE_POS_ORDER", description: "Create POS sale" },
  { code: "VIEW_LEDGER", description: "View ledger" }
]);

await Role.create({
  name: "ADMIN",
  permissions: permissions.map((p) => p._id)
});

console.log("Seed completed");
process.exit();
