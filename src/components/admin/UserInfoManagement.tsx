
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  User, 
  Users, 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  KeyRound, 
  Shield, 
  UserCog,
  Mail,
  Phone,
  Building,
  Calendar,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { UserRole } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// User departments
const DEPARTMENTS = [
  { id: "internal", name: "内科" },
  { id: "surgery", name: "外科" },
  { id: "pediatrics", name: "儿科" },
  { id: "gynecology", name: "妇产科" },
  { id: "pharmacy", name: "药房" },
  { id: "finance", name: "财务部" },
  { id: "admin", name: "行政部" },
  { id: "it", name: "信息技术部" },
];

// Mock roles data
const ROLES = [
  { id: "doctor", name: "医生" },
  { id: "pharmacy", name: "药房管理员" },
  { id: "finance", name: "财务人员" },
  { id: "admin", name: "系统管理员" },
  { id: "custom_role", name: "高级医生" },
];

// Mock user data
const INITIAL_USERS = [
  { 
    id: "1", 
    username: "doctor1", 
    name: "张医生", 
    role: "doctor", 
    department: "internal",
    email: "doctor1@hospital.com",
    phone: "13812345678",
    joinDate: "2022-05-15",
    status: "active",
    lastLogin: "2023-07-15 14:30"
  },
  { 
    id: "2", 
    username: "pharmacy1", 
    name: "李管理", 
    role: "pharmacy", 
    department: "pharmacy",
    email: "pharmacy1@hospital.com",
    phone: "13987654321",
    joinDate: "2022-03-10",
    status: "active",
    lastLogin: "2023-07-14 16:45"
  },
  { 
    id: "3", 
    username: "finance1", 
    name: "王财务", 
    role: "finance", 
    department: "finance",
    email: "finance1@hospital.com",
    phone: "13567891234",
    joinDate: "2022-04-20",
    status: "active",
    lastLogin: "2023-07-15 09:15"
  },
  { 
    id: "4", 
    username: "admin1", 
    name: "系统管理员", 
    role: "admin", 
    department: "admin",
    email: "admin@hospital.com",
    phone: "13900001111",
    joinDate: "2022-01-01",
    status: "active",
    lastLogin: "2023-07-15 10:30"
  },
  { 
    id: "5", 
    username: "doctor2", 
    name: "刘医生", 
    role: "custom_role", 
    department: "surgery",
    email: "doctor2@hospital.com",
    phone: "13711112222",
    joinDate: "2022-06-01",
    status: "inactive",
    lastLogin: "2023-06-30 11:20"
  }
];

