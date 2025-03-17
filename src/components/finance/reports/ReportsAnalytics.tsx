
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/finance/reports/DatePicker";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  ResponsiveContainer,
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
  AreaChart,
  Area,
} from "recharts";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar, 
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";

export const ReportsAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [chartType, setChartType] = useState("revenue");
  
  // Mock data for different analytics views
  const revenueByMonthData = [
    { name: "1月", revenue: 520000, expenses: 320000, profit: 200000 },
    { name: "2月", revenue: 580000, expenses: 350000, profit: 230000 },
    { name: "3月", revenue: 550000, expenses: 330000, profit: 220000 },
    { name: "4月", revenue: 620000, expenses: 380000, profit: 240000 },
    { name: "5月", revenue: 600000, expenses: 360000, profit: 240000 },
    { name: "6月", revenue: 650000, expenses: 400000, profit: 250000 },
    { name: "7月", revenue: 682450, expenses: 412680, profit: 269770 },
  ];
  
  const departmentTrendData = [
    { name: "1月", 内科: 120000, 外科: 110000, 儿科: 65000, 妇产科: 82000, 眼科: 48000, 其他: 95000 },
    { name: "2月", 内科: 125000, 外科: 115000, 儿科: 68000, 妇产科: 85000, 眼科: 50000, 其他: 137000 },
    { name: "3月", 内科: 130000, 外科: 108000, 儿科: 70000, 妇产科: 86000, 眼科: 48000, 其他: 108000 },
    { name: "4月", 内科: 142000, 外科: 118000, 儿科: 72000, 妇产科: 92000, 眼科: 51000, 其他: 145000 },
    { name: "5月", 内科: 145000, 外科: 122000, 儿科: 69000, 妇产科: 88000, 眼科: 49000, 其他: 127000 },
    { name: "6月", 内科: 150000, 外科: 132000, 儿科: 74000, 妇产科: 93000, 眼科: 51000, 其他: 150000 },
    { name: "7月", 内科: 158600, 外科: 142300, 儿科: 78200, 妇产科: 95600, 眼科: 52800, 其他: 154950 },
  ];
  
  const insuranceComparisonData = [
    { name: "1月", 医保支付: 320000, 自费支付: 200000 },
    { name: "2月", 医保支付: 350000, 自费支付: 230000 },
    { name: "3月", 医保支付: 330000, 自费支付: 220000 },
    { name: "4月", 医保支付: 380000, 自费支付: 240000 },
    { name: "5月", 医保支付: 360000, 自费支付: 240000 },
    { name: "6月", 医保支付: 400000, 自费支付: 250000 },
    { name: "7月", 医保支付: 428950, 自费支付: 253500 },
  ];
  
  const patientTypeData = [
    { name: "门诊", value: 320000 },
    { name: "住院", value: 180000 },
    { name: "手术", value: 85000 },
    { name: "急诊", value: 62000 },
    { name: "体检", value: 35450 },
  ];
  
  const expenseBreakdownData = [
    { name: "人力资源", value: 215600 },
    { name: "药品采购", value: 98760 },
    { name: "设备维护", value: 42500 },
    { name: "行政管理", value: 35820 },
    { name: "其他支出", value: 20000 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];
  
  // KPI metrics
  const kpiMetrics = [
    { 
      title: "年度总收入目标", 
      current: 4202450, 
      target: 7500000, 
      percentage: 56,
      trend: "up",
      trendValue: "8.2%"
    },
    { 
      title: "年度净利润目标", 
      current: 1659770, 
      target: 3000000, 
      percentage: 55,
      trend: "up",
      trendValue: "12.8%"
    },
    { 
      title: "医保结算率", 
      current: 428, 
      target: 450, 
      percentage: 95,
      trend: "up",
      trendValue: "3.5%"
    },
    { 
      title: "成本控制目标", 
      current: 412680, 
      target: 410000, 
      percentage: 101,
      trend: "down",
      trendValue: "2.1%"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-xl font-bold">财务数据分析</h3>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
              <SelectItem value="custom">自定义</SelectItem>
            </SelectContent>
          </Select>
          
          {timeRange === "custom" && (
            <>
              <DatePicker date={startDate} setDate={setStartDate} />
              <span>至</span>
              <DatePicker date={endDate} setDate={setEndDate} />
            </>
          )}
          
          <Button>更新分析</Button>
        </div>
      </div>
      
      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-muted-foreground">{metric.title}</h4>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-bold">¥{metric.current.toLocaleString()}</span>
                <div className={`flex items-center text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.trend === "up" ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  <span>{metric.trendValue}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>进度</span>
                  <span>{metric.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      metric.percentage >= 100 
                        ? "bg-green-600" 
                        : metric.percentage >= 70 
                          ? "bg-blue-600" 
                          : metric.percentage >= 50 
                            ? "bg-amber-500" 
                            : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  目标: ¥{metric.target.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Chart Selection */}
      <Tabs defaultValue="financials" className="space-y-4">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="financials" className="flex items-center gap-1">
            <BarChartIcon className="h-4 w-4" />
            财务分析
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-1">
            <PieChartIcon className="h-4 w-4" />
            科室分析
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex items-center gap-1">
            <LineChartIcon className="h-4 w-4" />
            医保分析
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="financials" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>收入、支出和利润趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueByMonthData}
                      margin={{
                        top: 20,
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
                      <Bar dataKey="revenue" name="收入" fill="#8884d8" />
                      <Bar dataKey="expenses" name="支出" fill="#82ca9d" />
                      <Bar dataKey="profit" name="利润" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>支出细分</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseBreakdownData.map((entry, index) => (
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
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>患者类型收入分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={patientTypeData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                    <Bar dataKey="value" name="金额" fill="#8884d8">
                      {patientTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>各科室收入趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={departmentTrendData}
                    margin={{
                      top: 20,
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
                    <Line type="monotone" dataKey="内科" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="外科" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="儿科" stroke="#ffc658" />
                    <Line type="monotone" dataKey="妇产科" stroke="#ff7300" />
                    <Line type="monotone" dataKey="眼科" stroke="#0088FE" />
                    <Line type="monotone" dataKey="其他" stroke="#00C49F" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(departmentTrendData[6])
              .filter(key => key !== "name")
              .map((dept, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{dept}</h4>
                    <p className="text-2xl font-bold mt-1">
                      ¥{(departmentTrendData[6][dept as keyof typeof departmentTrendData[6]] as number).toLocaleString()}
                    </p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>
                        较上月增长 
                        {Math.round(((departmentTrendData[6][dept as keyof typeof departmentTrendData[6]] as number) / 
                        (departmentTrendData[5][dept as keyof typeof departmentTrendData[5]] as number) - 1) * 100)}%
                      </span>
                    </div>
                    
                    <div className="mt-2 h-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={departmentTrendData}>
                          <Area 
                            type="monotone" 
                            dataKey={dept} 
                            stroke={COLORS[index % COLORS.length]} 
                            fill={COLORS[index % COLORS.length]} 
                            fillOpacity={0.3} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>医保与自费支付比较</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={insuranceComparisonData}
                    margin={{
                      top: 20,
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
                    <Area 
                      type="monotone" 
                      dataKey="医保支付" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="自费支付" 
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground">医保结算金额</h4>
                <p className="text-2xl font-bold mt-1">¥428,950</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>较上月增长 7.2%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  占总收入的 62.9%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground">自费支付金额</h4>
                <p className="text-2xl font-bold mt-1">¥253,500</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>较上月增长 1.4%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  占总收入的 37.1%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground">医保结算率</h4>
                <p className="text-2xl font-bold mt-1">94.8%</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>较上月提高 2.3%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  目标完成率: 95%
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
