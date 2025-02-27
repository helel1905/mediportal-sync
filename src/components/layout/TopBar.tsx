
import React from "react";
import { Menu, Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TopBarProps {
  toggleSidebar: () => void;
  userRole: string;
}

export const TopBar = ({ toggleSidebar, userRole }: TopBarProps) => {
  const getRoleLabel = (): string => {
    switch (userRole) {
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
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="ml-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索..."
                className="pl-10 w-64 h-9 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>通知</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">新处方等待审核</p>
                    <p className="text-sm text-gray-500">5分钟前</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">有4个药品库存不足</p>
                    <p className="text-sm text-gray-500">30分钟前</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">系统维护通知</p>
                    <p className="text-sm text-gray-500">今天 08:00</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">张医生</p>
                  <p className="text-xs text-gray-500">{getRoleLabel()}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>个人资料</DropdownMenuItem>
              <DropdownMenuItem>设置</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
