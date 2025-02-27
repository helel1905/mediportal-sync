
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
        <Shield className="h-12 w-12 text-red-600" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">访问被拒绝</h1>
      <p className="mt-3 text-center text-gray-600">
        您没有权限访问此页面。请联系系统管理员或使用具有适当权限的账户登录。
      </p>
      <div className="mt-8 flex space-x-4">
        <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          返回首页
        </Button>
        <Button onClick={logout}>重新登录</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
