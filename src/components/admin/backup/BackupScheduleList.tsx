
import React, { useState } from "react";
import { BackupSchedule, BackupType } from "@/types/admin";
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
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import BackupScheduleDialog from "./BackupScheduleDialog";
import { useToast } from "@/hooks/use-toast";

interface BackupScheduleListProps {
  schedules: BackupSchedule[];
  onToggleSchedule: (scheduleId: string, isActive: boolean) => void;
  onEditSchedule: (schedule: BackupSchedule) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onAddSchedule: (schedule: Omit<BackupSchedule, "id" | "lastRun" | "nextRun">) => void;
}

const BackupScheduleList: React.FC<BackupScheduleListProps> = ({
  schedules,
  onToggleSchedule,
  onEditSchedule,
  onDeleteSchedule,
  onAddSchedule
}) => {
  const { toast } = useToast();
  const [selectedSchedule, setSelectedSchedule] = useState<BackupSchedule | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const typeLabel = (type: BackupType) => {
    switch (type) {
      case "full": return "完整备份";
      case "incremental": return "增量备份";
      case "differential": return "差异备份";
      default: return type;
    }
  };

  const frequencyLabel = (frequency: string, day?: number) => {
    switch (frequency) {
      case "daily": return "每天";
      case "weekly": 
        return day !== undefined ? `每周 ${["日", "一", "二", "三", "四", "五", "六"][day]}` : "每周";
      case "monthly": 
        return day !== undefined ? `每月 ${day} 日` : "每月";
      case "custom": return "自定义";
      default: return frequency;
    }
  };

  const handleAddClick = () => {
    setSelectedSchedule(null);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleEditClick = (schedule: BackupSchedule) => {
    setSelectedSchedule(schedule);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDialogSubmit = (data: Omit<BackupSchedule, "id" | "lastRun" | "nextRun">) => {
    if (isEditing && selectedSchedule) {
      onEditSchedule({ ...data, id: selectedSchedule.id, lastRun: selectedSchedule.lastRun, nextRun: selectedSchedule.nextRun });
    } else {
      onAddSchedule(data);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>备份计划</CardTitle>
          <Button size="sm" onClick={handleAddClick}>
            <Plus className="h-4 w-4 mr-1" />
            新建计划
          </Button>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Clock className="h-12 w-12 mb-2 opacity-20" />
              <p>暂无备份计划</p>
              <Button variant="link" size="sm" onClick={handleAddClick}>
                创建新的备份计划
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>计划名称</TableHead>
                    <TableHead>频率</TableHead>
                    <TableHead>备份类型</TableHead>
                    <TableHead>保留期</TableHead>
                    <TableHead>下次执行</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="w-[80px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {frequencyLabel(schedule.frequency, schedule.day)} {schedule.time}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {typeLabel(schedule.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>{schedule.retentionPeriod} 天</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {new Date(schedule.nextRun).toLocaleString('zh-CN')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={schedule.isActive}
                            onCheckedChange={(checked) => 
                              onToggleSchedule(schedule.id, checked)
                            }
                          />
                          <span className={cn(
                            "text-xs font-medium",
                            schedule.isActive ? "text-green-600" : "text-muted-foreground"
                          )}>
                            {schedule.isActive ? "已启用" : "已禁用"}
                          </span>
                        </div>
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
                              onClick={() => handleEditClick(schedule)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              编辑计划
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onDeleteSchedule(schedule.id)}
                              className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除计划
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

      <BackupScheduleDialog
        schedule={selectedSchedule}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleDialogSubmit}
        isEditing={isEditing}
      />
    </>
  );
};

export default BackupScheduleList;
