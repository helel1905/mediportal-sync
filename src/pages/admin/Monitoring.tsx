
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Cog, 
  Database, 
  HardDrive, 
  Info, 
  Monitor, 
  Network, 
  RefreshCcw, 
  Search, 
  Server, 
  Activity
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DatabaseMetric, LogEntry, PerformanceMetric, ServerStatus } from "@/types/admin";

// Mock data for the monitoring dashboard
const performanceData: PerformanceMetric[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: `${i}:00`,
  cpuUsage: Math.floor(Math.random() * 40) + 20,
  memoryUsage: Math.floor(Math.random() * 30) + 30,
  activeUsers: Math.floor(Math.random() * 100) + 50,
  responseTime: Math.floor(Math.random() * 300) + 50,
}));

const serverStatuses: ServerStatus[] = [
  {
    id: "1",
    name: "应用服务器",
    status: "online",
    uptime: "15天 7小时",
    lastRestart: "2023-03-01 08:30:00",
    cpuUsage: 35,
    memoryUsage: 48,
    diskUsage: 62
  },
  {
    id: "2",
    name: "数据库服务器",
    status: "online",
    uptime: "23天 12小时",
    lastRestart: "2023-02-20 15:20:00",
    cpuUsage: 42,
    memoryUsage: 56,
    diskUsage: 78
  },
  {
    id: "3",
    name: "存储服务器",
    status: "maintenance",
    uptime: "2小时 15分钟",
    lastRestart: "2023-03-16 06:45:00",
    cpuUsage: 15,
    memoryUsage: 22,
    diskUsage: 45
  }
];

const databaseMetrics: DatabaseMetric[] = [
  {
    id: "1",
    name: "主数据库",
    connections: 48,
    queriesPerSecond: 125,
    slowQueries: 3,
    cacheHitRatio: 0.92,
    status: "normal"
  },
  {
    id: "2",
    name: "报表数据库",
    connections: 12,
    queriesPerSecond: 45,
    slowQueries: 1,
    cacheHitRatio: 0.85,
    status: "normal"
  },
  {
    id: "3",
    name: "备份数据库",
    connections: 5,
    queriesPerSecond: 8,
    slowQueries: 0,
    cacheHitRatio: 0.95,
    status: "normal"
  }
];

const systemLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2023-03-16 09:15:45",
    level: "error",
    source: "应用服务器",
    message: "数据库连接超时",
    details: "尝试连接到数据库时连接请求超时。可能是由于网络延迟或数据库服务器负载过高导致。"
  },
  {
    id: "2",
    timestamp: "2023-03-16 08:30:22",
    level: "warning",
    source: "存储服务器",
    message: "磁盘空间不足",
    details: "存储服务器的主分区剩余空间低于20%。建议清理旧日志文件和临时文件。"
  },
  {
    id: "3",
    timestamp: "2023-03-16 08:05:12",
    level: "info",
    source: "系统",
    message: "系统备份完成",
    details: "每日系统备份已成功完成。备份文件已存储在指定位置。"
  },
  {
    id: "4",
    timestamp: "2023-03-16 07:45:30",
    level: "critical",
    source: "安全模块",
    message: "多次登录失败尝试",
    details: "用户'admin'在5分钟内有10次失败的登录尝试。IP地址已被临时封锁。"
  },
  {
    id: "5",
    timestamp: "2023-03-16 07:30:15",
    level: "warning",
    source: "应用服务器",
    message: "API响应时间过长",
    details: "患者记录API的平均响应时间超过500ms。建议检查数据库索引和查询优化。"
  }
];

