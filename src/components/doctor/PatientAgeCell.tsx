
import React from "react";
import { TableCell } from "@/components/ui/table";

interface PatientAgeCellProps {
  age: number;
  isSenior: boolean;
  birthDate: string;
}

const PatientAgeCell: React.FC<PatientAgeCellProps> = ({
  age,
  isSenior,
  birthDate,
}) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        {age}岁
        {isSenior && (
          <span className="text-yellow-500 text-lg">⚠</span>
        )}
        <span className="text-xs text-muted-foreground">
          ({birthDate})
        </span>
      </div>
    </TableCell>
  );
};

export default PatientAgeCell;
