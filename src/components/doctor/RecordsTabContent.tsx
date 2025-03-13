
import React from "react";
import PatientFilters from "@/components/doctor/PatientFilters";
import PatientRecordTable from "@/components/doctor/PatientRecordTable";
import { PatientFilterState } from "@/hooks/usePatientFilter";

interface RecordsTabContentProps {
  filters: PatientFilterState;
  onFilterChange: <K extends keyof PatientFilterState>(
    key: K,
    value: PatientFilterState[K]
  ) => void;
  onResetFilters: () => void;
  doctors: any[];
  patients: any[];
  onStatusChange: (patientId: string, newStatus: string) => void;
  onViewInsurance: (patient: any) => void;
  onViewIdCard: (patient: any) => void;
  onViewGeneticReport: (patient: any) => void;
  onGotoDepartmentQueue: (department: string) => void;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
}

const RecordsTabContent: React.FC<RecordsTabContentProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  doctors,
  patients,
  onStatusChange,
  onViewInsurance,
  onViewIdCard,
  onViewGeneticReport,
  onGotoDepartmentQueue,
  onViewPrescription,
  onCreatePrescription,
}) => {
  return (
    <div className="space-y-6">
      {/* 筛选区域 */}
      <PatientFilters 
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        doctors={doctors}
        showPrescriptionFilter={false}
      />

      {/* 患者记录表格 */}
      <PatientRecordTable 
        patients={patients}
        onStatusChange={onStatusChange}
        onViewInsurance={onViewInsurance}
        onViewIdCard={onViewIdCard}
        onViewGeneticReport={onViewGeneticReport}
        onGotoDepartmentQueue={onGotoDepartmentQueue}
        onViewPrescription={onViewPrescription}
        onCreatePrescription={onCreatePrescription}
      />
    </div>
  );
};

export default RecordsTabContent;
