
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, FileBarChart } from "lucide-react";

interface AccountingHeaderProps {
  onExport: () => void;
}

export const AccountingHeader: React.FC<AccountingHeaderProps> = ({ onExport }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">收费对账</h1>
        <p className="text-muted-foreground mt-1">查询、核对和统计医院各项收费记录</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onExport}
        >
          <FileDown className="h-4 w-4" />
          导出报表
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center gap-1"
        >
          <FileBarChart className="h-4 w-4" />
          生成月报
        </Button>
      </div>
    </div>
  );
};
