
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import PatientTableRow from "./PatientTableRow";

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
                  <PatientTableRow
                    key={patient.id}
                    patient={patient}
                    onStatusChange={onStatusChange}
                    onViewInsurance={onViewInsurance}
                    onViewIdCard={onViewIdCard}
                    onViewGeneticReport={onViewGeneticReport}
                    onGotoDepartmentQueue={onGotoDepartmentQueue}
                    onViewPrescription={onViewPrescription}
                    onCreatePrescription={onCreatePrescription}
                  />
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
