
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Activity, 
  Database, 
  RefreshCw, 
  Server, 
  HardDrive,
  Cpu,
  Memory,
  Shield,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const performanceData = [
  { time: "00:00", cpu: 25, memory: 40, network: 10 },
  { time: "04:00", cpu: 15, memory: 38, network: 5 },
  { time: "08:00", cpu: 35, memory: 45, network: 20 },
  { time: "12:00", cpu: 60, memory: 55, network: 45 },
  { time: "16:00", cpu: 75, memory: 65, network: 60 },
  { time: "20:00", cpu: 50, memory: 60, network: 30 },
  { time: "现在", cpu: 45, memory: 55, network: 25 },
];

const backupData = [
  { id: "BK-1234", time: "2023-07-15 00:00", type: "自动", status: "成功", size: "1.2 GB" },
  { id: "BK-1235", time: "2023-07-14 00:00", type: "自动", status: "成功", size: "1.1 GB" },
  { id: "BK-1236", time: "2023-07-13 12:30", type: "手动", status: "成功", size: "1.2 GB" },
  { id: "BK-1237", time: "2023-07-12 00:00", type: "自动", status: "失败", size: "-" },
];

const loginData = [
  { user: "张医生", role: "医生", time: "10:15", status: "成功", ip: "192.168.1.105" },
  { user: "李管理", role: "药房管理员", time: "09:30", status: "成功", ip: "192.168.1.120" },
  { user: "王财务", role: "财务人员", time: "09:15", status: "成功", ip: "192.168.1.145" },
  { user: "未知用户", role: "-", time: "08:45", status: "失败", ip: "45.123.45.78" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">系统管理工作台</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          <span>刷新状态</span>
        </Button>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统负载</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-xs text-muted-foreground">CPU 使用率</p>
            <Progress className="mt-2" value={45} />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>正常</span>
              <span>2核 / 4核</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">内存使用</CardTitle>
            <Memory className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55%</div>
            <p className="text-xs text-muted-foreground">4.4 GB / 8 GB</p>
            <Progress className="mt-2" value={55} />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>正常</span>
              <span>剩余 3.6 GB</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">磁盘空间</CardTitle>
            <HardDrive className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">160 GB / 500 GB</p>
            <Progress className="mt-2" value={32} />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>良好</span>
              <span>剩余 340 GB</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>系统性能监控 (24小时)</CardTitle>
          <Button variant="outline" size="sm">详细监控</Button>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" name="CPU (%)" stroke="#3a75ff" />
                <Line type="monotone" dataKey="memory" name="内存 (%)" stroke="#ffb547" />
                <Line type="monotone" dataKey="network" name="网络 (Mbps)" stroke="#00C49F" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Backup and Login Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>最近备份</CardTitle>
            <Button variant="outline" size="sm">立即备份</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backupData.map((backup, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        backup.status === "成功" ? "bg-green-100" : "bg-red-100"
                      )}
                    >
                      {backup.status === "成功" ? (
                        <Database className="h-5 w-5 text-green-600" />
                      ) : (
                        <Database className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{backup.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {backup.time} · {backup.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{backup.size}</span>
                    <Button 
                      size="sm" 
                      variant={backup.status === "成功" ? "outline" : "ghost"}
                      className="h-8"
                    >
                      {backup.status === "成功" ? "恢复" : "重试"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>登录日志</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              查看所有
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loginData.map((login, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        login.status === "成功" ? "bg-green-100" : "bg-red-100"
                      )}
                    >
                      {login.status === "成功" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{login.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {login.role} · IP: {login.ip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className={cn(
                        "status-badge",
                        login.status === "成功" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      )}
                    >
                      {login.status}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {login.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm">用户权限管理</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">管理系统用户，设置角色权限</div>
            <Button className="mt-4 w-full" size="sm">
              进入管理
            </Button>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm">安全设置</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">管理系统安全策略，查看安全日志</div>
            <Button className="mt-4 w-full" size="sm">
              安全中心
            </Button>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm">系统设置</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">配置系统参数，优化性能</div>
            <Button className="mt-4 w-full" size="sm">
              系统设置
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
