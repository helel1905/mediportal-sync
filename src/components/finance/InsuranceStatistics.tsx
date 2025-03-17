
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InsuranceSettlementStats } from "@/types/finance";
import { ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface InsuranceStatisticsProps {
  statistics: InsuranceSettlementStats;
}

const InsuranceStatistics: React.FC<InsuranceStatisticsProps> = ({
  statistics,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">待处理结算</p>
            <h3 className="text-2xl font-bold mt-1">{statistics.pending}</h3>
            <p className="text-xs text-muted-foreground mt-1">总数: {statistics.total}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">处理中结算</p>
            <h3 className="text-2xl font-bold mt-1">{statistics.processing}</h3>
            <div className="flex items-center mt-1 text-xs text-blue-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>医保中心审核</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">已拒绝结算</p>
            <h3 className="text-2xl font-bold mt-1">{statistics.rejected}</h3>
            <div className="flex items-center mt-1 text-xs text-red-600">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>需重新处理</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">已完成结算</p>
            <h3 className="text-2xl font-bold mt-1">{statistics.completed}</h3>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              <span>已报销</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">医保报销总额</p>
            <h3 className="text-2xl font-bold mt-1">¥{statistics.insuranceAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              总费用: ¥{statistics.totalAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceStatistics;
