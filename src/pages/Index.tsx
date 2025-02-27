
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentUserRole, setCurrentUserRole] = useState<string>("doctor");

  // This function would be part of the auth context in a real app
  const handleRoleChange = (role: string) => {
    setCurrentUserRole(role);
  };

  return (
    <MainLayout>
      <Dashboard userRole={currentUserRole} />
    </MainLayout>
  );
};

export default Index;
