
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  AlarmClock, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Save, 
  FileText,
  User,
  Package,
  Pill,
  ClipboardList,
  Clock,
  BookOpen,
  BarChartHorizontal,
  Banknote,
  Archive,
  History,
  Bot,
  ShieldAlert,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// 模拟数据 - 患者列表
const mockPatients = [
  {
    id: "P10001",
    name: "王明",
    age: 45,
    gender: "男",
    allergies: ["青霉素", "磺胺类"],
    medicalHistory: ["高血压", "2型糖尿病"],
    insuranceType: "城镇职工医保",
    insuranceCoverage: 0.8,
  },
  {
    id: "P10002",
    name: "李华",
    age: 35,
    gender: "男",
    allergies: [],
    medicalHistory: ["胃炎"],
    insuranceType: "城镇居民医保",
    insuranceCoverage: 0.7,
  },
  {
    id: "P10003",
    name: "张丽",
    age: 28,
    gender: "女",
    allergies: ["红霉素"],
    medicalHistory: ["偏头痛"],
    insuranceType: "自费",
    insuranceCoverage: 0,
  },
  {
    id: "P10004",
    name: "赵伟",
    age: 60,
    gender: "男",
    allergies: ["阿司匹林"],
    medicalHistory: ["冠心病", "高脂血症"],
    insuranceType: "城镇职工医保",
    insuranceCoverage: 0.85,
  },
  {
    id: "P10005",
    name: "刘敏",
    age: 32,
    gender: "女",
    allergies: [],
    medicalHistory: ["贫血"],
    insuranceType: "城镇居民医保",
    insuranceCoverage: 0.7,
  },
];

// 模拟数据 - 药品数据库
const mockMedicines = [
  {
    id: "M001",
    name: "阿莫西林胶囊",
    commonName: "阿莫西林",
    pinyin: "amoxilin",
    specification: "0.25g*24粒/盒",
    formulation: "胶囊",
    price: 15.8,
    unit: "盒",
    stock: 120,
    stockStatus: "充足",
    category: "抗生素",
    isInsurance: true,
    insuranceRate: 0.9,
    interactions: ["青霉素过敏", "四环素"],
    usages: ["口服"],
    company: "国药集团",
  },
  {
    id: "M002",
    name: "布洛芬片",
    commonName: "布洛芬",
    pinyin: "buluofen",
    specification: "0.2g*20片/盒",
    formulation: "片剂",
    price: 8.5,
    unit: "盒",
    stock: 85,
    stockStatus: "充足",
    category: "解热镇痛药",
    isInsurance: true,
    insuranceRate: 1.0,
    interactions: ["阿司匹林过敏"],
    usages: ["口服"],
    company: "上海医药",
  },
  {
    id: "M003",
    name: "苯磺酸氨氯地平片",
    commonName: "氨氯地平",
    pinyin: "anlvdiping",
    specification: "5mg*7片/盒",
    formulation: "片剂",
    price: 28.5,
    unit: "盒",
    stock: 35,
    stockStatus: "较少",
    category: "降压药",
    isInsurance: true,
    insuranceRate: 0.8,
    interactions: [],
    usages: ["口服"],
    company: "辉瑞制药",
  },
  {
    id: "M004",
    name: "甲钴胺片",
    commonName: "甲钴胺",
    pinyin: "jiagugan",
    specification: "0.5mg*20片/盒",
    formulation: "片剂",
    price: 45.2,
    unit: "盒",
    stock: 12,
    stockStatus: "紧缺",
    category: "神经系统用药",
    isInsurance: true,
    insuranceRate: 0.7,
    interactions: [],
    usages: ["口服"],
    company: "卫材制药",
  },
  {
    id: "M005",
    name: "盐酸二甲双胍片",
    commonName: "二甲双胍",
    pinyin: "erjiashuanggu",
    specification: "0.5g*60片/瓶",
    formulation: "片剂",
    price: 25.0,
    unit: "瓶",
    stock: 68,
    stockStatus: "充足",
    category: "降糖药",
    isInsurance: true,
    insuranceRate: 0.95,
    interactions: [],
    usages: ["口服"],
    company: "北京制药",
  },
  {
    id: "M006",
    name: "硝苯地平缓释片",
    commonName: "硝苯地平",
    pinyin: "xiaobending",
    specification: "20mg*30片/盒",
    formulation: "缓释片",
    price: 32.6,
    unit: "盒",
    stock: 42,
    stockStatus: "充足",
    category: "降压药",
    isInsurance: true,
    insuranceRate: 0.85,
    interactions: [],
    usages: ["口服"],
    company: "拜耳医药",
  },
  {
    id: "M007",
    name: "复方感冒灵颗粒",
    commonName: "感冒灵",
    pinyin: "ganmaolin",
    specification: "10g*9袋/盒",
    formulation: "颗粒剂",
    price: 18.5,
    unit: "盒",
    stock: 156,
    stockStatus: "充足",
    category: "感冒药",
    isInsurance: true,
    insuranceRate: 0.6,
    interactions: [],
    usages: ["口服"],
    company: "哈药集团",
  },
];

