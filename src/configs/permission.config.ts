import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { createAccessControl } from "better-auth/plugins/access";

const pages = {
  ...defaultStatements,
  Dashboard: ["view"],
  Projects: ["create", "read", "update", "delete"],
  "Task Management": ["create", "read", "update", "delete"],
  "Client Management": ["create", "read", "update", "delete", "impersonate"],
  "User Management": adminAc.statements.user,
  Calender: ["create", "read", "update", "delete"],
  Invoices: ["create", "read", "update", "delete"],
  "AI Assist": ["use"],
  "Sub Admin Management": ["create", "read", "update", "delete", "impersonate"],
  Settings: ["view"],
} as const;

export const ac = createAccessControl(pages);

// Super Admin: Full system access - can manage everything
export const superAdmin = ac.newRole({
  Dashboard: ["view"],
  "Client Management": ["create", "read", "update", "delete", "impersonate"],
  "User Management": adminAc.statements.user,
  "Sub Admin Management": ["create", "read", "update", "delete", "impersonate"],
  Projects: ["create", "read", "update", "delete"],
  "Task Management": ["create", "read", "update", "delete"],
  Calender: ["create", "read", "update", "delete"],
  Invoices: ["create", "read", "update", "delete"],
  "AI Assist": ["use"],
  Settings: ["view"],
  ...adminAc.statements,
});

// Sub Admin: Can manage specific areas assigned by super admin
export const subAdmin = ac.newRole({
  Dashboard: ["view"],
  Projects: ["create", "read", "update", "delete"],
  "Task Management": ["create", "read", "update", "delete"],
  "User Management": ["list"], // Limited user management - can only list users
  Settings: ["view"],
});

// User: Basic access - can view dashboard and settings
export const user = ac.newRole({
  Dashboard: ["view"],
  "Client Management": ["create", "read", "update", "delete", "impersonate"],
  "User Management": adminAc.statements.user,
  "Sub Admin Management": ["create", "read", "update", "delete", "impersonate"],
  Projects: ["create", "read", "update", "delete"],
  "Task Management": ["create", "read", "update", "delete"],
  Calender: ["create", "read", "update", "delete"],
  Invoices: ["create", "read", "update", "delete"],
  "AI Assist": ["use"],
  Settings: ["view"],
});

// Export roles for the adminClient plugin - using the correct structure
export const roles = {
  superadmin: superAdmin,
  subadmin: subAdmin,
  user: user,
};
