
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePatientFilter } from "@/hooks/usePatientFilter";
import { usePatientData } from "@/hooks/usePatientData";

export const usePatientRecords = () => {
  const { toast } = useToast();
  const { filters, setFilter, resetFilters } = usePatientFilter();
  const { mockDoctors, currentPatient, setCurrentPatient, getFilteredPatients } = usePatientData();
  
  const [activeTab, setActiveTab] = useState<string>("records");
  const [showingMedicalInsurance, setShowingMedicalInsurance] = useState(false);
  const [idCardPreview, setIdCardPreview] = useState(false);
  const [geneticReport, setGeneticReport] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);

  // Get filtered patients based on current filters
  const filteredPatients = getFilteredPatients(filters);

  // View current patient in treatment
  const handleViewCurrentPatient = () => {
    const currentPatient = filteredPatients.find(p => p.status === "in-treatment");
    if (currentPatient) {
      setCurrentPatient(currentPatient);
      toast({
        title: "当前就诊患者",
        description: `${currentPatient.name}，${currentPatient.department}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "没有正在就诊的患者",
        description: "当前没有患者正在接受诊断",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Change patient status
  const handleStatusChange = (patientId: string, newStatus: string) => {
    toast({
      title: "状态已更新",
      description: `患者 ${patientId} 状态已更改为 ${
        newStatus === "waiting"
          ? "候诊"
          : newStatus === "in-treatment"
          ? "诊中"
          : "完成"
      }`,
      duration: 3000,
    });
  };

  // View medical insurance information
  const handleViewInsurance = (patient: any) => {
    setCurrentPatient(patient);
    setShowingMedicalInsurance(true);
  };

  // View ID card
  const handleViewIdCard = (patient: any) => {
    setCurrentPatient(patient);
    setIdCardPreview(true);
  };

  // View genetic report
  const handleViewGeneticReport = (patient: any) => {
    setCurrentPatient(patient);
    setGeneticReport(true);
  };

  // Go to department queue
  const handleGotoDepartmentQueue = (department: string) => {
    toast({
      title: "即将跳转",
      description: `跳转到${department}候诊队列`,
      duration: 3000,
    });
  };

  // View prescription
  const handleViewPrescription = (patient: any) => {
    setCurrentPatient(patient);
    setShowPrescriptionDialog(true);
  };

  // Create new prescription
  const handleCreatePrescription = (patient: any) => {
    setCurrentPatient(patient);
    toast({
      title: "创建新处方",
      description: `为患者 ${patient.name} 创建新处方`,
      duration: 3000,
    });
  };

  // Add medical record (placeholder for now)
  const handleAddMedicalRecord = () => {
    toast({
      title: "添加病历",
      description: "即将打开添加病历表单",
      duration: 3000,
    });
  };

  return {
    activeTab,
    setActiveTab,
    filters,
    setFilter,
    resetFilters,
    mockDoctors,
    filteredPatients,
    currentPatient,
    showingMedicalInsurance,
    setShowingMedicalInsurance,
    idCardPreview,
    setIdCardPreview,
    geneticReport,
    setGeneticReport,
    showPrescriptionDialog,
    setShowPrescriptionDialog,
    handleViewCurrentPatient,
    handleStatusChange,
    handleViewInsurance,
    handleViewIdCard,
    handleViewGeneticReport,
    handleGotoDepartmentQueue,
    handleViewPrescription,
    handleCreatePrescription,
    handleAddMedicalRecord,
  };
};
