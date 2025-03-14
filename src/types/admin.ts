
// Define types for admin features

// User role interface
export interface UserRoleType {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystemRole: boolean;
}

// Permission interface
export interface Permission {
  id: string;
  name: string;
  category: "common" | "doctor" | "pharmacy" | "finance" | "admin";
}

// User status type
export type UserStatus = "active" | "inactive" | "locked";

// User interface
export interface UserInfo {
  id: string;
  username: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: UserStatus;
  lastLogin: string;
}

// Department interface
export interface Department {
  id: string;
  name: string;
}

// User management actions
export enum UserManagementAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  RESET_PASSWORD = "reset_password",
  CHANGE_ROLE = "change_role",
  CHANGE_STATUS = "change_status"
}

// Audit log interface
export interface AuditLog {
  id: string;
  action: UserManagementAction;
  targetUser: string;
  performedBy: string;
  timestamp: string;
  details: string;
}
