
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// 定义用户角色类型
export type UserRole = "doctor" | "pharmacy" | "finance" | "admin";

// 定义用户接口
export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// 定义认证上下文接口
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 预设用户数据
const PRESET_USERS = [
  { id: "1", username: "doctor", password: "123456", name: "张医生", role: "doctor" as UserRole },
  { id: "2", username: "pharmacy", password: "123456", name: "李管理", role: "pharmacy" as UserRole },
  { id: "3", username: "finance", password: "123456", name: "王财务", role: "finance" as UserRole },
  { id: "4", username: "admin", password: "123456", name: "系统管理员", role: "admin" as UserRole },
];

// 认证提供器组件
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // 初始化时检查本地存储的用户信息
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // 登录函数
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 查找匹配的用户
    const foundUser = PRESET_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      // 创建用户对象（不包含密码）
      const loggedInUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        role: foundUser.role
      };
      
      // 存储用户信息
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      
      // 显示成功消息
      toast({
        title: "登录成功",
        description: `欢迎回来，${loggedInUser.name}`,
        duration: 3000,
      });
      
      setIsLoading(false);
      return true;
    } else {
      // 显示错误消息
      toast({
        title: "登录失败",
        description: "用户名或密码错误",
        variant: "destructive",
        duration: 3000,
      });
      
      setIsLoading(false);
      return false;
    }
  };

  // 登出函数
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    toast({
      title: "已退出登录",
      duration: 2000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义Hook使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
