
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Pill, 
  AlertTriangle, 
  ClipboardList, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp,
  BarChart 
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const inventoryData = [
  { category: "抗生素", inStock: 120, nearExpiry: 15, outOfStock: 3 },
  { category: "心血管", inStock: 85, nearExpiry: 8, outOfStock: 1 },
  { category: "胃肠", inStock: 65, nearExpiry: 10, outOfStock: 2 },
  { category: "抗炎", inStock: 100, nearExpiry: 5, outOfStock: 0 },
  { category: "止痛", inStock: 45, nearExpiry: 3, outOfStock: 4 },
  { category: "维生素", inStock: 130, nearExpiry: 20, outOfStock: 0 },
];

const pendingPrescriptions = [
  { id: "RX2023-1085", patient: "王明", doctor: "张医生", time: "10:15", urgent: true },
  { id: "RX2023-1086", patient: "李华", doctor: "陈医生", time: "10:30", urgent: false },
  { id: "RX2023-1087", patient: "赵伟", doctor: "张医生", time: "11:45", urgent: false },
  { id: "RX2023-1088", patient: "陈静", doctor: "李医生", time: "13:20", urgent: true },
];

const lowStockMeds = [
  { name: "阿莫西林胶囊", current: 25, min: 50, supplier: "国药控股" },
  { name: "氯雷他定片", current: 15, min: 30, supplier: "华润医药" },
  { name: "布洛芬缓释胶囊", current: 12, min: 40, supplier: "国药控股" },
  { name: "辛伐他汀片", current: 8, min: 25, supplier: "上海医药" },
];

const PharmacyDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">药房管理工作台</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <AlertTriangle className="h-4 w-4" />
          <span>库存预警</span>
          <span className="ml-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
            4
          </span>
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">药品库存不足</CardTitle>
            <Pill className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">4</div>
            <p className="text-xs text-muted-foreground">较昨日 <span className="text-red-500">↑1</span></p>
            <Button className="mt-2 w-full" size="sm" variant="destructive">
              查看详情
            </Button>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">近效期药品</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">12</div>
            <p className="text-xs text-muted-foreground">3个月内过期</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="status-badge-warning">1个月内 5</span>
              <span className="status-badge-info">3个月内 7</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待审核处方</CardTitle>
            <ClipboardList className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPrescriptions.length}</div>
            <p className="text-xs text-muted-foreground">今日新增</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="status-badge-error">紧急 2</span>
              <span className="status-badge-info">普通 2</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Prescriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>药品库存分类统计</CardTitle>
            <Button variant="outline" size="sm" className="gap-1">
              <BarChart className="h-4 w-4" />
              详细报表
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={inventoryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inStock" name="正常库存" fill="#3a75ff" />
                  <Bar dataKey="nearExpiry" name="近效期" fill="#ffb547" />
                  <Bar dataKey="outOfStock" name="缺货" fill="#ff4d4f" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>待审核处方</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              全部处方
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        prescription.urgent ? "bg-red-100" : "bg-blue-100"
                      )}
                    >
                      <ClipboardList className={cn(
                        "h-5 w-5",
                        prescription.urgent ? "text-red-600" : "text-blue-600"
                      )} />
                    </div>
                    <div>
                      <p className="font-medium">{prescription.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {prescription.patient} | {prescription.doctor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {prescription.urgent && (
                      <span className="status-badge-error">紧急</span>
                    )}
                    <span className="text-sm text-muted-foreground">{prescription.time}</span>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Meds */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>库存不足药品</CardTitle>
          <Button variant="outline" size="sm">采购请求</Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-3 font-medium">药品名称</th>
                  <th className="p-3 font-medium">当前库存</th>
                  <th className="p-3 font-medium">最低库存</th>
                  <th className="p-3 font-medium">库存状态</th>
                  <th className="p-3 font-medium">供应商</th>
                  <th className="p-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {lowStockMeds.map((med, i) => (
                  <tr key={i} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                    <td className="p-3 font-medium">{med.name}</td>
                    <td className="p-3 text-red-500">{med.current}</td>
                    <td className="p-3">{med.min}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full max-w-24 rounded-full bg-gray-100">
                          <div 
                            className="h-full rounded-full bg-red-500" 
                            style={{ width: `${(med.current / med.min) * 100}%` }} 
                          />
                        </div>
                        <span className="text-xs text-red-500">{Math.round((med.current / med.min) * 100)}%</span>
                      </div>
                    </td>
                    <td className="p-3">{med.supplier}</td>
                    <td className="p-3">
                      <Button size="sm" variant="outline">补货</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyDashboard;
