import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/finance/reports/DatePicker";
import { DownloadCloud, FileText, FileSpreadsheet, File } from "lucide-react";
import { ReportPreviewDialog } from "@/components/finance/reports/ReportPreviewDialog";

export const ReportGeneratorPanel: React.FC = () => {
  const [reportType, setReportType] = useState("daily");
  const [exportFormat, setExportFormat] = useState("excel");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTrends, setIncludeTrends] = useState(true);
  
  const departmentOptions = [
    { id: "all", label: "全部科室" },
    { id: "internal", label: "内科" },
    { id: "surgery", label: "外科" },
    { id: "pediatric", label: "儿科" },
    { id: "gynecology", label: "妇产科" },
    { id: "ophthalmology", label: "眼科" },
    { id: "pharmacy", label: "药房" }
  ];

  const handleGenerateReport = () => {
    setIsPreviewOpen(true);
  };

  const handleDepartmentChange = (checked: boolean | "indeterminate", id: string) => {
    if (checked) {
      if (id === "all") {
        setSelectedDepartments(departmentOptions.map(dept => dept.id));
      } else {
        setSelectedDepartments(prev => [...prev, id]);
      }
    } else {
      if (id === "all") {
        setSelectedDepartments([]);
      } else {
        setSelectedDepartments(prev => prev.filter(item => item !== id));
      }
    }
  };

  const getExportFormatIcon = () => {
    switch (exportFormat) {
      case "excel": return <FileSpreadsheet className="h-4 w-4" />;
      case "pdf": return <File className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>创建财务报表</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-type">报表类型</Label>
              <RadioGroup
                id="report-type"
                value={reportType}
                onValueChange={setReportType}
                className="flex flex-col space-y-1 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">日报表</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">周报表</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">月报表</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quarterly" id="quarterly" />
                  <Label htmlFor="quarterly">季度报表</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly">年度报表</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">自定义时间范围</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>开始日期</Label>
                <DatePicker 
                  date={startDate} 
                  setDate={setStartDate} 
                  disabled={reportType !== "custom"}
                />
              </div>
              <div className="space-y-2">
                <Label>结束日期</Label>
                <DatePicker 
                  date={endDate} 
                  setDate={setEndDate} 
                  disabled={reportType !== "custom"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>科室选择</Label>
              <div className="grid grid-cols-2 mt-2 gap-y-2">
                {departmentOptions.map((dept) => (
                  <div key={dept.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`dept-${dept.id}`}
                      checked={selectedDepartments.includes(dept.id)}
                      onCheckedChange={(checked) => handleDepartmentChange(checked, dept.id)}
                    />
                    <Label htmlFor={`dept-${dept.id}`}>{dept.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-format">导出格式</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="选择导出格式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>报表内容</Label>
              <div className="flex flex-col space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-charts" 
                    checked={includeCharts} 
                    onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                  />
                  <Label htmlFor="include-charts">包含图表和图形</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-trends" 
                    checked={includeTrends} 
                    onCheckedChange={(checked) => setIncludeTrends(checked === true)}
                  />
                  <Label htmlFor="include-trends">包含趋势分析</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>报表设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="report-name">报表名称</Label>
              <Input id="report-name" placeholder="输入报表名称" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-desc">报表描述 (可选)</Label>
              <Input id="report-desc" placeholder="输入报表描述" />
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full" 
              onClick={handleGenerateReport}
            >
              预览报表
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
            >
              {getExportFormatIcon()}
              下载报表
            </Button>

            <Button 
              variant="secondary" 
              className="w-full" 
            >
              存为模板
            </Button>
          </div>
        </CardContent>
      </Card>

      <ReportPreviewDialog 
        open={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        reportType={reportType}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};
