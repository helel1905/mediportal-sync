
import React from "react";
import DoctorDashboard from "./dashboard/DoctorDashboard";
import PharmacyDashboard from "./dashboard/PharmacyDashboard";
import FinanceDashboard from "./dashboard/FinanceDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  // Render dashboard based on user role
  switch (user.role) {
    case "doctor":
      return <DoctorDashboard />;
    case "pharmacy":
      return <PharmacyDashboard />;
    case "finance":
      return <FinanceDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <DoctorDashboard />;
  }
};

export default Dashboard;
