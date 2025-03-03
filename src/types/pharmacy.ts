
export type PrescriptionStatus = "pending" | "approved" | "rejected";

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
