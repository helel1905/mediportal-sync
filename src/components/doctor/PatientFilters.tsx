
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, RotateCcw, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PatientFilterState } from "@/hooks/usePatientFilter";

interface PatientFiltersProps {
  filters: PatientFilterState;
  onFilterChange: <K extends keyof PatientFilterState>(
    key: K,
    value: PatientFilterState[K]
  ) => void;
  onResetFilters: () => void;
  doctors: { name: string; title: string; department: string }[];
  showPrescriptionFilter?: boolean;
}

const PatientFilters: React.FC<PatientFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  doctors,
  showPrescriptionFilter = false,
}) => {
  const { toast } = useToast();

  const handleResetFilters = () => {
    onResetFilters();
    toast({
      title: "筛选已重置",
      description: "所有筛选条件已重置为默认值",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索患者姓名或ID..."
              className="pl-10"
              value={filters.searchTerm}
              onChange={(e) => onFilterChange("searchTerm", e.target.value)}
            />
          </div>

          <Select
            value={filters.departmentFilter}
            onValueChange={(value) => onFilterChange("departmentFilter", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择科室" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有科室</SelectItem>
              <SelectItem value="内科">内科</SelectItem>
              <SelectItem value="外科">外科</SelectItem>
              <SelectItem value="妇产科">妇产科</SelectItem>
              <SelectItem value="儿科">儿科</SelectItem>
              <SelectItem value="精神科">精神科</SelectItem>
              <SelectItem value="耳鼻喉科">耳鼻喉科</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.doctorFilter} 
            onValueChange={(value) => onFilterChange("doctorFilter", value)}
          >
            <SelectTrigger className="flex items-center">
              <Stethoscope className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="选择医生" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有医生</SelectItem>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  {doctor.name} ({doctor.title})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {showPrescriptionFilter ? (
            <Select
              value={filters.prescriptionFilter}
              onValueChange={(value) => 
                onFilterChange("prescriptionFilter", value as "all" | "withPrescription" | "withoutPrescription")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="处方状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有患者</SelectItem>
                <SelectItem value="withPrescription">有处方</SelectItem>
                <SelectItem value="withoutPrescription">无处方</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Select 
              value={filters.statusFilter} 
              onValueChange={(value) => onFilterChange("statusFilter", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="就诊状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有状态</SelectItem>
                <SelectItem value="waiting">候诊</SelectItem>
                <SelectItem value="in-treatment">诊中</SelectItem>
                <SelectItem value="completed">完成</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleResetFilters}
          >
            <RotateCcw className="h-4 w-4" />
            重置筛选
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientFilters;
