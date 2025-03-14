
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Shield, 
  User, 
  Key,
  UserCog,
  UserCheck,
  ListCheck,
  FileText,
  Settings,
  ClipboardCheck,
  DollarSign,
  Activity 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock permissions data
const PERMISSIONS = [
  { id: "dashboard", name: "仪表盘访问", category: "common" },
  { id: "patient_view", name: "查看病历", category: "doctor" },
  { id: "patient_edit", name: "编辑病历", category: "doctor" },
  { id: "prescription_create", name: "创建处方", category: "doctor" },
  { id: "ai_diagnosis", name: "AI辅助诊断", category: "doctor" },
  { id: "inventory_view", name: "查看药品库存", category: "pharmacy" },
  { id: "inventory_edit", name: "编辑药品库存", category: "pharmacy" },
  { id: "expiry_alerts", name: "效期预警管理", category: "pharmacy" },
  { id: "prescription_verify", name: "处方审核", category: "pharmacy" },
  { id: "accounting", name: "收费对账", category: "finance" },
  { id: "insurance", name: "医保结算", category: "finance" },
  { id: "reports", name: "财务报表", category: "finance" },
  { id: "user_management", name: "用户权限管理", category: "admin" },
  { id: "system_monitoring", name: "系统监控", category: "admin" },
  { id: "data_backup", name: "数据备份", category: "admin" },
];

// Mock roles data
const INITIAL_ROLES = [
  { 
    id: "doctor", 
    name: "医生", 
    description: "可访问病历和处方管理，具有AI辅助诊断功能",
    permissions: ["dashboard", "patient_view", "patient_edit", "prescription_create", "ai_diagnosis"],
    userCount: 15,
    isSystemRole: true,
  },
  { 
    id: "pharmacy", 
    name: "药房管理员", 
    description: "管理药品库存，处理处方审核和药品发放",
    permissions: ["dashboard", "inventory_view", "inventory_edit", "expiry_alerts", "prescription_verify"],
    userCount: 8,
    isSystemRole: true,
  },
  { 
    id: "finance", 
    name: "财务人员", 
    description: "处理收费，医保结算和财务报表",
    permissions: ["dashboard", "accounting", "insurance", "reports"],
    userCount: 5,
    isSystemRole: true,
  },
  { 
    id: "admin", 
    name: "系统管理员", 
    description: "管理所有系统设置，包括用户权限和数据备份",
    permissions: ["dashboard", "user_management", "system_monitoring", "data_backup"],
    userCount: 3,
    isSystemRole: true,
  },
  { 
    id: "custom_role", 
    name: "高级医生", 
    description: "拥有更高级别查询权限的医生",
    permissions: ["dashboard", "patient_view", "patient_edit", "prescription_create", "ai_diagnosis", "reports"],
    userCount: 2,
    isSystemRole: false,
  }
];

