
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Filter,
  Barcode,
  User,
  Clock,
  Eye,
  Edit,
  ChevronDown,
  UserCircle,
  UserCircle2,
  Users,
  Bell,
} from "lucide-react";

// 模拟数据
const mockPatients = [
  {
    id: "P20230001",
    name: "王明",
    gender: "male",
    age: 35,
    birthDate: "1988-06-15",
    status: "waiting",
    registerTime: new Date(Date.now() - 15 * 60 * 1000), // 15分钟前
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
  },
  {
    id: "P20230002",
    name: "李华",
    gender: "male",
    age: 28,
    birthDate: "1995-03-22",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 45 * 60 * 1000), // 45分钟前
    department: "外科/骨科",
    doctor: "陈医生",
    doctorTitle: "副主任医师",
    isMultipleDoctor: false,
    isSenior: false,
  },
  {
    id: "P20230003",
    name: "张丽",
    gender: "female",
    age: 42,
    birthDate: "1981-11-10",
    status: "completed",
    registerTime: new Date(Date.now() - 120 * 60 * 1000), // 2小时前
    department: "妇产科/产科",
    doctor: "王医生",
    doctorTitle: "主治医师",
    isMultipleDoctor: false,
    isSenior: false,
  },
  {
    id: "P20230004",
    name: "赵伟",
    gender: "male",
    age: 65,
    birthDate: "1958-08-05",
    status: "waiting",
    registerTime: new Date(Date.now() - 10 * 60 * 1000), // 10分钟前
    department: "内科/心血管内科",
    doctor: "李医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: true,
    isSenior: true,
  },
  {
    id: "P20230005",
    name: "陈静",
    gender: "female",
    age: 31,
    birthDate: "1992-12-18",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前
    department: "耳鼻喉科",
    doctor: "吴医生",
    doctorTitle: "副主任医师",
    isMultipleDoctor: false,
    isSenior: false,
  },
  {
    id: "P20230006",
    name: "吴强",
    gender: "male",
    age: 53,
    birthDate: "1970-09-25",
    status: "waiting",
    registerTime: new Date(Date.now() - 5 * 60 * 1000), // 5分钟前
    department: "外科/神经外科",
    doctor: "刘医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
  },
  {
    id: "P20230007",
    name: "刘敏",
    gender: "other",
    age: 27,
    birthDate: "1996-04-30",
    status: "completed",
    registerTime: new Date(Date.now() - 180 * 60 * 1000), // 3小时前
    department: "精神科",
    doctor: "郑医生",
    doctorTitle: "主治医师",
    isMultipleDoctor: false,
    isSenior: false,
  },
  {
    id: "P20230008",
    name: "周芳",
    gender: "female",
    age: 62,
    birthDate: "1961-07-12",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 60 * 60 * 1000), // 1小时前
    department: "内科/呼吸内科",
    doctor: "孙医生",
    doctorTitle: "副主任医师",
    isMultipleDoctor: true,
    isSenior: true,
  },
];

// 格式化相对时间
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else {
    return `${diffDays}天前`;
  }
};

