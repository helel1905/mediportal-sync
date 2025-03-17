
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadCloud, Printer, FileSpreadsheet, Eye } from "lucide-react";
import { format } from "date-fns";
import { ReportFinancialSummary } from "@/components/finance/reports/ReportFinancialSummary";
import { ReportCharts } from "@/components/finance/reports/ReportCharts";
import { ReportDetails } from "@/components/finance/reports/ReportDetails";

interface ReportPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  reportType: string;
  startDate: Date | null;
  endDate: Date | null;
}

export const ReportPreviewDialog: React.FC<ReportPreviewDialogProps> = ({
  open,
  onClose,
  reportType,
  startDate,
  endDate,
}) => {
  const getReportTitle = () => {
    switch (reportType) {
      case "daily": return "日财务报表";
      case "weekly": return "周财务报表";
      case "monthly": return "月财务报表";
      case "quarterly": return "季度财务报表";
      case "yearly": return "年度财务报表";
      case "custom": return "自定义财务报表";
      default: return "财务报表";
    }
  };

  const getDateRangeText = () => {
    if (reportType === "custom" && startDate && endDate) {
      return `${format(startDate, "yyyy-MM-dd")} 至 ${format(endDate, "yyyy-MM-dd")}`;
    }
    
    const today = new Date();
    
    switch (reportType) {
      case "daily":
        return format(today, "yyyy-MM-dd");
      case "weekly":
        // This is simplified - a proper implementation would calculate the week start/end
        return `本周报表`;
      case "monthly":
        return `${format(today, "yyyy-MM")}`;
      case "quarterly":
        // This is simplified - a proper implementation would calculate the quarter
        return `本季度报表`;
      case "yearly":
        return `${format(today, "yyyy")}年度`;
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{getReportTitle()} - 预览</DialogTitle>
          <DialogDescription>
            {getDateRangeText()} - 生成时间: {format(new Date(), "yyyy-MM-dd HH:mm:ss")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              打印
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <DownloadCloud className="h-4 w-4" />
              下载
            </Button>
          </div>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">财务摘要</TabsTrigger>
              <TabsTrigger value="charts">图表分析</TabsTrigger>
              <TabsTrigger value="details">明细数据</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="p-4 border rounded-md mt-2">
              <ReportFinancialSummary reportType={reportType} />
            </TabsContent>
            
            <TabsContent value="charts" className="p-4 border rounded-md mt-2">
              <ReportCharts reportType={reportType} />
            </TabsContent>
            
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <ReportDetails reportType={reportType} />
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
          <Button className="flex items-center gap-1">
            <FileSpreadsheet className="h-4 w-4" />
            导出报表
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
