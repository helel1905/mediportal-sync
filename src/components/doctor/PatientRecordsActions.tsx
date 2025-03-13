
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, FilePlus } from "lucide-react";

interface PatientRecordsActionsProps {
  onViewCurrentPatient: () => void;
  onAddMedicalRecord: () => void;
}

const PatientRecordsActions: React.FC<PatientRecordsActionsProps> = ({
  onViewCurrentPatient,
  onAddMedicalRecord,
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={onViewCurrentPatient}
        className="flex items-center gap-2"
        variant="outline"
      >
        <Bell className="h-4 w-4" />
        当前叫号
      </Button>
      <Button 
        onClick={onAddMedicalRecord}
        className="flex items-center gap-2"
      >
        <FilePlus className="h-4 w-4" />
        添加病历
      </Button>
    </div>
  );
};

export default PatientRecordsActions;
