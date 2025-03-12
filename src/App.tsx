
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// 登录和错误页面
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// 仪表盘页面
import Index from "./pages/Index";

// 医生路由页面
import PatientRecords from "./pages/doctor/PatientRecords";
import AIDiagnosis from "./pages/doctor/AIDiagnosis";
// import Prescriptions from "./pages/doctor/Prescriptions";

// 药房路由页面
import Inventory from "./pages/pharmacy/Inventory";
import ExpiryAlerts from "./pages/pharmacy/ExpiryAlerts";
import PrescriptionReview from "./pages/pharmacy/PrescriptionReview";

// 财务路由页面
import Accounting from "./pages/finance/Accounting";
import Insurance from "./pages/finance/Insurance";
import Reports from "./pages/finance/Reports";

// 管理员路由页面
import UserManagement from "./pages/admin/UserManagement";
import Monitoring from "./pages/admin/Monitoring";
import Backups from "./pages/admin/Backups";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* 公共路由 */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* 受保护的路由 - 所有角色可访问 */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            
            {/* 医生路由 */}
            <Route path="/patient-records" element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <PatientRecords />
              </ProtectedRoute>
            } />
            <Route path="/ai-diagnosis" element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <AIDiagnosis />
              </ProtectedRoute>
            } />
            {/* Redirect prescriptions to patient-records */}
            <Route path="/prescriptions" element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <Navigate to="/patient-records" replace />
              </ProtectedRoute>
            } />
            
            {/* 药房路由 */}
            <Route path="/inventory" element={
              <ProtectedRoute allowedRoles={["pharmacy"]}>
                <Inventory />
              </ProtectedRoute>
            } />
            <Route path="/expiry-alerts" element={
              <ProtectedRoute allowedRoles={["pharmacy"]}>
                <ExpiryAlerts />
              </ProtectedRoute>
            } />
            <Route path="/prescription-review" element={
              <ProtectedRoute allowedRoles={["pharmacy"]}>
                <PrescriptionReview />
              </ProtectedRoute>
            } />
            
            {/* 财务路由 */}
            <Route path="/accounting" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <Accounting />
              </ProtectedRoute>
            } />
            <Route path="/insurance" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <Insurance />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <Reports />
              </ProtectedRoute>
            } />
            
            {/* 管理员路由 */}
            <Route path="/user-management" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/monitoring" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Monitoring />
              </ProtectedRoute>
            } />
            <Route path="/backups" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Backups />
              </ProtectedRoute>
            } />
            
            {/* 未匹配路由 */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
