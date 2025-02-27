
import React from "react";
import DoctorDashboard from "./dashboard/DoctorDashboard";
import PharmacyDashboard from "./dashboard/PharmacyDashboard";
import FinanceDashboard from "./dashboard/FinanceDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

interface DashboardProps {
  userRole: string;
}

const Dashboard = ({ userRole }: DashboardProps) => {
  // Render dashboard based on user role
  switch (userRole) {
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
