
import React, { useState } from "react";
import { BackupItem } from "@/types/admin";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, Eye, Lock, MoreHorizontal, Trash2, Unlock } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import BackupDetailDialog from "./BackupDetailDialog";
import { useToast } from "@/hooks/use-toast";

interface BackupListProps {
  backups: BackupItem[];
  onRestore: (backup: BackupItem) => void;
  onDelete: (backupId: string) => void;
  onLockToggle: (backupId: string, lock: boolean) => void;
  onDownload: (backupId: string) => void;
}

const BackupList: React.FC<BackupListProps> = ({
  backups,
  onRestore,
  onDelete,
  onLockToggle,
  onDownload
}) => {
  const { toast } = useToast();
  const [selectedBackup, setSelectedBackup] = useState<BackupItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

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

  const typeLabel = (type: string) => {
    switch (type) {
      case "full": return "完整备份";
      case "incremental": return "增量备份";
      case "differential": return "差异备份";
      default: return type;
    }
  };

  const showDetail = (backup: BackupItem) => {
    setSelectedBackup(backup);
    setDetailOpen(true);
  };

  const handleRestoreClick = (backup: BackupItem) => {
    if (backup.status === "in_progress" || backup.status === "restoring") {
      toast({
        title: "无法执行恢复操作",
        description: "该备份当前正在处理中，请等待完成后再尝试恢复操作。",
        variant: "destructive"
      });
      return;
    }
    onRestore(backup);
  };

  const handleDeleteClick = (backupId: string, isLocked: boolean) => {
    if (isLocked) {
      toast({
        title: "无法删除",
        description: "此备份已被锁定，无法删除。请先解锁备份。",
        variant: "destructive"
      });
      return;
    }
    onDelete(backupId);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>备份列表</CardTitle>
        </CardHeader>
        <CardContent>
          {backups.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Database className="h-12 w-12 mb-2 opacity-20" />
              <p>暂无备份记录</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>备份名称</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>大小</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {backup.isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
                          <span>{backup.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(backup.createdAt).toLocaleString('zh-CN')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {typeLabel(backup.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>
                        <Badge className={cn("font-normal", statusColor(backup.status))}>
                          {backup.status === "completed" && "已完成"}
                          {backup.status === "in_progress" && "进行中"}
                          {backup.status === "scheduled" && "已计划"}
                          {backup.status === "failed" && "失败"}
                          {backup.status === "restoring" && "恢复中"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">打开菜单</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => showDetail(backup)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              查看详情
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleRestoreClick(backup)}
                              className="cursor-pointer"
                              disabled={backup.status === "in_progress" || backup.status === "restoring"}
                            >
                              <Database className="mr-2 h-4 w-4" />
                              恢复备份
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onDownload(backup.id)}
                              className="cursor-pointer"
                              disabled={backup.status !== "completed"}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              下载备份
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onLockToggle(backup.id, !backup.isLocked)}
                              className="cursor-pointer"
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
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(backup.id, backup.isLocked)}
                              className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                              disabled={backup.isLocked || backup.status === "in_progress" || backup.status === "restoring"}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除备份
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <BackupDetailDialog 
        backup={selectedBackup}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onRestore={handleRestoreClick}
        onDelete={() => selectedBackup && handleDeleteClick(selectedBackup.id, selectedBackup.isLocked)}
        onLockToggle={() => selectedBackup && onLockToggle(selectedBackup.id, !selectedBackup.isLocked)}
        onDownload={() => selectedBackup && onDownload(selectedBackup.id)}
      />
    </>
  );
};

export default BackupList;
