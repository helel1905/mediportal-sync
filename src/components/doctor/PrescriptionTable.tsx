
import React from "react";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import PrescriptionTableHeader from "./PrescriptionTableHeader";
import PrescriptionTableRow from "./PrescriptionTableRow";
import EmptyTableRow from "./EmptyTableRow";

interface PrescriptionTableProps {
  patients: any[];
  onViewIdCard: (patient: any) => void;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
}

const PrescriptionTable: React.FC<PrescriptionTableProps> = ({
  patients,
  onViewIdCard,
  onViewPrescription,
  onCreatePrescription,
}) => {
  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <PrescriptionTableHeader />
            <TableBody>
              {patients.length === 0 ? (
                <EmptyTableRow 
                  colSpan={7} 
                  message="未找到符合条件的患者" 
                />
              ) : (
                patients.map((patient) => (
                  <PrescriptionTableRow
                    key={patient.id}
                    patient={patient}
                    onViewIdCard={onViewIdCard}
                    onViewPrescription={onViewPrescription}
                    onCreatePrescription={onCreatePrescription}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionTable;
