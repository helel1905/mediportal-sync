
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<string>("doctor");
  const { toast } = useToast();

  // Simulate authentication state - in a real app, this would be replaced with actual auth
  useEffect(() => {
    // For demonstration, show a welcome toast
    toast({
      title: "欢迎回来",
      description: "您已成功登录到医院管理系统",
      duration: 3000,
    });
  }, [toast]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // This would be part of an auth system in a real application
  const handleRoleChange = (role: string) => {
    setCurrentUserRole(role);
    toast({
      title: "角色已切换",
      description: `您现在以${getRoleName(role)}身份登录`,
      duration: 3000,
    });
  };

  // Helper function to get role name in Chinese
  const getRoleName = (role: string): string => {
    switch (role) {
      case "doctor":
        return "医生";
      case "pharmacy":
        return "药房管理员";
      case "finance":
        return "财务人员";
      case "admin":
        return "系统管理员";
      default:
        return "未知角色";
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        currentRole={currentUserRole} 
        onRoleChange={handleRoleChange}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar toggleSidebar={toggleSidebar} userRole={currentUserRole} />
        
        {/* Main content area with scroll */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
