export const SIDEBAR_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    path: "/",
    permissions: null
  },
  {
    id: "pos",
    label: "POS",
    icon: "pos",
    path: "/pos",
    permissions: [
      "CREATE_POS_ORDER",
      "VIEW_POS_ORDERS"
    ]
  },
  {
    id: "sales",
    label: "Sales",
    icon: "sales",
    path: "/sales",
    permissions: ["VIEW_SALES_ORDER"]
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: "accounting",
    path: "/accounting",
    permissions: [
      "VIEW_LEDGER",
      "VIEW_PNL",
      "VIEW_BALANCE_SHEET",
      "VIEW_TRIAL_BALANCE"
    ]
  },
  {
    id: "purchase",
    label: "Purchase",
    icon: "purchase",
    path: "/purchase",
    permissions: ["VIEW_PURCHASE"]
  },
  {
    id: "customers-hr",
    label: "Customers & HR",
    icon: "customers",
    path: "/customers-hr",
    permissions: [
      "VIEW_EMPLOYEE",
      "CREATE_EMPLOYEE"
    ]
  },
  {
    id: "payroll",
    label: "Payroll",
    icon: "payroll",
    path: "/payroll",
    permissions: [
      "PROCESS_PAYROLL",
      "VIEW_PAYROLL_REPORT"
    ]
  },
  {
    id: "reports",
    label: "Reports",
    icon: "reports",
    path: "/reports",
    permissions: ["VIEW_REPORTS"]
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    path: "/settings",
    permissions: [
      "UPDATE_COMPANY_SETTINGS",
      "CONFIGURE_TAX",
      "CONFIGURE_POS",
      "VIEW_USERS",
      "VIEW_ROLES"
    ]
  },
  {
    id: "help",
    label: "Help",
    icon: "help",
    path: "/help",
    permissions: null
  }
];
