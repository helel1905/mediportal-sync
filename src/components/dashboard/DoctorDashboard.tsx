import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  ClipboardList, 
  Brain, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Bell,
  Timer 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ConsultationTimeTrend from "./ConsultationTimeTrend";
import { getConsultationStats } from "@/utils/consultationTimeUtils";

const patientData = [
  { name: "08:00", value: 4 },
  { name: "09:00", value: 7 },
  { name: "10:00", value: 10 },
  { name: "11:00", value: 8 },
  { name: "12:00", value: 5 },
  { name: "13:00", value: 6 },
  { name: "14:00", value: 9 },
  { name: "15:00", value: 11 },
  { name: "16:00", value: 9 },
  { name: "17:00", value: 6 },
];

const patients = [
  { id: 1, name: "王明", status: "待诊", time: "9:30", issue: "发热、咳嗽" },
  { id: 2, name: "李华", status: "已完成", time: "10:15", issue: "季节性过敏" },
  { id: 3, name: "陈静", status: "进行中", time: "10:45", issue: "血压监测" },
  { id: 4, name: "赵伟", status: "待诊", time: "11:30", issue: "腰痛" },
  { id: 5, name: "张丽", status: "已完成", time: "13:00", issue: "复查血常规" },
];

const DoctorDashboard = () => {
  const consultationStats = getConsultationStats();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">医生工作台</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Bell className="h-4 w-4" />
          <span>今日提醒</span>
          <span className="ml-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">
            3
          </span>
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日接诊</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultationStats.completed}/{consultationStats.total}</div>
            <p className="text-xs text-muted-foreground">已完成 {consultationStats.completionRate}%</p>
            <Progress className="mt-2" value={consultationStats.completionRate} />
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待处理处方</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">较昨日 <span className="text-green-500">↓2</span></p>
            <div className="mt-2 flex items-center gap-2">
              <span className="status-badge-warning">紧急 2</span>
              <span className="status-badge-info">普通 3</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI辅助使用</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26</div>
            <p className="text-xs text-muted-foreground">本周诊断辅助次数</p>
            <Button className="mt-2 w-full" size="sm" variant="outline">
              <Brain className="mr-2 h-4 w-4" />
              启动AI辅助
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Consultation Time Trend (New) */}
      <ConsultationTimeTrend />

      {/* Patient Flow Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>今日接诊趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={patientData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3a75ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3a75ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3a75ff"
                    fillOpacity={1}
                    fill="url(#colorPatients)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>今日待诊患者</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        patient.status === "待诊" 
                          ? "bg-blue-100" 
                          : patient.status === "进行中" 
                            ? "bg-yellow-100" 
                            : "bg-green-100"
                      )}
                    >
                      {patient.status === "待诊" ? (
                        <Clock className="h-5 w-5 text-blue-600" />
                      ) : patient.status === "进行中" ? (
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className={cn(
                        "status-badge",
                        patient.status === "待诊" 
                          ? "bg-blue-100 text-blue-800" 
                          : patient.status === "进行中" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                      )}
                    >
                      {patient.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{patient.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>快捷功能</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-auto flex-col p-6 space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>患者管理</span>
            </Button>
            <Button className="h-auto flex-col p-6 space-y-2" variant="outline">
              <ClipboardList className="h-6 w-6" />
              <span>处方开具</span>
            </Button>
            <Button className="h-auto flex-col p-6 space-y-2" variant="outline">
              <Brain className="h-6 w-6" />
              <span>AI辅助诊断</span>
            </Button>
            <Button className="h-auto flex-col p-6 space-y-2" variant="outline">
              <Timer className="h-6 w-6" />
              <span>接诊时间</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
