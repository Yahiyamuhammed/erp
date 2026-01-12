import mongoose from "mongoose";
import dotenv from "dotenv";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";

dotenv.config();
const permissionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: String,
});

const permissionsList = [
  // AUTH / SYSTEM
  { code: "CREATE_USER", description: "Create user" },
  { code: "UPDATE_USER", description: "Update user" },
  { code: "DEACTIVATE_USER", description: "Deactivate user" },
  { code: "VIEW_USERS", description: "View users" },

  { code: "CREATE_ROLE", description: "Create role" },
  { code: "UPDATE_ROLE", description: "Update role" },
  { code: "VIEW_ROLES", description: "View roles" },

  // COMPANY
  { code: "CREATE_COMPANY", description: "Create company" },
  { code: "VIEW_COMPANY", description: "View companies" },
  { code: "UPDATE_COMPANY", description: "Update company" },

  // POS
  { code: "CREATE_POS_ORDER", description: "Create POS order" },
  { code: "HOLD_POS_ORDER", description: "Hold POS order" },
  { code: "CANCEL_POS_ORDER", description: "Cancel POS order" },
  { code: "APPLY_DISCOUNT", description: "Apply discount" },
  { code: "SCAN_BARCODE", description: "Scan barcode" },
  { code: "CLOSE_SHIFT", description: "Close POS shift" },
  { code: "VIEW_POS_ORDERS", description: "View POS orders" },

  // SALES
  { code: "CREATE_SALES_ORDER", description: "Create sales order" },
  { code: "EDIT_SALES_ORDER", description: "Edit sales order" },
  { code: "APPROVE_SALES_ORDER", description: "Approve sales order" },
  { code: "VIEW_SALES_ORDER", description: "View sales order" },
  { code: "CREATE_INVOICE", description: "Create invoice" },
  { code: "VIEW_INVOICE", description: "View invoice" },
  { code: "PROCESS_RETURN", description: "Process return" },

  // INVENTORY
  { code: "CREATE_PRODUCT", description: "Create product" },
  { code: "UPDATE_PRODUCT", description: "Update product" },
  { code: "VIEW_PRODUCT", description: "View product" },
  { code: "ADJUST_STOCK", description: "Adjust stock" },
  { code: "VIEW_STOCK", description: "View stock" },

  // PURCHASE
  { code: "CREATE_PURCHASE_ORDER", description: "Create purchase order" },
  { code: "APPROVE_PURCHASE_ORDER", description: "Approve purchase order" },
  { code: "RECEIVE_GOODS", description: "Receive goods" },
  { code: "VIEW_PURCHASE", description: "View purchase" },
  { code: "PAY_VENDOR", description: "Pay vendor" },

  // ACCOUNTING
  { code: "VIEW_LEDGER", description: "View ledger" },
  { code: "CREATE_JOURNAL", description: "Create journal entry" },
  { code: "REVERSE_JOURNAL", description: "Reverse journal entry" },
  { code: "VIEW_PNL", description: "View P&L" },
  { code: "VIEW_BALANCE_SHEET", description: "View balance sheet" },
  { code: "VIEW_TRIAL_BALANCE", description: "View trial balance" },

  // HR / PAYROLL
  { code: "CREATE_EMPLOYEE", description: "Create employee" },
  { code: "UPDATE_EMPLOYEE", description: "Update employee" },
  { code: "VIEW_EMPLOYEE", description: "View employee" },
  { code: "TRACK_ATTENDANCE", description: "Track attendance" },
  { code: "PROCESS_PAYROLL", description: "Process payroll" },
  { code: "VIEW_PAYROLL_REPORT", description: "View payroll report" },

  // REPORTS
  { code: "VIEW_REPORTS", description: "View reports" },
  { code: "EXPORT_REPORT", description: "Export reports" },

  // SETTINGS
  { code: "UPDATE_COMPANY_SETTINGS", description: "Update company settings" },
  { code: "CONFIGURE_TAX", description: "Configure tax" },
  { code: "CONFIGURE_POS", description: "Configure POS" },
];

