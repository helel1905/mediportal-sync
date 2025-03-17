
import React, { useState } from "react";
import { BackupType, BackupStorageType, BackupStorageConfig } from "@/types/admin";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Database, Save } from "lucide-react";

interface Module {
  id: string;
  name: string;
  description: string;
  isRequired?: boolean;
}

interface CreateBackupFormProps {
  storageConfigs: BackupStorageConfig[];
  onCreateBackup: (backupData: {
    name: string;
    type: BackupType;
    storage: string;
    description?: string;
    modules: string[];
    encryptionEnabled: boolean;
  }) => void;
}

const modules: Module[] = [
  { id: "patient", name: "患者数据", description: "所有患者基础信息和病历记录", isRequired: true },
  { id: "prescription", name: "处方数据", description: "所有药物处方和用药指导信息" },
  { id: "inventory", name: "库存数据", description: "药房和医疗耗材的库存数据" },
  { id: "financial", name: "财务数据", description: "结算、收费和财务报表数据" },
  { id: "system", name: "系统配置", description: "系统设置和配置参数", isRequired: true },
  { id: "user", name: "用户数据", description: "用户账户、权限和角色设置", isRequired: true },
];

const CreateBackupForm: React.FC<CreateBackupFormProps> = ({ 
  storageConfigs,
  onCreateBackup
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<BackupType>("full");
  const [storage, setStorage] = useState(storageConfigs.find(config => config.isDefault)?.id || "");
  const [description, setDescription] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>(
    modules.filter(m => m.isRequired).map(m => m.id)
  );
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  const handleModuleToggle = (moduleId: string, checked: boolean) => {
    if (checked) {
      setSelectedModules([...selectedModules, moduleId]);
    } else {
      // Don't allow unchecking required modules
      if (modules.find(m => m.id === moduleId)?.isRequired) {
        return;
      }
      setSelectedModules(selectedModules.filter(id => id !== moduleId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateBackup({
      name,
      type,
      storage,
      description: description || undefined,
      modules: selectedModules,
      encryptionEnabled,
    });
  };

  const isFormValid = name.trim() !== "" && type && storage && selectedModules.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          创建新备份
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backup-name">备份名称</Label>
            <Input
              id="backup-name"
              placeholder="输入备份名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <p className="text-xs text-muted-foreground">
              {type === "full" && "备份所有数据，耗时较长但恢复简单"}
              {type === "incremental" && "仅备份自上次备份后的变更，速度快但恢复复杂"}
              {type === "differential" && "备份自上次完整备份后的所有变更，平衡了速度和恢复难度"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-storage">存储位置</Label>
            <Select
              value={storage}
              onValueChange={setStorage}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择存储位置" />
              </SelectTrigger>
              <SelectContent>
                {storageConfigs.map(config => (
                  <SelectItem key={config.id} value={config.id}>
                    {config.name} ({config.type === "local" ? "本地" : config.type === "cloud" ? "云端" : "外部"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-modules">备份模块</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-md p-3">
              {modules.map(module => (
                <div key={module.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={`module-${module.id}`}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={(checked) => 
                      handleModuleToggle(module.id, checked as boolean)
                    }
                    disabled={module.isRequired}
                  />
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor={`module-${module.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {module.name}
                      {module.isRequired && (
                        <span className="ml-1 text-xs text-red-500">*</span>
                      )}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">* 标记为必选模块</p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="encryption"
              checked={encryptionEnabled}
              onCheckedChange={(checked) => setEncryptionEnabled(!!checked)}
            />
            <div className="grid gap-1.5">
              <Label
                htmlFor="encryption"
                className="text-sm font-medium leading-none"
              >
                启用加密
              </Label>
              <p className="text-xs text-muted-foreground">
                对备份数据进行加密，提高数据安全性
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-description">备份描述 (可选)</Label>
            <Textarea
              id="backup-description"
              placeholder="输入备份描述信息"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!isFormValid}
          >
            <Save className="mr-2 h-4 w-4" />
            开始备份
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBackupForm;
