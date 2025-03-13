
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Clock } from "lucide-react";
import { formatRelativeTime, isOverdue } from "@/hooks/usePatientData";

interface PatientRegisterTimeCellProps {
  registerTime: Date;
  status: string;
}

const PatientRegisterTimeCell: React.FC<PatientRegisterTimeCellProps> = ({
  registerTime,
  status,
}) => {
  return (
    <TableCell>
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className={isOverdue(registerTime, status) ? "text-red-500" : ""}>
          {formatRelativeTime(registerTime)}
        </span>
      </div>
    </TableCell>
  );
};

export default PatientRegisterTimeCell;
