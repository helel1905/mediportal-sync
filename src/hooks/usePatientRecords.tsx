
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

  // Add mock medical record data to patients
  const patientsWithMedicalRecords = filteredPatients.map(patient => ({
    ...patient,
    medicalRecord: {
      chiefComplaint: patient.id.includes("3") ? "咳嗽、胸闷两周" : "头痛、发热三天",
      presentIllness: patient.id.includes("3") 
        ? "患者两周前无明显诱因出现咳嗽，以干咳为主，伴有胸闷不适，无明显咳痰，无胸痛。近日症状有所加重，夜间咳嗽明显影响睡眠。"
        : "患者三天前无明显诱因出现头痛，伴发热，体温最高达38.5℃，有畏寒、乏力、肌肉酸痛等症状。自服布洛芬后体温一度下降，但数小时后又升高。",
      pastHistory: patient.isSenior 
        ? "有高血压病史10年，长期服用降压药物，血压控制良好。2型糖尿病史5年，口服二甲双胍治疗。左膝关节置换术史。" 
        : "否认高血压、糖尿病等慢性病史，无手术外伤史，无药物过敏史。",
      personalHistory: patient.gender === "male" 
        ? "有吸烟史20年，每日约1包，饮酒偶尔。" 
        : "无烟酒嗜好，起居规律。",
      familyHistory: patient.isSenior 
        ? "父亲有冠心病史，母亲有2型糖尿病。" 
        : "父母健在，否认家族遗传病史。",
      physicalExamination: patient.id.includes("3")
        ? "体温36.7℃，脉搏78次/分，呼吸22次/分，血压135/85mmHg。神志清楚，全身皮肤粘膜无黄染，浅表淋巴结未触及肿大。肺部听诊呼吸音粗，可闻及散在干啰音。心律齐，心音正常，无杂音。腹软，无压痛。"
        : "体温38.2℃，脉搏92次/分，呼吸20次/分，血压128/85mmHg。神志清楚，精神稍差，全身皮肤粘膜无黄染，浅表淋巴结未触及肿大。头颅无畸形，眼睑无水肿，巩膜无黄染，瞳孔等大同圆，对光反射灵敏。咽部粘膜充血，双侧扁桃体Ⅱ度肿大。",
      auxiliaryExamination: patient.id.includes("3")
        ? "血常规：WBC 7.5×10^9/L，NEU% 65.6%，LYM% 25.2%，RBC 4.6×10^12/L，HGB 140g/L，PLT 230×10^9/L。\n胸部CT：双肺纹理增粗，左下肺见小片状模糊影。"
        : "血常规：WBC 10.5×10^9/L，NEU% 75.6%，LYM% 18.2%，RBC 4.56×10^12/L，HGB 135g/L，PLT 245×10^9/L。\nC反应蛋白：15mg/L。",
      diagnosis: patient.id.includes("3") ? "支气管炎" : "上呼吸道感染",
      treatmentPlan: patient.id.includes("3")
        ? "1. 抗感染治疗：阿奇霉素片，0.5g，每日1次，口服，共3天；\n2. 化痰止咳：氨溴索口服液，10ml，每日3次，口服，共7天；\n3. 多饮水，注意休息，避免接触刺激性气体；\n4. 如症状无改善，一周后复诊。"
        : "1. 对症治疗：布洛芬缓释胶囊，0.3g，每日2次，口服，共3天；\n2. 抗感染治疗：阿莫西林胶囊，0.5g，每日3次，口服，共5天；\n3. 多饮水，休息，清淡饮食；\n4. 如症状加重，及时复诊。",
    }
  }));

  // View current patient in treatment
  const handleViewCurrentPatient = () => {
    const currentPatient = patientsWithMedicalRecords.find(p => p.status === "in-treatment");
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
    filteredPatients: patientsWithMedicalRecords,
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
