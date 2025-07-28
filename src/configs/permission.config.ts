import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { createAccessControl } from "better-auth/plugins/access";

const pages = {
  ...defaultStatements,
  Dashboard: ["view"],
  Projects: ["create", "read", "update", "delete"],
  "Cost Codes": ["create", "read", "update", "delete"],
  Schedules: ["create", "read", "update", "delete"],
  "Task Management": ["create", "read", "update", "delete"],
  Comments: ["create", "read", "update", "delete"],
  Issues: ["create", "read", "update", "delete"],
  "AI Assist": ["use"],
  "Company Management": ["create", "read", "update", "delete", "impersonate"],
  "User Management": adminAc.statements.user,
  "Sub Admin Management": ["create", "read", "update", "delete", "impersonate"],
  Inbox: ["view"],
  Settings: ["view"],
} as const;

export const ac = createAccessControl(pages);

// Super Admin: Full system access - can manage everything
export const superAdmin = ac.newRole({
  Dashboard: ["view"],
  "Company Management": ["create", "read", "update", "delete", "impersonate"],
  "User Management": adminAc.statements.user,
  "Sub Admin Management": ["create", "read", "update", "delete", "impersonate"],
  Inbox: ["view"],
  Settings: ["view"],
  ...adminAc.statements,
});

// Sub Admin: Can manage specific areas assigned by super admin
export const subAdmin = ac.newRole({
  Dashboard: ["view"],
  Projects: ["create", "read", "update", "delete"],
  "Cost Codes": ["create", "read", "update", "delete"],
  Schedules: ["create", "read", "update", "delete"],
  "Task Management": ["create", "read", "update", "delete"],
  Issues: ["create", "read", "update", "delete"],
  "AI Assist": ["use"],
  "User Management": ["list"], // Limited user management - can only list users
  Inbox: ["view"],
  Settings: ["view"],
});
