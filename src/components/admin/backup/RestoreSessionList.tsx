
import React from "react";
import { RestoreSession } from "@/types/admin";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Database, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface RestoreSessionListProps {
  sessions: RestoreSession[];
}

const RestoreSessionList: React.FC<RestoreSessionListProps> = ({ sessions }) => {
  if (sessions.length === 0) {
    return null;
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "in_progress": return "恢复中";
      case "completed": return "已完成";
      case "failed": return "失败";
      default: return status;
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="h-5 w-5" />
          恢复会话
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map(session => (
            <div 
              key={session.id} 
              className="border rounded-lg p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={cn("font-normal", statusColor(session.status))}>
                    {statusLabel(session.status)}
                  </Badge>
                  <h3 className="font-medium text-sm">
                    {session.backupName}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">详情</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-72">
                      <div className="grid gap-2 text-sm">
                        <div className="font-medium">恢复详情</div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="text-muted-foreground">备份 ID</div>
                          <div className="col-span-2 truncate">{session.backupId}</div>
                          
                          <div className="text-muted-foreground">开始时间</div>
                          <div className="col-span-2">{new Date(session.startTime).toLocaleString('zh-CN')}</div>
                          
                          {session.endTime && (
                            <>
                              <div className="text-muted-foreground">完成时间</div>
                              <div className="col-span-2">{new Date(session.endTime).toLocaleString('zh-CN')}</div>
                            </>
                          )}
                          
                          <div className="text-muted-foreground">操作者</div>
                          <div className="col-span-2">{session.initiatedBy}</div>
                          
                          <div className="text-muted-foreground">目标环境</div>
                          <div className="col-span-2">{session.targetEnvironment}</div>
                          
                          {session.errorMessage && (
                            <>
                              <div className="text-muted-foreground">错误信息</div>
                              <div className="col-span-2 text-destructive">{session.errorMessage}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(session.startTime).toLocaleTimeString('zh-CN')}
                  </div>
                </div>
              </div>

              {session.status === "in_progress" && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>恢复进度</span>
                    <span>{session.progress}%</span>
                  </div>
                  <Progress value={session.progress} />
                </div>
              )}

              <div className="flex flex-wrap gap-1 mt-1">
                {session.modules.map(module => (
                  <Badge key={module} variant="outline" className="font-normal text-xs">
                    {moduleLabels[module] || module}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestoreSessionList;
