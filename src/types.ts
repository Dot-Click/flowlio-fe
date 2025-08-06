import type { Role } from "./providers/user.provider";

export interface CreateSupportTicketRequest {
  subject: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  client: string;
  assignedto: string;
}
// Base SupportTicket interface (without relations)
export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "open" | "closed";
  submittedby: string; // User ID
  submittedbyName: string; // User name
  submittedbyRole: string; // User role
  client: string;
  assignedto: string; // Assignee name (not user ID)
  createdon: Date;
  updatedAt: Date;
}

// API Response type for support tickets
export interface GetSupportTicketsResponse extends Partial<ApiResponse> {
  data: SupportTicket[];
}

export interface PlanFeature {
  maxUsers: number;
  maxProjects: number;
  maxStorage: number;
  aiAssist: boolean;
  prioritySupport: boolean;
  customBranding: boolean;
  apiAccess: boolean;
  customFeatures?: string[];
  [key: string]: any;
}
export type IPlan<T = {}> = {
  id: string;
  name: string;
  slug?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  currency?: string;
  billingCycle?: string;
  features: PlanFeature;
  isActive?: boolean;
  sortOrder?: number;
} & T;

export type ISubAdmin<T = {}> = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  permission: "Admin" | "Sub Admin" | "User";
  password: string;
  logo?: string | null;
  logoPublicId?: string | null;
  status: "active" | "inactive" | "suspended";
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUser?: {
    id: string;
    name: string;
    email: string;
  };
} & T;

export type IUser<T = {}> = {
  id: string;
  role: Role;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  phone: string;
  image: string | null;
  banned: boolean | null;
  emailVerified: boolean;
  banExpires: Date | null;
  banReason: string | null;
  companyId: string | null;
  imagePublicId: string | null;
  twoFactorEnabled: boolean | null;
  canViewProjectHours: boolean | null;
} & T;

export type INotification<T = {}> = {
  id: string;
  read: boolean;
  title: string;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
  message: string;
  type: // tasks
  | "task_assigned"
    | "task_updated"
    | "task_completed"
    // issues
    | "issue_created"
    | "issue_updated"
    | "issue_resolved"
    // schedule
    | "schedule_created"
    | "schedule_approved"
    | "schedule_rejected"
    // comment
    | "comment_added"
    // project
    | "project_created"
    | "project_updated"
    // member
    | "member_added"
    | "member_removed"
    // global notifications by admin
    | "system_message"
    // sub admin notifications
    | "subadmin_created"
    | "subadmin_updated"
    | "subadmin_deleted";
} & T;

export type CreatePlanRequest = {
  name: string;
  description: string;
  price: number;
  slug?: string;
  currency: string;
  billingCycle: string;
  features: PlanFeature;
  isActive: boolean;
  sortOrder: number;
};

// Sub Admin related types
export type SubAdminPermission = "Admin" | "Sub Admin" | "User";
export type SubAdminStatus = "active" | "inactive" | "suspended";
export type CreateSubAdminRequest = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  permission: SubAdminPermission;
  password: string;
  status?: SubAdminStatus;
};

export type UpdateSubAdminRequest = Partial<
  Omit<CreateSubAdminRequest, "password">
>;

export type SubAdminStats = {
  totalSubAdmins: number;
  permissionDistribution: Array<{
    permission: SubAdminPermission;
    count: number;
  }>;
  statusDistribution: Array<{
    status: SubAdminStatus;
    count: number;
  }>;
  recentSubAdmins: number;
};

export type SubAdminListResponse = {
  subAdmins: ISubAdmin[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Permission levels for different user types
export type PermissionLevel =
  | "superAdmin" // Full system access
  | "subAdmin"
  | "user";

// API Response types
export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
};
