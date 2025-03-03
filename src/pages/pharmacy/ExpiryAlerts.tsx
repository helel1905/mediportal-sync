
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ExpiryAlertList from "@/components/pharmacy/ExpiryAlertList";
import ExpiryAlertDetail from "@/components/pharmacy/ExpiryAlertDetail";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ExpiryStatus } from "@/types/pharmacy";

const ExpiryAlerts = () => {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ExpiryStatus | "all">("approaching");

  const handleSelectAlert = (id: string) => {
    setSelectedAlertId(id);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ExpiryStatus | "all");
    setSelectedAlertId(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">效期预警</h1>
          <Button variant="outline" size="sm">导出报表</Button>
        </div>

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
                />
              </TabsContent>
              <TabsContent value="approaching" className="m-0">
                <ExpiryAlertList 
                  filter="approaching" 
                  onSelectAlert={handleSelectAlert}
                  selectedAlertId={selectedAlertId}
                />
              </TabsContent>
              <TabsContent value="expired" className="m-0">
                <ExpiryAlertList 
                  filter="expired" 
                  onSelectAlert={handleSelectAlert}
                  selectedAlertId={selectedAlertId}
                />
              </TabsContent>
              <TabsContent value="normal" className="m-0">
                <ExpiryAlertList 
                  filter="normal" 
                  onSelectAlert={handleSelectAlert}
                  selectedAlertId={selectedAlertId}
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
      </div>
    </MainLayout>
  );
};

export default ExpiryAlerts;
