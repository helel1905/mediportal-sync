
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  CreditCard, 
  FileBarChart, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Calendar,
  ArrowRight
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const revenueData = [
  { name: "1月", revenue: 45000 },
  { name: "2月", revenue: 52000 },
  { name: "3月", revenue: 49000 },
  { name: "4月", revenue: 63000 },
  { name: "5月", revenue: 58000 },
  { name: "6月", revenue: 72000 },
  { name: "7月", revenue: 78000 },
];

const departmentData = [
  { name: "内科", value: 35 },
  { name: "外科", value: 25 },
  { name: "儿科", value: 15 },
  { name: "妇产科", value: 12 },
  { name: "眼科", value: 8 },
  { name: "其他", value: 5 },
];

const COLORS = ["#3a75ff", "#6495ED", "#00BFFF", "#87CEFA", "#B0E0E6", "#ADD8E6"];

const insuranceClaims = [
  { id: "INS-2023-1085", patient: "王明", amount: 1250.00, status: "待处理", date: "2023-07-15" },
  { id: "INS-2023-1086", patient: "李华", amount: 890.50, status: "已提交", date: "2023-07-14" },
  { id: "INS-2023-1087", patient: "张丽", amount: 2300.00, status: "已拒绝", date: "2023-07-13" },
  { id: "INS-2023-1088", patient: "陈伟", amount: 560.00, status: "已结算", date: "2023-07-12" },
];

const FinanceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">财务管理工作台</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            2023年7月
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <FileBarChart className="h-4 w-4" />
            生成报表
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日营收</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold">¥12,580</div>
              <div className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">较昨日</p>
            <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "85%" }} />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>日目标: ¥15,000</span>
              <span>85%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">医保待结算</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥68,450</div>
            <p className="text-xs text-muted-foreground">本周累计</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="status-badge-warning">待提交 15</span>
              <span className="status-badge-info">处理中 8</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">收款异常</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground">金额 ¥4,250</p>
            <Button className="mt-2 w-full" size="sm" variant="destructive">
              查看详情
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>七月月度收入趋势</CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>收入</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                <span>目标</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="revenue"
                    stroke="#3a75ff"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#e5e7eb"
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>科室收入占比</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Claims */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>最近医保结算记录</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            查看所有
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-3 font-medium">结算单号</th>
                  <th className="p-3 font-medium">患者</th>
                  <th className="p-3 font-medium">金额</th>
                  <th className="p-3 font-medium">日期</th>
                  <th className="p-3 font-medium">状态</th>
                  <th className="p-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {insuranceClaims.map((claim, i) => (
                  <tr key={i} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                    <td className="p-3 font-medium">{claim.id}</td>
                    <td className="p-3">{claim.patient}</td>
                    <td className="p-3">¥{claim.amount.toFixed(2)}</td>
                    <td className="p-3">{claim.date}</td>
                    <td className="p-3">
                      <span 
                        className={cn(
                          "status-badge",
                          claim.status === "待处理" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : claim.status === "已提交" 
                              ? "bg-blue-100 text-blue-800" 
                              : claim.status === "已拒绝"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                        )}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button size="sm" variant="outline">处理</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">对账工具</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">每日自动对账，手动核对药房、门诊差异</div>
            <Button className="mt-4 w-full" size="sm">
              开始对账
            </Button>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">医保结算批量处理</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">一键提交多笔医保结算，减少手动操作</div>
            <Button className="mt-4 w-full" size="sm">
              批量处理
            </Button>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">财务报表生成器</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">快速生成月度/季度财务报表，支持多种格式</div>
            <Button className="mt-4 w-full" size="sm">
              生成报表
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceDashboard;