const Monitoring = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerStatus | null>(null);

  const filteredLogs = systemLogs.filter(log => 
    log.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
    log.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: ServerStatus["status"]) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-red-500";
      case "maintenance": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  const getLogLevelBadge = (level: LogEntry["level"]) => {
    switch (level) {
      case "info":
        return <Badge variant="secondary" className="text-xs"><Info className="w-3 h-3 mr-1" /> 信息</Badge>;
      case "warning":
        return <Badge variant="warning" className="text-xs"><AlertCircle className="w-3 h-3 mr-1" /> 警告</Badge>;
      case "error":
        return <Badge variant="destructive" className="text-xs"><AlertCircle className="w-3 h-3 mr-1" /> 错误</Badge>;
      case "critical":
        return <Badge variant="destructive" className="text-xs font-bold"><AlertCircle className="w-3 h-3 mr-1" /> 严重</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">未知</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">系统监控</h1>
          <Button variant="outline" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 系统概览卡片 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">系统状态</CardTitle>
              <CardDescription>所有系统组件的总体状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">92%</span>
                  <span className="text-xs text-muted-foreground">系统健康度</span>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>CPU使用率</span>
                  <span>38%</span>
                </div>
                <Progress value={38} className="h-1" />
                
                <div className="flex justify-between text-xs">
                  <span>内存使用率</span>
                  <span>52%</span>
                </div>
                <Progress value={52} className="h-1" />
                
                <div className="flex justify-between text-xs">
                  <span>磁盘使用率</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-1" />
              </div>
            </CardContent>
          </Card>

          {/* 用户活动卡片 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
              <CardDescription>当前系统用户活动状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">78</span>
                  <span className="text-xs text-muted-foreground">在线用户</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">245</span>
                  <span className="text-xs text-muted-foreground">今日总登录</span>
                </div>
              </div>
              <div className="mt-4">
                <ChartContainer className="h-20" config={{}}>
                  <AreaChart
                    data={performanceData.slice(-8)}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#activeUsersGradient)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* 服务器响应时间卡片 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">系统响应时间</CardTitle>
              <CardDescription>平均API响应时间</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">185ms</span>
                  <span className="text-xs text-muted-foreground">当前平均</span>
                </div>
                <Badge variant="outline" className="flex gap-1">
                  <span className="text-green-500">▼</span> 15ms
                </Badge>
              </div>
              <div className="mt-4">
                <ChartContainer className="h-20" config={{}}>
                  <AreaChart
                    data={performanceData.slice(-8)}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#06b6d4"
                      fillOpacity={1}
                      fill="url(#responseTimeGradient)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="performance">性能监控</TabsTrigger>
            <TabsTrigger value="servers">服务器</TabsTrigger>
            <TabsTrigger value="database">数据库</TabsTrigger>
            <TabsTrigger value="logs">系统日志</TabsTrigger>
          </TabsList>
          
          {/* 性能监控选项卡 */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>系统性能趋势</CardTitle>
                <CardDescription>过去24小时的关键性能指标</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={{}}>
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded-md shadow-md p-3">
                              <p className="font-medium mb-2">{`时间: ${payload[0].payload.timestamp}`}</p>
                              <p className="text-sm text-blue-600">{`CPU使用率: ${payload[0].value}%`}</p>
                              <p className="text-sm text-purple-600">{`内存使用率: ${payload[1].value}%`}</p>
                              <p className="text-sm text-amber-600">{`响应时间: ${payload[2].value}ms`}</p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Area
                        type="monotone"
                        dataKey="cpuUsage"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                        name="CPU使用率"
                      />
                      <Area
                        type="monotone"
                        dataKey="memoryUsage"
                        stackId="1"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.5}
                        name="内存使用率"
                      />
                      <Area
                        type="monotone"
                        dataKey="responseTime"
                        stackId="2"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.5}
                        name="响应时间"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">CPU使用率</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">内存使用率</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">响应时间</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>资源使用分布</CardTitle>
                  <CardDescription>各系统组件资源占用情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ChartContainer config={{}}>
                      <BarChart
                        data={[
                          { name: '应用服务', cpu: 35, memory: 48 },
                          { name: '数据库', cpu: 42, memory: 56 },
                          { name: '文件存储', cpu: 25, memory: 32 },
                          { name: '缓存', cpu: 18, memory: 40 },
                          { name: '任务队列', cpu: 22, memory: 35 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="cpu" name="CPU %" fill="#3b82f6" />
                        <Bar dataKey="memory" name="内存 %" fill="#8b5cf6" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>网络流量</CardTitle>
                  <CardDescription>各服务器的网络出入流量</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ChartContainer config={{}}>
                      <BarChart
                        data={[
                          { name: '应用服务器', 入流量: 45, 出流量: 32 },
                          { name: '数据库服务器', 入流量: 28, 出流量: 58 },
                          { name: '存储服务器', 入流量: 65, 出流量: 22 },
                          { name: '缓存服务器', 入流量: 15, 出流量: 12 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="入流量" name="入流量 (Mbps)" fill="#10b981" />
                        <Bar dataKey="出流量" name="出流量 (Mbps)" fill="#f97316" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* 服务器选项卡 */}
          <TabsContent value="servers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>服务器状态</CardTitle>
                <CardDescription>所有服务器的当前运行状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>服务器名称</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>运行时间</TableHead>
                        <TableHead>CPU</TableHead>
                        <TableHead>内存</TableHead>
                        <TableHead>磁盘</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {serverStatuses.map((server) => (
                        <TableRow key={server.id}>
                          <TableCell className="font-medium">{server.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(server.status)} mr-2`}></div>
                              <span>
                                {server.status === "online" ? "在线" :
                                 server.status === "offline" ? "离线" : "维护中"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              {server.uptime}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-24">
                              <div className="flex justify-between text-xs mb-1">
                                <span>CPU</span>
                                <span>{server.cpuUsage}%</span>
                              </div>
                              <Progress value={server.cpuUsage} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-24">
                              <div className="flex justify-between text-xs mb-1">
                                <span>内存</span>
                                <span>{server.memoryUsage}%</span>
                              </div>
                              <Progress value={server.memoryUsage} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-24">
                              <div className="flex justify-between text-xs mb-1">
                                <span>磁盘</span>
                                <span>{server.diskUsage}%</span>
                              </div>
                              <Progress value={server.diskUsage} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedServer(server)}
                                  >
                                    详情
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>服务器详细信息 - {selectedServer?.name}</DialogTitle>
                                    <DialogDescription>
                                      查看服务器的详细状态和性能信息
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {selectedServer && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-4">
                                        <div>
                                          <h3 className="font-medium mb-2">基本信息</h3>
                                          <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-muted-foreground">状态:</div>
                                            <div className="flex items-center">
                                              <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(selectedServer.status)} mr-2`}></div>
                                              <span>
                                                {selectedServer.status === "online" ? "在线" :
                                                selectedServer.status === "offline" ? "离线" : "维护中"}
                                              </span>
                                            </div>
                                            <div className="text-muted-foreground">运行时间:</div>
                                            <div>{selectedServer.uptime}</div>
                                            <div className="text-muted-foreground">上次重启:</div>
                                            <div>{selectedServer.lastRestart}</div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h3 className="font-medium mb-2">硬件信息</h3>
                                          <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-muted-foreground">处理器:</div>
                                            <div>Intel Xeon E5-2680 v4</div>
                                            <div className="text-muted-foreground">内存:</div>
                                            <div>64GB DDR4</div>
                                            <div className="text-muted-foreground">存储:</div>
                                            <div>2TB SSD</div>
                                            <div className="text-muted-foreground">网络接口:</div>
                                            <div>10Gbps</div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-4">
                                        <div>
                                          <h3 className="font-medium mb-2">资源利用率</h3>
                                          <div className="space-y-3">
                                            <div>
                                              <div className="flex justify-between text-sm mb-1">
                                                <span>CPU使用率</span>
                                                <span>{selectedServer.cpuUsage}%</span>
                                              </div>
                                              <Progress value={selectedServer.cpuUsage} className="h-2" />
                                            </div>
                                            <div>
                                              <div className="flex justify-between text-sm mb-1">
                                                <span>内存使用率</span>
                                                <span>{selectedServer.memoryUsage}%</span>
                                              </div>
                                              <Progress value={selectedServer.memoryUsage} className="h-2" />
                                            </div>
                                            <div>
                                              <div className="flex justify-between text-sm mb-1">
                                                <span>磁盘使用率</span>
                                                <span>{selectedServer.diskUsage}%</span>
                                              </div>
                                              <Progress value={selectedServer.diskUsage} className="h-2" />
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h3 className="font-medium mb-2">服务状态</h3>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                                <span>Web服务</span>
                                              </div>
                                              <span className="text-muted-foreground">运行中</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                                <span>数据库服务</span>
                                              </div>
                                              <span className="text-muted-foreground">运行中</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                                <span>缓存服务</span>
                                              </div>
                                              <span className="text-muted-foreground">运行中</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                                <span>任务队列</span>
                                              </div>
                                              <span className="text-muted-foreground">运行中</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  <DialogFooter className="gap-2">
                                    <Button variant="outline">重启服务器</Button>
                                    <Button variant="outline">查看日志</Button>
                                    <Button>关闭</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Cog className="h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48">
                                  <div className="grid gap-2">
                                    <Button variant="ghost" className="justify-start" size="sm">
                                      重启服务器
                                    </Button>
                                    <Button variant="ghost" className="justify-start" size="sm">
                                      查看日志
                                    </Button>
                                    <Button variant="ghost" className="justify-start" size="sm">
                                      下载诊断报告
                                    </Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 数据库选项卡 */}
          <TabsContent value="database" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>数据库状态</CardTitle>
                <CardDescription>监控数据库性能指标和连接状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {databaseMetrics.map((db) => (
                    <Card key={db.id}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium">{db.name}</CardTitle>
                          <Badge
                            variant={db.status === "normal" ? "secondary" : 
                                    db.status === "warning" ? "warning" : "destructive"}
                            className="text-xs"
                          >
                            {db.status === "normal" ? "正常" : 
                            db.status === "warning" ? "警告" : "严重"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="text-muted-foreground">活跃连接:</div>
                          <div className="font-medium">{db.connections}</div>
                          <div className="text-muted-foreground">查询/秒:</div>
                          <div className="font-medium">{db.queriesPerSecond}</div>
                          <div className="text-muted-foreground">慢查询数:</div>
                          <div className="font-medium">{db.slowQueries}</div>
                          <div className="text-muted-foreground">缓存命中率:</div>
                          <div className="font-medium">{(db.cacheHitRatio * 100).toFixed(1)}%</div>
                        </div>
                        <div className="mt-4">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button size="sm" variant="outline" className="w-full">
                                查看详情
                              </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="overflow-y-auto w-full max-w-md">
                              <SheetHeader>
                                <SheetTitle>{db.name} - 数据库详情</SheetTitle>
                              </SheetHeader>
                              <div className="space-y-6 mt-6">
                                <div className="space-y-2">
                                  <h3 className="font-medium">基本信息</h3>
                                  <div className="grid grid-cols-2 gap-2 text-sm border rounded-md p-3">
                                    <div className="text-muted-foreground">数据库类型:</div>
                                    <div>PostgreSQL 14.5</div>
                                    <div className="text-muted-foreground">服务器:</div>
                                    <div>数据库服务器</div>
                                    <div className="text-muted-foreground">运行状态:</div>
                                    <div>正常</div>
                                    <div className="text-muted-foreground">启动时间:</div>
                                    <div>2023-02-20 15:20:00</div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h3 className="font-medium">性能指标</h3>
                                  <div className="space-y-3 border rounded-md p-3">
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>CPU使用率</span>
                                        <span>42%</span>
                                      </div>
                                      <Progress value={42} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>内存使用率</span>
                                        <span>56%</span>
                                      </div>
                                      <Progress value={56} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>磁盘I/O</span>
                                        <span>35%</span>
                                      </div>
                                      <Progress value={35} className="h-2" />
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h3 className="font-medium">连接信息</h3>
                                  <div className="text-sm border rounded-md p-3">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-muted-foreground">活跃连接:</div>
                                      <div>{db.connections}</div>
                                      <div className="text-muted-foreground">最大连接数:</div>
                                      <div>200</div>
                                      <div className="text-muted-foreground">空闲连接:</div>
                                      <div>24</div>
                                    </div>
                                    <div className="mt-3">
                                      <h4 className="text-xs font-medium mb-2">连接来源分布</h4>
                                      <div className="space-y-1">
                                        <div className="flex justify-between items-center text-xs">
                                          <span>应用服务器</span>
                                          <span>32</span>
                                        </div>
                                        <Progress value={(32/db.connections)*100} className="h-1.5" />
                                        <div className="flex justify-between items-center text-xs">
                                          <span>报表服务器</span>
                                          <span>10</span>
                                        </div>
                                        <Progress value={(10/db.connections)*100} className="h-1.5" />
                                        <div className="flex justify-between items-center text-xs">
                                          <span>管理后台</span>
                                          <span>6</span>
                                        </div>
                                        <Progress value={(6/db.connections)*100} className="h-1.5" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h3 className="font-medium">慢查询统计</h3>
                                  <div className="text-sm border rounded-md p-3">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>查询来源</TableHead>
                                          <TableHead>平均时长</TableHead>
                                          <TableHead>次数</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell>患者记录查询</TableCell>
                                          <TableCell>2.5s</TableCell>
                                          <TableCell>2</TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>月度报表生成</TableCell>
                                          <TableCell>3.8s</TableCell>
                                          <TableCell>1</TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <h3 className="font-medium">维护信息</h3>
                                  <div className="text-sm border rounded-md p-3">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-muted-foreground">上次备份:</div>
                                      <div>2023-03-16 04:00:00</div>
                                      <div className="text-muted-foreground">上次优化:</div>
                                      <div>2023-03-10 02:30:00</div>
                                      <div className="text-muted-foreground">下次计划维护:</div>
                                      <div>2023-03-20 02:00:00</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button variant="outline" className="flex-1">
                                    优化数据库
                                  </Button>
                                  <Button variant="outline" className="flex-1">
                                    查看所有查询
                                  </Button>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>查询性能趋势</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ChartContainer config={{}}>
                        <AreaChart
                          data={[
                            { name: '00:00', queries: 85, responseTime: 120 },
                            { name: '02:00', queries: 65, responseTime: 110 },
                            { name: '04:00', queries: 45, responseTime: 90 },
                            { name: '06:00', queries: 55, responseTime: 100 },
                            { name: '08:00', queries: 95, responseTime: 130 },
                            { name: '10:00', queries: 125, responseTime: 150 },
                            { name: '12:00', queries: 145, responseTime: 160 },
                            { name: '14:00', queries: 155, responseTime: 170 },
                            { name: '16:00', queries: 160, responseTime: 180 },
                            { name: '18:00', queries: 140, responseTime: 170 },
                            { name: '20:00', queries: 120, responseTime: 150 },
                            { name: '22:00', queries: 100, responseTime: 130 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="queries" name="查询/分钟" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="responseTime" name="响应时间 (ms)" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 系统日志选项卡 */}
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>系统日志</CardTitle>
                    <CardDescription>系统操作和错误日志记录</CardDescription>
                  </div>
                  <div className="flex w-full md:w-auto">
                    <Input
                      placeholder="搜索日志..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mr-2"
                    />
                    <Button variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>时间</TableHead>
                        <TableHead>来源</TableHead>
                        <TableHead>级别</TableHead>
                        <TableHead className="w-full">消息</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="whitespace-nowrap font-mono text-xs">
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {log.source}
                          </TableCell>
                          <TableCell>
                            {getLogLevelBadge(log.level)}
                          </TableCell>
                          <TableCell className="max-w-md truncate">
                            {log.message}
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedLog(log)}
                                >
                                  查看详情
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>日志详情</DialogTitle>
                                  <DialogDescription>
                                    查看完整的日志记录信息
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {selectedLog && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                      <div className="text-muted-foreground">时间:</div>
                                      <div className="font-mono">{selectedLog.timestamp}</div>
                                      
                                      <div className="text-muted-foreground">来源:</div>
                                      <div>{selectedLog.source}</div>
                                      
                                      <div className="text-muted-foreground">级别:</div>
                                      <div>{getLogLevelBadge(selectedLog.level)}</div>
                                      
                                      <div className="text-muted-foreground">消息:</div>
                                      <div>{selectedLog.message}</div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="text-sm text-muted-foreground">详细信息:</div>
                                      <div className="bg-muted p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
                                        {selectedLog.details || "无详细信息"}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="text-sm text-muted-foreground">相关操作:</div>
                                      <div className="flex flex-wrap gap-2">
                                        <Button size="sm" variant="outline">
                                          复制日志ID
                                        </Button>
                                        <Button size="sm" variant="outline">
                                          导出日志
                                        </Button>
                                        {selectedLog.level === "error" || selectedLog.level === "critical" ? (
                                          <Button size="sm" variant="outline">
                                            创建问题记录
                                          </Button>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button>关闭</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <span>显示</span>
                  <strong>{filteredLogs.length}</strong>
                  <span>条日志</span>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">导出日志</Button>
                  <Button variant="outline" size="sm">清除筛选</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Monitoring;
