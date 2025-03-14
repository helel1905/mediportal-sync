
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { AccountingHeader } from "@/components/finance/AccountingHeader";
import { AccountingSummary } from "@/components/finance/AccountingSummary";
import { AccountingTable } from "@/components/finance/AccountingTable";
import { AccountingFilters } from "@/components/finance/AccountingFilters";
import { useAccountingData } from "@/hooks/useAccountingData";

const Accounting = () => {
  const { 
    charges, 
    summaryData, 
    dateRange, 
    setDateRange,
    department,
    setDepartment,
    paymentType,
    setPaymentType,
    reconciliationStatus,
    setReconciliationStatus,
    handleReconcile,
    handleExport,
  } = useAccountingData();

  return (
    <MainLayout>
      <div className="space-y-6">
        <AccountingHeader onExport={handleExport} />
        
        <AccountingFilters 
          dateRange={dateRange}
          setDateRange={setDateRange}
          department={department}
          setDepartment={setDepartment}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          reconciliationStatus={reconciliationStatus}
          setReconciliationStatus={setReconciliationStatus}
        />
        
        <AccountingSummary data={summaryData} />
        
        <AccountingTable 
          charges={charges} 
          onReconcile={handleReconcile} 
        />
      </div>
    </MainLayout>
  );
};

export default Accounting;
