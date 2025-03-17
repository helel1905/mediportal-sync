
import React, { useEffect, useState } from "react";
import { BackupSchedule, BackupType } from "@/types/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Save } from "lucide-react";

interface BackupScheduleDialogProps {
  schedule: BackupSchedule | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<BackupSchedule, "id" | "lastRun" | "nextRun">) => void;
  isEditing: boolean;
}

const BackupScheduleDialog: React.FC<BackupScheduleDialogProps> = ({
  schedule,
  open,
  onOpenChange,
  onSubmit,
  isEditing
}) => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly" | "custom">("daily");
  const [time, setTime] = useState("03:00");
  const [day, setDay] = useState<number | undefined>(undefined);
  const [retentionPeriod, setRetentionPeriod] = useState(30);
  const [type, setType] = useState<BackupType>("full");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (schedule) {
      setName(schedule.name);
      setFrequency(schedule.frequency);
      setTime(schedule.time);
      setDay(schedule.day);
      setRetentionPeriod(schedule.retentionPeriod);
      setType(schedule.type);
      setIsActive(schedule.isActive);
    } else {
      // Default values for new schedule
      setName("");
      setFrequency("daily");
      setTime("03:00");
      setDay(undefined);
      setRetentionPeriod(30);
      setType("full");
      setIsActive(true);
    }
  }, [schedule, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      frequency,
      time,
      day,
      retentionPeriod,
      type,
      isActive,
    });
  };

  const dayOptions = () => {
    if (frequency === "weekly") {
      return [0, 1, 2, 3, 4, 5, 6].map(d => ({
        value: d.toString(),
        label: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d]
      }));
    } else if (frequency === "monthly") {
      return Array.from({ length: 28 }, (_, i) => ({
        value: (i + 1).toString(),
        label: `${i + 1}日`
      }));
    }
    return [];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {isEditing ? "编辑备份计划" : "创建新的备份计划"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "修改备份计划的执行频率、保留策略等信息" 
              : "设置系统自动执行备份的频率、保留策略等信息"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="schedule-name">计划名称</Label>
            <Input
              id="schedule-name"
              placeholder="输入计划名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-frequency">执行频率</Label>
              <Select
                value={frequency}
                onValueChange={(value) => {
                  setFrequency(value as "daily" | "weekly" | "monthly" | "custom");
                  // Reset day when changing frequency
                  setDay(undefined);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择执行频率" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">每天</SelectItem>
                  <SelectItem value="weekly">每周</SelectItem>
                  <SelectItem value="monthly">每月</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-time">执行时间</Label>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="schedule-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {(frequency === "weekly" || frequency === "monthly") && (
            <div className="space-y-2">
              <Label htmlFor="schedule-day">
                {frequency === "weekly" ? "星期几" : "每月几号"}
              </Label>
              <Select
                value={day?.toString() || ""}
                onValueChange={(value) => setDay(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={frequency === "weekly" ? "选择星期几" : "选择日期"} />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backup-type">备份类型</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as BackupType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择备份类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">完整备份</SelectItem>
                  <SelectItem value="incremental">增量备份</SelectItem>
                  <SelectItem value="differential">差异备份</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retention-period">保留期限 (天)</Label>
              <Input
                id="retention-period"
                type="number"
                min={1}
                max={365}
                value={retentionPeriod}
                onChange={(e) => setRetentionPeriod(parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule-active">计划状态</Label>
            <Select
              value={isActive ? "active" : "inactive"}
              onValueChange={(value) => setIsActive(value === "active")}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择计划状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">启用</SelectItem>
                <SelectItem value="inactive">禁用</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "保存修改" : "创建计划"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BackupScheduleDialog;
