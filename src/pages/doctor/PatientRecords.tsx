
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
                              <div className="flex items-center gap-2">
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
                                >
                                  <Eye className="h-4 w-4" />
                                  查看
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 flex items-center gap-1"
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
                              {patient.hasPrescription ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-primary"
                                  onClick={() => handleViewPrescription(patient)}
                                >
                                  <FileDown className="mr-1 h-4 w-4" />
                                  查看处方
                                </Button>
                              ) : (
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="h-8"
                                  onClick={() => handleCreatePrescription(patient)}
                                >
                                  <FilePlus className="mr-1 h-4 w-4" />
                                  开具处方
                                </Button>
                              )}
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
      </div>

      {/* 医保信息对话框 */}
      <Dialog open={showingMedicalInsurance} onOpenChange={setShowingMedicalInsurance}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>医保信息</DialogTitle>
            <DialogDescription>
              患者 {currentPatient?.name} 的医保信息
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm mb-2">医保卡号: <span className="font-mono">3301****5678</span></p>
              <p className="text-sm mb-2">参保类型: 城镇职工医保</p>
              <p className="text-sm mb-2">报销比例: 85%</p>
              <p className="text-sm">年度累计: ¥1,257.00</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowingMedicalInsurance(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 身份证预览对话框 */}
      <Dialog open={idCardPreview} onOpenChange={setIdCardPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>身份证信息</DialogTitle>
            <DialogDescription>
              患者 {currentPatient?.name} 的身份证照片
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="bg-gray-100 border rounded-md p-6 w-full max-w-xs aspect-[1.58/1] flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="text-xs">中华人民共和国居民身份证</div>
                <div className="text-xs">No. 3301****5678</div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 w-20 h-24"></div>
                <div className="text-sm space-y-1">
                  <p>姓名：{currentPatient?.name}</p>
                  <p>性别：{currentPatient?.gender === "male" ? "男" : "女"}</p>
                  <p>民族：汉</p>
                  <p>出生：{currentPatient?.birthDate}</p>
                  <p className="text-xs">住址：浙江省杭州市西湖区</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIdCardPreview(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 基因报告对话框 */}
      <Dialog open={geneticReport} onOpenChange={setGeneticReport}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>基因检测报告</DialogTitle>
            <DialogDescription>
              患者 {currentPatient?.name} 的基因检测结果
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-semibold mb-2">基因变异检测结果</p>
              <p className="text-xs mb-1">BRCA1/2: <span className="text-green-600">阴性</span></p>
              <p className="text-xs mb-1">TP53: <span className="text-green-600">阴性</span></p>
              <p className="text-xs mb-1">EGFR: <span className="text-yellow-600">变异</span></p>
              <p className="text-xs mb-1">ALK: <span className="text-green-600">阴性</span></p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm font-semibold mb-2">药物代谢基因</p>
              <p className="text-xs mb-1">CYP2D6: <span className="text-yellow-600">慢代谢型</span></p>
              <p className="text-xs mb-1">CYP2C19: <span className="text-green-600">正常代谢型</span></p>
              <p className="text-xs mb-3">VKORC1: <span className="text-red-600">高敏感型</span></p>
              <p className="text-xs text-gray-500">* 患者对华法林等抗凝药物敏感性较高，建议减量使用</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setGeneticReport(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 处方对话框 */}
      <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentPatient?.hasPrescription ? "查看处方" : "开具处方"}</DialogTitle>
            <DialogDescription>
              患者: {currentPatient?.name} ({currentPatient?.id})
            </DialogDescription>
          </DialogHeader>
          {currentPatient?.hasPrescription ? (
            <div className="grid gap-4 py-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium">药品清单</p>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm flex justify-between">
                    <span>阿莫西林胶囊</span>
                    <span className="text-gray-500">0.25g × 3次/日 × 5天</span>
                  </li>
                  <li className="text-sm flex justify-between">
                    <span>布洛芬缓释胶囊</span>
                    <span className="text-gray-500">0.3g × 2次/日 × 3天</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>处方医生：{currentPatient?.doctor}</span>
                <span className="text-gray-500">开具时间：2023-06-15</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <p className="text-sm text-center text-gray-500">表单内容将在此处显示</p>
            </div>
          )}
          <DialogFooter>
            {currentPatient?.hasPrescription ? (
              <Button variant="default" onClick={() => setShowPrescriptionDialog(false)}>
                打印处方
              </Button>
            ) : (
              <Button variant="default" onClick={() => setShowPrescriptionDialog(false)}>
                保存处方
              </Button>
            )}
            <Button variant="secondary" onClick={() => setShowPrescriptionDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default PatientRecords;
