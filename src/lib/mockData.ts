
import { Medicine, Prescription } from "@/types/pharmacy";

// Mock prescription data
const mockPrescriptions: Prescription[] = [
  {
    id: "RX2023-1085",
    patientId: "P20230001",
    patientName: "王明",
    patientAge: 45,
    patientGender: "男",
    doctorName: "张医生",
    department: "内科",
    diagnosis: "高血压，2型糖尿病",
    isUrgent: true,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    medicines: [
      {
        id: "M001",
        name: "氨氯地平片",
        specification: "5mg*7片",
        dosage: "5mg",
        frequency: "每日1次",
        duration: 30,
        quantity: 30,
        unit: "片",
        inStock: true,
        stock: 120
      },
      {
        id: "M002",
        name: "二甲双胍片",
        specification: "0.5g*10片",
        dosage: "0.5g",
        frequency: "每日3次",
        duration: 30,
        quantity: 90,
        unit: "片",
        inStock: true,
        stock: 200
      }
    ]
  },
  {
    id: "RX2023-1086",
    patientId: "P20230002",
    patientName: "李华",
    patientAge: 32,
    patientGender: "女",
    doctorName: "陈医生",
    department: "呼吸科",
    diagnosis: "急性支气管炎",
    isUrgent: false,
    status: "pending",
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    medicines: [
      {
        id: "M003",
        name: "头孢克肟胶囊",
        specification: "0.1g*6粒",
        dosage: "0.1g",
        frequency: "每日2次",
        duration: 7,
        quantity: 14,
        unit: "粒",
        inStock: true,
        stock: 68
      },
      {
        id: "M004",
        name: "布洛芬缓释胶囊",
        specification: "0.3g*10粒",
        dosage: "0.3g",
        frequency: "每日3次",
        duration: 3,
        quantity: 9,
        unit: "粒",
        inStock: false,
        stock: 0
      }
    ]
  },
  {
    id: "RX2023-1087",
    patientId: "P20230003",
    patientName: "赵伟",
    patientAge: 58,
    patientGender: "男",
    doctorName: "张医生",
    department: "内科",
    diagnosis: "冠心病",
    isUrgent: false,
    status: "pending",
    createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 10800000).toISOString(),
    medicines: [
      {
        id: "M005",
        name: "硝酸甘油片",
        specification: "0.5mg*100片",
        dosage: "0.5mg",
        frequency: "舌下含服，发作时使用",
        duration: 30,
        quantity: 100,
        unit: "片",
        inStock: true,
        stock: 250
      },
      {
        id: "M006",
        name: "阿司匹林肠溶片",
        specification: "100mg*30片",
        dosage: "100mg",
        frequency: "每日1次",
        duration: 30,
        quantity: 30,
        unit: "片",
        inStock: true,
        stock: 30
      }
    ]
  },
  {
    id: "RX2023-1088",
    patientId: "P20230004",
    patientName: "陈静",
    patientAge: 26,
    patientGender: "女",
    doctorName: "李医生",
    department: "皮肤科",
    diagnosis: "过敏性皮炎",
    isUrgent: true,
    status: "approved",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 82800000).toISOString(), // 23 hours ago
    reviewedBy: "刘药师",
    reviewNote: "已检查药品相互作用，无冲突",
    medicines: [
      {
        id: "M007",
        name: "氯雷他定片",
        specification: "10mg*6片",
        dosage: "10mg",
        frequency: "每日1次",
        duration: 7,
        quantity: 7,
        unit: "片",
        inStock: true,
        stock: 72
      },
      {
        id: "M008",
        name: "丁酸氢化可的松乳膏",
        specification: "20g:0.1g",
        dosage: "适量",
        frequency: "每日2次",
        duration: 7,
        quantity: 1,
        unit: "支",
        inStock: true,
        stock: 15
      }
    ]
  },
  {
    id: "RX2023-1089",
    patientId: "P20230005",
    patientName: "刘强",
    patientAge: 41,
    patientGender: "男",
    doctorName: "王医生",
    department: "消化科",
    diagnosis: "胃溃疡",
    isUrgent: false,
    status: "rejected",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 169200000).toISOString(), // 47 hours ago
    reviewedBy: "张药师",
    reviewNote: "奥美拉唑与克拉霉素有相互作用，建议换用其他质子泵抑制剂",
    medicines: [
      {
        id: "M009",
        name: "奥美拉唑肠溶胶囊",
        specification: "20mg*14粒",
        dosage: "20mg",
        frequency: "每日2次",
        duration: 14,
        quantity: 28,
        unit: "粒",
        inStock: true,
        stock: 56
      },
      {
        id: "M010",
        name: "克拉霉素片",
        specification: "0.25g*6片",
        dosage: "0.25g",
        frequency: "每日2次",
        duration: 7,
        quantity: 14,
        unit: "片",
        inStock: true,
        stock: 42
      }
    ]
  }
];

// Mock inventory data
interface InventoryItem {
  id: string;
  name: string;
  specification: string;
  manufacturer: string;
  stock: number;
  unit: string;
  expiryDate: string;
  lowStockThreshold: number;
}

