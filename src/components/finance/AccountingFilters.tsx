
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AccountingFiltersProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  department: string;
  setDepartment: (department: string) => void;
  paymentType: string;
  setPaymentType: (type: string) => void;
  reconciliationStatus: string;
  setReconciliationStatus: (status: string) => void;
}

export const AccountingFilters: React.FC<AccountingFiltersProps> = ({
  dateRange,
  setDateRange,
  department,
  setDepartment,
  paymentType,
  setPaymentType,
  reconciliationStatus,
  setReconciliationStatus,
}) => {
  const departments = [
    { value: "all", label: "全部科室" },
    { value: "internal-medicine", label: "内科" },
    { value: "surgery", label: "外科" },
    { value: "pediatrics", label: "儿科" },
    { value: "obstetrics", label: "妇产科" },
    { value: "ophthalmology", label: "眼科" },
  ];

  const paymentTypes = [
    { value: "all", label: "全部支付方式" },
    { value: "cash", label: "现金" },
    { value: "insurance", label: "医保" },
    { value: "alipay", label: "支付宝" },
    { value: "wechat", label: "微信" },
    { value: "credit-card", label: "信用卡" },
  ];

  const statusOptions = [
    { value: "all", label: "全部状态" },
    { value: "reconciled", label: "已对账" },
    { value: "unreconciled", label: "未对账" },
    { value: "exception", label: "异常" },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date Range Picker */}
          <div className="space-y-2">
            <Label htmlFor="date-range">日期范围</Label>
            <div className="flex">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "yyyy-MM-dd")} 至{" "}
                          {format(dateRange.to, "yyyy-MM-dd")}
                        </>
                      ) : (
                        format(dateRange.from, "yyyy-MM-dd")
                      )
                    ) : (
                      "选择日期范围"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={(selectedRange: any) => setDateRange(selectedRange)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Department Filter */}
          <div className="space-y-2">
            <Label htmlFor="department">科室</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="选择科室" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="payment-type">支付方式</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger id="payment-type">
                <SelectValue placeholder="选择支付方式" />
              </SelectTrigger>
              <SelectContent>
                {paymentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reconciliation Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status">对账状态</Label>
            <Select 
              value={reconciliationStatus} 
              onValueChange={setReconciliationStatus}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Invoice Number Search */}
          <div className="space-y-2">
            <Label htmlFor="invoice">单号搜索</Label>
            <Input 
              id="invoice" 
              placeholder="输入单号查询"
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
