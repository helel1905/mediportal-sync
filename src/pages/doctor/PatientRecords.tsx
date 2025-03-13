
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, FilePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import refactored components and hooks
import PatientFilters from "@/components/doctor/PatientFilters";
import PatientRecordTable from "@/components/doctor/PatientRecordTable";
import PrescriptionTable from "@/components/doctor/PrescriptionTable";
import PatientDialogs from "@/components/doctor/PatientDialogs";
import { usePatientFilter } from "@/hooks/usePatientFilter";
import { usePatientData } from "@/hooks/usePatientData";

const PatientRecords = () => {
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">病历查询/处方管理</h1>
            <p className="text-muted-foreground mt-1">管理患者病历并开具电子处方</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleViewCurrentPatient}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Bell className="h-4 w-4" />
              当前叫号
            </Button>
            <Button className="flex items-center gap-2">
              <FilePlus className="h-4 w-4" />
              添加病历
            </Button>
          </div>
        </div>

        <Tabs defaultValue="records" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records">患者病历</TabsTrigger>
            <TabsTrigger value="prescriptions">处方管理</TabsTrigger>
          </TabsList>

          {/* 患者病历选项卡 */}
          <TabsContent value="records" className="mt-6">
            {/* 筛选区域 */}
            <PatientFilters 
              filters={filters}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              doctors={mockDoctors}
              showPrescriptionFilter={false}
            />

            {/* 患者记录表格 */}
            <PatientRecordTable 
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
            {/* 筛选区域 */}
            <PatientFilters 
              filters={filters}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              doctors={mockDoctors}
              showPrescriptionFilter={true}
            />

            {/* 处方表格 */}
            <PrescriptionTable 
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
