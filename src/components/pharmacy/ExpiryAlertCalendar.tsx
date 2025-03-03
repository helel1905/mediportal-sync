
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ExpiryAlert } from "@/types/pharmacy";
import { getMockExpiryAlerts } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ExpiryAlertCalendarProps {
  onDateSelect: (date: Date | null) => void;
}

const ExpiryAlertCalendar = ({ onDateSelect }: ExpiryAlertCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const allAlerts = getMockExpiryAlerts();
  
  // Create a map of dates to count of expiring meds on each date
  const expiryDateMap = new Map<string, ExpiryAlert[]>();
  
  allAlerts.forEach(alert => {
    const dateKey = alert.expiryDate.substring(0, 10); // YYYY-MM-DD format
    const existingAlerts = expiryDateMap.get(dateKey) || [];
    expiryDateMap.set(dateKey, [...existingAlerts, alert]);
  });

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onDateSelect(selectedDate || null);
  };

  // Custom rendering for calendar days to show expiry badges
  const renderDay = (day: Date) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const alertsOnDay = expiryDateMap.get(dateString) || [];
    
    const hasExpiredMeds = alertsOnDay.some(alert => alert.status === "expired");
    const hasApproachingMeds = alertsOnDay.some(alert => alert.status === "approaching");
    
    const totalCount = alertsOnDay.length;
    
    // Don't show anything extra if no medications expire on this day
    if (totalCount === 0) {
      return <div className="h-full">{day.getDate()}</div>;
    }
    
    // Determine badge color based on status priority
    let badgeColor = "bg-green-100 text-green-800";
    if (hasExpiredMeds) {
      badgeColor = "bg-red-100 text-red-800";
    } else if (hasApproachingMeds) {
      badgeColor = "bg-amber-100 text-amber-800";
    }
    
    return (
      <div className="relative h-full pt-1">
        <span>{day.getDate()}</span>
        <Badge 
          className={cn(
            "absolute bottom-1 right-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs rounded-full border-none", 
            badgeColor
          )}
        >
          {totalCount}
        </Badge>
      </div>
    );
  };

  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="text-lg font-medium">效期日历</div>
          <p className="text-sm text-muted-foreground">
            点击日期可查看该日临近效期或已过期的药品
          </p>
          
          <div className="border rounded-md p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              locale={zhCN}
              className="rounded-md"
              components={{
                Day: ({ day, ...props }) => (
                  <button
                    {...props}
                    className={cn(
                      props.className,
                      "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
                    )}
                  >
                    {renderDay(day)}
                  </button>
                ),
              }}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-100 mr-1"></div>
              <span className="text-xs">已过期</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-100 mr-1"></div>
              <span className="text-xs">临近效期</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-100 mr-1"></div>
              <span className="text-xs">正常效期</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpiryAlertCalendar;
