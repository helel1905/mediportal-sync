
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PatientDoctorCellProps {
  doctor: string;
  doctorTitle: string;
  isMultipleDoctor: boolean;
}

const PatientDoctorCell: React.FC<PatientDoctorCellProps> = ({
  doctor,
  doctorTitle,
  isMultipleDoctor,
}) => {
  return (
    <TableCell>
      <div className="flex items-center gap-1">
        <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary font-medium">
          {doctor.charAt(0)}
        </div>
        <span>
          {doctor}
          <span className="text-xs text-muted-foreground ml-1">
            ({doctorTitle})
          </span>
        </span>
        {isMultipleDoctor && (
          <Badge variant="outline" className="ml-1 h-5 px-1">
            多医生
          </Badge>
        )}
      </div>
    </TableCell>
  );
};

export default PatientDoctorCell;
