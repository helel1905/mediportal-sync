
import { useState, useEffect } from "react";
import { 
  BackupItem, 
  BackupSchedule, 
  BackupStorageConfig, 
  BackupType, 
  RestoreSession 
} from "@/types/admin";
import { useToast } from "./use-toast";

// Mock data for backups
const mockBackups: BackupItem[] = [
  {
    id: "bk-001",
    name: "每日完整备份-2023-07-15",
    createdAt: "2023-07-15T00:00:00Z",
    completedAt: "2023-07-15T00:15:23Z",
    size: "1.2 GB",
    type: "full",
    status: "completed",
    scheduleId: "sch-001",
    scheduleName: "每日完整备份",
    storage: "local",
    location: "/backup/daily/full-20230715.bak",
    createdBy: "系统自动",
    compressionRatio: "65%",
    encryptionEnabled: true,
    modules: ["patient", "prescription", "inventory", "financial", "system", "user"],
    isLocked: false
  },
  {
    id: "bk-002",
    name: "每周差异备份-2023-07-12",
    createdAt: "2023-07-12T12:30:00Z",
    completedAt: "2023-07-12T12:37:15Z",
    size: "450 MB",
    type: "differential",
    status: "completed",
    scheduleId: "sch-002",
    scheduleName: "每周差异备份",
    storage: "local",
    location: "/backup/weekly/diff-20230712.bak",
    createdBy: "系统自动",
    compressionRatio: "72%",
    encryptionEnabled: true,
    modules: ["patient", "prescription", "system", "user"],
    isLocked: true
  },
  {
    id: "bk-003",
    name: "手动增量备份-2023-07-10",
    createdAt: "2023-07-10T15:45:00Z",
    completedAt: "2023-07-10T15:48:30Z",
    size: "120 MB",
    type: "incremental",
    status: "completed",
    storage: "cloud",
    location: "backup-bucket/incremental/inc-20230710.bak",
    createdBy: "管理员",
    compressionRatio: "80%",
    encryptionEnabled: true,
    modules: ["patient", "prescription", "inventory"],
    isLocked: false
  },
  {
    id: "bk-004",
    name: "系统更新前备份",
    createdAt: "2023-07-05T08:30:00Z",
    completedAt: "2023-07-05T08:45:10Z",
    size: "1.3 GB",
    type: "full",
    status: "completed",
    storage: "local",
    location: "/backup/manual/pre-update-20230705.bak",
    createdBy: "管理员",
    description: "系统版本更新前的完整备份",
    compressionRatio: "63%",
    encryptionEnabled: true,
    modules: ["patient", "prescription", "inventory", "financial", "system", "user"],
    isLocked: true
  }
];

// Mock data for backup schedules
const mockSchedules: BackupSchedule[] = [
  {
    id: "sch-001",
    name: "每日完整备份",
    frequency: "daily",
    time: "00:00",
    retentionPeriod: 7,
    type: "full",
    isActive: true,
    lastRun: "2023-07-15T00:00:00Z",
    nextRun: "2023-07-16T00:00:00Z"
  },
  {
    id: "sch-002",
    name: "每周差异备份",
    frequency: "weekly",
    time: "12:00",
    day: 3, // Wednesday
    retentionPeriod: 30,
    type: "differential",
    isActive: true,
    lastRun: "2023-07-12T12:00:00Z",
    nextRun: "2023-07-19T12:00:00Z"
  },
  {
    id: "sch-003",
    name: "每月完整备份",
    frequency: "monthly",
    time: "02:00",
    day: 1, // 1st day of month
    retentionPeriod: 90,
    type: "full",
    isActive: false,
    lastRun: "2023-07-01T02:00:00Z",
    nextRun: "2023-08-01T02:00:00Z"
  }
];

// Mock data for storage configurations
const mockStorageConfigs: BackupStorageConfig[] = [
  {
    id: "storage-001",
    name: "本地存储",
    type: "local",
    path: "/var/backups/hospital",
    isDefault: true,
    maxSize: "100 GB",
    usedSize: "23.5 GB"
  },
  {
    id: "storage-002",
    name: "阿里云对象存储",
    type: "cloud",
    isDefault: false,
    credentials: {
      provider: "aws",
      region: "cn-shanghai",
      bucket: "hospital-backup-bucket"
    },
    maxSize: "500 GB",
    usedSize: "78.2 GB"
  },
  {
    id: "storage-003",
    name: "外部备份硬盘",
    type: "external",
    path: "/mnt/external/backups",
    isDefault: false,
    maxSize: "2 TB",
    usedSize: "350 GB"
  }
];

