
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  allowedRoles = ["doctor", "pharmacy", "finance", "admin"] 
}) => {
  const { user, isLoading } = useAuth();

  // 如果正在加载，显示加载界面
  if (isLoading) {
    return <LoadingScreen />;
  }

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 如果指定了允许的角色且用户角色不在其中，显示未授权页面
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 用户已登录且有权限，显示内容
  return <>{children}</>;
};

export default ProtectedRoute;