// 是否超时未接诊
const isOverdue = (date: Date, status: string) => {
  if (status !== "waiting") return false;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  return diffMins > 30; // 超过30分钟未接诊视为超时
};

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showingMedicalInsurance, setShowingMedicalInsurance] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [idCardPreview, setIdCardPreview] = useState(false);
  const [geneticReport, setGeneticReport] = useState(false);
  const { toast } = useToast();

  // 搜索和筛选逻辑
  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.includes(searchTerm) ||
      patient.id.includes(searchTerm);
    
    const matchesDepartment =
      departmentFilter === "all" || patient.department.includes(departmentFilter);
    
    const matchesStatus =
      statusFilter === "all" || 
      (statusFilter === "waiting" && patient.status === "waiting") ||
      (statusFilter === "in-treatment" && patient.status === "in-treatment") ||
      (statusFilter === "completed" && patient.status === "completed");
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // 查看当前叫号患者
  const handleViewCurrentPatient = () => {
    const currentPatient = mockPatients.find(p => p.status === "in-treatment");
    if (currentPatient) {
      setCurrentPatient(currentPatient);
      toast({
        title: "当前就诊患者",
        description: `${currentPatient.name}，${currentPatient.department}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "没有正在就诊的患者",
        description: "当前没有患者正在接受诊断",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // 改变患者状态
  const handleStatusChange = (patientId: string, newStatus: string) => {
    toast({
      title: "状态已更新",
      description: `患者 ${patientId} 状态已更改为 ${
        newStatus === "waiting"
          ? "候诊"
          : newStatus === "in-treatment"
          ? "诊中"
          : "完成"
      }`,
      duration: 3000,
    });
  };

  // 查看医保信息
  const handleViewInsurance = (patient: any) => {
    setCurrentPatient(patient);
    setShowingMedicalInsurance(true);
  };

  // 查看身份证
  const handleViewIdCard = (patient: any) => {
    setCurrentPatient(patient);
    setIdCardPreview(true);
  };

  // 查看基因报告
  const handleViewGeneticReport = (patient: any) => {
    setCurrentPatient(patient);
    setGeneticReport(true);
  };

  // 跳转到科室队列
  const handleGotoDepartmentQueue = (department: string) => {
    toast({
      title: "即将跳转",
      description: `跳转到${department}候诊队列`,
      duration: 3000,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">病历查询</h1>
          <Button 
            onClick={handleViewCurrentPatient}
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            当前叫号
          </Button>
        </div>

        {/* 筛选和搜索区域 */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索患者姓名或ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择科室" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有科室</SelectItem>
                  <SelectItem value="内科">内科</SelectItem>
                  <SelectItem value="外科">外科</SelectItem>
                  <SelectItem value="妇产科">妇产科</SelectItem>
                  <SelectItem value="儿科">儿科</SelectItem>
                  <SelectItem value="精神科">精神科</SelectItem>
                  <SelectItem value="耳鼻喉科">耳鼻喉科</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="就诊状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有状态</SelectItem>
                  <SelectItem value="waiting">候诊</SelectItem>
                  <SelectItem value="in-treatment">诊中</SelectItem>
                  <SelectItem value="completed">完成</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  高级筛选
                </Button>
                <Button variant="outline">重置</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 患者表格 */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>患者ID</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>年龄</TableHead>
                    <TableHead>性别</TableHead>
                    <TableHead>就诊状态</TableHead>
                    <TableHead>挂号时间</TableHead>
                    <TableHead>科室</TableHead>
                    <TableHead>主治医生</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        未找到符合条件的患者
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        {/* 患者ID */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleViewInsurance(patient)}
                                  >
                                    <Barcode className="h-4 w-4 text-primary" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>查看医保信息</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <span>{patient.id}</span>
                          </div>
                        </TableCell>

                        {/* 姓名 */}
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="link"
                                  className="p-0 h-auto font-normal"
                                  onClick={() => handleViewIdCard(patient)}
                                >
                                  {patient.name} {patient.gender === "male" ? "先生" : "女士"}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>查看身份证照片</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>

                        {/* 年龄 */}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {patient.age}岁
                            {patient.isSenior && (
                              <span className="text-yellow-500 text-lg">⚠</span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              ({patient.birthDate})
                            </span>
                          </div>
                        </TableCell>

                        {/* 性别 */}
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleViewGeneticReport(patient)}
                                >
                                  {patient.gender === "male" ? (
                                    <UserCircle className="h-5 w-5 text-blue-500" />
                                  ) : patient.gender === "female" ? (
                                    <UserCircle2 className="h-5 w-5 text-pink-500" />
                                  ) : (
                                    <Users className="h-5 w-5 text-purple-500" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>查看基因报告</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>

                        {/* 就诊状态 */}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`px-2 py-1 h-auto ${
                                  patient.status === "waiting"
                                    ? "text-blue-700 bg-blue-50 hover:bg-blue-100"
                                    : patient.status === "in-treatment"
                                    ? "text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                                    : "text-green-700 bg-green-50 hover:bg-green-100"
                                }`}
                              >
                                {patient.status === "waiting"
                                  ? "候诊"
                                  : patient.status === "in-treatment"
                                  ? "诊中"
                                  : "完成"}
                                <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(patient.id, "waiting")}
                                className="text-blue-600"
                              >
                                候诊
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(patient.id, "in-treatment")}
                                className="text-yellow-600"
                              >
                                诊中
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(patient.id, "completed")}
                                className="text-green-600"
                              >
                                完成
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                        {/* 挂号时间 */}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className={isOverdue(patient.registerTime, patient.status) ? "text-red-500" : ""}>
                              {formatRelativeTime(patient.registerTime)}
                            </span>
                          </div>
                        </TableCell>

                        {/* 科室 */}
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal"
                            onClick={() => handleGotoDepartmentQueue(patient.department)}
                          >
                            {patient.department}
                          </Button>
                        </TableCell>

                        {/* 主治医生 */}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary font-medium">
                              {patient.doctor.charAt(0)}
                            </div>
                            <span>
                              {patient.doctor}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({patient.doctorTitle})
                              </span>
                            </span>
                            {patient.isMultipleDoctor && (
                              <Badge variant="outline" className="ml-1 h-5 px-1">
                                多医生
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        {/* 操作 */}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 医保信息弹窗 */}
      <Dialog open={showingMedicalInsurance} onOpenChange={setShowingMedicalInsurance}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>医保信息</DialogTitle>
            <DialogDescription>
              患者 {currentPatient?.name} 的医保详情
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center pb-4">
              <div className="border p-4 bg-gray-50 w-48 h-32 flex items-center justify-center">
                <Barcode className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">医保卡号:</span>
                <span className="text-sm">MI{currentPatient?.id.substring(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">医保类型:</span>
                <span className="text-sm">城镇职工医保</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">参保年限:</span>
                <span className="text-sm">8年</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">报销比例:</span>
                <span className="text-sm">75%</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowingMedicalInsurance(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 身份证照片弹窗 */}
      <Dialog open={idCardPreview} onOpenChange={setIdCardPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>身份证照片</DialogTitle>
            <DialogDescription>
              {currentPatient?.name} 的身份证照片核对
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center pb-4">
              <div className="border p-4 bg-gray-50 w-64 h-40 flex items-center justify-center">
                <User className="h-24 w-24 text-gray-300" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">姓名:</span>
                <span className="text-sm">{currentPatient?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">身份证号:</span>
                <span className="text-sm">3****************X</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">出生日期:</span>
                <span className="text-sm">{currentPatient?.birthDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">住址:</span>
                <span className="text-sm">上海市浦东新区</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIdCardPreview(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 基因报告弹窗 */}
      <Dialog open={geneticReport} onOpenChange={setGeneticReport}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>染色体检测报告</DialogTitle>
            <DialogDescription>
              {currentPatient?.name} 的基因检测结果
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">报告摘要</TabsTrigger>
              <TabsTrigger value="details">详细结果</TabsTrigger>
              <TabsTrigger value="history">检测历史</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="space-y-4 py-4">
              <div className="flex justify-center pb-4">
                <div className="border p-4 bg-gray-50 w-full h-48 flex flex-col items-center justify-center">
                  <div className="text-gray-500 mb-4">
                    {currentPatient?.gender === "male" ? (
                      <UserCircle className="h-12 w-12 text-blue-500" />
                    ) : currentPatient?.gender === "female" ? (
                      <UserCircle2 className="h-12 w-12 text-pink-500" />
                    ) : (
                      <Users className="h-12 w-12 text-purple-500" />
                    )}
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-medium">
                      染色体核型: {currentPatient?.gender === "male" ? "46,XY" : currentPatient?.gender === "female" ? "46,XX" : "46,XX/XY"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      检测结果: 正常
                    </p>
                    <p className="text-xs text-muted-foreground">
                      检测日期: 2023-01-15
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="py-4">
                <p className="text-sm text-muted-foreground">详细染色体分析结果...</p>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <div className="py-4">
                <p className="text-sm text-muted-foreground">暂无历史检测记录</p>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button onClick={() => setGeneticReport(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default PatientRecords;