// Mock data for restore sessions
const mockRestoreSessions: RestoreSession[] = [
  {
    id: "restore-001",
    backupId: "bk-001",
    backupName: "每日完整备份-2023-07-15",
    startTime: new Date(Date.now() - 360000).toISOString(), // 1 hour ago
    status: "completed",
    progress: 100,
    initiatedBy: "管理员",
    targetEnvironment: "生产环境",
    modules: ["patient", "prescription", "system"]
  }
];

export function useBackupData() {
  const { toast } = useToast();
  const [backups, setBackups] = useState<BackupItem[]>(mockBackups);
  const [schedules, setSchedules] = useState<BackupSchedule[]>(mockSchedules);
  const [storageConfigs, setStorageConfigs] = useState<BackupStorageConfig[]>(mockStorageConfigs);
  const [restoreSessions, setRestoreSessions] = useState<RestoreSession[]>(mockRestoreSessions);
  const [isLoading, setIsLoading] = useState(false);

  // Lock or unlock a backup
  const toggleBackupLock = (backupId: string, lock: boolean) => {
    setBackups(prev => 
      prev.map(backup => 
        backup.id === backupId 
          ? { ...backup, isLocked: lock } 
          : backup
      )
    );
    
    toast({
      title: lock ? "备份已锁定" : "备份已解锁",
      description: lock 
        ? "此备份已被锁定，无法被删除" 
        : "此备份已解锁，可以被删除",
    });
  };

  // Delete a backup
  const deleteBackup = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (backup?.isLocked) {
      toast({
        title: "无法删除",
        description: "此备份已被锁定，无法删除",
        variant: "destructive"
      });
      return;
    }
    
    setBackups(prev => prev.filter(backup => backup.id !== backupId));
    
    toast({
      title: "备份已删除",
      description: "备份文件已成功删除",
    });
  };

  // Download a backup
  const downloadBackup = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (!backup) return;
    
    toast({
      title: "开始下载",
      description: `正在准备下载备份: ${backup.name}`,
    });
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast({
        title: "下载已开始",
        description: "备份文件正在下载中",
      });
    }, 1500);
  };

  // Simulate creating a new backup
  const createBackup = (backupData: {
    name: string;
    type: BackupType;
    storage: string;
    description?: string;
    modules: string[];
    encryptionEnabled: boolean;
  }) => {
    setIsLoading(true);
    
    // Find the storage config
    const storageConfig = storageConfigs.find(config => config.id === backupData.storage);
    if (!storageConfig) {
      toast({
        title: "创建失败",
        description: "找不到指定的存储配置",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Create a new backup record
    const newBackup: BackupItem = {
      id: `bk-${Date.now().toString().substring(7)}`,
      name: backupData.name,
      createdAt: new Date().toISOString(),
      size: "计算中...",
      type: backupData.type,
      status: "in_progress",
      storage: storageConfig.type,
      location: storageConfig.type === "local" ? `${storageConfig.path}/${backupData.name.replace(/\s/g, '-')}.bak` : 
                storageConfig.type === "cloud" ? `${storageConfig.credentials?.bucket}/${backupData.name.replace(/\s/g, '-')}.bak` :
                `${storageConfig.path}/${backupData.name.replace(/\s/g, '-')}.bak`,
      createdBy: "当前用户",
      description: backupData.description,
      encryptionEnabled: backupData.encryptionEnabled,
      modules: backupData.modules,
      isLocked: false
    };
    
    setBackups(prev => [newBackup, ...prev]);
    
    toast({
      title: "备份已开始",
      description: "备份任务已创建，正在进行中",
    });
    
    // Simulate backup completion after a delay
    setTimeout(() => {
      setBackups(prev => 
        prev.map(backup => 
          backup.id === newBackup.id 
            ? { 
                ...backup, 
                status: "completed", 
                completedAt: new Date().toISOString(),
                size: `${(Math.random() * 1.5 + 0.2).toFixed(2)} GB`,
                compressionRatio: `${Math.floor(Math.random() * 30 + 50)}%`
              } 
            : backup
        )
      );
      
      toast({
        title: "备份已完成",
        description: `备份 "${backupData.name}" 已成功完成`,
      });
      
      setIsLoading(false);
    }, 5000);
  };

  // Toggle schedule active status
  const toggleScheduleActive = (scheduleId: string, isActive: boolean) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === scheduleId 
          ? { ...schedule, isActive } 
          : schedule
      )
    );
    
    toast({
      title: isActive ? "计划已启用" : "计划已禁用",
      description: isActive 
        ? "备份计划已成功启用" 
        : "备份计划已成功禁用",
    });
  };

  // Add a new schedule
  const addSchedule = (scheduleData: Omit<BackupSchedule, "id" | "lastRun" | "nextRun">) => {
    // Calculate next run time
    const now = new Date();
    const [hours, minutes] = scheduleData.time.split(":").map(Number);
    
    let nextRun = new Date(now);
    nextRun.setHours(hours, minutes, 0, 0);
    
    if (scheduleData.frequency === "daily") {
      // If today's time has already passed, set to tomorrow
      if (nextRun < now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
    } else if (scheduleData.frequency === "weekly" && scheduleData.day !== undefined) {
      // Set to the next occurrence of the specified day of week
      const currentDay = nextRun.getDay();
      const daysUntilNext = (scheduleData.day - currentDay + 7) % 7;
      nextRun.setDate(nextRun.getDate() + (daysUntilNext === 0 && nextRun < now ? 7 : daysUntilNext));
    } else if (scheduleData.frequency === "monthly" && scheduleData.day !== undefined) {
      // Set to the specified day of the current month
      nextRun.setDate(scheduleData.day);
      // If that day has already passed, set to next month
      if (nextRun < now) {
        nextRun.setMonth(nextRun.getMonth() + 1);
      }
    }
    
    const newSchedule: BackupSchedule = {
      id: `sch-${Date.now().toString().substring(7)}`,
      ...scheduleData,
      lastRun: undefined,
      nextRun: nextRun.toISOString()
    };
    
    setSchedules(prev => [...prev, newSchedule]);
    
    toast({
      title: "计划已创建",
      description: `备份计划 "${scheduleData.name}" 已成功创建`,
    });
  };

  // Edit an existing schedule
  const editSchedule = (scheduleData: BackupSchedule) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === scheduleData.id
          ? scheduleData
          : schedule
      )
    );
    
    toast({
      title: "计划已更新",
      description: `备份计划 "${scheduleData.name}" 已成功更新`,
    });
  };

  // Delete a schedule
  const deleteSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
    
    toast({
      title: "计划已删除",
      description: "备份计划已成功删除",
    });
  };

  // Restore from a backup
  const restoreBackup = (backupId: string, modules: string[]) => {
    const backup = backups.find(b => b.id === backupId);
    if (!backup) return;
    
    // Create a new restore session
    const newSession: RestoreSession = {
      id: `restore-${Date.now().toString().substring(7)}`,
      backupId,
      backupName: backup.name,
      startTime: new Date().toISOString(),
      status: "in_progress",
      progress: 0,
      initiatedBy: "当前用户",
      targetEnvironment: "生产环境",
      modules
    };
    
    setRestoreSessions(prev => [newSession, ...prev]);
    
    toast({
      title: "恢复已开始",
      description: `正在从备份 "${backup.name}" 恢复数据`,
    });
    
    // Update backup status
    setBackups(prev => 
      prev.map(b => 
        b.id === backupId
          ? { ...b, status: "restoring" }
          : b
      )
    );
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setRestoreSessions(prev => 
        prev.map(session => {
          if (session.id === newSession.id) {
            const newProgress = Math.min(session.progress + Math.floor(Math.random() * 10 + 5), 100);
            return { 
              ...session, 
              progress: newProgress,
              status: newProgress === 100 ? "completed" : "in_progress",
              endTime: newProgress === 100 ? new Date().toISOString() : undefined
            };
          }
          return session;
        })
      );
      
      // Check if restore is complete
      const currentSession = restoreSessions.find(s => s.id === newSession.id);
      if (currentSession?.progress === 100) {
        clearInterval(interval);
        
        // Update backup status back to completed
        setBackups(prev => 
          prev.map(b => 
            b.id === backupId
              ? { ...b, status: "completed" }
              : b
          )
        );
        
        toast({
          title: "恢复已完成",
          description: `从备份 "${backup.name}" 恢复数据已成功完成`,
        });
      }
    }, 800);
    
    // Ensure interval is cleared after max time
    setTimeout(() => clearInterval(interval), 20000);
  };

  return {
    backups,
    schedules,
    storageConfigs,
    restoreSessions,
    isLoading,
    toggleBackupLock,
    deleteBackup,
    downloadBackup,
    createBackup,
    toggleScheduleActive,
    addSchedule,
    editSchedule,
    deleteSchedule,
    restoreBackup
  };
}