const mockInventory: InventoryItem[] = [
  {
    id: "M001",
    name: "氨氯地平片",
    specification: "5mg*7片",
    manufacturer: "华北制药",
    stock: 120,
    unit: "片",
    expiryDate: "2025-11-30",
    lowStockThreshold: 50
  },
  {
    id: "M002",
    name: "二甲双胍片",
    specification: "0.5g*10片",
    manufacturer: "江苏恒瑞医药",
    stock: 200,
    unit: "片",
    expiryDate: "2025-09-15",
    lowStockThreshold: 100
  },
  {
    id: "M003",
    name: "头孢克肟胶囊",
    specification: "0.1g*6粒",
    manufacturer: "哈药集团",
    stock: 68,
    unit: "粒",
    expiryDate: "2024-12-20",
    lowStockThreshold: 30
  },
  {
    id: "M004",
    name: "布洛芬缓释胶囊",
    specification: "0.3g*10粒",
    manufacturer: "上海医药",
    stock: 0,
    unit: "粒",
    expiryDate: "2025-06-10",
    lowStockThreshold: 40
  },
  {
    id: "M005",
    name: "硝酸甘油片",
    specification: "0.5mg*100片",
    manufacturer: "北京同仁堂",
    stock: 250,
    unit: "片",
    expiryDate: "2025-04-25",
    lowStockThreshold: 100
  },
  {
    id: "M006",
    name: "阿司匹林肠溶片",
    specification: "100mg*30片",
    manufacturer: "拜耳医药",
    stock: 30,
    unit: "片",
    expiryDate: "2025-07-18",
    lowStockThreshold: 50
  },
  {
    id: "M007",
    name: "氯雷他定片",
    specification: "10mg*6片",
    manufacturer: "扬子江药业",
    stock: 72,
    unit: "片",
    expiryDate: "2024-09-05",
    lowStockThreshold: 30
  },
  {
    id: "M008",
    name: "丁酸氢化可的松乳膏",
    specification: "20g:0.1g",
    manufacturer: "重庆华邦制药",
    stock: 15,
    unit: "支",
    expiryDate: "2024-08-12", // Near expiry
    lowStockThreshold: 10
  },
  {
    id: "M009",
    name: "奥美拉唑肠溶胶囊",
    specification: "20mg*14粒",
    manufacturer: "浙江医药",
    stock: 56,
    unit: "粒",
    expiryDate: "2024-11-30",
    lowStockThreshold: 28
  },
  {
    id: "M010",
    name: "克拉霉素片",
    specification: "0.25g*6片",
    manufacturer: "广州白云山医药",
    stock: 42,
    unit: "片",
    expiryDate: "2025-02-28",
    lowStockThreshold: 30
  },
  {
    id: "M011",
    name: "辛伐他汀片",
    specification: "10mg*7片",
    manufacturer: "默沙东",
    stock: 8,
    unit: "片",
    expiryDate: "2024-05-30", // Very near expiry
    lowStockThreshold: 25
  },
  {
    id: "M012",
    name: "盐酸左西替利嗪片",
    specification: "5mg*6片",
    manufacturer: "齐鲁制药",
    stock: 3,
    unit: "盒",
    expiryDate: "2025-10-15",
    lowStockThreshold: 5
  },
  {
    id: "M013",
    name: "阿莫西林胶囊",
    specification: "0.25g*10粒",
    manufacturer: "哈药集团",
    stock: 105,
    unit: "粒",
    expiryDate: "2024-06-20", // Near expiry
    lowStockThreshold: 50
  },
  {
    id: "M014",
    name: "复方甘草片",
    specification: "0.5g*24片",
    manufacturer: "北京同仁堂",
    stock: 87,
    unit: "片",
    expiryDate: "2023-12-31", // Expired
    lowStockThreshold: 40
  }
];

// Get all prescriptions with optional filter
export const getMockPrescriptions = () => {
  return mockPrescriptions;
};

// Get a specific prescription by ID
export const getMockPrescriptionById = (id: string) => {
  return mockPrescriptions.find(prescription => prescription.id === id) || null;
};

// Update prescription status and add review note
export const updatePrescriptionStatus = (id: string, status: "approved" | "rejected", note: string) => {
  const index = mockPrescriptions.findIndex(prescription => prescription.id === id);
  
  if (index !== -1) {
    mockPrescriptions[index] = {
      ...mockPrescriptions[index],
      status,
      reviewNote: note,
      reviewedBy: "当前药师", // In a real app, this would come from the logged-in user
      updatedAt: new Date().toISOString()
    };
    
    return mockPrescriptions[index];
  }
  
  return null;
};

// Get all inventory items
export const getMockInventory = () => {
  return mockInventory;
};

// Update inventory item stock
export const updateInventoryStock = (id: string, newStock: number) => {
  const index = mockInventory.findIndex(item => item.id === id);
  
  if (index !== -1) {
    mockInventory[index] = {
      ...mockInventory[index],
      stock: newStock
    };
    
    return mockInventory[index];
  }
  
  return null;
};
