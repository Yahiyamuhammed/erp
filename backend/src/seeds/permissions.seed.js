import Permission from "../models/Permission.js";

export const permissionsList = [
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
