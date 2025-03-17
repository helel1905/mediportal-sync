
import React from "react";
import { BackupItem } from "@/types/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lock, Unlock, Database, Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackupDetailDialogProps {
  backup: BackupItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestore: (backup: BackupItem) => void;
  onDelete: (backupId: string) => void;
  onLockToggle: (backupId: string, lock: boolean) => void;
  onDownload: (backupId: string) => void;
}

const BackupDetailDialog: React.FC<BackupDetailDialogProps> = ({
  backup,
  open,
  onOpenChange,
  onRestore,
  onDelete,
  onLockToggle,
  onDownload
}) => {
  if (!backup) return null;

  const typeLabel = (type: string) => {
    switch (type) {
      case "full": return "完整备份";
      case "incremental": return "增量备份";
      case "differential": return "差异备份";
      default: return type;
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "completed": return "已完成";
      case "in_progress": return "进行中";
      case "scheduled": return "已计划";
      case "failed": return "失败";
      case "restoring": return "恢复中";
      default: return status;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "failed": return "bg-red-100 text-red-800";
      case "restoring": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const storageTypeLabel = (type: string) => {
    switch (type) {
      case "local": return "本地存储";
      case "cloud": return "云存储";
      case "external": return "外部存储";
      default: return type;
    }
  };

  const moduleLabels: Record<string, string> = {
    "patient": "患者数据",
    "prescription": "处方数据",
    "inventory": "库存数据",
    "financial": "财务数据",
    "system": "系统配置",
    "user": "用户数据",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {backup.isLocked && <Lock className="h-4 w-4" />}
            {backup.name}
          </DialogTitle>
          <DialogDescription>
            备份详细信息
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">状态</div>
            <Badge className={cn("font-normal", statusColor(backup.status))}>
              {statusLabel(backup.status)}
            </Badge>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">基本信息</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">备份类型</div>
              <div>{typeLabel(backup.type)}</div>
              
              <div className="text-muted-foreground">创建时间</div>
              <div>{new Date(backup.createdAt).toLocaleString('zh-CN')}</div>
              
              {backup.completedAt && (
                <>
                  <div className="text-muted-foreground">完成时间</div>
                  <div>{new Date(backup.completedAt).toLocaleString('zh-CN')}</div>
                </>
              )}
              
              <div className="text-muted-foreground">大小</div>
              <div>{backup.size}</div>
              
              <div className="text-muted-foreground">创建者</div>
              <div>{backup.createdBy}</div>
              
              {backup.compressionRatio && (
                <>
                  <div className="text-muted-foreground">压缩率</div>
                  <div>{backup.compressionRatio}</div>
                </>
              )}
              
              <div className="text-muted-foreground">加密状态</div>
              <div>{backup.encryptionEnabled ? "已加密" : "未加密"}</div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium mb-1">存储信息</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">存储类型</div>
              <div>{storageTypeLabel(backup.storage)}</div>
              
              <div className="text-muted-foreground">存储位置</div>
              <div className="truncate" title={backup.location}>{backup.location}</div>
            </div>
          </div>

          {backup.scheduleId && (
            <>
              <Separator />
              <div>
                <div className="text-sm font-medium mb-1">计划信息</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">计划名称</div>
                  <div>{backup.scheduleName}</div>
                  
                  <div className="text-muted-foreground">计划ID</div>
                  <div className="truncate" title={backup.scheduleId}>{backup.scheduleId}</div>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div>
            <div className="text-sm font-medium mb-1">备份模块</div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {backup.modules.map((module) => (
                <Badge key={module} variant="outline" className="font-normal">
                  {moduleLabels[module] || module}
                </Badge>
              ))}
            </div>
          </div>

          {backup.description && (
            <>
              <Separator />
              <div>
                <div className="text-sm font-medium mb-1">备份描述</div>
                <div className="text-sm">{backup.description}</div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLockToggle(backup.id, !backup.isLocked)}
            className="w-full sm:w-auto"
          >
            {backup.isLocked ? (
              <>
                <Unlock className="mr-2 h-4 w-4" />
                解锁备份
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                锁定备份
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload(backup.id)}
            disabled={backup.status !== "completed"}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            下载备份
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(backup.id)}
            disabled={backup.isLocked || backup.status === "in_progress" || backup.status === "restoring"}
            className="w-full sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            删除备份
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onRestore(backup)}
            disabled={backup.status === "in_progress" || backup.status === "restoring"}
            className="w-full sm:w-auto"
          >
            <Database className="mr-2 h-4 w-4" />
            恢复备份
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackupDetailDialog;
