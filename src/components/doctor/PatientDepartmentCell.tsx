
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface PatientDepartmentCellProps {
  department: string;
  onGotoDepartmentQueue: (department: string) => void;
}

const PatientDepartmentCell: React.FC<PatientDepartmentCellProps> = ({
  department,
  onGotoDepartmentQueue,
}) => {
  return (
    <TableCell>
      <Button
        variant="link"
        className="p-0 h-auto font-normal"
        onClick={() => onGotoDepartmentQueue(department)}
      >
        {department}
      </Button>
    </TableCell>
  );
};

export default PatientDepartmentCell;
