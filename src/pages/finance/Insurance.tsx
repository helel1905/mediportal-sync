
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilePlus, FileText, UploadCloud, BarChart3 } from "lucide-react";

import InsuranceFilters from "@/components/finance/InsuranceFilters";
import InsuranceStatistics from "@/components/finance/InsuranceStatistics";
import InsuranceSettlementTable from "@/components/finance/InsuranceSettlementTable";
import InsuranceSettlementDetail from "@/components/finance/InsuranceSettlementDetail";
import InsuranceSubmitDialog from "@/components/finance/InsuranceSubmitDialog";
import InsuranceRejectDialog from "@/components/finance/InsuranceRejectDialog";
import { useInsuranceSettlementData } from "@/hooks/useInsuranceSettlementData";

const Insurance = () => {
  const {
    filteredSettlements,
    selectedSettlement,
    isDetailOpen,
    isSubmitDialogOpen,
    isRejectDialogOpen,
    filters,
    statistics,
    filterOptions,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenSubmitDialog,
    handleCloseSubmitDialog,
    handleOpenRejectDialog,
    handleCloseRejectDialog,
    handleFilterChange,
    resetFilters,
    handleSubmitSettlement,
    handleProcessRejection,
  } = useInsuranceSettlementData();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">医保结算</h1>
            <p className="text-muted-foreground mt-1">
              管理医疗保险结算记录，包括提交、查询及报销状态跟踪
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <UploadCloud className="h-4 w-4" />
              批量上传
            </Button>
            <Button variant="outline" className="gap-1">
              <BarChart3 className="h-4 w-4" />
              结算报表
            </Button>
            <Button className="gap-1">
              <FilePlus className="h-4 w-4" />
              新建结算单
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" className="flex gap-1">
              <FileText className="h-4 w-4" />
              全部结算单
            </TabsTrigger>
            <TabsTrigger value="pending">待处理</TabsTrigger>
            <TabsTrigger value="processing">处理中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
            <TabsTrigger value="rejected">已拒绝</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-6">
            <InsuranceStatistics statistics={statistics} />

            <InsuranceFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filterOptions={filterOptions}
            />

            <InsuranceSettlementTable
              settlements={filteredSettlements}
              onViewDetail={handleOpenDetail}
              onSubmit={handleOpenSubmitDialog}
              onEdit={() => console.log("Edit settlement not implemented")}
              onReject={handleOpenRejectDialog}
            />
          </TabsContent>

          <TabsContent value="pending" className="mt-6 space-y-6">
            <InsuranceStatistics statistics={statistics} />
            <InsuranceFilters
              filters={{...filters, status: ["pending"]}}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filterOptions={filterOptions}
            />
            <InsuranceSettlementTable
              settlements={filteredSettlements.filter(s => s.status === "pending")}
              onViewDetail={handleOpenDetail}
              onSubmit={handleOpenSubmitDialog}
              onEdit={() => console.log("Edit settlement not implemented")}
              onReject={handleOpenRejectDialog}
            />
          </TabsContent>

          <TabsContent value="processing" className="mt-6 space-y-6">
            <InsuranceStatistics statistics={statistics} />
            <InsuranceFilters
              filters={{...filters, status: ["processing"]}}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filterOptions={filterOptions}
            />
            <InsuranceSettlementTable
              settlements={filteredSettlements.filter(s => s.status === "processing")}
              onViewDetail={handleOpenDetail}
              onSubmit={handleOpenSubmitDialog}
              onEdit={() => console.log("Edit settlement not implemented")}
              onReject={handleOpenRejectDialog}
            />
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-6">
            <InsuranceStatistics statistics={statistics} />
            <InsuranceFilters
              filters={{...filters, status: ["completed"]}}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filterOptions={filterOptions}
            />
            <InsuranceSettlementTable
              settlements={filteredSettlements.filter(s => s.status === "completed")}
              onViewDetail={handleOpenDetail}
              onSubmit={handleOpenSubmitDialog}
              onEdit={() => console.log("Edit settlement not implemented")}
              onReject={handleOpenRejectDialog}
            />
          </TabsContent>

          <TabsContent value="rejected" className="mt-6 space-y-6">
            <InsuranceStatistics statistics={statistics} />
            <InsuranceFilters
              filters={{...filters, status: ["rejected"]}}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              filterOptions={filterOptions}
            />
            <InsuranceSettlementTable
              settlements={filteredSettlements.filter(s => s.status === "rejected")}
              onViewDetail={handleOpenDetail}
              onSubmit={handleOpenSubmitDialog}
              onEdit={() => console.log("Edit settlement not implemented")}
              onReject={handleOpenRejectDialog}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <InsuranceSettlementDetail
        open={isDetailOpen}
        onClose={handleCloseDetail}
        settlement={selectedSettlement}
        onSubmit={handleOpenSubmitDialog}
      />

      <InsuranceSubmitDialog
        open={isSubmitDialogOpen}
        onClose={handleCloseSubmitDialog}
        settlement={selectedSettlement}
        onSubmit={handleSubmitSettlement}
      />

      <InsuranceRejectDialog
        open={isRejectDialogOpen}
        onClose={handleCloseRejectDialog}
        settlement={selectedSettlement}
        onReject={handleProcessRejection}
      />
    </MainLayout>
  );
};

export default Insurance;
