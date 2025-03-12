
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import PrescriptionList from "@/components/pharmacy/PrescriptionList";
import PrescriptionDetail from "@/components/pharmacy/PrescriptionDetail";
import { PrescriptionStatus } from "@/types/pharmacy";

const PrescriptionReview = () => {
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<PrescriptionStatus | "all">("pending");

  const handleSelectPrescription = (id: string) => {
    setSelectedPrescriptionId(id);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as PrescriptionStatus | "all");
    setSelectedPrescriptionId(null);
  };

  const handleReviewComplete = () => {
    // Refresh the list after a review is complete
    setSelectedPrescriptionId(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">处方审核</h1>
            <p className="text-muted-foreground mt-1">审核医生开具的电子处方并管理药品发放</p>
          </div>
        </div>

        <Tabs defaultValue="pending" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="pending">待审核</TabsTrigger>
            <TabsTrigger value="approved">已批准</TabsTrigger>
            <TabsTrigger value="rejected">已拒绝</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-6">
            <div className="w-2/5">
              <TabsContent value="all" className="m-0">
                <PrescriptionList 
                  filter="all" 
                  onSelectPrescription={handleSelectPrescription}
                  selectedPrescriptionId={selectedPrescriptionId}
                />
              </TabsContent>
              <TabsContent value="pending" className="m-0">
                <PrescriptionList 
                  filter="pending" 
                  onSelectPrescription={handleSelectPrescription}
                  selectedPrescriptionId={selectedPrescriptionId}
                />
              </TabsContent>
              <TabsContent value="approved" className="m-0">
                <PrescriptionList 
                  filter="approved" 
                  onSelectPrescription={handleSelectPrescription}
                  selectedPrescriptionId={selectedPrescriptionId}
                />
              </TabsContent>
              <TabsContent value="rejected" className="m-0">
                <PrescriptionList 
                  filter="rejected" 
                  onSelectPrescription={handleSelectPrescription}
                  selectedPrescriptionId={selectedPrescriptionId}
                />
              </TabsContent>
            </div>
            
            <div className="w-3/5">
              {selectedPrescriptionId ? (
                <PrescriptionDetail 
                  prescriptionId={selectedPrescriptionId}
                  onReviewComplete={handleReviewComplete}
                />
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg bg-muted/30 p-8">
                  <p className="text-muted-foreground text-center">请从左侧列表选择一个处方进行审核</p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PrescriptionReview;