const seedPermissions = async () => {
  const ops = permissionsList.map((p) => ({
    updateOne: {
      filter: { code: p.code },
      update: { $setOnInsert: p },
      upsert: true,
    },
  }));

  await Permission.bulkWrite(ops);

  const permissions = await Permission.find({});
  console.log("Permissions synced");

  return permissions;
};

const rolePermissionMap = {
  SUPER_ADMIN: permissionsList.map((p) => p.code),

  ADMIN: [
    "VIEW_USERS",
    "CREATE_USER",
    "UPDATE_USER",
    "DEACTIVATE_USER",
    "VIEW_ROLES",
    "VIEW_REPORTS",
    "EXPORT_REPORT",
    "APPROVE_SALES_ORDER",
    "APPROVE_PURCHASE_ORDER",
    "VIEW_LEDGER",
    "VIEW_PNL",
    "VIEW_BALANCE_SHEET",
    "UPDATE_COMPANY_SETTINGS",
    "CONFIGURE_TAX",
    "CONFIGURE_POS",
  ],

  ACCOUNTANT: [
    "VIEW_LEDGER",
    "CREATE_JOURNAL",
    "REVERSE_JOURNAL",
    "VIEW_PNL",
    "VIEW_BALANCE_SHEET",
    "VIEW_TRIAL_BALANCE",
    "CREATE_INVOICE",
    "VIEW_INVOICE",
    "PAY_VENDOR",
    "VIEW_REPORTS",
    "EXPORT_REPORT",
  ],

  INVENTORY_MANAGER: [
    "CREATE_PRODUCT",
    "UPDATE_PRODUCT",
    "VIEW_PRODUCT",
    "ADJUST_STOCK",
    "VIEW_STOCK",
    "CREATE_PURCHASE_ORDER",
    "RECEIVE_GOODS",
    "VIEW_PURCHASE",
  ],

  SALES: [
    "CREATE_POS_ORDER",
    "HOLD_POS_ORDER",
    "SCAN_BARCODE",
    "VIEW_POS_ORDERS",
    "CREATE_SALES_ORDER",
    "VIEW_SALES_ORDER",
    "APPLY_DISCOUNT",
  ],

  HR_PAYROLL_MANAGER: [
    "CREATE_EMPLOYEE",
    "UPDATE_EMPLOYEE",
    "VIEW_EMPLOYEE",
    "TRACK_ATTENDANCE",
    "PROCESS_PAYROLL",
    "VIEW_PAYROLL_REPORT",
  ],

  VIEWER: [
    "VIEW_REPORTS",
    "VIEW_SALES_ORDER",
    "VIEW_PURCHASE",
    "VIEW_PRODUCT",
    "VIEW_EMPLOYEE",
  ],
};

const seedRoles = async (permissions) => {
  const permissionMap = {};
  permissions.forEach((p) => {
    permissionMap[p.code] = p._id;
  });

  for (const roleName in rolePermissionMap) {
    if (roleName === "SUPER_ADMIN") {
      await Role.updateOne(
        { name: "SUPER_ADMIN" },
        {
          $set: {
            name: "SUPER_ADMIN",
            permissions: Object.values(permissionMap),
          },
        },
        { upsert: true }
      );

      console.log("SUPER_ADMIN permissions synced");
      continue;
    }

    const exists = await Role.findOne({ name: roleName });
    if (exists) {
      console.log(`Role ${roleName} already exists`);
      continue;
    }

    const permissionIds = rolePermissionMap[roleName]
      .map((code) => permissionMap[code])
      .filter(Boolean);

    await Role.create({
      name: roleName,
      permissions: permissionIds,
    });

    console.log(`Role ${roleName} created`);
  }
};

const runSeed = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/erp");

    const permissions = await seedPermissions();
    await seedRoles(permissions);

    console.log("Seeding completed");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeed();
