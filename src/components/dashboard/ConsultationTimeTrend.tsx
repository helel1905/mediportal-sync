
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { calculateTimeTrends, getConsultationStats } from "@/utils/consultationTimeUtils";
import { Hourglass, Clock } from "lucide-react";

const ConsultationTimeTrend = () => {
  const trends = calculateTimeTrends();
  const stats = getConsultationStats();
  
  // Prepare data for the chart by adding colors
  const chartData = trends.map(segment => ({
    ...segment,
    // Adding a color indicator based on efficiency
    efficiencyColor: segment.efficiency > 80 ? "#4ade80" : segment.efficiency > 60 ? "#facc15" : "#f87171"
  }));

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>今日接诊时间分析</CardTitle>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>平均时长: <span className="font-bold">{stats.avgDuration}分钟</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Hourglass className="h-4 w-4 text-muted-foreground" />
            <span>完成率: <span className="font-bold">{stats.completionRate}%</span></span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                label={{ value: '时间段', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis 
                yAxisId="left"
                label={{ value: '平均时长 (分钟)', angle: -90, position: 'insideLeft' }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                domain={[0, 100]}
                label={{ value: '效率评分', angle: 90, position: 'insideRight' }} 
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "avgDuration") return [`${value} 分钟`, "平均接诊时长"];
                  if (name === "efficiency") return [`${value}%`, "效率评分"];
                  if (name === "consultationCount") return [`${value} 位`, "接诊人数"];
                  return [value, name];
                }}
              />
              <Legend 
                payload={[
                  { value: '平均接诊时长', type: 'square', color: '#3a75ff' },
                  { value: '效率评分', type: 'square', color: '#4ade80' },
                  { value: '接诊人数', type: 'square', color: '#f97316' }
                ]}
              />
              <Bar 
                yAxisId="left" 
                dataKey="avgDuration" 
                fill="#3a75ff" 
                name="平均接诊时长"
                barSize={20}
              />
              <Bar 
                yAxisId="right" 
                dataKey="efficiency" 
                fill="#4ade80" 
                name="效率评分"
                barSize={20}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.efficiencyColor} />
                ))}
              </Bar>
              <Bar 
                yAxisId="left" 
                dataKey="consultationCount" 
                fill="#f97316" 
                name="接诊人数"
                barSize={10}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationTimeTrend;
