
import React from "react";
import PatientFilters from "@/components/doctor/PatientFilters";
import PrescriptionTable from "@/components/doctor/PrescriptionTable";
import { PatientFilterState } from "@/hooks/usePatientFilter";

interface PrescriptionsTabContentProps {
  filters: PatientFilterState;
  onFilterChange: <K extends keyof PatientFilterState>(
    key: K,
    value: PatientFilterState[K]
  ) => void;
  onResetFilters: () => void;
  doctors: any[];
  patients: any[];
  onViewIdCard: (patient: any) => void;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
}

const PrescriptionsTabContent: React.FC<PrescriptionsTabContentProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  doctors,
  patients,
  onViewIdCard,
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
        showPrescriptionFilter={true}
      />

      {/* 处方表格 */}
      <PrescriptionTable 
        patients={patients}
        onViewIdCard={onViewIdCard}
        onViewPrescription={onViewPrescription}
        onCreatePrescription={onCreatePrescription}
      />
    </div>
  );
};

export default PrescriptionsTabContent;
