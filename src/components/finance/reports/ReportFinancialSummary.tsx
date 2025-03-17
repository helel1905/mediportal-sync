
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Users, ShoppingCart } from "lucide-react";

interface ReportFinancialSummaryProps {
  reportType: string;
}

export const ReportFinancialSummary: React.FC<ReportFinancialSummaryProps> = ({ reportType }) => {
  // Mock data - in a real app, this would come from API calls
  const financialData = {
    totalRevenue: 682450.75,
    totalExpenses: 412680.30,
    netIncome: 269770.45,
    insuranceClaims: 428950.50,
    patientPayments: 253500.25,
    revenueByDepartment: [
      { name: "内科", amount: 158600.50, change: 12.3 },
      { name: "外科", amount: 142300.75, change: 8.7 },
      { name: "儿科", amount: 78200.25, change: -5.2 },
      { name: "妇产科", amount: 95600.50, change: 15.1 },
      { name: "眼科", amount: 52800.75, change: 3.8 },
      { name: "其他", amount: 154948.00, change: 6.4 },
    ],
    expenseCategories: [
      { name: "人力资源", amount: 215600.20, percentage: 52.2 },
      { name: "药品采购", amount: 98760.50, percentage: 23.9 },
      { name: "设备维护", amount: 42500.00, percentage: 10.3 },
      { name: "行政管理", amount: 35820.10, percentage: 8.7 },
      { name: "其他支出", amount: 20000.00, percentage: 4.9 },
    ]
  };

  const periodText = reportType === 'daily' ? '今日' : 
                     reportType === 'weekly' ? '本周' : 
                     reportType === 'monthly' ? '本月' :
                     reportType === 'quarterly' ? '本季度' :
                     reportType === 'yearly' ? '今年' : '选定期间';

  const previousPeriodText = reportType === 'daily' ? '昨日' : 
                             reportType === 'weekly' ? '上周' : 
                             reportType === 'monthly' ? '上月' :
                             reportType === 'quarterly' ? '上季度' :
                             reportType === 'yearly' ? '去年' : '上一时段';

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">财务摘要</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">总收入</span>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold mt-1">¥{financialData.totalRevenue.toLocaleString('zh-CN')}</p>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>较{previousPeriodText}增长 8.2%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">总支出</span>
              <ShoppingCart className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold mt-1">¥{financialData.totalExpenses.toLocaleString('zh-CN')}</p>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>较{previousPeriodText}增长 5.4%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">净收入</span>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold mt-1">¥{financialData.netIncome.toLocaleString('zh-CN')}</p>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>较{previousPeriodText}增长 12.8%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">收入来源</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-blue-500 mr-2" />
                  <span>医保报销</span>
                </div>
                <span className="font-medium">¥{financialData.insuranceClaims.toLocaleString('zh-CN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-purple-500 mr-2" />
                  <span>患者自付</span>
                </div>
                <span className="font-medium">¥{financialData.patientPayments.toLocaleString('zh-CN')}</span>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <h4 className="font-medium mb-3">科室收入分布</h4>
            <div className="space-y-3">
              {financialData.revenueByDepartment.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">¥{dept.amount.toLocaleString('zh-CN')}</span>
                    <div className={`flex items-center text-xs ${dept.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dept.change >= 0 ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      <span>{Math.abs(dept.change)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">支出分类</h4>
            <div className="space-y-4">
              {financialData.expenseCategories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">¥{category.amount.toLocaleString('zh-CN')}</span>
                      <span className="text-xs text-muted-foreground">{category.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-3" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">总支出</span>
                <span className="font-bold">¥{financialData.totalExpenses.toLocaleString('zh-CN')}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {periodText}支出占总收入的{Math.round((financialData.totalExpenses / financialData.totalRevenue) * 100)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
