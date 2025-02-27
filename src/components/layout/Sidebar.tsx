
import React from "react";
import {
  ChevronLeft,
  LayoutDashboard,
  FileText,
  Brain,
  Stethoscope,
  Pill,
  Clock,
  ClipboardList,
  DollarSign,
  CreditCard,
  FileBarChart,
  Users,
  Activity,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export const Sidebar = ({ isOpen, currentRole, onRoleChange }: SidebarProps) => {
  // Menu items based on user role
  const menuItems = {
    doctor: [
      { name: "仪表盘", icon: <LayoutDashboard size={20} />, path: "/" },
      { name: "病历查询", icon: <FileText size={20} />, path: "/patient-records" },
      { name: "AI辅助诊断", icon: <Brain size={20} />, path: "/ai-diagnosis" },
      { name: "电子处方", icon: <Stethoscope size={20} />, path: "/prescriptions" },
    ],
    pharmacy: [
      { name: "仪表盘", icon: <LayoutDashboard size={20} />, path: "/" },
      { name: "药品库存", icon: <Pill size={20} />, path: "/inventory" },
      { name: "效期预警", icon: <Clock size={20} />, path: "/expiry-alerts" },
      { name: "处方审核", icon: <ClipboardList size={20} />, path: "/prescription-review" },
    ],
    finance: [
      { name: "仪表盘", icon: <LayoutDashboard size={20} />, path: "/" },
      { name: "收费对账", icon: <DollarSign size={20} />, path: "/accounting" },
      { name: "医保结算", icon: <CreditCard size={20} />, path: "/insurance" },
      { name: "财务报表", icon: <FileBarChart size={20} />, path: "/reports" },
    ],
    admin: [
      { name: "仪表盘", icon: <LayoutDashboard size={20} />, path: "/" },
      { name: "用户权限", icon: <Users size={20} />, path: "/user-management" },
      { name: "系统监控", icon: <Activity size={20} />, path: "/monitoring" },
      { name: "数据备份", icon: <Database size={20} />, path: "/backups" },
    ],
  };

  // Role options for quick role switching (demo purposes)
  const roleOptions = [
    { id: "doctor", name: "医生" },
    { id: "pharmacy", name: "药房管理员" },
    { id: "finance", name: "财务人员" },
    { id: "admin", name: "系统管理员" },
  ];

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0"
      )}
    >
      {isOpen && (
        <>
          {/* Logo and header */}
          <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold">HM</span>
              </div>
              <h1 className="text-xl font-semibold text-primary">医院管理系统</h1>
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="mb-6">
              <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {roleOptions.find(r => r.id === currentRole)?.name} 功能
              </h2>
              <ul className="mt-2 space-y-1">
                {currentRole && menuItems[currentRole as keyof typeof menuItems]?.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "sidebar-item",
                          isActive ? "sidebar-item-active" : ""
                        )
                      }
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Role selector (for demo) */}
            <div className="px-4 mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                角色切换 (演示)
              </h2>
              <div className="space-y-1">
                {roleOptions.map((role) => (
                  <Button
                    key={role.id}
                    variant={currentRole === role.id ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onRoleChange(role.id)}
                  >
                    {role.name}
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </aside>
  );
};
