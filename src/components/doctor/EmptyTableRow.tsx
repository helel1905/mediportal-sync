
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyTableRowProps {
  colSpan: number;
  message: string;
}

const EmptyTableRow: React.FC<EmptyTableRowProps> = ({ colSpan, message }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-8 text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
