    import Permission from "../models/Permission.js";

export const permissionsList = [
  { code: "CREATE_USER", description: "Create user" },
  { code: "UPDATE_USER", description: "Update user" },
  { code: "DEACTIVATE_USER", description: "Deactivate user" },
  { code: "VIEW_USERS", description: "View users" },

  { code: "CREATE_ROLE", description: "Create role" },
  { code: "UPDATE_ROLE", description: "Update role" },
  { code: "VIEW_ROLES", description: "View roles" },

  { code: "CREATE_COMPANY", description: "Create company" },
  { code: "VIEW_COMPANY", description: "View companies" },
  { code: "UPDATE_COMPANY", description: "Update company" },

  // POS, SALES, INVENTORY, ACCOUNTING, HR, REPORTS, SETTINGS
  // (keep exactly as you listed)
];

export const seedPermissions = async () => {
  const ops = permissionsList.map((p) => ({
    updateOne: {
      filter: { code: p.code },
      update: { $setOnInsert: p },
      upsert: true,
    },
  }));

  await Permission.bulkWrite(ops);

  const permissions = await Permission.find({});
  return permissions;
};