// 模拟数据 - 处方历史
const mockPrescriptionHistory = [
  {
    id: "RX20230001",
    patientId: "P10001",
    patientName: "王明",
    date: "2023-10-20",
    status: "已完成",
    medicines: [
      {
        id: "M003",
        name: "苯磺酸氨氯地平片",
        dosage: "5mg",
        frequency: "每日1次",
        quantity: 2,
        days: 30,
      },
      {
        id: "M005",
        name: "盐酸二甲双胍片",
        dosage: "0.5g",
        frequency: "每日2次",
        quantity: 4,
        days: 30,
      }
    ],
    doctorName: "张医生",
    totalPrice: 73.5,
    insurancePayment: 58.8,
    selfPayment: 14.7,
  },
  {
    id: "RX20230002",
    patientId: "P10002",
    patientName: "李华",
    date: "2023-10-18",
    status: "已完成",
    medicines: [
      {
        id: "M001",
        name: "阿莫西林胶囊",
        dosage: "0.5g",
        frequency: "每日3次",
        quantity: 6,
        days: 7,
      }
    ],
    doctorName: "张医生",
    totalPrice: 31.6,
    insurancePayment: 22.12,
    selfPayment: 9.48,
  },
  {
    id: "RX20230003",
    patientId: "P10003",
    patientName: "张丽",
    date: "2023-10-15",
    status: "已完成",
    medicines: [
      {
        id: "M002",
        name: "布洛芬片",
        dosage: "0.2g",
        frequency: "每日3次",
        quantity: 3,
        days: 5,
      }
    ],
    doctorName: "李医生",
    totalPrice: 8.5,
    insurancePayment: 0,
    selfPayment: 8.5,
  },
];

// 模拟数据 - 处方模板
const mockPrescriptionTemplates = [
  {
    id: "T001",
    name: "高血压常规处方",
    description: "适用于轻中度高血压患者",
    medicines: [
      {
        id: "M003",
        name: "苯磺酸氨氯地平片",
        dosage: "5mg",
        frequency: "每日1次",
        quantity: 1,
        days: 30,
        usage: "口服"
      },
      {
        id: "M006",
        name: "硝苯地平缓释片",
        dosage: "20mg",
        frequency: "每日1次",
        quantity: 1,
        days: 30,
        usage: "口服"
      }
    ],
    createdBy: "张医生",
    lastUpdated: "2023-09-01",
  },
  {
    id: "T002",
    name: "感冒通用处方",
    description: "适用于普通感冒症状",
    medicines: [
      {
        id: "M007",
        name: "复方感冒灵颗粒",
        dosage: "1袋",
        frequency: "每日3次",
        quantity: 3,
        days: 3,
        usage: "口服"
      },
      {
        id: "M002",
        name: "布洛芬片",
        dosage: "0.2g",
        frequency: "需要时",
        quantity: 1,
        days: 3,
        usage: "口服"
      }
    ],
    createdBy: "李医生",
    lastUpdated: "2023-08-15",
  },
  {
    id: "T003",
    name: "2型糖尿病处方",
    description: "适用于2型糖尿病患者",
    medicines: [
      {
        id: "M005",
        name: "盐酸二甲双胍片",
        dosage: "0.5g",
        frequency: "每日2次",
        quantity: 2,
        days: 30,
        usage: "口服"
      }
    ],
    createdBy: "王医生",
    lastUpdated: "2023-09-20",
  },
];

// 用药频次选项
const frequencyOptions = [
  "每日1次",
  "每日2次",
  "每日3次",
  "每日4次",
  "每周1次",
  "每周2次",
  "需要时",
  "睡前",
  "餐前",
  "餐后",
  "早晚各1次"
];

// 用药方式选项
const usageOptions = [
  "口服",
  "静脉注射",
  "肌肉注射",
  "皮下注射",
  "含服",
  "舌下含服",
  "外用",
  "吸入"
];

// 剂量单位选项
const dosageUnitOptions = [
  "mg",
  "g",
  "ml",
  "片",
  "粒",
  "袋",
  "支",
  "瓶",
  "丸"
];

// 处方状态样式映射
const prescriptionStatusStyles = {
  "草稿": "bg-gray-100 text-gray-800",
  "待审核": "bg-blue-100 text-blue-800",
  "已审核": "bg-green-100 text-green-800",
  "已发药": "bg-purple-100 text-purple-800",
  "已完成": "bg-slate-100 text-slate-800",
  "已取消": "bg-red-100 text-red-800",
};

// 定义处方药品接口
interface PrescriptionMedicine {
  id: string;
  name: string;
  specification?: string;
  price?: number;
  dosage: string;
  unit?: string;
  frequency: string;
  quantity: number;
  days: number;
  usage: string;
  notes?: string;
}

// 定义处方接口
interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medicines: PrescriptionMedicine[];
  diagnosis?: string;
  notes?: string;
  createdAt: Date;
  status: "草稿" | "待审核" | "已审核" | "已发药" | "已完成" | "已取消";
  totalPrice: number;
  insurancePayment: number;
  selfPayment: number;
}

