
import { useState, useMemo } from "react";
import { InsuranceSettlement, InsuranceSettlementStats } from "@/types/finance";

// Mock data for insurance settlements
const mockInsuranceSettlements: InsuranceSettlement[] = [
  {
    id: "INS-2023-0001",
    patientId: "P20230601",
    patientName: "王明",
    insuranceNumber: "330106199001015678",
    insuranceType: "城镇职工医保",
    medicalRecordNumber: "MR202306001",
    visitDate: "2023-06-01",
    department: "内科",
    doctor: "李医生",
    diagnosis: "高血压",
    totalAmount: 560.50,
    insurancePayment: 504.45,
    selfPayment: 56.05,
    status: "completed",
    submittedAt: "2023-06-02",
    processedAt: "2023-06-03",
    completedAt: "2023-06-04",
    operator: "张经办",
    remarks: "",
    items: [
      {
        id: "ITEM001",
        name: "硝苯地平缓释片",
        category: "药品",
        specification: "10mg*30片",
        unitPrice: 58.50,
        quantity: 2,
        unit: "盒",
        insuranceCategory: "乙类",
        insuranceRatio: 0.9,
        insurancePayment: 105.30,
        selfPayment: 11.70
      },
      {
        id: "ITEM002",
        name: "血压检测",
        category: "检查",
        specification: "次",
        unitPrice: 15.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类",
        insuranceRatio: 1,
        insurancePayment: 15.00,
        selfPayment: 0
      }
    ]
  },
  {
    id: "INS-2023-0002",
    patientId: "P20230605",
    patientName: "李华",
    insuranceNumber: "330106199203027890",
    insuranceType: "城镇居民医保",
    medicalRecordNumber: "MR202306005",
    visitDate: "2023-06-05",
    department: "外科",
    doctor: "王医生",
    diagnosis: "急性阑尾炎",
    totalAmount: 6800.00,
    insurancePayment: 5440.00,
    selfPayment: 1360.00,
    status: "pending",
    submittedAt: null,
    processedAt: null,
    completedAt: null,
    operator: "张经办",
    remarks: "等待提交医保结算",
    items: [
      {
        id: "ITEM003",
        name: "阑尾切除术",
        category: "手术",
        specification: "次",
        unitPrice: 5000.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类",
        insuranceRatio: 0.8,
        insurancePayment: 4000.00,
        selfPayment: 1000.00
      },
      {
        id: "ITEM004",
        name: "头孢曲松",
        category: "药品",
        specification: "1g*10支",
        unitPrice: 180.00,
        quantity: 10,
        unit: "支",
        insuranceCategory: "乙类",
        insuranceRatio: 0.8,
        insurancePayment: 1440.00,
        selfPayment: 360.00
      }
    ]
  },
  {
    id: "INS-2023-0003",
    patientId: "P20230610",
    patientName: "张丽",
    insuranceNumber: "330106199507124561",
    insuranceType: "城镇职工医保",
    medicalRecordNumber: "MR202306010",
    visitDate: "2023-06-10",
    department: "妇科",
    doctor: "周医生",
    diagnosis: "卵巢囊肿",
    totalAmount: 3500.00,
    insurancePayment: 2800.00,
    selfPayment: 700.00,
    status: "processing",
    submittedAt: "2023-06-12",
    processedAt: null,
    completedAt: null,
    operator: "陈经办",
    remarks: "医保中心审核中",
    items: [
      {
        id: "ITEM005",
        name: "超声检查",
        category: "检查",
        specification: "次",
        unitPrice: 280.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类",
        insuranceRatio: 0.9,
        insurancePayment: 252.00,
        selfPayment: 28.00
      },
      {
        id: "ITEM006",
        name: "腹腔镜手术",
        category: "手术",
        specification: "次",
        unitPrice: 3220.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "乙类",
        insuranceRatio: 0.8,
        insurancePayment: 2576.00,
        selfPayment: 644.00
      }
    ]
  },
  {
    id: "INS-2023-0004",
    patientId: "P20230615",
    patientName: "陈伟",
    insuranceNumber: "330106198812253456",
    insuranceType: "城镇职工医保",
    medicalRecordNumber: "MR202306015",
    visitDate: "2023-06-15",
    department: "骨科",
    doctor: "吴医生",
    diagnosis: "腰椎间盘突出",
    totalAmount: 2200.00,
    insurancePayment: 1980.00,
    selfPayment: 220.00,
    status: "approved",
    submittedAt: "2023-06-16",
    processedAt: "2023-06-18",
    completedAt: null,
    operator: "陈经办",
    remarks: "医保已审核通过，等待结算",
    items: [
      {
        id: "ITEM007",
        name: "腰椎MRI",
        category: "检查",
        specification: "次",
        unitPrice: 1200.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类",
        insuranceRatio: 0.9,
        insurancePayment: 1080.00,
        selfPayment: 120.00
      },
      {
        id: "ITEM008",
        name: "理疗",
        category: "治疗",
        specification: "次",
        unitPrice: 100.00,
        quantity: 10,
        unit: "次",
        insuranceCategory: "乙类",
        insuranceRatio: 0.9,
        insurancePayment: 900.00,
        selfPayment: 100.00
      }
    ]
  },
  {
    id: "INS-2023-0005",
    patientId: "P20230620",
    patientName: "赵强",
    insuranceNumber: "330106199309087654",
    insuranceType: "城镇居民医保",
    medicalRecordNumber: "MR202306020",
    visitDate: "2023-06-20",
    department: "儿科",
    doctor: "刘医生",
    diagnosis: "上呼吸道感染",
    totalAmount: 320.00,
    insurancePayment: 256.00,
    selfPayment: 64.00,
    status: "rejected",
    submittedAt: "2023-06-21",
    processedAt: "2023-06-22",
    completedAt: null,
    operator: "李经办",
    remarks: "医保拒绝，需补充材料",
    rejectionReason: "诊断证明材料不完整，请补充完整的病历资料",
    items: [
      {
        id: "ITEM009",
        name: "咽拭子检查",
        category: "检查",
        specification: "次",
        unitPrice: 120.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类",
        insuranceRatio: 0.8,
        insurancePayment: 96.00,
        selfPayment: 24.00
      },
      {
        id: "ITEM010",
        name: "头孢克洛",
        category: "药品",
        specification: "0.25g*6片",
        unitPrice: 25.00,
        quantity: 2,
        unit: "盒",
        insuranceCategory: "乙类",
        insuranceRatio: 0.8,
        insurancePayment: 40.00,
        selfPayment: 10.00
      },
      {
        id: "ITEM011",
        name: "布洛芬混悬液",
        category: "药品",
        specification: "100ml",
        unitPrice: 35.00,
        quantity: 1,
        unit: "瓶",
        insuranceCategory: "乙类",
        insuranceRatio: 0.8,
        insurancePayment: 28.00,
        selfPayment: 7.00
      }
    ]
  }
];

