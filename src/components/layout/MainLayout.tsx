
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const { user, logout } = useAuth();

  // 确保有用户登录
  if (!user) {
    return null;
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 获取角色名称
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
        currentRole={user.role}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar 
          toggleSidebar={toggleSidebar} 
          userRole={user.role} 
          userName={user.name}
          onLogout={logout}
        />
        
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
