
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
