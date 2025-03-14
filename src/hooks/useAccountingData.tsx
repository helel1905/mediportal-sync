
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChargeRecord } from "@/types/finance";

// Mock data for accounting charges
const mockCharges: ChargeRecord[] = [
  {
    id: "1",
    chargeId: "CH-2023-1001",
    patientId: "P10042",
    patientName: "张伟",
    department: "内科",
    medicalCardNumber: "M20230042",
    insuranceNumber: "I38562092",
    chargeType: "门诊收费",
    paymentMethod: "医保",
    amount: 253.50,
    actualAmount: 76.05,
    insuranceCoverage: 177.45,
    cashier: "李静",
    transactionReference: "TX982435",
    chargeTime: "2023-07-15T09:30:00Z",
    status: "reconciled",
    summary: "内科门诊检查及用药",
    items: [
      {
        name: "普通门诊挂号费",
        category: "挂号费",
        specification: "内科",
        unitPrice: 8.50,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类"
      },
      {
        name: "血常规检查",
        category: "检验费",
        specification: "静脉血",
        unitPrice: 45.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类"
      },
      {
        name: "阿莫西林胶囊",
        category: "药品费",
        specification: "0.25g*24粒",
        unitPrice: 25.00,
        quantity: 2,
        unit: "盒",
        insuranceCategory: "乙类"
      },
      {
        name: "布洛芬片",
        category: "药品费",
        specification: "0.2g*12片",
        unitPrice: 15.00,
        quantity: 1,
        unit: "盒",
        insuranceCategory: "甲类"
      },
      {
        name: "B超检查",
        category: "检查费",
        specification: "肝胆胰脾",
        unitPrice: 120.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "乙类"
      }
    ],
    reconciliationInfo: {
      reconciliationTime: "2023-07-16T14:25:00Z",
      reconciledBy: "王会计",
      result: "matched",
      notes: "医保结算单据已核对，金额一致"
    }
  },
  {
    id: "2",
    chargeId: "CH-2023-1002",
    patientId: "P10056",
    patientName: "李明",
    department: "骨科",
    medicalCardNumber: "M20230056",
    insuranceNumber: "I38574621",
    chargeType: "门诊收费",
    paymentMethod: "现金",
    amount: 386.00,
    actualAmount: 386.00,
    insuranceCoverage: 0,
    cashier: "张红",
    transactionReference: "TX982436",
    chargeTime: "2023-07-15T10:15:00Z",
    status: "unreconciled",
    summary: "骨科门诊检查及治疗",
    items: [
      {
        name: "专家门诊挂号费",
        category: "挂号费",
        specification: "骨科",
        unitPrice: 50.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "X光检查",
        category: "检查费",
        specification: "左腕关节",
        unitPrice: 120.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "石膏固定",
        category: "治疗费",
        specification: "小夹板",
        unitPrice: 80.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "布洛芬缓释胶囊",
        category: "药品费",
        specification: "0.3g*10粒",
        unitPrice: 32.00,
        quantity: 2,
        unit: "盒",
        insuranceCategory: null
      },
      {
        name: "跌打损伤膏",
        category: "药品费",
        specification: "50g",
        unitPrice: 42.00,
        quantity: 1,
        unit: "盒",
        insuranceCategory: null
      }
    ]
  },
  {
    id: "3",
    chargeId: "CH-2023-1003",
    patientId: "P10078",
    patientName: "王丽",
    department: "妇产科",
    medicalCardNumber: "M20230078",
    insuranceNumber: "I38596742",
    chargeType: "门诊收费",
    paymentMethod: "医保",
    amount: 530.50,
    actualAmount: 159.15,
    insuranceCoverage: 371.35,
    cashier: "李静",
    transactionReference: "TX982442",
    chargeTime: "2023-07-15T11:05:00Z",
    status: "exception",
    summary: "妇科检查及B超",
    items: [
      {
        name: "普通门诊挂号费",
        category: "挂号费",
        specification: "妇产科",
        unitPrice: 8.50,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类"
      },
      {
        name: "妇科检查",
        category: "检查费",
        specification: "常规",
        unitPrice: 80.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "甲类"
      },
      {
        name: "B超检查",
        category: "检查费",
        specification: "盆腔+子宫附件",
        unitPrice: 150.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "乙类"
      },
      {
        name: "阴道分泌物检查",
        category: "检验费",
        specification: "常规",
        unitPrice: 60.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: "乙类"
      },
      {
        name: "黄体酮胶囊",
        category: "药品费",
        specification: "0.1g*20粒",
        unitPrice: 42.00,
        quantity: 2,
        unit: "盒",
        insuranceCategory: "乙类"
      },
      {
        name: "阿奇霉素片",
        category: "药品费",
        specification: "0.25g*6片",
        unitPrice: 48.00,
        quantity: 1,
        unit: "盒",
        insuranceCategory: "乙类"
      }
    ]
  },
  {
    id: "4",
    chargeId: "CH-2023-1004",
    patientId: "P10023",
    patientName: "赵强",
    department: "外科",
    medicalCardNumber: "M20230023",
    insuranceNumber: "I38556789",
    chargeType: "门诊手术",
    paymentMethod: "微信",
    amount: 1256.00,
    actualAmount: 1256.00,
    insuranceCoverage: 0,
    cashier: "张红",
    transactionReference: "TX982450",
    chargeTime: "2023-07-15T13:30:00Z",
    status: "unreconciled",
    summary: "门诊小手术",
    items: [
      {
        name: "门诊手术挂号费",
        category: "挂号费",
        specification: "外科",
        unitPrice: 20.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "局部麻醉",
        category: "麻醉费",
        specification: "利多卡因",
        unitPrice: 80.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "皮肤肿物切除术",
        category: "手术费",
        specification: "小型",
        unitPrice: 500.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "病理检查",
        category: "检验费",
        specification: "组织病理",
        unitPrice: 300.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "敷料包",
        category: "材料费",
        specification: "小型",
        unitPrice: 56.00,
        quantity: 1,
        unit: "包",
        insuranceCategory: null
      },
      {
        name: "头孢克肟胶囊",
        category: "药品费",
        specification: "0.1g*12粒",
        unitPrice: 150.00,
        quantity: 1,
        unit: "盒",
        insuranceCategory: null
      },
      {
        name: "换药服务",
        category: "治疗费",
        specification: "小型伤口",
        unitPrice: 50.00,
        quantity: 3,
        unit: "次",
        insuranceCategory: null
      }
    ]
  },
  {
    id: "5",
    chargeId: "CH-2023-1005",
    patientId: "P10112",
    patientName: "刘芳",
    department: "儿科",
    medicalCardNumber: "M20230112",
    insuranceNumber: "I38601234",
    chargeType: "门诊收费",
    paymentMethod: "支付宝",
    amount: 168.00,
    actualAmount: 168.00,
    insuranceCoverage: 0,
    cashier: "李静",
    transactionReference: "TX982455",
    chargeTime: "2023-07-15T14:45:00Z",
    status: "unreconciled",
    summary: "儿科感冒就诊",
    items: [
      {
        name: "普通门诊挂号费",
        category: "挂号费",
        specification: "儿科",
        unitPrice: 8.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "快速血常规",
        category: "检验费",
        specification: "指尖血",
        unitPrice: 35.00,
        quantity: 1,
        unit: "次",
        insuranceCategory: null
      },
      {
        name: "布洛芬混悬液",
        category: "药品费",
        specification: "100ml:2g",
        unitPrice: 28.00,
        quantity: 1,
        unit: "瓶",
        insuranceCategory: null
      },
      {
        name: "小儿氨酚黄那敏颗粒",
        category: "药品费",
        specification: "6g*10袋",
        unitPrice: 25.00,
        quantity: 2,
        unit: "盒",
        insuranceCategory: null
      },
      {
        name: "小儿豉翘清热颗粒",
        category: "药品费",
        specification: "2g*8袋",
        unitPrice: 22.00,
        quantity: 1,
        unit: "盒",
        insuranceCategory: null
      },
      {
        name: "生理盐水",
        category: "药品费",
        specification: "0.9%*100ml",
        unitPrice: 5.00,
        quantity: 1,
        unit: "瓶",
        insuranceCategory: null
      }
    ]
  }
];

