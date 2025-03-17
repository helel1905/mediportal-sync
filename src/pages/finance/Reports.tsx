
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportsHeader } from "@/components/finance/reports/ReportsHeader";
import { ReportGeneratorPanel } from "@/components/finance/reports/ReportGeneratorPanel";
import { ReportsAnalytics } from "@/components/finance/reports/ReportsAnalytics";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <MainLayout>
      <div className="space-y-6">
        <ReportsHeader />
        
        <Tabs 
          defaultValue="generator" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator">报表生成</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="space-y-4">
            <ReportGeneratorPanel />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <ReportsAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
