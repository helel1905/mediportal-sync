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
import { useAuth } from "@/contexts/AuthContext";
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
  // 张医生的15个新增患者（均匀分布在不同状态）
  // 5个候诊患者
  {
    id: "P20230009",
    name: "张志远",
    gender: "male",
    age: 45,
    birthDate: "1978-03-24",
    status: "waiting",
    registerTime: new Date(Date.now() - 12 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: false,
  },
  {
    id: "P20230010",
    name: "林小燕",
    gender: "female",
    age: 29,
    birthDate: "1994-07-18",
    status: "waiting",
    registerTime: new Date(Date.now() - 18 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: false,
  },
  {
    id: "P20230011",
    name: "陈大力",
    gender: "male",
    age: 57,
    birthDate: "1966-11-05",
    status: "waiting",
    registerTime: new Date(Date.now() - 25 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: true,
    hasPrescription: false,
  },
  {
    id: "P20230012",
    name: "王丽丽",
    gender: "female",
    age: 33,
    birthDate: "1990-09-12",
    status: "waiting",
    registerTime: new Date(Date.now() - 8 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: false,
  },
  {
    id: "P20230013",
    name: "李强强",
    gender: "male",
    age: 41,
    birthDate: "1982-05-28",
    status: "waiting",
    registerTime: new Date(Date.now() - 32 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: false,
  },
  // 5个诊中患者
  {
    id: "P20230014",
    name: "徐婷婷",
    gender: "female",
    age: 26,
    birthDate: "1997-02-14",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 55 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: false,
  },
  {
    id: "P20230015",
    name: "赵明明",
    gender: "male",
    age: 38,
    birthDate: "1985-08-22",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 65 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: true,
    isSenior: false,
    hasPrescription: false,
  },
  {
    id: "P20230016",
    name: "周倩倩",
    gender: "female",
    age: 31,
    birthDate: "1992-04-10",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 75 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: false,
  },
  {
    id: "P20230017",
    name: "刘建国",
    gender: "male",
    age: 67,
    birthDate: "1956-10-01",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 85 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: true,
    hasPrescription: false,
  },
  {
    id: "P20230018",
    name: "张丽娟",
    gender: "female",
    age: 45,
    birthDate: "1978-12-05",
    status: "in-treatment",
    registerTime: new Date(Date.now() - 95 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: false,
  },
  // 5个完成患者
  {
    id: "P20230019",
    name: "王志强",
    gender: "male",
    age: 52,
    birthDate: "1971-06-30",
    status: "completed",
    registerTime: new Date(Date.now() - 150 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: true,
    hasPrescription: true,
  },
  {
    id: "P20230020",
    name: "李晓晓",
    gender: "female",
    age: 29,
    birthDate: "1994-11-22",
    status: "completed",
    registerTime: new Date(Date.now() - 165 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: true,
  },
  {
    id: "P20230021",
    name: "钱小宝",
    gender: "male",
    age: 6,
    birthDate: "2017-08-14",
    status: "completed",
    registerTime: new Date(Date.now() - 180 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: true,
  },
  {
    id: "P20230022",
    name: "郑美丽",
    gender: "female",
    age: 34,
    birthDate: "1989-03-25",
    status: "completed",
    registerTime: new Date(Date.now() - 195 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: false,
    hasPrescription: true,
  },
  {
    id: "P20230023",
    name: "黄大山",
    gender: "male",
    age: 61,
    birthDate: "1962-12-08",
    status: "completed",
    registerTime: new Date(Date.now() - 210 * 60 * 1000),
    department: "内科/消化内科",
    doctor: "张医生",
    doctorTitle: "主任医师",
    isMultipleDoctor: false,
    isSenior: true,
    hasPrescription: true,
  },
];

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
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState(user?.role === "doctor" ? user.name : "all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<string>("records");
  const [prescriptionFilter, setPrescriptionFilter] = useState<"all" | "withPrescription" | "withoutPrescription">("all");
  const [showingMedicalInsurance, setShowingMedicalInsurance] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [idCardPreview, setIdCardPreview] = useState(false);
  const [geneticReport, setGeneticReport] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const { toast } = useToast();

  // 搜索和筛选逻辑
  const filteredPatients = (() => {
    // 首先按照医生筛选
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
    // 如果当前用户是医生，重置为当前医生，否则重置为全部
    if (user?.role === "doctor") {
      setDoctorFilter(user.name);
    } else {
      setDoctorFilter("all");
    }
    
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

  // 查看处方
  const handleViewPrescription = (patient: any) => {
    setCurrentPatient(patient);
    setShowPrescriptionDialog(true);
  };

  // 创建新处方
  const handleCreatePrescription = (patient: any) => {
    setCurrentPatient(patient);
    toast({
      title: "创建新处方",
      description: `为患者 ${patient.name} 创建新处方`,
      duration: 3000,
    });
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
                              <div className="flex items-center gap-
