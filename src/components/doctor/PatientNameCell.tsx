
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PatientNameCellProps {
  name: string;
  gender: string;
  onViewIdCard: (patient: any) => void;
  patient: any;
}

const PatientNameCell: React.FC<PatientNameCellProps> = ({
  name,
  gender,
  onViewIdCard,
  patient,
}) => {
  return (
    <TableCell>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => onViewIdCard(patient)}
            >
              {name} {gender === "male" ? "先生" : "女士"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>查看身份证照片</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  );
};

export default PatientNameCell;
