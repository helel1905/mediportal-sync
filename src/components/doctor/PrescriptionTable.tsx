
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
import { Card, CardContent } from "@/components/ui/card";
import { FileDown, FilePlus } from "lucide-react";

interface PrescriptionTableProps {
  patients: any[];
  onViewIdCard: (patient: any) => void;
  onViewPrescription: (patient: any) => void;
  onCreatePrescription: (patient: any) => void;
}

const PrescriptionTable: React.FC<PrescriptionTableProps> = ({
  patients,
  onViewIdCard,
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
                <TableHead>年龄/性别</TableHead>
                <TableHead>科室</TableHead>
                <TableHead>主治医生</TableHead>
                <TableHead>处方状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    未找到符合条件的患者
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => onViewIdCard(patient)}
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
                          onClick={() => onViewPrescription(patient)}
                        >
                          <FileDown className="mr-1 h-4 w-4" />
                          查看处方
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8"
                          onClick={() => onCreatePrescription(patient)}
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
  );
};

export default PrescriptionTable;