const UserInfoManagement = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [isUserDetailSheetOpen, setIsUserDetailSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { toast } = useToast();
  
  // Create user form 
  const form = useForm({
    defaultValues: {
      username: "",
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      status: true,
    },
  });

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      ROLES.find(r => r.id === user.role)?.name.toLowerCase().includes(searchLower) ||
      DEPARTMENTS.find(d => d.id === user.department)?.name.toLowerCase().includes(searchLower)
    );
  });

  // Handle user creation
  const onCreateUser = (data: any) => {
    const newUser = {
      id: String(users.length + 1),
      username: data.username,
      name: data.name,
      role: data.role,
      department: data.department,
      email: data.email,
      phone: data.phone,
      joinDate: new Date().toISOString().split('T')[0],
      status: data.status ? "active" : "inactive",
      lastLogin: "-"
    };

    setUsers([...users, newUser]);
    setIsUserDialogOpen(false);
    form.reset();
    
    toast({
      title: "创建成功",
      description: `用户 "${data.name}" 已创建成功`,
    });
  };

  // Handle user update
  const handleUpdateUser = () => {
    if (!currentUser) return;

    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? currentUser : user
    );
    
    setUsers(updatedUsers);
    setIsUserDetailSheetOpen(false);
    
    toast({
      title: "更新成功",
      description: `用户 "${currentUser.name}" 信息已更新成功`,
    });
  };

  // Handle user deletion
  const handleDeleteUser = () => {
    if (!currentUser) return;

    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "删除成功",
      description: `用户 "${currentUser.name}" 已删除成功`,
    });
  };

  // Handle password reset
  const handleResetPassword = () => {
    setIsResetPasswordDialogOpen(false);
    
    toast({
      title: "密码重置成功",
      description: `用户 "${currentUser?.name}" 的密码已重置为默认密码`,
    });
  };

  // Get department name from id
  const getDepartmentName = (departmentId: string) => {
    return DEPARTMENTS.find(dept => dept.id === departmentId)?.name || departmentId;
  };

  // Get role name from id
  const getRoleName = (roleId: string) => {
    return ROLES.find(role => role.id === roleId)?.name || roleId;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">用户信息管理</h2>
          <p className="text-muted-foreground">创建和管理系统用户，分配角色权限</p>
        </div>
        <Button onClick={() => {
          form.reset();
          setIsUserDialogOpen(true);
        }}>
          <UserPlus className="h-4 w-4 mr-2" />
          新建用户
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索用户姓名、账号、邮箱..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select defaultValue="all-roles">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="按角色筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-roles">全部角色</SelectItem>
            {ROLES.map(role => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select defaultValue="all-departments">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="按部门筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-departments">全部部门</SelectItem>
            {DEPARTMENTS.map(dept => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* User list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="h-5 w-5 mr-2 text-primary" />
            系统用户列表
          </CardTitle>
          <CardDescription>
            当前系统中的所有用户账号，点击用户可查看详细信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">用户姓名</TableHead>
                <TableHead>账号</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>联系邮箱</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的用户
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      setCurrentUser(user);
                      setIsEditing(false);
                      setIsUserDetailSheetOpen(true);
                    }}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{getDepartmentName(user.department)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center w-fit">
                        <Shield className="h-3 w-3 mr-1" />
                        {getRoleName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className={cn(
                          "w-fit",
                          user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100/80' : ''
                        )}
                      >
                        {user.status === 'active' ? '已激活' : '未激活'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="end">
                          <div className="grid gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="justify-start font-normal"
                              onClick={() => {
                                setCurrentUser(user);
                                setIsEditing(true);
                                setIsUserDetailSheetOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              编辑用户
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="justify-start font-normal"
                              onClick={() => {
                                setCurrentUser(user);
                                setIsResetPasswordDialogOpen(true);
                              }}
                            >
                              <KeyRound className="h-4 w-4 mr-2" />
                              重置密码
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="justify-start text-destructive font-normal"
                              onClick={() => {
                                setCurrentUser(user);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除用户
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>创建新用户</DialogTitle>
            <DialogDescription>
              创建新的系统用户账号和基本信息
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onCreateUser)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户账号</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入登录账号" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户姓名</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入用户姓名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户角色</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择用户角色" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ROLES.map(role => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>所属部门</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择所属部门" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DEPARTMENTS.map(dept => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱地址</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="请输入邮箱地址" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>联系电话</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入联系电话" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">账号状态</FormLabel>
                      <FormDescription>
                        设置用户账号的激活状态
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUserDialogOpen(false)}
                >
                  取消
                </Button>
                <Button type="submit">创建用户</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* User Detail Sheet */}
      <Sheet open={isUserDetailSheetOpen} onOpenChange={setIsUserDetailSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              {isEditing ? "编辑用户信息" : "用户详细信息"}
            </SheetTitle>
            <SheetDescription>
              {isEditing ? "修改用户的基本信息和权限" : "查看用户的详细信息"}
            </SheetDescription>
          </SheetHeader>

          {currentUser && (
            <div className="py-6 space-y-6">
              {!isEditing ? (
                // View mode
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          {getRoleName(currentUser.role)}
                        </Badge>
                        <Badge 
                          variant={currentUser.status === 'active' ? 'default' : 'secondary'}
                          className={cn(
                            currentUser.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100/80' : ''
                          )}
                        >
                          {currentUser.status === 'active' ? '已激活' : '未激活'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border rounded-md p-4">
                    <div className="grid grid-cols-[24px_1fr] gap-x-4 items-center">
                      <UserCheck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">用户账号</p>
                        <p className="font-medium">{currentUser.username}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-x-4 items-center">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">邮箱地址</p>
                        <p className="font-medium">{currentUser.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-x-4 items-center">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">联系电话</p>
                        <p className="font-medium">{currentUser.phone}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-x-4 items-center">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">所属部门</p>
                        <p className="font-medium">{getDepartmentName(currentUser.department)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-x-4 items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">加入日期</p>
                        <p className="font-medium">{currentUser.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[24px_1fr] gap-x-4 items-center">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">最近登录时间</p>
                        <p className="font-medium">{currentUser.lastLogin}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsUserDetailSheetOpen(false)}
                    >
                      关闭
                    </Button>
                    <Button
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      编辑信息
                    </Button>
                  </div>
                </div>
              ) : (
                // Edit mode
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-username">用户账号</Label>
                      <Input
                        id="edit-username"
                        value={currentUser.username}
                        onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-name">用户姓名</Label>
                      <Input
                        id="edit-name"
                        value={currentUser.name}
                        onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-role">用户角色</Label>
                      <Select
                        value={currentUser.role}
                        onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
                      >
                        <SelectTrigger id="edit-role">
                          <SelectValue placeholder="选择用户角色" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map(role => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-department">所属部门</Label>
                      <Select
                        value={currentUser.department}
                        onValueChange={(value) => setCurrentUser({...currentUser, department: value})}
                      >
                        <SelectTrigger id="edit-department">
                          <SelectValue placeholder="选择所属部门" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map(dept => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-email">邮箱地址</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={currentUser.email}
                        onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-phone">联系电话</Label>
                      <Input
                        id="edit-phone"
                        value={currentUser.phone}
                        onChange={(e) => setCurrentUser({...currentUser, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">账号状态</Label>
                      <p className="text-sm text-muted-foreground">
                        设置用户账号的激活状态
                      </p>
                    </div>
                    <Switch
                      checked={currentUser.status === 'active'}
                      onCheckedChange={(checked) => 
                        setCurrentUser({...currentUser, status: checked ? 'active' : 'inactive'})
                      }
                    />
                  </div>
                  
                  <SheetFooter className="pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleUpdateUser}
                    >
                      保存修改
                    </Button>
                  </SheetFooter>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>重置用户密码</DialogTitle>
            <DialogDescription>
              确认重置用户 "{currentUser?.name}" 的密码？密码将被重置为系统默认密码。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleResetPassword}>
              确认重置
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>删除用户</DialogTitle>
            <DialogDescription>
              确认删除用户 "{currentUser?.name}"？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserInfoManagement;
