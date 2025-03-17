
import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadCloud, History, Calendar } from "lucide-react";

export const ReportsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">财务报表</h1>
        <p className="text-muted-foreground mt-1">生成和分析各种财务数据报表</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <History className="h-4 w-4" />
          历史报表
        </Button>
        <Button variant="default" size="sm" className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          设置报表计划
        </Button>
      </div>
    </div>
  );
};
