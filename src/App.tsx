
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Placeholder pages for the navigation items
import PatientRecords from "./pages/doctor/PatientRecords";
import AIDiagnosis from "./pages/doctor/AIDiagnosis";
import Prescriptions from "./pages/doctor/Prescriptions";
import Inventory from "./pages/pharmacy/Inventory";
import ExpiryAlerts from "./pages/pharmacy/ExpiryAlerts";
import PrescriptionReview from "./pages/pharmacy/PrescriptionReview";
import Accounting from "./pages/finance/Accounting";
import Insurance from "./pages/finance/Insurance";
import Reports from "./pages/finance/Reports";
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
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Doctor Routes */}
          <Route path="/patient-records" element={<PatientRecords />} />
          <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          
          {/* Pharmacy Routes */}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/expiry-alerts" element={<ExpiryAlerts />} />
          <Route path="/prescription-review" element={<PrescriptionReview />} />
          
          {/* Finance Routes */}
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* Admin Routes */}
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/backups" element={<Backups />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
