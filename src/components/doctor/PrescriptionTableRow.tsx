
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PrescriptionStatusBadge from "./PrescriptionStatusBadge";
import PrescriptionActionButton from "./PrescriptionActionButton";

interface PrescriptionTableRowProps {
  patient: any;
  onViewIdCard: (patient: any) => void;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
}

const PrescriptionTableRow: React.FC<PrescriptionTableRowProps> = ({
  patient,
  onViewIdCard,
  onViewPrescription,
  onCreatePrescription,
}) => {
  return (
    <TableRow>
      <TableCell>{patient.id}</TableCell>
      <TableCell>
        <Button
          variant="link"
          className="p-0 h-auto font-normal"
          onClick={() => onViewIdCard(patient)}
        >
          {patient.name}
        </Button>
      </TableCell>
      <TableCell>
        {patient.age}岁 / {patient.gender === "male" ? "男" : patient.gender === "female" ? "女" : "其他"}
      </TableCell>
      <TableCell>{patient.department}</TableCell>
      <TableCell>{patient.doctor}</TableCell>
      <TableCell>
        <PrescriptionStatusBadge hasPrescription={patient.hasPrescription} />
      </TableCell>
      <TableCell className="text-right">
        <PrescriptionActionButton 
          hasPrescription={patient.hasPrescription}
          onViewPrescription={() => onViewPrescription(patient)}
          onCreatePrescription={() => onCreatePrescription(patient)}
        />
      </TableCell>
    </TableRow>
  );
};

export default PrescriptionTableRow;