const Prescriptions = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showPatientHistory, setShowPatientHistory] = useState(false);
  const [searchMedicineTerm, setSearchMedicineTerm] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState<PrescriptionMedicine[]>([]);
  const [currentPrescription, setCurrentPrescription] = useState<Partial<Prescription>>({
    medicines: [],
    status: "草稿",
    createdAt: new Date(),
    totalPrice: 0,
    insurancePayment: 0,
    selfPayment: 0,
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const [showDraftList, setShowDraftList] = useState(false);
  const [editingMedicineIndex, setEditingMedicineIndex] = useState<number | null>(null);
  const [showMedicineDetails, setShowMedicineDetails] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [currentFormState, setCurrentFormState] = useState<any>({
    dosage: "",
    dosageUnit: "mg",
    frequency: "每日1次",
    quantity: 1,
    days: 7,
    usage: "口服",
    notes: "",
  });
  const [draftPrescriptions, setDraftPrescriptions] = useState<Prescription[]>([]);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescriptionNotes, setPrescriptionNotes] = useState("");
  const [showSignaturePrompt, setShowSignaturePrompt] = useState(false);
  const [signaturePassword, setSignaturePassword] = useState("");
  
  // 模拟的草稿处方
  useEffect(() => {
    // 加载草稿处方
    setDraftPrescriptions([
      {
        id: "DRAFT001",
        patientId: "P10001",
        patientName: "王明",
        medicines: [
          {
            id: "M003",
            name: "苯磺酸氨氯地平片",
            specification: "5mg*7片/盒",
            price: 28.5,
            dosage: "5mg",
            unit: "片",
            frequency: "每日1次",
            quantity: 1,
            days: 30,
            usage: "口服",
          }
        ],
        diagnosis: "高血压",
        notes: "饭后服用",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前
        status: "草稿",
        totalPrice: 122.14,
        insurancePayment: 97.71,
        selfPayment: 24.43,
      },
      {
        id: "DRAFT002",
        patientId: "P10003",
        patientName: "张丽",
        medicines: [
          {
            id: "M002",
            name: "布洛芬片",
            specification: "0.2g*20片/盒",
            price: 8.5,
            dosage: "0.2g",
            unit: "片",
            frequency: "每日3次",
            quantity: 1,
            days: 5,
            usage: "口服",
          }
        ],
        diagnosis: "偏头痛",
        notes: "",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前
        status: "草稿",
        totalPrice: 8.5,
        insurancePayment: 0,
        selfPayment: 8.5,
      }
    ]);
  }, []);

  // 过滤患者列表
  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.includes(searchTerm) ||
      patient.id.includes(searchTerm)
  );

  // 过滤药品列表
  const filteredMedicines = mockMedicines.filter(
    (medicine) =>
      medicine.name.includes(searchMedicineTerm) ||
      medicine.commonName.includes(searchMedicineTerm) ||
      medicine.pinyin.includes(searchMedicineTerm.toLowerCase())
  );

  // 获取患者历史处方
  const getPatientPrescriptionHistory = (patientId: string) => {
    return mockPrescriptionHistory.filter(
      (prescription) => prescription.patientId === patientId
    );
  };

  // 检查药物冲突
  const checkMedicineConflicts = (medicine: any, patient: any) => {
    const conflicts = [];
    
    // 检查过敏史
    if (patient.allergies && medicine.interactions) {
      for (const allergy of patient.allergies) {
        if (medicine.interactions.some((interaction: string) => 
          interaction.includes(allergy))) {
          conflicts.push(`患者对"${allergy}"过敏，该药品可能引起过敏反应`);
        }
      }
    }
    
    // 检查药物相互作用
    if (selectedMedicines.length > 0 && medicine.interactions) {
      for (const selectedMed of selectedMedicines) {
        const medInfo = mockMedicines.find(m => m.id === selectedMed.id);
        if (medInfo && medicine.interactions.some((interaction: string) => 
          medInfo.name.includes(interaction) || medInfo.commonName.includes(interaction))) {
          conflicts.push(`与已选药品"${medInfo.name}"可能存在相互作用`);
        }
      }
    }
    
    return conflicts;
  };

  // 计算处方金额
  const calculatePrescriptionAmount = (medicines: PrescriptionMedicine[], patient: any) => {
    if (!patient) return { total: 0, insurance: 0, self: 0 };
    
    let total = 0;
    
    for (const medicine of medicines) {
      const medInfo = mockMedicines.find(m => m.id === medicine.id);
      if (medInfo) {
        // 计算药品总价: 单价 * 数量 * 天数
        const medicineTotal = medInfo.price * medicine.quantity * medicine.days;
        total += medicineTotal;
      }
    }
    
    // 计算医保报销和自费金额
    const insuranceCoverage = patient.insuranceCoverage || 0;
    const insurancePayment = total * insuranceCoverage;
    const selfPayment = total - insurancePayment;
    
    return {
      total: parseFloat(total.toFixed(2)),
      insurance: parseFloat(insurancePayment.toFixed(2)),
      self: parseFloat(selfPayment.toFixed(2))
    };
  };

  // 选择患者
  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setCurrentPrescription(prev => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name
    }));
    toast({
      title: "已选择患者",
      description: `${patient.name}，${patient.gender}，${patient.age}岁`,
    });
    setStep(2);
  };

  // 应用处方模板
  const applyPrescriptionTemplate = (template: any) => {
    setSelectedMedicines(template.medicines);
    setCurrentPrescription(prev => ({
      ...prev,
      medicines: template.medicines,
      diagnosis: template.description
    }));
    setDiagnosis(template.description);
    
    // 更新处方金额
    if (selectedPatient) {
      const { total, insurance, self } = calculatePrescriptionAmount(template.medicines, selectedPatient);
      setCurrentPrescription(prev => ({
        ...prev,
        totalPrice: total,
        insurancePayment: insurance,
        selfPayment: self
      }));
    }
    
    setShowTemplates(false);
    toast({
      title: "已应用处方模板",
      description: `${template.name}`,
    });
  };

  // 添加药品到处方
  const handleAddMedicine = () => {
    if (!selectedMedicine) return;
    
    // 检查药物冲突
    const conflicts = checkMedicineConflicts(selectedMedicine, selectedPatient);
    
    if (conflicts.length > 0) {
      // 显示冲突警告但仍然允许添加
      toast({
        title: "药品冲突警告",
        description: conflicts.join("；"),
        variant: "destructive",
      });
    }
    
    const newMedicine: PrescriptionMedicine = {
      id: selectedMedicine.id,
      name: selectedMedicine.name,
      specification: selectedMedicine.specification,
      price: selectedMedicine.price,
      dosage: `${currentFormState.dosage}${currentFormState.dosageUnit}`,
      unit: selectedMedicine.unit,
      frequency: currentFormState.frequency,
      quantity: currentFormState.quantity,
      days: currentFormState.days,
      usage: currentFormState.usage,
      notes: currentFormState.notes
    };
    
    if (editingMedicineIndex !== null) {
      // 编辑现有药品
      const updatedMedicines = [...selectedMedicines];
      updatedMedicines[editingMedicineIndex] = newMedicine;
      setSelectedMedicines(updatedMedicines);
      setCurrentPrescription(prev => ({
        ...prev,
        medicines: updatedMedicines
      }));
      
      setEditingMedicineIndex(null);
      toast({
        title: "药品已更新",
        description: selectedMedicine.name,
      });
    } else {
      // 添加新药品
      setSelectedMedicines([...selectedMedicines, newMedicine]);
      setCurrentPrescription(prev => ({
        ...prev,
        medicines: [...prev.medicines || [], newMedicine]
      }));
      
      toast({
        title: "药品已添加",
        description: selectedMedicine.name,
      });
    }
    
    // 更新处方金额
    if (selectedPatient) {
      const updatedMedicines = editingMedicineIndex !== null 
        ? [...selectedMedicines.slice(0, editingMedicineIndex), newMedicine, ...selectedMedicines.slice(editingMedicineIndex + 1)]
        : [...selectedMedicines, newMedicine];
        
      const { total, insurance, self } = calculatePrescriptionAmount(updatedMedicines, selectedPatient);
      setCurrentPrescription(prev => ({
        ...prev,
        totalPrice: total,
        insurancePayment: insurance,
        selfPayment: self
      }));
    }
    
    // 重置表单
    setCurrentFormState({
      dosage: "",
      dosageUnit: "mg",
      frequency: "每日1次",
      quantity: 1,
      days: 7,
      usage: "口服",
      notes: "",
    });
    setSelectedMedicine(null);
    setShowMedicineDetails(false);
  };

  // 移除药品
  const handleRemoveMedicine = (index: number) => {
    const updatedMedicines = selectedMedicines.filter((_, i) => i !== index);
    setSelectedMedicines(updatedMedicines);
    setCurrentPrescription(prev => ({
      ...prev,
      medicines: updatedMedicines
    }));
    
    // 更新处方金额
    if (selectedPatient) {
      const { total, insurance, self } = calculatePrescriptionAmount(updatedMedicines, selectedPatient);
      setCurrentPrescription(prev => ({
        ...prev,
        totalPrice: total,
        insurancePayment: insurance,
        selfPayment: self
      }));
    }
    
    toast({
      title: "药品已移除",
      description: selectedMedicines[index].name,
    });
  };

  // 编辑药品
  const handleEditMedicine = (index: number) => {
    const medicine = selectedMedicines[index];
    const medicineInfo = mockMedicines.find(m => m.id === medicine.id);
    
    if (medicineInfo) {
      setSelectedMedicine(medicineInfo);
      
      // 解析剂量和单位
      const dosageMatch = medicine.dosage.match(/([0-9.]+)([a-zA-Z]+)/);
      
      setCurrentFormState({
        dosage: dosageMatch ? dosageMatch[1] : medicine.dosage,
        dosageUnit: dosageMatch ? dosageMatch[2] : "mg",
        frequency: medicine.frequency,
        quantity: medicine.quantity,
        days: medicine.days,
        usage: medicine.usage,
        notes: medicine.notes || "",
      });
      
      setEditingMedicineIndex(index);
      setShowMedicineDetails(true);
    }
  };

  // 加载草稿处方
  const loadDraftPrescription = (draft: Prescription) => {
    const patient = mockPatients.find(p => p.id === draft.patientId);
    
    if (patient) {
      setSelectedPatient(patient);
      setSelectedMedicines(draft.medicines);
      setDiagnosis(draft.diagnosis || "");
      setPrescriptionNotes(draft.notes || "");
      
      setCurrentPrescription({
        ...draft,
        createdAt: new Date()
      });
      
      setShowDraftList(false);
      setStep(2);
      
      toast({
        title: "草稿已加载",
        description: `患者: ${draft.patientName}，药品数: ${draft.medicines.length}`,
      });
    }
  };

  // 保存处方草稿
  const savePrescriptionDraft = () => {
    if (!selectedPatient || selectedMedicines.length === 0) {
      toast({
        title: "无法保存",
        description: "请选择患者并添加至少一种药品",
        variant: "destructive",
      });
      return;
    }
    
    const updatedPrescription = {
      ...currentPrescription,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      medicines: selectedMedicines,
      diagnosis,
      notes: prescriptionNotes,
      status: "草稿" as const,
      createdAt: new Date(),
      id: currentPrescription.id || `DRAFT${Date.now()}`
    };
    
    // 更新草稿列表
    setDraftPrescriptions(prev => {
      // 如果已存在此ID的草稿，则更新它
      if (currentPrescription.id) {
        return prev.map(p => p.id === currentPrescription.id ? updatedPrescription as Prescription : p);
      }
      // 否则添加新草稿
      return [...prev, updatedPrescription as Prescription];
    });
    
    setCurrentPrescription(updatedPrescription);
    
    toast({
      title: "草稿已保存",
      description: `患者: ${selectedPatient.name}，共${selectedMedicines.length}种药品`,
    });
  };

  // 处理处方提交
  const handlePrescriptionSubmit = () => {
    if (!selectedPatient || selectedMedicines.length === 0) {
      toast({
        title: "无法提交",
        description: "请选择患者并添加至少一种药品",
        variant: "destructive",
      });
      return;
    }
    
    setShowConfirmSubmit(true);
  };

  // 确认提交处方
  const confirmPrescriptionSubmit = () => {
    setShowConfirmSubmit(false);
    setShowSignaturePrompt(true);
  };

  // 处理电子签名验证
  const handleSignatureVerify = () => {
    if (signaturePassword !== "1234") { // 模拟密码验证
      toast({
        title: "签名验证失败",
        description: "密码不正确，请重试",
        variant: "destructive",
      });
      return;
    }
    
    setShowSignaturePrompt(false);
    
    // 更新处方状态为待审核
    const submittedPrescription = {
      ...currentPrescription,
      status: "待审核" as const,
      id: currentPrescription.id?.startsWith("DRAFT") 
        ? `RX${Date.now()}` 
        : currentPrescription.id || `RX${Date.now()}`
    };
    
    // 如果是从草稿提交，移除草稿
    if (currentPrescription.id?.startsWith("DRAFT")) {
      setDraftPrescriptions(prev => prev.filter(p => p.id !== currentPrescription.id));
    }
    
    toast({
      title: "处方已提交",
      description: "处方已成功提交至药房审核",
    });
    
    // 重置表单到初始状态
    setSelectedPatient(null);
    setSelectedMedicines([]);
    setDiagnosis("");
    setPrescriptionNotes("");
    setSignaturePassword("");
    setStep(1);
    setCurrentPrescription({
      medicines: [],
      status: "草稿",
      createdAt: new Date(),
      totalPrice: 0,
      insurancePayment: 0,
      selfPayment: 0,
    });
  };

  // 处理AI药品推荐
  const handleAIRecommendation = () => {
    if (!selectedPatient) return;
    
    // 模拟AI推荐
    setTimeout(() => {
      const recommendations = [];
      
      // 基于诊断和病史推荐药品
      if (diagnosis.includes("高血压") || selectedPatient.medicalHistory.includes("高血压")) {
        recommendations.push(mockMedicines.find(m => m.id === "M003")); // 氨氯地平
        recommendations.push(mockMedicines.find(m => m.id === "M006")); // 硝苯地平
      }
      
      if (diagnosis.includes("糖尿病") || selectedPatient.medicalHistory.includes("2型糖尿病")) {
        recommendations.push(mockMedicines.find(m => m.id === "M005")); // 二甲双胍
      }
      
      if (diagnosis.includes("感冒") || diagnosis.includes("发热")) {
        recommendations.push(mockMedicines.find(m => m.id === "M007")); // 感冒灵
        recommendations.push(mockMedicines.find(m => m.id === "M002")); // 布洛芬
      }
      
      if (recommendations.length > 0) {
        toast({
          title: "AI药品推荐",
          description: `根据诊断"${diagnosis}"，推荐${recommendations.length}种药品`,
        });
        
        // 设置第一个推荐药品为当前选中药品
        setSelectedMedicine(recommendations[0]);
        setShowMedicineDetails(true);
      } else {
        toast({
          title: "无法生成推荐",
          description: "请先输入有效的诊断信息",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  // 渲染步骤指示器
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center mb-6">
        <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            1
          </div>
          <span className="mr-4">选择患者</span>
        </div>
        <div className="w-8 h-1 bg-muted mx-2" />
        <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            2
          </div>
          <span className="mr-4">添加药品</span>
        </div>
        <div className="w-8 h-1 bg-muted mx-2" />
        <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            3
          </div>
          <span>确认提交</span>
        </div>
      </div>
    );
  };

  // 渲染步骤1：选择患者
  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">选择患者</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowDraftList(true)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              草稿箱
              {draftPrescriptions.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {draftPrescriptions.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="搜索患者（姓名或ID）..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>患者ID</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>性别</TableHead>
                  <TableHead>年龄</TableHead>
                  <TableHead>过敏史</TableHead>
                  <TableHead>医疗保险</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      未找到符合条件的患者
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.age}岁</TableCell>
                      <TableCell>
                        {patient.allergies.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {patient.allergies.map((allergy, index) => (
                              <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">无</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {patient.insuranceType !== "自费" ? (
                          <div className="flex items-center">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {patient.insuranceType}
                            </Badge>
                            <span className="ml-2 text-sm">({(patient.insuranceCoverage * 100).toFixed(0)}%)</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50">自费</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setShowPatientHistory(true);
                            }}
                          >
                            <History className="mr-1 h-4 w-4" />
                            用药史
                          </Button>
                          <Button
                            size="sm"
                            className="h-8"
                            onClick={() => handleSelectPatient(patient)}
                          >
                            选择
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  // 渲染步骤2：添加药品
  const renderStep2 = () => {
    const patientHistoryPrescriptions = selectedPatient ? getPatientPrescriptionHistory(selectedPatient.id) : [];
    
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">添加药品</h2>
            {selectedPatient && (
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium mr-2">当前患者:</span>
                <User className="h-4 w-4 mr-1" />
                <span>{selectedPatient.name}</span>
                <span className="mx-1">·</span>
                <span>{selectedPatient.gender}</span>
                <span className="mx-1">·</span>
                <span>{selectedPatient.age}岁</span>
                {selectedPatient.allergies.length > 0 && (
                  <>
                    <span className="mx-1">·</span>
                    <span className="text-red-500 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      过敏: {selectedPatient.allergies.join(", ")}
                    </span>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-6 text-xs"
                  onClick={() => setStep(1)}
                >
                  更换
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowTemplates(true)}
            >
              <ClipboardList className="h-4 w-4" />
              处方模板
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleAIRecommendation}
              disabled={!diagnosis}
            >
              <Bot className="h-4 w-4" />
              AI推荐药品
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={savePrescriptionDraft}
            >
              <Save className="h-4 w-4" />
              保存草稿
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                if (selectedMedicines.length > 0) {
                  setStep(3);
                } else {
                  toast({
                    title: "无法继续",
                    description: "请至少添加一种药品",
                    variant: "destructive",
                  });
                }
              }}
            >
              下一步
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：药品搜索 */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <Label className="mb-2 block">诊断信息</Label>
              <Textarea 
                placeholder="请输入诊断信息..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="搜索药品（名称、拼音）..."
                value={searchMedicineTerm}
                onChange={(e) => setSearchMedicineTerm(e.target.value)}
              />
            </div>
            <div className="bg-muted/30 rounded-lg p-4 max-h-[500px] overflow-y-auto">
              {filteredMedicines.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  未找到符合条件的药品
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMedicines.map((medicine) => (
                    <Card 
                      key={medicine.id} 
                      className={cn(
                        "cursor-pointer hover:shadow transition-all",
                        selectedMedicine?.id === medicine.id ? "border-primary" : ""
                      )}
                      onClick={() => {
                        setSelectedMedicine(medicine);
                        setShowMedicineDetails(true);
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">
                            {medicine.name}
                            {medicine.isInsurance && (
                              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                                医保
                              </Badge>
                            )}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              medicine.stockStatus === "充足" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : medicine.stockStatus === "较少"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            )}
                          >
                            {medicine.stockStatus}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div className="flex justify-between">
                            <span>{medicine.specification}</span>
                            <span className="font-medium text-primary">¥{medicine.price}/{medicine.unit}</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span>{medicine.formulation} · {medicine.category}</span>
                            <span>{medicine.company}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 右侧：已选药品列表 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 患者用药历史 */}
            {patientHistoryPrescriptions.length > 0 && (
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <History className="h-4 w-4 mr-2" />
                    患者用药历史
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm">
                    {patientHistoryPrescriptions[0].medicines.map((med, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1 border-b last:border-b-0">
                        <div>
                          <span>{med.name}</span>
                          <span className="text-muted-foreground ml-2">
                            {med.dosage} {med.frequency}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-muted-foreground text-xs">
                            {patientHistoryPrescriptions[0].date}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 ml-2"
                            onClick={() => {
                              // 找到对应的药品信息
                              const medicineInfo = mockMedicines.find(m => m.id === med.id);
                              if (medicineInfo) {
                                setSelectedMedicine(medicineInfo);
                                
                                // 解析剂量和单位
                                const dosageMatch = med.dosage.match(/([0-9.]+)([a-zA-Z]+)/);
                                
                                setCurrentFormState({
                                  dosage: dosageMatch ? dosageMatch[1] : med.dosage,
                                  dosageUnit: dosageMatch ? dosageMatch[2] : "mg",
                                  frequency: med.frequency,
                                  quantity: med.quantity,
                                  days: med.days,
                                  usage: "口服",
                                  notes: "",
                                });
                                
                                setShowMedicineDetails(true);
                              }
                            }}
                          >
                            重新开具
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* 当前处方药品 */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  已选药品
                  <Badge className="ml-2">{selectedMedicines.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {selectedMedicines.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    尚未添加药品，请从左侧列表选择
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>药品名称</TableHead>
                        <TableHead>规格</TableHead>
                        <TableHead>用药剂量</TableHead>
                        <TableHead>用药方式</TableHead>
                        <TableHead>疗程</TableHead>
                        <TableHead>单价</TableHead>
                        <TableHead>小计</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedMedicines.map((medicine, index) => {
                        const medicineInfo = mockMedicines.find(m => m.id === medicine.id);
                        const subtotal = medicineInfo 
                          ? (medicineInfo.price * medicine.quantity * medicine.days).toFixed(2) 
                          : "0.00";
                          
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">{medicine.name}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{medicine.specification}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {medicine.dosage} {medicine.frequency}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{medicine.usage}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {medicine.quantity}*{medicine.days}天
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                ¥{medicineInfo?.price || 0}/{medicineInfo?.unit || "单位"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">¥{subtotal}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEditMedicine(index)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive"
                                  onClick={() => handleRemoveMedicine(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              {selectedMedicines.length > 0 && selectedPatient && (
                <CardFooter className="p-4 pt-0 border-t mt-4 flex justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">处方备注:</div>
                    <Textarea 
                      placeholder="处方备注信息..."
                      value={prescriptionNotes}
                      onChange={(e) => setPrescriptionNotes(e.target.value)}
                      className="mt-1 min-h-[60px] w-[300px]"
                    />
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="text-sm">
                      总金额: <span className="font-medium">¥{currentPrescription.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      医保支付: <span className="text-blue-600 font-medium">¥{currentPrescription.insurancePayment.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      患者自付: <span className="text-red-600 font-medium">¥{currentPrescription.selfPayment.toFixed(2)}</span>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // 渲染步骤3：确认处方信息
  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">确认处方信息</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
            >
              上一步
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={handlePrescriptionSubmit}
            >
              <Send className="h-4 w-4" />
              提交处方
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 患者信息 */}
          <Card className="md:col-span-1">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base flex items-center">
                <User className="h-4 w-4 mr-2" />
                患者信息
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {selectedPatient && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">患者姓名</span>
                    <span className="font-medium">{selectedPatient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">患者ID</span>
                    <span>{selectedPatient.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">性别</span>
                    <span>{selectedPatient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">年龄</span>
                    <span>{selectedPatient.age}岁</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">过敏史</span>
                    <div>
                      {selectedPatient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">无</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">医疗保险</span>
                    <div>
                      {selectedPatient.insuranceType !== "自费" ? (
                        <div className="flex items-center justify-end">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {selectedPatient.insuranceType}
                          </Badge>
                          <span className="ml-1">({(selectedPatient.insuranceCoverage * 100).toFixed(0)}%)</span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50">自费</Badge>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-muted-foreground mb-1">诊断信息</div>
                    <div className="bg-muted/30 p-2 rounded-md min-h-[60px]">
                      {diagnosis || <span className="text-muted-foreground italic">无诊断信息</span>}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 处方药品 */}
          <Card className="md:col-span-2">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base flex items-center">
                <ClipboardList className="h-4 w-4 mr-2" />
                处方药品
                <Badge className="ml-2">{selectedMedicines.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>药品名称</TableHead>
                    <TableHead>规格</TableHead>
                    <TableHead>用药剂量</TableHead>
                    <TableHead>用药方式</TableHead>
                    <TableHead>疗程</TableHead>
                    <TableHead>小计</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedMedicines.map((medicine, index) => {
                    const medicineInfo = mockMedicines.find(m => m.id === medicine.id);
                    const subtotal = medicineInfo 
                      ? (medicineInfo.price * medicine.quantity * medicine.days).toFixed(2) 
                      : "0.00";
                      
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{medicine.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{medicine.specification}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {medicine.dosage} {medicine.frequency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{medicine.usage}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {medicine.quantity}*{medicine.days}天
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">¥{subtotal}</div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              {prescriptionNotes && (
                <div className="mt-4 p-3 bg-muted/30 rounded-md">
                  <div className="text-sm font-medium mb-1">处方备注:</div>
                  <div className="text-sm">{prescriptionNotes}</div>
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t flex justify-between items-end">
                <div className="flex items-center">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <ShieldAlert className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">处方合规性检查</span>
                    </div>
                    <div className="text-sm text-muted-foreground pl-6">
                      <div className="flex items-center">
                        <Check className="h-3 w-3 mr-1 text-green-600" />
                        <span>药物剂量在安全范围内</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-3 w-3 mr-1 text-green-600" />
                        <span>未发现严重用药禁忌</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-3 w-3 mr-1 text-green-600" />
                        <span>处方格式正确</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-sm">
                    总金额: <span className="font-medium">¥{currentPrescription.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    医保支付: <span className="text-blue-600 font-medium">¥{currentPrescription.insurancePayment.toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    患者自付: <span className="text-red-600 font-medium">¥{currentPrescription.selfPayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">电子处方</h1>
        </div>
        
        {renderStepIndicator()}
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        
        {/* 患者用药历史弹窗 */}
        <Sheet open={showPatientHistory} onOpenChange={setShowPatientHistory}>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>患者用药历史</SheetTitle>
              <SheetDescription>
                {selectedPatient?.name} ({selectedPatient?.id}) 的处方与用药记录
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              {selectedPatient && getPatientPrescriptionHistory(selectedPatient.id).length > 0 ? (
                <div className="space-y-4">
                  {getPatientPrescriptionHistory(selectedPatient.id).map((prescription) => (
                    <Card key={prescription.id}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{prescription.id}</CardTitle>
                          <Badge
                            className={cn(
                              "text-xs",
                              prescriptionStatusStyles[prescription.status] || "bg-gray-100"
                            )}
                          >
                            {prescription.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          <div className="flex justify-between items-center">
                            <span>开具日期: {prescription.date}</span>
                            <span>医师: {prescription.doctorName}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2">
                          {prescription.medicines.map((med, idx) => (
                            <div key={idx} className="flex items-center justify-between py-1 border-b last:border-b-0">
                              <div>
                                <span className="font-medium">{med.name}</span>
                                <span className="text-muted-foreground ml-2">
                                  {med.dosage} {med.frequency}
                                </span>
                              </div>
                              <span className="text-sm">
                                {med.quantity}*{med.days}天
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-4 pt-2 border-t text-sm">
                          <div>总金额: ¥{prescription.totalPrice.toFixed(2)}</div>
                          <div>
                            医保: ¥{prescription.insurancePayment.toFixed(2)} | 
                            自付: ¥{prescription.selfPayment.toFixed(2)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  该患者暂无处方记录
                </div>
              )}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>关闭</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {/* 处方模板弹窗 */}
        <Sheet open={showTemplates} onOpenChange={setShowTemplates}>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>常用处方模板</SheetTitle>
              <SheetDescription>
                选择一个处方模板快速添加药品
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-4">
                {mockPrescriptionTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="cursor-pointer hover:shadow transition-all"
                    onClick={() => applyPrescriptionTemplate(template)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base flex items-center">
                        <ClipboardList className="h-4 w-4 mr-2" />
                        {template.name}
                      </CardTitle>
                      <CardDescription>
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2">
                        {template.medicines.map((med, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1 text-sm">
                            <span className="font-medium">{med.name}</span>
                            <span className="text-muted-foreground">
                              {med.dosage} {med.frequency} · {med.quantity}*{med.days}天
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-3 pt-2 border-t text-xs text-muted-foreground">
                        <span>创建人: {template.createdBy}</span>
                        <span>更新时间: {template.lastUpdated}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">关闭</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {/* 草稿箱弹窗 */}
        <Sheet open={showDraftList} onOpenChange={setShowDraftList}>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>处方草稿箱</SheetTitle>
              <SheetDescription>
                您保存的处方草稿
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              {draftPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {draftPrescriptions.map((draft) => (
                    <Card 
                      key={draft.id} 
                      className="cursor-pointer hover:shadow transition-all"
                      onClick={() => loadDraftPrescription(draft)}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            {draft.patientName}
                          </CardTitle>
                          <Badge variant="outline" className="bg-gray-50">
                            草稿
                          </Badge>
                        </div>
                        <CardDescription>
                          <div className="flex justify-between items-center">
                            <span>ID: {draft.id}</span>
                            <span>保存时间: {draft.createdAt.toLocaleDateString()}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2">
                          {draft.medicines.map((med, idx) => (
                            <div key={idx} className="flex items-center justify-between py-1 text-sm">
                              <span>{med.name}</span>
                              <span className="text-muted-foreground">
                                {med.dosage} {med.frequency}
                              </span>
                            </div>
                          ))}
                        </div>
                        {draft.diagnosis && (
                          <div className="mt-3 pt-2 border-t text-sm">
                            <span className="text-muted-foreground">诊断: </span>
                            <span>{draft.diagnosis}</span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-3 pt-0 text-right text-sm">
                        <div className="ml-auto">
                          总金额: <span className="font-medium">¥{draft.totalPrice.toFixed(2)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  暂无保存的处方草稿
                </div>
              )}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">关闭</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {/* 药品详情弹窗 */}
        <Dialog open={showMedicineDetails} onOpenChange={setShowMedicineDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>药品详情</DialogTitle>
              {selectedMedicine && (
                <DialogDescription>
                  {selectedMedicine.name} ({selectedMedicine.specification})
                </DialogDescription>
              )}
            </DialogHeader>
            {selectedMedicine && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>用药剂量</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="剂量" 
                        value={currentFormState.dosage}
                        onChange={(e) => setCurrentFormState({
                          ...currentFormState,
                          dosage: e.target.value
                        })}
                        className="w-2/3"
                      />
                      <Select 
                        value={currentFormState.dosageUnit}
                        onValueChange={(value) => setCurrentFormState({
                          ...currentFormState,
                          dosageUnit: value
                        })}
                      >
                        <SelectTrigger className="w-1/3">
                          <SelectValue placeholder="单位" />
                        </SelectTrigger>
                        <SelectContent>
                          {dosageUnitOptions.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>用药频次</Label>
                    <Select 
                      value={currentFormState.frequency}
                      onValueChange={(value) => setCurrentFormState({
                        ...currentFormState,
                        frequency: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择频次" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencyOptions.map((freq) => (
                          <SelectItem key={freq} value={freq}>
                            {freq}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>每次数量</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      placeholder="1" 
                      value={currentFormState.quantity}
                      onChange={(e) => setCurrentFormState({
                        ...currentFormState,
                        quantity: parseInt(e.target.value) || 1
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>疗程天数</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      placeholder="7" 
                      value={currentFormState.days}
                      onChange={(e) => setCurrentFormState({
                        ...currentFormState,
                        days: parseInt(e.target.value) || 1
                      })}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>用药方式</Label>
                    <Select 
                      value={currentFormState.usage}
                      onValueChange={(value) => setCurrentFormState({
                        ...currentFormState,
                        usage: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择用药方式" />
                      </SelectTrigger>
                      <SelectContent>
                        {usageOptions.map((usage) => (
                          <SelectItem key={usage} value={usage}>
                            {usage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>用药备注</Label>
                    <Input 
                      placeholder="如:饭后服用" 
                      value={currentFormState.notes}
                      onChange={(e) => setCurrentFormState({
                        ...currentFormState,
                        notes: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">单次剂量</span>
                    <span className="font-medium">
                      {currentFormState.dosage}{currentFormState.dosageUnit} {currentFormState.frequency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">总计用量</span>
                    <span className="font-medium">
                      {currentFormState.quantity} * {currentFormState.days}天 = 
                      {currentFormState.quantity * currentFormState.days}次
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">药品费用</span>
                    <span className="font-medium">
                      ¥{(selectedMedicine.price * currentFormState.quantity * currentFormState.days).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        selectedMedicine.stockStatus === "充足" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : selectedMedicine.stockStatus === "较少"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      )}
                    >
                      库存{selectedMedicine.stockStatus}
                    </Badge>
                    
                    {selectedMedicine.isInsurance && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                        医保
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm">
                    单价: <span className="font-medium">¥{selectedMedicine.price}/{selectedMedicine.unit}</span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMedicineDetails(false)}>
                取消
              </Button>
              <Button onClick={handleAddMedicine}>
                {editingMedicineIndex !== null ? "更新药品" : "添加药品"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* 确认提交弹窗 */}
        <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>确认提交处方</DialogTitle>
              <DialogDescription>
                处方将发送至药房进行审核，请确认信息无误
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">患者姓名</span>
                <span className="font-medium">{selectedPatient?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">药品种类</span>
                <span className="font-medium">{selectedMedicines.length}种</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">总金额</span>
                <span className="font-medium">¥{currentPrescription.totalPrice.toFixed(2)}</span>
              </div>
              {selectedPatient?.insuranceType !== "自费" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">医保支付</span>
                    <span className="text-blue-600 font-medium">¥{currentPrescription.insurancePayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">患者自付</span>
                    <span className="text-red-600 font-medium">¥{currentPrescription.selfPayment.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                返回修改
              </Button>
              <Button onClick={confirmPrescriptionSubmit}>
                确认提交
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* 电子签名弹窗 */}
        <Dialog open={showSignaturePrompt} onOpenChange={setShowSignaturePrompt}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>电子签名验证</DialogTitle>
              <DialogDescription>
                请输入您的签名密码以完成处方提交
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signature-password">签名密码</Label>
                <Input 
                  id="signature-password" 
                  type="password" 
                  placeholder="请输入签名密码" 
                  value={signaturePassword}
                  onChange={(e) => setSignaturePassword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  提示：本演示系统密码为1234
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSignaturePrompt(false)}>
                取消
              </Button>
              <Button onClick={handleSignatureVerify}>
                确认签名
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Prescriptions;
