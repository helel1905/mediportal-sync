
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserCircle, UserCircle2, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PatientGenderCellProps {
  gender: string;
  onViewGeneticReport: (patient: any) => void;
  patient: any;
}

const PatientGenderCell: React.FC<PatientGenderCellProps> = ({
  gender,
  onViewGeneticReport,
  patient,
}) => {
  return (
    <TableCell>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewGeneticReport(patient)}
            >
              {gender === "male" ? (
                <UserCircle className="h-5 w-5 text-blue-500" />
              ) : gender === "female" ? (
                <UserCircle2 className="h-5 w-5 text-pink-500" />
              ) : (
                <Users className="h-5 w-5 text-purple-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>查看基因报告</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  );
};

export default PatientGenderCell;
