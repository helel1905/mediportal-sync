
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ExpiryAlertList from "@/components/pharmacy/ExpiryAlertList";
import ExpiryAlertDetail from "@/components/pharmacy/ExpiryAlertDetail";
import ExpiryAlertCalendar from "@/components/pharmacy/ExpiryAlertCalendar";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Calendar, List } from "lucide-react";
import { ExpiryStatus } from "@/types/pharmacy";

const ExpiryAlerts = () => {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ExpiryStatus | "all">("approaching");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectAlert = (id: string) => {
    setSelectedAlertId(id);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ExpiryStatus | "all");
    setSelectedAlertId(null);
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    // When a date is selected in calendar mode, we want to switch to list mode to show results
    if (date) {
      setViewMode("list");
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === "list" ? "calendar" : "list");
    // Clear selected alert when switching views
    setSelectedAlertId(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">效期预警</h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleViewMode}
              title={viewMode === "list" ? "切换到日历视图" : "切换到列表视图"}
            >
              {viewMode === "list" ? <Calendar className="h-4 w-4" /> : <List className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm">导出报表</Button>
          </div>
        </div>

        {viewMode === "list" ? (
          <Tabs defaultValue="approaching" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="approaching">临近效期</TabsTrigger>
              <TabsTrigger value="expired">已过期</TabsTrigger>
              <TabsTrigger value="normal">正常</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-6">
              <div className="w-2/5">
                <TabsContent value="all" className="m-0">
                  <ExpiryAlertList 
                    filter="all" 
                    onSelectAlert={handleSelectAlert}
                    selectedAlertId={selectedAlertId}
                    selectedDate={selectedDate}
                    onClearDateFilter={() => setSelectedDate(null)}
                  />
                </TabsContent>
                <TabsContent value="approaching" className="m-0">
                  <ExpiryAlertList 
                    filter="approaching" 
                    onSelectAlert={handleSelectAlert}
                    selectedAlertId={selectedAlertId}
                    selectedDate={selectedDate}
                    onClearDateFilter={() => setSelectedDate(null)}
                  />
                </TabsContent>
                <TabsContent value="expired" className="m-0">
                  <ExpiryAlertList 
                    filter="expired" 
                    onSelectAlert={handleSelectAlert}
                    selectedAlertId={selectedAlertId}
                    selectedDate={selectedDate}
                    onClearDateFilter={() => setSelectedDate(null)}
                  />
                </TabsContent>
                <TabsContent value="normal" className="m-0">
                  <ExpiryAlertList 
                    filter="normal" 
                    onSelectAlert={handleSelectAlert}
                    selectedAlertId={selectedAlertId}
                    selectedDate={selectedDate}
                    onClearDateFilter={() => setSelectedDate(null)}
                  />
                </TabsContent>
              </div>
              
              <div className="w-3/5">
                {selectedAlertId ? (
                  <ExpiryAlertDetail 
                    alertId={selectedAlertId}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center border rounded-lg bg-muted/30 p-8">
                    <p className="text-muted-foreground text-center">请从左侧列表选择一个药品进行查看</p>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        ) : (
          <div className="flex gap-6">
            <div className="w-full">
              <ExpiryAlertCalendar onDateSelect={handleDateSelect} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExpiryAlerts;
