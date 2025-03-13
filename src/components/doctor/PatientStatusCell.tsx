
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatientStatusCellProps {
  status: string;
  onStatusChange: (patientId: string, newStatus: string) => void;
  patientId: string;
}

const PatientStatusCell: React.FC<PatientStatusCellProps> = ({
  status,
  onStatusChange,
  patientId,
}) => {
  return (
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 h-auto ${
              status === "waiting"
                ? "text-blue-700 bg-blue-50 hover:bg-blue-100"
                : status === "in-treatment"
                ? "text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                : "text-green-700 bg-green-50 hover:bg-green-100"
            }`}
          >
            {status === "waiting"
              ? "候诊"
              : status === "in-treatment"
              ? "诊中"
              : "完成"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem 
            onClick={() => onStatusChange(patientId, "waiting")}
            className="text-blue-600"
          >
            候诊
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onStatusChange(patientId, "in-treatment")}
            className="text-yellow-600"
          >
            诊中
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onStatusChange(patientId, "completed")}
            className="text-green-600"
          >
            完成
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
};

export default PatientStatusCell;
