
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown, FilePlus } from "lucide-react";

interface PrescriptionActionButtonProps {
  hasPrescription: boolean;
  onViewPrescription: () => void;
  onCreatePrescription: () => void;
}

const PrescriptionActionButton: React.FC<PrescriptionActionButtonProps> = ({ 
  hasPrescription,
  onViewPrescription,
  onCreatePrescription 
}) => {
  if (hasPrescription) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-primary"
        onClick={onViewPrescription}
      >
        <FileDown className="mr-1 h-4 w-4" />
        查看处方
      </Button>
    );
  }
  
  return (
    <Button
      variant="default"
      size="sm"
      className="h-8"
      onClick={onCreatePrescription}
    >
      <FilePlus className="mr-1 h-4 w-4" />
      开具处方
    </Button>
  );
};

export default PrescriptionActionButton;
