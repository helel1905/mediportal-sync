
import React from "react";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PrescriptionStatus, Prescription } from "@/types/pharmacy";
import { getMockPrescriptions } from "@/lib/mockData";

interface PrescriptionListProps {
  filter: PrescriptionStatus | "all";
  onSelectPrescription: (id: string) => void;
  selectedPrescriptionId: string | null;
}

const PrescriptionList = ({ 
  filter, 
  onSelectPrescription,
  selectedPrescriptionId
}: PrescriptionListProps) => {
  // Using mock data
  const allPrescriptions = getMockPrescriptions();
  
  // Filter prescriptions based on the selected tab
  const prescriptions = filter === "all" 
    ? allPrescriptions 
    : allPrescriptions.filter(p => p.status === filter);

  // Helper function to get appropriate icon and color for prescription status
  const getStatusDetails = (status: PrescriptionStatus, isUrgent: boolean) => {
    if (isUrgent) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        color: "bg-red-100",
        badgeVariant: "destructive" as const,
        text: "紧急"
      };
    }
    
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          color: "bg-amber-100",
          badgeVariant: "outline" as const,
          text: "待审核"
        };
      case "approved":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          color: "bg-green-100",
          badgeVariant: "secondary" as const,
          text: "已批准"
        };
      case "rejected":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          color: "bg-red-100",
          badgeVariant: "destructive" as const,
          text: "已拒绝"
        };
      default:
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          color: "bg-amber-100",
          badgeVariant: "outline" as const,
          text: "待审核"
        };
    }
  };

  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground mb-4">
            {prescriptions.length === 0 ? (
              <p className="text-center py-8">暂无处方</p>
            ) : (
              `共 ${prescriptions.length} 个处方`
            )}
          </div>
          
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
            {prescriptions.map((prescription) => {
              const statusDetails = getStatusDetails(prescription.status, prescription.isUrgent);
              
              return (
                <div
                  key={prescription.id}
                  onClick={() => onSelectPrescription(prescription.id)}
                  className={cn(
                    "flex items-center p-3 rounded-md border cursor-pointer transition-all",
                    selectedPrescriptionId === prescription.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-full mr-3", statusDetails.color)}>
                    {statusDetails.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{prescription.patientName}</p>
                      <Badge variant={statusDetails.badgeVariant}>{statusDetails.text}</Badge>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <ClipboardList className="h-3.5 w-3.5 mr-1" />
                      <span className="truncate">
                        {prescription.diagnosis} | {prescription.medicines.length}种药品
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {prescription.doctorName} | {prescription.department}
                      </span>
                      <span className="text-xs">
                        {formatDate(prescription.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionList;
