
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

// System metrics interfaces
export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  timestamp: string;
}

export interface ServerStatus {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  uptime: string;
  lastRestart: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export interface DatabaseMetric {
  id: string;
  name: string;
  connections: number;
  queriesPerSecond: number;
  slowQueries: number;
  cacheHitRatio: number;
  status: "normal" | "warning" | "critical";
}

export interface PerformanceMetric {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  activeUsers: number;
  responseTime: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "critical";
  source: string;
  message: string;
  details?: string;
}

export interface AlertConfig {
  id: string;
  metricName: string;
  condition: ">" | "<" | "=" | ">=" | "<=";
  threshold: number;
  notifyEmail: boolean;
  notifySystem: boolean;
  severity: "low" | "medium" | "high";
  enabled: boolean;
}

// Backup related interfaces
export type BackupType = "full" | "incremental" | "differential";
export type BackupStatus = "scheduled" | "in_progress" | "completed" | "failed" | "restoring";
export type BackupStorageType = "local" | "cloud" | "external";

export interface BackupSchedule {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "custom";
  time: string; // Time of day for the backup
  day?: number; // Day of week/month for weekly/monthly backups
  retentionPeriod: number; // Number of days to keep backups
  type: BackupType;
  isActive: boolean;
  lastRun?: string;
  nextRun: string;
}

export interface BackupItem {
  id: string;
  name: string;
  createdAt: string;
  completedAt?: string;
  size: string;
  type: BackupType;
  status: BackupStatus;
  scheduleId?: string;
  scheduleName?: string;
  storage: BackupStorageType;
  location: string;
  createdBy: string;
  description?: string;
  compressionRatio?: string;
  encryptionEnabled: boolean;
  modules: string[]; // Which modules are backed up
  isLocked: boolean; // Whether the backup is locked for deletion
}

export interface RestoreSession {
  id: string;
  backupId: string;
  backupName: string;
  startTime: string;
  endTime?: string;
  status: "in_progress" | "completed" | "failed";
  progress: number;
  initiatedBy: string;
  targetEnvironment: string;
  errorMessage?: string;
  modules: string[]; // Which modules are being restored
}

export interface BackupStorageConfig {
  id: string;
  name: string;
  type: BackupStorageType;
  path?: string;
  isDefault: boolean;
  credentials?: {
    provider?: "aws" | "azure" | "google";
    region?: string;
    bucket?: string;
  };
  maxSize?: string;
  usedSize?: string;
}