// Summary mock data
const mockSummaryData = {
  totalAmount: 2594.00,
  reconciled: 253.50,
  unreconciled: 1810.00,
  exceptions: 530.50,
  insurancePending: 548.80,
};

export const useAccountingData = () => {
  const { toast } = useToast();
  
  // State for filters
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2023, 6, 15), // July 15, 2023
    to: new Date(2023, 6, 15),
  });
  const [department, setDepartment] = useState("all");
  const [paymentType, setPaymentType] = useState("all");
  const [reconciliationStatus, setReconciliationStatus] = useState("all");
  
  // State for charges
  const [charges, setCharges] = useState<ChargeRecord[]>(mockCharges);
  const [summaryData, setSummaryData] = useState(mockSummaryData);

  // Handle reconcile action
  const handleReconcile = (id: string, reconciled: boolean) => {
    setCharges((prevCharges) => 
      prevCharges.map((charge) => 
        charge.id === id 
          ? {
              ...charge,
              status: reconciled ? "reconciled" : "exception",
              reconciliationInfo: reconciled 
                ? {
                    reconciliationTime: new Date().toISOString(),
                    reconciledBy: "当前用户",
                    result: "matched",
                    notes: "手动对账完成"
                  }
                : undefined
            }
          : charge
      )
    );

    // Update summary data
    const updatedCharge = charges.find(c => c.id === id);
    if (updatedCharge) {
      const newSummaryData = { ...summaryData };
      
      if (reconciled) {
        if (updatedCharge.status === "unreconciled") {
          newSummaryData.reconciled += updatedCharge.amount;
          newSummaryData.unreconciled -= updatedCharge.amount;
        } else if (updatedCharge.status === "exception") {
          newSummaryData.reconciled += updatedCharge.amount;
          newSummaryData.exceptions -= updatedCharge.amount;
        }
      } else {
        if (updatedCharge.status === "unreconciled") {
          newSummaryData.exceptions += updatedCharge.amount;
          newSummaryData.unreconciled -= updatedCharge.amount;
        } else if (updatedCharge.status === "reconciled") {
          newSummaryData.exceptions += updatedCharge.amount;
          newSummaryData.reconciled -= updatedCharge.amount;
        }
      }
      
      setSummaryData(newSummaryData);
    }

    toast({
      title: reconciled ? "对账成功" : "标记为异常",
      description: `收费单 ${id} 已${reconciled ? "完成对账" : "标记为异常"}`,
      duration: 3000,
    });
  };

  // Handle export action
  const handleExport = () => {
    toast({
      title: "导出报表",
      description: "收费对账单报表导出中...",
      duration: 3000,
    });
  };

  return {
    charges,
    summaryData,
    dateRange,
    setDateRange,
    department,
    setDepartment,
    paymentType,
    setPaymentType,
    reconciliationStatus,
    setReconciliationStatus,
    handleReconcile,
    handleExport,
  };
};
