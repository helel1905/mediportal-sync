
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Barcode } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PatientIdCellProps {
  patientId: string;
  onViewInsurance: (patient: any) => void;
  patient: any;
}

const PatientIdCell: React.FC<PatientIdCellProps> = ({
  patientId,
  onViewInsurance,
  patient,
}) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onViewInsurance(patient)}
              >
                <Barcode className="h-4 w-4 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>查看医保信息</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>{patientId}</span>
      </div>
    </TableCell>
  );
};

export default PatientIdCell;
