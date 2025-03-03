export type PrescriptionStatus = "pending" | "approved" | "rejected";
export type ExpiryStatus = "normal" | "approaching" | "expired";

export interface Medicine {
  id: string;
  name: string;
  specification: string;
  dosage: string;
  frequency: string;
  duration: number;
  quantity: number;
  unit: string;
  inStock: boolean;
  stock: number;
  expiryDate?: string;
  expiryStatus?: ExpiryStatus;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: "男" | "女";
  doctorName: string;
  department: string;
  diagnosis: string;
  medicines: Medicine[];
  status: PrescriptionStatus;
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewNote?: string;
  isUrgent: boolean;
}

export interface ExpiryAlert {
  id: string;
  medicineId: string;
  medicineName: string;
  specification: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  currentStock: number;
  unit: string;
  status: ExpiryStatus;
  daysRemaining: number;
  location: string;
}

export interface ExpiryDateInfo {
  date: string;
  count: number;
  hasExpired: boolean;
  hasApproaching: boolean;
}
