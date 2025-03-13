
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PrescriptionStatus } from "@/types/pharmacy";

export type PatientFilterState = {
  searchTerm: string;
  departmentFilter: string;
  doctorFilter: string;
  statusFilter: string;
  prescriptionFilter: "all" | "withPrescription" | "withoutPrescription";
};

export const usePatientFilter = () => {
  const { user } = useAuth();
  
  // Initialize filters with defaults (doctor filter defaults to current doctor if user is a doctor)
  const [filters, setFilters] = useState<PatientFilterState>({
    searchTerm: "",
    departmentFilter: "all",
    doctorFilter: user?.role === "doctor" ? user.name : "all",
    statusFilter: "all",
    prescriptionFilter: "all",
  });

  // Set individual filter
  const setFilter = <K extends keyof PatientFilterState>(
    key: K,
    value: PatientFilterState[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset filters to default
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      departmentFilter: "all",
      statusFilter: "all",
      prescriptionFilter: "all",
      // If current user is a doctor, reset to current doctor, otherwise reset to all
      doctorFilter: user?.role === "doctor" ? user.name : "all",
    });
  };

  return {
    filters,
    setFilter,
    resetFilters,
  };
};