export interface InsuranceSettlementFilters {
  status: string[];
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  insuranceType: string[];
  department: string[];
  searchText: string;
}

export const useInsuranceSettlementData = () => {
  const [selectedSettlement, setSelectedSettlement] = useState<InsuranceSettlement | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  
  const [filters, setFilters] = useState<InsuranceSettlementFilters>({
    status: [],
    dateRange: {
      from: null,
      to: null,
    },
    insuranceType: [],
    department: [],
    searchText: "",
  });

  // Filter settlements based on selected filters
  const filteredSettlements = useMemo(() => {
    return mockInsuranceSettlements.filter((settlement) => {
      // Filter by status
      if (filters.status.length > 0 && !filters.status.includes(settlement.status)) {
        return false;
      }

      // Filter by date range
      if (filters.dateRange.from) {
        const visitDate = new Date(settlement.visitDate);
        const fromDate = filters.dateRange.from;
        if (visitDate < fromDate) {
          return false;
        }
      }

      if (filters.dateRange.to) {
        const visitDate = new Date(settlement.visitDate);
        const toDate = filters.dateRange.to;
        if (visitDate > toDate) {
          return false;
        }
      }

      // Filter by insurance type
      if (
        filters.insuranceType.length > 0 &&
        !filters.insuranceType.includes(settlement.insuranceType)
      ) {
        return false;
      }

      // Filter by department
      if (
        filters.department.length > 0 &&
        !filters.department.includes(settlement.department)
      ) {
        return false;
      }

      // Filter by search text
      if (filters.searchText) {
        const searchText = filters.searchText.toLowerCase();
        return (
          settlement.patientName.toLowerCase().includes(searchText) ||
          settlement.patientId.toLowerCase().includes(searchText) ||
          settlement.insuranceNumber.toLowerCase().includes(searchText) ||
          settlement.id.toLowerCase().includes(searchText) ||
          settlement.diagnosis.toLowerCase().includes(searchText)
        );
      }

      return true;
    });
  }, [filters, mockInsuranceSettlements]);

  // Calculate statistics
  const statistics: InsuranceSettlementStats = useMemo(() => {
    const stats = {
      total: filteredSettlements.length,
      pending: 0,
      processing: 0,
      approved: 0,
      rejected: 0,
      completed: 0,
      totalAmount: 0,
      insuranceAmount: 0,
    };

    filteredSettlements.forEach((settlement) => {
      stats[settlement.status]++;
      stats.totalAmount += settlement.totalAmount;
      stats.insuranceAmount += settlement.insurancePayment;
    });

    return stats;
  }, [filteredSettlements]);

  // Available filter options derived from data
  const filterOptions = useMemo(() => {
    const departments = Array.from(
      new Set(mockInsuranceSettlements.map((s) => s.department))
    );
    const insuranceTypes = Array.from(
      new Set(mockInsuranceSettlements.map((s) => s.insuranceType))
    );

    return {
      departments,
      insuranceTypes,
      statuses: ["pending", "processing", "approved", "rejected", "completed"],
    };
  }, [mockInsuranceSettlements]);

  // Handler functions
  const handleOpenDetail = (settlement: InsuranceSettlement) => {
    setSelectedSettlement(settlement);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedSettlement(null);
  };

  const handleOpenSubmitDialog = (settlement: InsuranceSettlement) => {
    setSelectedSettlement(settlement);
    setIsSubmitDialogOpen(true);
  };

  const handleCloseSubmitDialog = () => {
    setIsSubmitDialogOpen(false);
  };

  const handleOpenEditDialog = (settlement: InsuranceSettlement) => {
    setSelectedSettlement(settlement);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleOpenRejectDialog = (settlement: InsuranceSettlement) => {
    setSelectedSettlement(settlement);
    setIsRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setIsRejectDialogOpen(false);
  };

  const handleFilterChange = (filterKey: keyof InsuranceSettlementFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: [],
      dateRange: {
        from: null,
        to: null,
      },
      insuranceType: [],
      department: [],
      searchText: "",
    });
  };

  // Submit settlement to insurance
  const handleSubmitSettlement = () => {
    // In a real app, this would be an API call
    console.log("Submitting settlement to insurance", selectedSettlement);
    // Close the dialog
    setIsSubmitDialogOpen(false);
  };

  // Process rejection
  const handleProcessRejection = (rejectionReason: string) => {
    // In a real app, this would be an API call
    console.log("Processing rejection", selectedSettlement, rejectionReason);
    // Close the dialog
    setIsRejectDialogOpen(false);
  };

  return {
    settlements: mockInsuranceSettlements,
    filteredSettlements,
    selectedSettlement,
    isDetailOpen,
    isSubmitDialogOpen,
    isEditDialogOpen,
    isRejectDialogOpen,
    filters,
    statistics,
    filterOptions,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenSubmitDialog,
    handleCloseSubmitDialog,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleOpenRejectDialog,
    handleCloseRejectDialog,
    handleFilterChange,
    resetFilters,
    handleSubmitSettlement,
    handleProcessRejection,
  };
};
