
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { InsuranceSettlementFilters } from "@/hooks/useInsuranceSettlementData";

interface InsuranceFiltersProps {
  filters: InsuranceSettlementFilters;
  onFilterChange: (filterKey: keyof InsuranceSettlementFilters, value: any) => void;
  onResetFilters: () => void;
  filterOptions: {
    departments: string[];
    insuranceTypes: string[];
    statuses: string[];
  };
}

const InsuranceFilters: React.FC<InsuranceFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  filterOptions,
}) => {
  const statusLabels: Record<string, string> = {
    pending: "待处理",
    processing: "处理中",
    approved: "已批准",
    rejected: "已拒绝",
    completed: "已完成",
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    
    onFilterChange("status", newStatuses);
  };

  const handleInsuranceTypeChange = (type: string) => {
    const newTypes = filters.insuranceType.includes(type)
      ? filters.insuranceType.filter((t) => t !== type)
      : [...filters.insuranceType, type];
    
    onFilterChange("insuranceType", newTypes);
  };

  const handleDepartmentChange = (department: string) => {
    const newDepartments = filters.department.includes(department)
      ? filters.department.filter((d) => d !== department)
      : [...filters.department, department];
    
    onFilterChange("department", newDepartments);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索患者姓名、ID、医保号..."
            className="pl-8"
            value={filters.searchText}
            onChange={(e) => onFilterChange("searchText", e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={onResetFilters}>
          重置筛选
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="text-sm font-medium">状态:</div>
        {filterOptions.statuses.map((status) => (
          <Badge
            key={status}
            variant="outline"
            className={cn(
              "cursor-pointer hover:opacity-80",
              filters.status.includes(status) ? statusColors[status] : ""
            )}
            onClick={() => handleStatusToggle(status)}
          >
            {statusLabels[status]}
            {filters.status.includes(status) && " ✓"}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>日期范围</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.dateRange.from && "text-muted-foreground"
                  )}
                >
                  {filters.dateRange.from ? (
                    format(filters.dateRange.from, "yyyy-MM-dd")
                  ) : (
                    "开始日期"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.from || undefined}
                  onSelect={(date) =>
                    onFilterChange("dateRange", {
                      ...filters.dateRange,
                      from: date,
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.dateRange.to && "text-muted-foreground"
                  )}
                >
                  {filters.dateRange.to ? (
                    format(filters.dateRange.to, "yyyy-MM-dd")
                  ) : (
                    "结束日期"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.to || undefined}
                  onSelect={(date) =>
                    onFilterChange("dateRange", {
                      ...filters.dateRange,
                      to: date,
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label>医保类型</Label>
          <Select
            value=""
            onValueChange={(value) => handleInsuranceTypeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择医保类型" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.insuranceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type} {filters.insuranceType.includes(type) && "✓"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.insuranceType.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.insuranceType.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleInsuranceTypeChange(type)}
                >
                  {type} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>科室</Label>
          <Select
            value=""
            onValueChange={(value) => handleDepartmentChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择科室" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department} {filters.department.includes(department) && "✓"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.department.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.department.map((department) => (
                <Badge
                  key={department}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleDepartmentChange(department)}
                >
                  {department} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceFilters;
