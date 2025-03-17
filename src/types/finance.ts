
// Define types for finance features
export interface ChargeItemDetail {
  name: string;
  category: string;
  specification: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  insuranceCategory: string | null;
}

export interface ReconciliationInfo {
  reconciliationTime: string;
  reconciledBy: string;
  result: "matched" | "discrepancy" | "pending";
  notes?: string;
}

export interface ChargeRecord {
  id: string;
  chargeId: string;
  patientId: string;
  patientName: string;
  department: string;
  medicalCardNumber?: string;
  insuranceNumber?: string;
  chargeType: string;
  paymentMethod: string;
  amount: number;
  actualAmount: number;
  insuranceCoverage: number;
  cashier: string;
  transactionReference?: string;
  chargeTime: string;
  status: "reconciled" | "unreconciled" | "exception";
  summary: string;
  items: ChargeItemDetail[];
  reconciliationInfo?: ReconciliationInfo;
}

export interface AccountingSummary {
  totalAmount: number;
  reconciled: number;
  unreconciled: number;
  exceptions: number;
  insurancePending: number;
}

// Insurance settlement types
export type InsuranceSettlementStatus = 
  | "pending" 
  | "processing"
  | "approved"
  | "rejected"
  | "completed";

export interface InsuranceSettlementItem {
  id: string;
  name: string;
  category: string;
  specification: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  insuranceCategory: "甲类" | "乙类" | "丙类" | null;
  insuranceRatio: number;
  insurancePayment: number;
  selfPayment: number;
}

export interface InsuranceSettlement {
  id: string;
  patientId: string;
  patientName: string;
  insuranceNumber: string; 
  insuranceType: string;
  medicalRecordNumber: string;
  visitDate: string;
  department: string;
  doctor: string;
  diagnosis: string;
  totalAmount: number;
  insurancePayment: number;
  selfPayment: number;
  status: InsuranceSettlementStatus;
  submittedAt: string | null;
  processedAt: string | null;
  completedAt: string | null;
  operator: string;
  remarks: string;
  items: InsuranceSettlementItem[];
  rejectionReason?: string;
}

export interface InsuranceSettlementStats {
  total: number;
  pending: number;
  processing: number;
  approved: number;
  rejected: number;
  completed: number;
  totalAmount: number;
  insuranceAmount: number;
}

// Financial Reports types
export type ReportType = 
  | "daily" 
  | "weekly" 
  | "monthly" 
  | "quarterly" 
  | "yearly" 
  | "custom";

export type ReportFormat = "excel" | "pdf" | "csv";

export interface ReportConfig {
  name: string;
  description?: string;
  type: ReportType;
  startDate?: Date;
  endDate?: Date;
  departments: string[];
  includeCharts: boolean;
  includeTrends: boolean;
  format: ReportFormat;
}

export interface ReportMetric {
  title: string;
  current: number;
  target: number;
  percentage: number;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  patientId: string;
  patientName: string;
  department: string;
  amount: number;
  paymentMethod: string;
  category: string;
}