const RoleManagement = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPermissionSheetOpen, setIsPermissionSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({ name: "", description: "", permissions: [] as string[] });
  const { toast } = useToast();

  // Handle role creation
  const handleCreateRole = () => {
    if (!newRole.name) {
      toast({
        title: "输入错误",
        description: "角色名称不能为空",
        variant: "destructive",
      });
      return;
    }

    const roleId = newRole.name.toLowerCase().replace(/\s+/g, '_');
    const roleExists = roles.some(role => role.id === roleId);
    
    if (roleExists) {
      toast({
        title: "创建失败",
        description: "已存在同名角色",
        variant: "destructive",
      });
      return;
    }

    const newRoleObj = {
      id: roleId,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
      isSystemRole: false,
    };

    setRoles([...roles, newRoleObj]);
    setNewRole({ name: "", description: "", permissions: [] });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "创建成功",
      description: `角色 "${newRole.name}" 已创建成功`,
    });
  };

  // Handle role update
  const handleUpdateRole = () => {
    if (!currentRole.name) {
      toast({
        title: "输入错误",
        description: "角色名称不能为空",
        variant: "destructive",
      });
      return;
    }

    const updatedRoles = roles.map(role => 
      role.id === currentRole.id 
        ? {...currentRole} 
        : role
    );
    
    setRoles(updatedRoles);
    setIsEditDialogOpen(false);
    setIsPermissionSheetOpen(false);
    
    toast({
      title: "更新成功",
      description: `角色 "${currentRole.name}" 已更新成功`,
    });
  };

  // Handle role deletion
  const handleDeleteRole = () => {
    if (currentRole.userCount > 0) {
      toast({
        title: "删除失败",
        description: `角色 "${currentRole.name}" 目前有 ${currentRole.userCount} 个用户在使用，请先解绑用户`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      return;
    }

    if (currentRole.isSystemRole) {
      toast({
        title: "删除失败",
        description: `角色 "${currentRole.name}" 是系统角色，不能删除`,
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      return;
    }

    const updatedRoles = roles.filter(role => role.id !== currentRole.id);
    setRoles(updatedRoles);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "删除成功",
      description: `角色 "${currentRole.name}" 已删除成功`,
    });
  };

  // Toggle permission checkbox
  const togglePermission = (permissionId: string) => {
    const editingRole = isEditDialogOpen ? currentRole : newRole;
    const setEditingRole = isEditDialogOpen ? setCurrentRole : setNewRole;
    
    if (editingRole.permissions.includes(permissionId)) {
      setEditingRole({
        ...editingRole,
        permissions: editingRole.permissions.filter((id: string) => id !== permissionId)
      });
    } else {
      setEditingRole({
        ...editingRole,
        permissions: [...editingRole.permissions, permissionId]
      });
    }
  };

  // Open role permission sheet
  const openPermissionSheet = (role: any) => {
    setCurrentRole(role);
    setIsPermissionSheetOpen(true);
  };

  // Get permission icon by category
  const getPermissionIcon = (category: string) => {
    switch (category) {
      case "doctor":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "pharmacy":
        return <ClipboardCheck className="h-4 w-4 text-green-500" />;
      case "finance":
        return <DollarSign className="h-4 w-4 text-amber-500" />;
      case "admin":
        return <Settings className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">角色权限管理</h2>
          <p className="text-muted-foreground">创建和管理系统角色，为角色分配不同的权限</p>
        </div>
        <Button onClick={() => {
          setNewRole({ name: "", description: "", permissions: [] });
          setIsCreateDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          新建角色
        </Button>
      </div>

      {/* Role list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            系统角色列表
          </CardTitle>
          <CardDescription>
            当前系统中所有可用的角色，点击权限按钮可为角色分配权限
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">角色名称</TableHead>
                <TableHead className="w-[300px]">角色描述</TableHead>
                <TableHead>权限数量</TableHead>
                <TableHead>使用用户数</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {role.isSystemRole ? (
                        <UserCog className="h-4 w-4 mr-2 text-primary" />
                      ) : (
                        <UserCheck className="h-4 w-4 mr-2 text-green-600" />
                      )}
                      {role.name}
                      {role.isSystemRole && (
                        <Badge variant="secondary" className="ml-2 text-xs">系统</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {role.permissions.length} 项权限
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{role.userCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPermissionSheet(role)}
                      >
                        <Key className="h-4 w-4 mr-1" />
                        权限
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentRole(role);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentRole(role);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Role Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>创建新角色</DialogTitle>
            <DialogDescription>
              创建新的用户角色并分配相应的系统权限
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">角色名称</Label>
              <Input
                id="name"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                placeholder="请输入角色名称"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">角色描述</Label>
              <Input
                id="description"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                placeholder="请输入角色描述"
              />
            </div>

            <div className="mt-2">
              <Label className="mb-2 inline-block">选择权限</Label>
              <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                <div className="space-y-4">
                  {["common", "doctor", "pharmacy", "finance", "admin"].map((category) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium capitalize">
                        {category === "common" ? "通用权限" : 
                         category === "doctor" ? "医生权限" :
                         category === "pharmacy" ? "药房权限" :
                         category === "finance" ? "财务权限" : "管理员权限"}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {PERMISSIONS.filter(p => p.category === category).map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`create-${permission.id}`}
                              checked={newRole.permissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <label
                              htmlFor={`create-${permission.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                            >
                              {getPermissionIcon(permission.category)}
                              <span className="ml-1">{permission.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>取消</Button>
            <Button onClick={handleCreateRole}>创建角色</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑角色</DialogTitle>
            <DialogDescription>
              修改角色信息和权限分配
            </DialogDescription>
          </DialogHeader>

          {currentRole && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">角色名称</Label>
                <Input
                  id="edit-name"
                  value={currentRole.name}
                  onChange={(e) => setCurrentRole({...currentRole, name: e.target.value})}
                  disabled={currentRole.isSystemRole}
                />
                {currentRole.isSystemRole && (
                  <p className="text-xs text-muted-foreground">系统角色名称不可修改</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">角色描述</Label>
                <Input
                  id="edit-description"
                  value={currentRole.description}
                  onChange={(e) => setCurrentRole({...currentRole, description: e.target.value})}
                />
              </div>

              <div className="mt-2">
                <Label className="mb-2 inline-block">选择权限</Label>
                <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                  <div className="space-y-4">
                    {["common", "doctor", "pharmacy", "finance", "admin"].map((category) => (
                      <div key={category} className="space-y-2">
                        <h4 className="text-sm font-medium capitalize">
                          {category === "common" ? "通用权限" : 
                           category === "doctor" ? "医生权限" :
                           category === "pharmacy" ? "药房权限" :
                           category === "finance" ? "财务权限" : "管理员权限"}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {PERMISSIONS.filter(p => p.category === category).map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-${permission.id}`}
                                checked={currentRole.permissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                              />
                              <label
                                htmlFor={`edit-${permission.id}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                              >
                                {getPermissionIcon(permission.category)}
                                <span className="ml-1">{permission.name}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>取消</Button>
            <Button onClick={handleUpdateRole}>保存修改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Permissions Sheet */}
      <Sheet open={isPermissionSheetOpen} onOpenChange={setIsPermissionSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              {currentRole?.name} 权限设置
            </SheetTitle>
            <SheetDescription>
              管理 {currentRole?.name} 角色的系统权限
            </SheetDescription>
          </SheetHeader>

          {currentRole && (
            <div className="py-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{currentRole.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentRole.description}</p>
                </div>
                <Badge variant={currentRole.isSystemRole ? "secondary" : "outline"}>
                  {currentRole.isSystemRole ? "系统角色" : "自定义角色"}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <h3 className="font-medium flex items-center">
                    <ListCheck className="h-4 w-4 mr-2" />
                    已分配权限
                  </h3>
                  <Badge variant="outline" className="ml-2">
                    {currentRole.permissions.length} 项
                  </Badge>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  {["common", "doctor", "pharmacy", "finance", "admin"].map((category) => {
                    // Filter permissions for this category that are assigned to the role
                    const categoryPermissions = PERMISSIONS.filter(
                      p => p.category === category && currentRole.permissions.includes(p.id)
                    );
                    
                    // Skip rendering if no permissions in this category
                    if (categoryPermissions.length === 0) return null;
                    
                    return (
                      <div key={category} className="space-y-2">
                        <h4 className="text-sm font-medium capitalize flex items-center">
                          {category === "common" ? (
                            <>
                              <Activity className="h-4 w-4 mr-1 text-gray-500" />
                              通用权限
                            </>
                          ) : category === "doctor" ? (
                            <>
                              <FileText className="h-4 w-4 mr-1 text-blue-500" />
                              医生权限
                            </>
                          ) : category === "pharmacy" ? (
                            <>
                              <ClipboardCheck className="h-4 w-4 mr-1 text-green-500" />
                              药房权限
                            </>
                          ) : category === "finance" ? (
                            <>
                              <DollarSign className="h-4 w-4 mr-1 text-amber-500" />
                              财务权限
                            </>
                          ) : (
                            <>
                              <Settings className="h-4 w-4 mr-1 text-purple-500" />
                              管理员权限
                            </>
                          )}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {categoryPermissions.map((permission) => (
                            <div key={permission.id} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                              <span className="text-sm">{permission.name}</span>
                              <Checkbox
                                id={`sheet-${permission.id}`}
                                checked={currentRole.permissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <h3 className="font-medium flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    可分配权限
                  </h3>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  {["common", "doctor", "pharmacy", "finance", "admin"].map((category) => {
                    // Filter permissions for this category that are NOT assigned to the role
                    const categoryPermissions = PERMISSIONS.filter(
                      p => p.category === category && !currentRole.permissions.includes(p.id)
                    );
                    
                    // Skip rendering if no permissions in this category
                    if (categoryPermissions.length === 0) return null;
                    
                    return (
                      <div key={`unassigned-${category}`} className="space-y-2">
                        <h4 className="text-sm font-medium capitalize flex items-center">
                          {category === "common" ? (
                            <>
                              <Activity className="h-4 w-4 mr-1 text-gray-500" />
                              通用权限
                            </>
                          ) : category === "doctor" ? (
                            <>
                              <FileText className="h-4 w-4 mr-1 text-blue-500" />
                              医生权限
                            </>
                          ) : category === "pharmacy" ? (
                            <>
                              <ClipboardCheck className="h-4 w-4 mr-1 text-green-500" />
                              药房权限
                            </>
                          ) : category === "finance" ? (
                            <>
                              <DollarSign className="h-4 w-4 mr-1 text-amber-500" />
                              财务权限
                            </>
                          ) : (
                            <>
                              <Settings className="h-4 w-4 mr-1 text-purple-500" />
                              管理员权限
                            </>
                          )}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {categoryPermissions.map((permission) => (
                            <div key={permission.id} className="flex items-center justify-between p-2 rounded-md bg-background border">
                              <span className="text-sm">{permission.name}</span>
                              <Checkbox
                                id={`sheet-unassigned-${permission.id}`}
                                checked={currentRole.permissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <SheetFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsPermissionSheetOpen(false)}>取消</Button>
            <Button onClick={handleUpdateRole}>保存修改</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Delete Role Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>确认删除角色</DialogTitle>
            <DialogDescription>
              {currentRole && currentRole.userCount > 0 
                ? `无法删除角色 "${currentRole.name}"，因为目前有 ${currentRole.userCount} 个用户在使用此角色。请先解绑用户。`
                : currentRole && currentRole.isSystemRole
                ? `无法删除系统角色 "${currentRole?.name}"。系统角色不允许删除。`
                : `您确定要删除角色 "${currentRole?.name}" 吗？此操作无法撤销。`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteRole}
              disabled={currentRole && (currentRole.userCount > 0 || currentRole.isSystemRole)}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
