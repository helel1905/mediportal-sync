
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Check, User, ClipboardList } from "lucide-react";

interface PrescriptionConfirmationProps {
  selectedPatient: any;
  selectedMedicines: any[];
  diagnosis: string;
  prescriptionNotes: string;
  totalPrice: number;
  insurancePayment: number;
  selfPayment: number;
}

const PrescriptionConfirmation: React.FC<PrescriptionConfirmationProps> = ({
  selectedPatient,
  selectedMedicines,
  diagnosis,
  prescriptionNotes,
  totalPrice,
  insurancePayment,
  selfPayment,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 患者信息 */}
        <Card className="md:col-span-1">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <User className="h-4 w-4 mr-2" />
              患者信息
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {selectedPatient && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">患者姓名</span>
                  <span className="font-medium">{selectedPatient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">患者ID</span>
                  <span>{selectedPatient.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">性别</span>
                  <span>{selectedPatient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">年龄</span>
                  <span>{selectedPatient.age}岁</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">过敏史</span>
                  <div>
                    {selectedPatient.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {selectedPatient.allergies.map(
                          (allergy: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              {allergy}
                            </Badge>
                          )
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">无</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">医疗保险</span>
                  <div>
                    {selectedPatient.insuranceType !== "自费" ? (
                      <div className="flex items-center justify-end">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {selectedPatient.insuranceType}
                        </Badge>
                        <span className="ml-1">
                          ({(selectedPatient.insuranceCoverage * 100).toFixed(0)}
                          %)
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50">
                        自费
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-muted-foreground mb-1">诊断信息</div>
                  <div className="bg-muted/30 p-2 rounded-md min-h-[60px]">
                    {diagnosis || (
                      <span className="text-muted-foreground italic">
                        无诊断信息
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 处方药品 */}
        <Card className="md:col-span-2">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <ClipboardList className="h-4 w-4 mr-2" />
              处方药品
              <Badge className="ml-2">{selectedMedicines.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>药品名称</TableHead>
                  <TableHead>规格</TableHead>
                  <TableHead>用药剂量</TableHead>
                  <TableHead>用药方式</TableHead>
                  <TableHead>疗程</TableHead>
                  <TableHead>小计</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedMedicines.map((medicine, index) => {
                  const subtotal = medicine.price
                    ? (medicine.price * medicine.quantity * medicine.days).toFixed(2)
                    : "0.00";

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{medicine.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{medicine.specification}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {medicine.dosage} {medicine.frequency}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{medicine.usage}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {medicine.quantity}*{medicine.days}天
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">¥{subtotal}</div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {prescriptionNotes && (
              <div className="mt-4 p-3 bg-muted/30 rounded-md">
                <div className="text-sm font-medium mb-1">处方备注:</div>
                <div className="text-sm">{prescriptionNotes}</div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t flex justify-between items-end">
              <div className="flex items-center">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <ShieldAlert className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium">处方合规性检查</span>
                  </div>
                  <div className="text-sm text-muted-foreground pl-6">
                    <div className="flex items-center">
                      <Check className="h-3 w-3 mr-1 text-green-600" />
                      <span>药物剂量在安全范围内</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-3 w-3 mr-1 text-green-600" />
                      <span>未发现严重用药禁忌</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-3 w-3 mr-1 text-green-600" />
                      <span>处方格式正确</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-sm">
                  总金额: <span className="font-medium">¥{totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-sm">
                  医保支付:{" "}
                  <span className="text-blue-600 font-medium">
                    ¥{insurancePayment.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm">
                  患者自付:{" "}
                  <span className="text-red-600 font-medium">
                    ¥{selfPayment.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrescriptionConfirmation;
