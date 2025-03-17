import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackupList from "@/components/admin/backup/BackupList";
import CreateBackupForm from "@/components/admin/backup/CreateBackupForm";
import BackupScheduleList from "@/components/admin/backup/BackupScheduleList";
import RestoreSessionList from "@/components/admin/backup/RestoreSessionList";
import RestoreBackupDialog from "@/components/admin/backup/RestoreBackupDialog";
import { BackupItem } from "@/types/admin";
import { useBackupData } from "@/hooks/useBackupData";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, DownloadCloud, Info, Shield, Clock } from "lucide-react";

const Backups = () => {
  const {
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
  } = useBackupData();

  const [selectedBackup, setSelectedBackup] = useState<BackupItem | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const handleRestore = (backup: BackupItem) => {
    setSelectedBackup(backup);
    setRestoreDialogOpen(true);
  };

  const handleRestoreConfirm = (backupId: string, modules: string[]) => {
    restoreBackup(backupId, modules);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据备份与恢复</h1>
          <p className="text-muted-foreground">
            管理系统数据备份，创建备份计划，执行数据恢复操作
          </p>
        </div>

        {restoreSessions.some(s => s.status === "in_progress") && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>恢复操作进行中</AlertTitle>
            <AlertDescription>
              数据恢复操作正在执行，部分系统功能可能暂时不可用。
            </AlertDescription>
          </Alert>
        )}

        {!restoreSessions.some(s => s.status === "in_progress") && (
          <RestoreSessionList sessions={restoreSessions.filter(s => s.status === "completed" || s.status === "failed").slice(0, 3)} />
        )}
        
        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="manage">备份管理</TabsTrigger>
            <TabsTrigger value="create">创建备份</TabsTrigger>
            <TabsTrigger value="schedule">备份计划</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="space-y-6">
            <BackupList 
              backups={backups}
              onRestore={handleRestore}
              onDelete={deleteBackup}
              onLockToggle={toggleBackupLock}
              onDownload={downloadBackup}
            />
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-lg font-medium">备份最佳实践</h3>
                <div className="text-sm space-y-4">
                  <div className="flex gap-2">
                    <Shield className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">定期进行完整备份</p>
                      <p className="text-muted-foreground">
                        建议每周至少进行一次完整备份，以确保在系统故障时能够快速恢复数据。
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Shield className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">存储备份至多个位置</p>
                      <p className="text-muted-foreground">
                        将重要备份存储在多个位置（本地和云端），以防单一存储点故障导致数据丢失。
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Shield className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">测试备份恢复</p>
                      <p className="text-muted-foreground">
                        定期测试备份恢复流程，确保在实际需要时能够顺利完成恢复操作。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">存储概览</h3>
                <div className="border rounded-lg p-4 space-y-4">
                  {storageConfigs.map(config => (
                    <div key={config.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <DownloadCloud className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-sm">{config.name}</span>
                        </div>
                        {config.isDefault && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            默认
                          </span>
                        )}
                      </div>
                      
                      <div className="bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{ 
                            width: `${(parseInt(config.usedSize || "0") / parseInt(config.maxSize || "1")) * 100}%` 
                          }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>已用: {config.usedSize}</span>
                        <span>总容量: {config.maxSize}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="create">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <CreateBackupForm 
                  storageConfigs={storageConfigs}
                  onCreateBackup={createBackup}
                />
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-500" />
                    备份说明
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      创建备份会将系统中的选定数据保存为备份文件，以便在需要时恢复。
                    </p>
                    <div>
                      <p className="font-medium">备份类型说明:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-1">
                        <li><span className="font-medium text-foreground">完整备份</span> - 包含所有数据，文件最大</li>
                        <li><span className="font-medium text-foreground">增量备份</span> - 仅包含自上次备份后的变更</li>
                        <li><span className="font-medium text-foreground">差异备份</span> - 包含自上次完整备份后的所有变更</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">注意事项:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-1">
                        <li>备份过程中请勿关闭系统</li>
                        <li>大型备份可能需要较长时间</li>
                        <li>建议在系统使用低峰期创建备份</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {isLoading && (
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h3 className="font-medium flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      备份进行中
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      正在创建备份，请勿关闭系统或浏览器窗口...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <BackupScheduleList 
                  schedules={schedules}
                  onToggleSchedule={toggleScheduleActive}
                  onEditSchedule={editSchedule}
                  onDeleteSchedule={deleteSchedule}
                  onAddSchedule={addSchedule}
                />
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    计划说明
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      备份计划允许您设置系统自动定期执行备份任务，无需手动干预。
                    </p>
                    <div>
                      <p className="font-medium">计划频率选项:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-1">
                        <li><span className="font-medium text-foreground">每天</span> - 每天在指定时间执行</li>
                        <li><span className="font-medium text-foreground">每周</span> - 每周在指定星期几和时间执行</li>
                        <li><span className="font-medium text-foreground">每月</span> - 每月在指定日期和时间执行</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">保留策略:</p>
                      <p className="text-muted-foreground">
                        系统会根据保留期限自动删除过期的备份文件，以释放存储空间。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <RestoreBackupDialog
        backup={selectedBackup}
        open={restoreDialogOpen}
        onOpenChange={setRestoreDialogOpen}
        onRestore={handleRestoreConfirm}
      />
    </MainLayout>
  );
};

export default Backups;
