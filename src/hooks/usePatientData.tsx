
import { useState } from "react";
import { mockPatients, mockDoctors } from "@/components/doctor/PatientMockData";
import { PrescriptionStatus } from "@/types/pharmacy";
import { PatientFilterState } from "./usePatientFilter";

// Helper functions
export const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else {
    return `${diffDays}天前`;
  }
};

export const isOverdue = (date: Date, status: string) => {
  if (status !== "waiting") return false;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  return diffMins > 30; // 超过30分钟未接诊视为超时
};

// Get status priority for sorting
const getStatusPriority = (status: string) => {
  switch (status) {
    case "in-treatment": return 1;
    case "waiting": return 2;
    case "completed": return 3;
    default: return 4;
  }
};

export const usePatientData = () => {
  const [currentPatient, setCurrentPatient] = useState<any>(null);

  // Get filtered patients based on current filters
  const getFilteredPatients = (filters: PatientFilterState) => {
    // First filter by doctor
    let result = mockPatients.filter(patient => 
      filters.doctorFilter === "all" || patient.doctor === filters.doctorFilter
    );
    
    // Apply other filters
    result = result.filter((patient) => {
      const matchesSearch =
        patient.name.includes(filters.searchTerm) ||
        patient.id.includes(filters.searchTerm);
      
      const matchesDepartment =
        filters.departmentFilter === "all" || 
        patient.department.includes(filters.departmentFilter);
      
      const matchesStatus =
        filters.statusFilter === "all" || 
        (filters.statusFilter === "waiting" && patient.status === "waiting") ||
        (filters.statusFilter === "in-treatment" && patient.status === "in-treatment") ||
        (filters.statusFilter === "completed" && patient.status === "completed");
      
      const matchesPrescription = 
        filters.prescriptionFilter === "all" || 
        (filters.prescriptionFilter === "withPrescription" && patient.hasPrescription) ||
        (filters.prescriptionFilter === "withoutPrescription" && !patient.hasPrescription);
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesPrescription;
    });

    // Sort by status: 诊中 > 候诊 > 完成
    result.sort((a, b) => {
      return getStatusPriority(a.status) - getStatusPriority(b.status);
    });
    
    return result;
  };

  // Return data and functions
  return {
    mockDoctors,
    currentPatient,
    setCurrentPatient,
    getFilteredPatients,
  };
};
