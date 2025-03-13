
import React from "react";
import { Badge } from "@/components/ui/badge";

interface PrescriptionStatusBadgeProps {
  hasPrescription: boolean;
}

const PrescriptionStatusBadge: React.FC<PrescriptionStatusBadgeProps> = ({ 
  hasPrescription 
}) => {
  if (hasPrescription) {
    return (
      <Badge variant="secondary" className="bg-green-50 text-green-700">
        已开具
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="bg-gray-50 text-gray-500">
      未开具
    </Badge>
  );
};

export default PrescriptionStatusBadge;
