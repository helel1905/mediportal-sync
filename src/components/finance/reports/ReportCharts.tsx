
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface ReportChartsProps {
  reportType: string;
}

export const ReportCharts: React.FC<ReportChartsProps> = ({ reportType }) => {
  // Mock data - in a real app, this would come from API calls
  const revenueExpenseData = [
    { month: "1月", revenue: 520000, expenses: 320000 },
    { month: "2月", revenue: 580000, expenses: 350000 },
    { month: "3月", revenue: 550000, expenses: 330000 },
    { month: "4月", revenue: 620000, expenses: 380000 },
    { month: "5月", revenue: 600000, expenses: 360000 },
    { month: "6月", revenue: 650000, expenses: 400000 },
    { month: "7月", revenue: 682450, expenses: 412680 },
  ];

  const departmentRevenueData = [
    { name: "内科", value: 158600 },
    { name: "外科", value: 142300 },
    { name: "儿科", value: 78200 },
    { name: "妇产科", value: 95600 },
    { name: "眼科", value: 52800 },
    { name: "其他", value: 154950 },
  ];

  const paymentMethodData = [
    { name: "医保", value: 428950 },
    { name: "现金", value: 120500 },
    { name: "微信支付", value: 73000 },
    { name: "支付宝", value: 60000 },
  ];

  const dailyRevenueData = [
    { day: "周一", revenue: 95000 },
    { day: "周二", revenue: 88000 },
    { day: "周三", revenue: 102000 },
    { day: "周四", revenue: 99000 },
    { day: "周五", revenue: 120000 },
    { day: "周六", revenue: 110000 },
    { day: "周日", revenue: 68450 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">图表分析</h3>
      
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">收支趋势</TabsTrigger>
          <TabsTrigger value="departments">科室分布</TabsTrigger>
          <TabsTrigger value="payment">支付方式</TabsTrigger>
          <TabsTrigger value="daily">日常波动</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>收入与支出趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueExpenseData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="收入"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="支出"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>各科室收入分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentRevenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentRevenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>支付方式分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={paymentMethodData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="value" name="金额" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="daily" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>日收入波动</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyRevenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      name="日收入"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
