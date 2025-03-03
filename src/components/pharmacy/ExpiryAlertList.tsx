
import React from "react";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Package,
  Calendar,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExpiryStatus, ExpiryAlert } from "@/types/pharmacy";
import { getMockExpiryAlerts } from "@/lib/mockData";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface ExpiryAlertListProps {
  filter: ExpiryStatus | "all";
  onSelectAlert: (id: string) => void;
  selectedAlertId: string | null;
  selectedDate?: Date | null;
  onClearDateFilter?: () => void;
}

const ExpiryAlertList = ({ 
  filter, 
  onSelectAlert,
  selectedAlertId,
  selectedDate,
  onClearDateFilter
}: ExpiryAlertListProps) => {
  // Using mock data
  const allAlerts = getMockExpiryAlerts();
  
  // First filter alerts based on the selected tab
  let filteredAlerts = filter === "all" 
    ? allAlerts 
    : allAlerts.filter(a => a.status === filter);
  
  // Then apply date filter if a date is selected
  if (selectedDate) {
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    filteredAlerts = filteredAlerts.filter(alert => {
      const alertDate = alert.expiryDate.substring(0, 10); // Get YYYY-MM-DD part
      return alertDate === selectedDateStr;
    });
  }

  // Helper function to get appropriate icon and color for alert status
  const getStatusDetails = (status: ExpiryStatus) => {
    switch (status) {
      case "normal":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          color: "bg-green-100",
          badgeVariant: "secondary" as const,
          text: "正常"
        };
      case "approaching":
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          color: "bg-amber-100",
          badgeVariant: "warning" as const,
          text: "临近效期"
        };
      case "expired":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          color: "bg-red-100",
          badgeVariant: "destructive" as const,
          text: "已过期"
        };
      default:
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          color: "bg-green-100",
          badgeVariant: "secondary" as const,
          text: "正常"
        };
    }
  };

  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          {selectedDate && (
            <div className="flex items-center justify-between mb-4 bg-muted/50 p-2 rounded-md">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span>
                  筛选日期: {format(selectedDate, 'yyyy年MM月dd日', { locale: zhCN })}
                </span>
              </div>
              {onClearDateFilter && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={onClearDateFilter}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          
          <div className="text-sm font-medium text-muted-foreground mb-4">
            {filteredAlerts.length === 0 ? (
              <p className="text-center py-8">暂无数据</p>
            ) : (
              `共 ${filteredAlerts.length} 条记录`
            )}
          </div>
          
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
            {filteredAlerts.map((alert) => {
              const statusDetails = getStatusDetails(alert.status);
              
              return (
                <div
                  key={alert.id}
                  onClick={() => onSelectAlert(alert.id)}
                  className={cn(
                    "flex items-center p-3 rounded-md border cursor-pointer transition-all",
                    selectedAlertId === alert.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-full mr-3", statusDetails.color)}>
                    {statusDetails.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{alert.medicineName}</p>
                      <Badge variant={statusDetails.badgeVariant}>{statusDetails.text}</Badge>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Package className="h-3.5 w-3.5 mr-1" />
                      <span className="truncate">
                        {alert.specification} | 库存: {alert.currentStock}{alert.unit}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {alert.manufacturer} | 批号: {alert.batchNumber}
                      </span>
                      <span className="text-xs">
                        {formatDate(alert.expiryDate)}
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

export default ExpiryAlertList;
