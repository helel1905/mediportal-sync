
import React, { useState, useEffect } from "react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  FileDown,
  FilePlus,
  RotateCcw,
  Stethoscope,
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
    hasPrescription: true,
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
    hasPrescription: false,
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
    hasPrescription: true,
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
    hasPrescription: false,
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
    hasPrescription: true,
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
    hasPrescription: false,
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
    hasPrescription: true,
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
    hasPrescription: true,
  },
];

// 当前登录医生的模拟数据
const currentDoctor = {
  name: "张医生",
  title: "主任医师",
  department: "内科/消化内科",
};

// 医生列表模拟数据
const mockDoctors = [
  { name: "张医生", title: "主任医师", department: "内科/消化内科" },
  { name: "陈医生", title: "副主任医师", department: "外科/骨科" },
  { name: "王医生", title: "主治医师", department: "妇产科/产科" },
  { name: "李医生", title: "主任医师", department: "内科/心血管内科" },
  { name: "吴医生", title: "副主任医师", department: "耳鼻喉科" },
  { name: "刘医生", title: "主任医师", department: "外科/神经外科" },
  { name: "郑医生", title: "主治医师", department: "精神科" },
  { name: "孙医生", title: "副主任医师", department: "内科/呼吸内科" },
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

// 根据状态获取排序优先级
const getStatusPriority = (status: string) => {
  switch (status) {
    case "in-treatment": return 1;
    case "waiting": return 2;
    case "completed": return 3;
    default: return 4;
  }
};

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState(currentDoctor.name);
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<string>("records");
  const [prescriptionFilter, setPrescriptionFilter] = useState<"all" | "withPrescription" | "withoutPrescription">("all");
  const [showingMedicalInsurance, setShowingMedicalInsurance] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [idCardPreview, setIdCardPreview] = useState(false);
  const [geneticReport, setGeneticReport] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [showMedicalRecordDialog, setShowMedicalRecordDialog] = useState(false);
  const [editMedicalRecordDialog, setEditMedicalRecordDialog] = useState(false);
  const { toast } = useToast();

  // 过滤和排序患者列表
  const filteredPatients = (() => {
    // 只显示当前医生的患者
    let result = mockPatients.filter(patient => 
      doctorFilter === "all" || patient.doctor === doctorFilter
    );
    
    // 应用其他筛选条件
    result = result.filter((patient) => {
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
      
      const matchesPrescription = 
        prescriptionFilter === "all" || 
        (prescriptionFilter === "withPrescription" && patient.hasPrescription) ||
        (prescriptionFilter === "withoutPrescription" && !patient.hasPrescription);
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesPrescription;
    });

    // 按状态排序：诊中 > 候诊 > 完成
    result.sort((a, b) => {
      return getStatusPriority(a.status) - getStatusPriority(b.status);
    });
    
    return result;
  })();

  // 重置筛选条件
  const handleResetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("all");
    setStatusFilter("all");
    setPrescriptionFilter("all");
    // 不重置医生筛选，保持当前医生
    toast({
      title: "筛选已重置",
      description: "所有筛选条件已重置为默认值",
      duration: 3000,
    });
  };

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
    // 在实际应用中，这里应该调用API更新状态
    const patient = mockPatients.find(p => p.id === patientId);
    if (patient) {
      patient.status = newStatus as any;
      
      toast({
        title: "状态已更新",
        description: `患者 ${patient.name} 状态已更改为 ${
          newStatus === "waiting"
            ? "候诊"
            : newStatus === "in-treatment"
            ? "诊中"
            : "完成"
        }`,
        duration: 3000,
      });
    }
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

  // 查看病历
  const handleViewMedicalRecord = (patient: any) => {
    setCurrentPatient(patient);
    setShowMedicalRecordDialog(true);
  };

  // 编辑病历
  const handleEditMedicalRecord = (patient: any) => {
    setCurrentPatient(patient);
    setEditMedicalRecordDialog(true);
  };

  // 查看处方
  const handleViewPrescription = (patient: any) => {
    setCurrentPatient(patient);
    setShowPrescriptionDialog(true);
  };

  // 创建新处方
  const handleCreatePrescription = (patient: any) => {
    setCurrentPatient(patient);
    setShowPrescriptionDialog(true);
  };

  // 保存处方并完成就诊
  const handleSavePrescription = () => {
    if (!currentPatient) return;
    
    // 更新处方状态
    const patient = mockPatients.find(p => p.id === currentPatient.id);
    if (patient) {
      patient.hasPrescription = true;
      patient.status = "completed";
      
      toast({
        title: "处方已保存",
        description: `已为患者 ${currentPatient.name} 开具处方并完成就诊`,
        duration: 3000,
      });
      
      setShowPrescriptionDialog(false);
    }
  };

  // 保存病历记录
  const handleSaveMedicalRecord = () => {
    toast({
      title: "病历已保存",
      description: `患者 ${currentPatient?.name} 的病历已更新`,
      duration: 3000,
    });
    setEditMedicalRecordDialog(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">病历查询/处方管理</h1>
            <p className="text-muted-foreground mt-1">管理患者病历并开具电子处方</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleViewCurrentPatient}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Bell className="h-4 w-4" />
              当前叫号
            </Button>
            <Button className="flex items-center gap-2">
              <FilePlus className="h-4 w-4" />
              添加病历
            </Button>
          </div>
        </div>

        <Tabs defaultValue="records" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records">患者病历</TabsTrigger>
            <TabsTrigger value="prescriptions">处方管理</TabsTrigger>
          </TabsList>

          {/* 患者病历选项卡 */}
          <TabsContent value="records" className="mt-6">
            {/* 筛选和搜索区域 */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
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

                  <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                    <SelectTrigger className="flex items-center">
                      <Stethoscope className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="选择医生" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有医生</SelectItem>
                      {mockDoctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                          {doctor.name} ({doctor.title})
                        </SelectItem>
                      ))}
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

                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleResetFilters}
                  >
                    <RotateCcw className="h-4 w-4" />
                    重置筛选
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 患者表格 */}
            <Card className="mt-6">
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
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 flex items-center gap-1"
                                  onClick={() => handleViewMedicalRecord(patient)}
                                >
                                  <Eye className="h-4 w-4" />
                                  查看
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 flex items-center gap-1"
                                  onClick={() => handleEditMedicalRecord(patient)}
                                >
                                  <Edit className="h-4 w-4" />
                                  编辑
                                </Button>
                                {patient.hasPrescription ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 text-primary flex items-center gap-1"
                                    onClick={() => handleViewPrescription(patient)}
                                  >
                                    <FileDown className="h-4 w-4" />
                                    处方
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="default" 
                                    size="sm" 
                                    className="h-8 flex items-center gap-1"
                                    onClick={() => handleCreatePrescription(patient)}
                                  >
                                    <FilePlus className="h-4 w-4" />
                                    开方
                                  </Button>
                                )}
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
          </TabsContent>

          {/* 处方管理选项卡 */}
          <TabsContent value="prescriptions" className="mt-6">
            {/* 筛选和搜索区域 */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
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

                  <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                    <SelectTrigger className="flex items-center">
                      <Stethoscope className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="选择医生" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有医生</SelectItem>
                      {mockDoctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                          {doctor.name} ({doctor.title})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={prescriptionFilter} 
                    onValueChange={(value) => setPrescriptionFilter(value as "all" | "withPrescription" | "withoutPrescription")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="处方状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有患者</SelectItem>
                      <SelectItem value="withPrescription">有处方</SelectItem>
                      <SelectItem value="withoutPrescription">无处方</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleResetFilters}
                  >
                    <RotateCcw className="h-4 w-4" />
                    重置筛选
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 患者处方表格 */}
            <Card className="mt-6">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>患者ID</TableHead>
                        <TableHead>姓名</TableHead>
                        <TableHead>年龄/性别</TableHead>
                        <TableHead>科室</TableHead>
                        <TableHead>主治医生</TableHead>
                        <TableHead>处方状态</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            未找到符合条件的患者
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell>{patient.id}</TableCell>
                            <TableCell>
                              <Button
                                variant="link"
                                className="p-0 h-auto font-normal"
                                onClick={() => handleViewIdCard(patient)}
                              >
                                {patient.name}
                              </Button>
                            </TableCell>
                            <TableCell>
                              {patient.age}岁 / {patient.gender === "male" ? "男" : patient.gender === "female" ? "女" : "其他"}
                            </TableCell>
                            <TableCell>{patient.department}</TableCell>
                            <TableCell>{patient.doctor}</TableCell>
                            <TableCell>
                              {patient.hasPrescription ? (
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                  已开具
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-500">
                                  未开具
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {patient.hasPrescription ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 text-primary flex items-center gap-1"
                                    onClick={() => handleViewPrescription(patient)}
                                  >
                                    <FileDown className="h-4 w-4" />
                                    查看处方
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="default" 
                                    size="sm" 
                                    className="h-8 flex items-center gap-1"
                                    onClick={() => handleCreatePrescription(patient)}
                                  >
                                    <FilePlus className="h-4 w-4" />
                                    开具处方
                                  </Button>
                                )}
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
          </TabsContent>
        </Tabs>

        {/* 医保信息弹窗 */}
        <Dialog open={showingMedicalInsurance} onOpenChange={setShowingMedicalInsurance}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>医保信息</DialogTitle>
              <DialogDescription>
                患者 {currentPatient?.name} 的医保信息
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">医保卡号</p>
                  <p className="text-sm text-muted-foreground">3310251995******</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">医保类型</p>
                  <p className="text-sm text-muted-foreground">城镇职工医保</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">报销比例</p>
                  <p className="text-sm text-muted-foreground">85%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">有效期至</p>
                  <p className="text-sm text-muted-foreground">2025-12-31</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowingMedicalInsurance(false)}>
                关闭
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 身份证信息弹窗 */}
        <Dialog open={idCardPreview} onOpenChange={setIdCardPreview}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>身份证信息</DialogTitle>
              <DialogDescription>
                患者 {currentPatient?.name} 的身份证照片
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <div className="rounded-md bg-gray-100 p-8 text-center">
                <p className="text-sm text-muted-foreground">身份证照片预览区域</p>
              </div>
              
              <div className="grid w-full grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">姓名</p>
                  <p className="text-sm text-muted-foreground">{currentPatient?.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">性别</p>
                  <p className="text-sm text-muted-foreground">
                    {currentPatient?.gender === "male" ? "男" : currentPatient?.gender === "female" ? "女" : "其他"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">出生日期</p>
                  <p className="text-sm text-muted-foreground">{currentPatient?.birthDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">身份证号</p>
                  <p className="text-sm text-muted-foreground">3310********2134</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIdCardPreview(false)}>
                关闭
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 基因报告弹窗 */}
        <Dialog open={geneticReport} onOpenChange={setGeneticReport}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>基因报告</DialogTitle>
              <DialogDescription>
                患者 {currentPatient?.name} 的基因检测报告
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-md bg-gray-100 p-4">
                <p className="text-sm font-medium mb-2">遗传风险评估</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">心血管疾病风险</span>
                    <span className="text-sm font-medium text-yellow-600">中等</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">糖尿病风险</span>
                    <span className="text-sm font-medium text-green-600">低</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">阿尔茨海默病风险</span>
                    <span className="text-sm font-medium text-red-600">高</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-gray-100 p-4">
                <p className="text-sm font-medium mb-2">药物代谢能力</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">华法林</span>
                    <span className="text-sm font-medium text-amber-600">代谢缓慢</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">氯吡格雷</span>
                    <span className="text-sm font-medium text-emerald-600">代谢正常</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setGeneticReport(false)}>
                关闭
              </Button>
              <Button>下载完整报告</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 病历查看弹窗 */}
        <Dialog open={showMedicalRecordDialog} onOpenChange={setShowMedicalRecordDialog}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>病历详情</DialogTitle>
              <DialogDescription>
                患者 {currentPatient?.name} 的病历信息
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">患者姓名</p>
                  <p className="text-sm">{currentPatient?.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">患者ID</p>
                  <p className="text-sm">{currentPatient?.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">年龄</p>
                  <p className="text-sm">{currentPatient?.age}岁</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">性别</p>
                  <p className="text-sm">
                    {currentPatient?.gender === "male" ? "男" : currentPatient?.gender === "female" ? "女" : "其他"}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">主诉</p>
                <p className="text-sm">
                  患者自述{formatRelativeTime(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))}开始出现腹痛、腹泻症状，伴随轻微发热。
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">现病史</p>
                <p className="text-sm">
                  患者3天前进食不洁食物后出现腹痛、腹泻，每日稀便4-5次，无明显血便。自测体温最高38.1℃，服用布洛芬后有所缓解但症状反复。无明显恶心呕吐，食欲下降。
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">既往史</p>
                <p className="text-sm">
                  否认高血压、糖尿病等慢性病史，否认重大手术史，否认药物过敏史。
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">体格检查</p>
                <p className="text-sm">
                  T: 37.6℃，P: 86次/分，R: 20次/分，BP: 120/75mmHg。腹部轻度压痛，无反跳痛，肠鸣音活跃。
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">辅助检查</p>
                <p className="text-sm">
                  血常规：WBC 10.2×10^9/L，中性粒细胞百分比78%。
                  <br />
                  血生化：肝肾功能正常，电解质基本正常。
                  <br />
                  便常规：未见明显异常。
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">诊断</p>
                <p className="text-sm">
                  急性胃肠炎，考虑感染性腹泻。
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">治疗建议</p>
                <p className="text-sm">
                  1. 清淡饮食，避免辛辣刺激食物。<br />
                  2. 补液治疗，口服电解质溶液。<br />
                  3. 蒙脱石散口服，3次/日。<br />
                  4. 双歧杆菌胶囊口服，3次/日。<br />
                  5. 体温超过38.5℃可服用布洛芬缓释胶囊。<br />
                  6. 症状持续或加重请立即就医。
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMedicalRecordDialog(false)}>
                关闭
              </Button>
              <Button onClick={() => {
                setShowMedicalRecordDialog(false);
                setEditMedicalRecordDialog(true);
              }}>
                编辑病历
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 病历编辑弹窗 */}
        <Dialog open={editMedicalRecordDialog} onOpenChange={setEditMedicalRecordDialog}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>编辑病历</DialogTitle>
              <DialogDescription>
                编辑患者 {currentPatient?.name} 的病历信息
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">患者姓名</label>
                  <Input value={currentPatient?.name} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">患者ID</label>
                  <Input value={currentPatient?.id} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">年龄</label>
                  <Input value={currentPatient?.age} readOnly />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">性别</label>
                  <Input 
                    value={currentPatient?.gender === "male" ? "男" : currentPatient?.gender === "female" ? "女" : "其他"} 
                    readOnly 
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">主诉</label>
                <Input 
                  defaultValue="患者自述3天前开始出现腹痛、腹泻症状，伴随轻微发热。" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">现病史</label>
                <Input 
                  defaultValue="患者3天前进食不洁食物后出现腹痛、腹泻，每日稀便4-5次，无明显血便。" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">既往史</label>
                <Input 
                  defaultValue="否认高血压、糖尿病等慢性病史，否认重大手术史，否认药物过敏史。" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">体格检查</label>
                <Input 
                  defaultValue="T: 37.6℃，P: 86次/分，R: 20次/分，BP: 120/75mmHg。腹部轻度压痛，无反跳痛，肠鸣音活跃。" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">辅助检查</label>
                <Input 
                  defaultValue="血常规：WBC 10.2×10^9/L，中性粒细胞百分比78%。" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">诊断</label>
                <Input 
                  defaultValue="急性胃肠炎，考虑感染性腹泻。" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">治疗建议</label>
                <Input 
                  defaultValue="清淡饮食，避免辛辣刺激食物。补液治疗，口服电解质溶液。" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditMedicalRecordDialog(false)}>
                取消
              </Button>
              <Button onClick={handleSaveMedicalRecord}>
                保存病历
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 处方查看/创建弹窗 */}
        <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {currentPatient?.hasPrescription ? "处方详情" : "开具处方"}
              </DialogTitle>
              <DialogDescription>
                {currentPatient?.hasPrescription 
                  ? `查看患者 ${currentPatient?.name} 的处方`
                  : `为患者 ${currentPatient?.name} 开具新处方`
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">患者姓名</p>
                  <p className="text-sm">{currentPatient?.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">患者ID</p>
                  <p className="text-sm">{currentPatient?.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">开方医生</p>
                  <p className="text-sm">{currentPatient?.doctor}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">开方科室</p>
                  <p className="text-sm">{currentPatient?.department}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">诊断</p>
                {currentPatient?.hasPrescription ? (
                  <p className="text-sm">急性胃肠炎，考虑感染性腹泻。</p>
                ) : (
                  <Input defaultValue="急性胃肠炎，考虑感染性腹泻。" />
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">药品列表</p>
                  {!currentPatient?.hasPrescription && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 flex items-center gap-1"
                    >
                      <FilePlus className="h-4 w-4" />
                      添加药品
                    </Button>
                  )}
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>药品名称</TableHead>
                      <TableHead>规格</TableHead>
                      <TableHead>用法用量</TableHead>
                      <TableHead>数量</TableHead>
                      {!currentPatient?.hasPrescription && (
                        <TableHead className="text-right">操作</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>蒙脱石散</TableCell>
                      <TableCell>3g*10袋/盒</TableCell>
                      <TableCell>口服，一次1袋，一日3次</TableCell>
                      <TableCell>2盒</TableCell>
                      {!currentPatient?.hasPrescription && (
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            编辑
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell>双歧杆菌胶囊</TableCell>
                      <TableCell>0.5g*36粒/盒</TableCell>
                      <TableCell>口服，一次2粒，一日3次</TableCell>
                      <TableCell>1盒</TableCell>
                      {!currentPatient?.hasPrescription && (
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            编辑
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell>布洛芬缓释胶囊</TableCell>
                      <TableCell>0.3g*10粒/盒</TableCell>
                      <TableCell>发热时口服，一次1粒，间隔8小时</TableCell>
                      <TableCell>1盒</TableCell>
                      {!currentPatient?.hasPrescription && (
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            编辑
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">特别说明</p>
                {currentPatient?.hasPrescription ? (
                  <p className="text-sm">
                    忌辛辣刺激食物，保持清淡饮食。如症状持续不缓解，请及时复诊。
                  </p>
                ) : (
                  <Input 
                    defaultValue="忌辛辣刺激食物，保持清淡饮食。如症状持续不缓解，请及时复诊。" 
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPrescriptionDialog(false)}
              >
                {currentPatient?.hasPrescription ? "关闭" : "取消"}
              </Button>
              {!currentPatient?.hasPrescription && (
                <Button onClick={handleSavePrescription}>
                  保存处方
                </Button>
              )}
              {currentPatient?.hasPrescription && (
                <Button>
                  打印处方
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default PatientRecords;
