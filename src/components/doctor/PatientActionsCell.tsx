
import React, { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, FileDown, FilePlus } from "lucide-react";
import MedicalRecordDialog from "./MedicalRecordDialog";

interface PatientActionsCellProps {
  hasPrescription: boolean;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
  patient: any;
}

const PatientActionsCell: React.FC<PatientActionsCellProps> = ({
  hasPrescription,
  onViewPrescription,
  onCreatePrescription,
  patient,
}) => {
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);

  return (
    <TableCell className="text-right">
      <div className="flex items-center justify-end gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 flex items-center gap-1"
          onClick={() => setShowViewDialog(true)}
        >
          <Eye className="h-4 w-4" />
          查看
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 flex items-center gap-1"
          onClick={() => setShowEditSheet(true)}
        >
          <Edit className="h-4 w-4" />
          编辑
        </Button>
        {hasPrescription ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-primary flex items-center gap-1"
            onClick={() => onViewPrescription(patient)}
          >
            <FileDown className="h-4 w-4" />
            处方
          </Button>
        ) : (
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 flex items-center gap-1"
            onClick={() => onCreatePrescription(patient)}
          >
            <FilePlus className="h-4 w-4" />
            开方
          </Button>
        )}

        {/* 医疗记录查看和编辑组件 */}
        <MedicalRecordDialog 
          patient={patient}
          showViewDialog={showViewDialog}
          setShowViewDialog={setShowViewDialog}
          showEditSheet={showEditSheet}
          setShowEditSheet={setShowEditSheet}
        />
      </div>
    </TableCell>
  );
};

export default PatientActionsCell;
