
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import PatientRecordsHeader from "@/components/doctor/PatientRecordsHeader";
import PatientRecordsActions from "@/components/doctor/PatientRecordsActions";
import RecordsTabContent from "@/components/doctor/RecordsTabContent";
import PrescriptionsTabContent from "@/components/doctor/PrescriptionsTabContent";
import PatientDialogs from "@/components/doctor/PatientDialogs";
import { usePatientRecords } from "@/hooks/usePatientRecords";

const PatientRecords = () => {
  const {
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
  } = usePatientRecords();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PatientRecordsHeader 
            title="病历查询/处方管理"
            description="管理患者病历并开具电子处方"
          />
          <PatientRecordsActions
            onViewCurrentPatient={handleViewCurrentPatient}
            onAddMedicalRecord={handleAddMedicalRecord}
          />
        </div>

        <Tabs defaultValue="records" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records">患者病历</TabsTrigger>
            <TabsTrigger value="prescriptions">处方管理</TabsTrigger>
          </TabsList>

          {/* 患者病历选项卡 */}
          <TabsContent value="records" className="mt-6">
            <RecordsTabContent 
              filters={filters}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              doctors={mockDoctors}
              patients={filteredPatients}
              onStatusChange={handleStatusChange}
              onViewInsurance={handleViewInsurance}
              onViewIdCard={handleViewIdCard}
              onViewGeneticReport={handleViewGeneticReport}
              onGotoDepartmentQueue={handleGotoDepartmentQueue}
              onViewPrescription={handleViewPrescription}
              onCreatePrescription={handleCreatePrescription}
            />
          </TabsContent>

          {/* 处方管理选项卡 */}
          <TabsContent value="prescriptions" className="mt-6">
            <PrescriptionsTabContent 
              filters={filters}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              doctors={mockDoctors}
              patients={filteredPatients}
              onViewIdCard={handleViewIdCard}
              onViewPrescription={handleViewPrescription}
              onCreatePrescription={handleCreatePrescription}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* 弹窗组件 */}
      <PatientDialogs 
        currentPatient={currentPatient}
        showingMedicalInsurance={showingMedicalInsurance}
        setShowingMedicalInsurance={setShowingMedicalInsurance}
        idCardPreview={idCardPreview}
        setIdCardPreview={setIdCardPreview}
        geneticReport={geneticReport}
        setGeneticReport={setGeneticReport}
        showPrescriptionDialog={showPrescriptionDialog}
        setShowPrescriptionDialog={setShowPrescriptionDialog}
      />
    </MainLayout>
  );
};

export default PatientRecords;
