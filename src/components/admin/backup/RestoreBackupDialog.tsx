
import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Database, AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Module {
  id: string;
  name: string;
  description: string;
  isRequired?: boolean;
}

interface RestoreBackupDialogProps {
  backup: BackupItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestore: (backupId: string, modules: string[]) => void;
}

const RestoreBackupDialog: React.FC<RestoreBackupDialogProps> = ({
  backup,
  open,
  onOpenChange,
  onRestore
}) => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const modules: Module[] = [
    { id: "patient", name: "患者数据", description: "所有患者基础信息和病历记录", isRequired: true },
    { id: "prescription", name: "处方数据", description: "所有药物处方和用药指导信息" },
    { id: "inventory", name: "库存数据", description: "药房和医疗耗材的库存数据" },
    { id: "financial", name: "财务数据", description: "结算、收费和财务报表数据" },
    { id: "system", name: "系统配置", description: "系统设置和配置参数" },
    { id: "user", name: "用户数据", description: "用户账户、权限和角色设置" },
  ];

  React.useEffect(() => {
    if (backup && open) {
      // Pre-select all modules that exist in the backup
      setSelectedModules(backup.modules);
      setConfirmed(false);
    }
  }, [backup, open]);

  const handleModuleToggle = (moduleId: string, checked: boolean) => {
    if (checked) {
      setSelectedModules([...selectedModules, moduleId]);
    } else {
      // Only allow deselecting if the module is in the backup
      if (backup?.modules.includes(moduleId)) {
        setSelectedModules(selectedModules.filter(id => id !== moduleId));
      }
    }
  };

  const handleRestore = () => {
    if (backup) {
      onRestore(backup.id, selectedModules);
      onOpenChange(false);
    }
  };

  if (!backup) return null;

  const typeLabel = (type: string) => {
    switch (type) {
      case "full": return "完整备份";
      case "incremental": return "增量备份";
      case "differential": return "差异备份";
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

  const availableModules = modules.filter(m => backup.modules.includes(m.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            恢复备份
          </DialogTitle>
          <DialogDescription>
            从备份 <Badge variant="outline">{backup.name}</Badge> 中恢复数据
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>警告</AlertTitle>
            <AlertDescription>
              恢复操作将会覆盖当前系统中的数据。恢复过程不可中断，请确保在操作前已充分了解风险。
            </AlertDescription>
          </Alert>

          <div className="text-sm space-y-2">
            <div className="font-medium">备份信息</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-muted-foreground">名称</div>
              <div>{backup.name}</div>
              
              <div className="text-muted-foreground">创建时间</div>
              <div>{new Date(backup.createdAt).toLocaleString('zh-CN')}</div>
              
              <div className="text-muted-foreground">类型</div>
              <div>{typeLabel(backup.type)}</div>
              
              <div className="text-muted-foreground">大小</div>
              <div>{backup.size}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>选择要恢复的模块</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-md p-3">
              {availableModules.map(module => (
                <div key={module.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={`restore-module-${module.id}`}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={(checked) => 
                      handleModuleToggle(module.id, checked as boolean)
                    }
                  />
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor={`restore-module-${module.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {module.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {availableModules.length === 0 && (
              <div className="text-sm text-muted-foreground italic">
                该备份不包含任何可恢复的模块
              </div>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="restore-confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(!!checked)}
            />
            <div>
              <Label
                htmlFor="restore-confirm"
                className="text-sm font-medium"
              >
                我已了解恢复操作的风险并已做好数据备份
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={!confirmed || selectedModules.length === 0}
            onClick={handleRestore}
          >
            <Database className="mr-2 h-4 w-4" />
            开始恢复
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestoreBackupDialog;
