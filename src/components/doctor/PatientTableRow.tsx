
import React from "react";
import { TableRow } from "@/components/ui/table";
import PatientIdCell from "./PatientIdCell";
import PatientNameCell from "./PatientNameCell";
import PatientAgeCell from "./PatientAgeCell";
import PatientGenderCell from "./PatientGenderCell";
import PatientStatusCell from "./PatientStatusCell";
import PatientRegisterTimeCell from "./PatientRegisterTimeCell";
import PatientDepartmentCell from "./PatientDepartmentCell";
import PatientDoctorCell from "./PatientDoctorCell";
import PatientActionsCell from "./PatientActionsCell";

interface PatientTableRowProps {
  patient: any;
  onStatusChange: (patientId: string, newStatus: string) => void;
  onViewInsurance: (patient: any) => void;
  onViewIdCard: (patient: any) => void;
  onViewGeneticReport: (patient: any) => void;
  onGotoDepartmentQueue: (department: string) => void;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
}

const PatientTableRow: React.FC<PatientTableRowProps> = ({
  patient,
  onStatusChange,
  onViewInsurance,
  onViewIdCard,
  onViewGeneticReport,
  onGotoDepartmentQueue,
  onViewPrescription,
  onCreatePrescription,
}) => {
  return (
    <TableRow>
      <PatientIdCell 
        patientId={patient.id} 
        onViewInsurance={onViewInsurance}
        patient={patient}
      />
      <PatientNameCell 
        name={patient.name}
        gender={patient.gender}
        onViewIdCard={onViewIdCard}
        patient={patient}
      />
      <PatientAgeCell 
        age={patient.age}
        isSenior={patient.isSenior}
        birthDate={patient.birthDate}
      />
      <PatientGenderCell 
        gender={patient.gender}
        onViewGeneticReport={onViewGeneticReport}
        patient={patient}
      />
      <PatientStatusCell 
        status={patient.status}
        onStatusChange={onStatusChange}
        patientId={patient.id}
      />
      <PatientRegisterTimeCell 
        registerTime={patient.registerTime}
        status={patient.status}
      />
      <PatientDepartmentCell 
        department={patient.department}
        onGotoDepartmentQueue={onGotoDepartmentQueue}
      />
      <PatientDoctorCell 
        doctor={patient.doctor}
        doctorTitle={patient.doctorTitle}
        isMultipleDoctor={patient.isMultipleDoctor}
      />
      <PatientActionsCell 
        hasPrescription={patient.hasPrescription}
        onViewPrescription={onViewPrescription}
        onCreatePrescription={onCreatePrescription}
        patient={patient}
      />
    </TableRow>
  );
};

export default PatientTableRow;
