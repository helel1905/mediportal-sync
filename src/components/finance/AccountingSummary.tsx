
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, AlertCircle, CheckCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  iconColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
  iconColor = "text-primary",
}) => (
  <Card>
    <CardContent className="flex flex-row items-center justify-between p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p
            className={cn(
              "text-xs",
              changeType === "increase" && "text-green-600",
              changeType === "decrease" && "text-red-600",
              changeType === "neutral" && "text-muted-foreground"
            )}
          >
            {change}
          </p>
        )}
      </div>
      <div className={cn("h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center", iconColor)}>
        {icon}
      </div>
    </CardContent>
  </Card>
);

interface AccountingSummaryProps {
  data: {
    totalAmount: number;
    reconciled: number;
    unreconciled: number;
    exceptions: number;
    insurancePending: number;
  };
}

export const AccountingSummary: React.FC<AccountingSummaryProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <SummaryCard
        title="总收费金额"
        value={`¥${data.totalAmount.toLocaleString()}`}
        icon={<CircleDollarSign className="h-6 w-6" />}
        change="本月累计"
        iconColor="text-primary"
      />
      
      <SummaryCard
        title="已对账金额"
        value={`¥${data.reconciled.toLocaleString()}`}
        icon={<CheckCircle className="h-6 w-6" />}
        change={`${Math.round((data.reconciled / data.totalAmount) * 100)}% 的总额`}
        changeType="increase"
        iconColor="text-green-600"
      />
      
      <SummaryCard
        title="未对账金额"
        value={`¥${data.unreconciled.toLocaleString()}`}
        icon={<AlertCircle className="h-6 w-6" />}
        change={`${Math.round((data.unreconciled / data.totalAmount) * 100)}% 的总额`}
        changeType="neutral"
        iconColor="text-amber-500"
      />
      
      <SummaryCard
        title="存在异常"
        value={`¥${data.exceptions.toLocaleString()}`}
        icon={<AlertCircle className="h-6 w-6" />}
        change={`${data.exceptions > 0 ? '需要处理' : '无异常'}`}
        changeType={data.exceptions > 0 ? "decrease" : "increase"}
        iconColor="text-red-600"
      />
      
      <SummaryCard
        title="医保待结算"
        value={`¥${data.insurancePending.toLocaleString()}`}
        icon={<CreditCard className="h-6 w-6" />}
        change="待提交"
        changeType="neutral"
        iconColor="text-blue-500"
      />
    </div>
  );
};
