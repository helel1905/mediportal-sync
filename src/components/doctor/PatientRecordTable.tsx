
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Barcode,
  Clock,
  ChevronDown,
  Eye,
  Edit,
  FileDown,
  FilePlus,
  UserCircle,
  UserCircle2,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeTime, isOverdue } from "@/hooks/usePatientData";

interface PatientRecordTableProps {
  patients: any[];
  onStatusChange: (patientId: string, newStatus: string) => void;
  onViewInsurance: (patient: any) => void;
  onViewIdCard: (patient: any) => void;
  onViewGeneticReport: (patient: any) => void;
  onGotoDepartmentQueue: (department: string) => void;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
}

const PatientRecordTable: React.FC<PatientRecordTableProps> = ({
  patients,
  onStatusChange,
  onViewInsurance,
  onViewIdCard,
  onViewGeneticReport,
  onGotoDepartmentQueue,
  onViewPrescription,
  onCreatePrescription,
}) => {
  return (
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
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    未找到符合条件的患者
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
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
                                onClick={() => onViewInsurance(patient)}
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
                              onClick={() => onViewIdCard(patient)}
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
                              onClick={() => onViewGeneticReport(patient)}
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
                            onClick={() => onStatusChange(patient.id, "waiting")}
                            className="text-blue-600"
                          >
                            候诊
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onStatusChange(patient.id, "in-treatment")}
                            className="text-yellow-600"
                          >
                            诊中
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onStatusChange(patient.id, "completed")}
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
                        onClick={() => onGotoDepartmentQueue(patient.department)}
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
                            onClick={() => onViewPrescription(patient)}
                          >
                            <FileDown className="h-4 w-4" />
                            处方
                          </Button>
                        ) : (
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="h-8 flex items-center gap-1"
                            onClick={() => onCreatePrescription(patient)}
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
  );
};

export default PatientRecordTable;
