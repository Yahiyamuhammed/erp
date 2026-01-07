export const sidebarConfig = [
  { id: "dashboard", label: "Dashboard" },
  { id: "pos", label: "POS", permission: "CREATE_POS_ORDER" },
  { id: "sales", label: "Sales", permission: "CREATE_SALES_ORDER" },
  { id: "accounting", label: "Accounting", permission: "VIEW_LEDGER" },
  { id: "purchase", label: "Purchase", permission: "CREATE_PURCHASE_ORDER" },
  { id: "payroll", label: "Payroll", permission: "PROCESS_PAYROLL" },
  { id: "reports", label: "Reports", permission: "VIEW_REPORTS" },
  { id: "settings", label: "Settings", permission: "UPDATE_COMPANY_SETTINGS" }
];
