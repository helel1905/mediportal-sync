
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MedicineListProps {
  selectedMedicines: any[];
  handleEditMedicine: (index: number) => void;
  handleRemoveMedicine: (index: number) => void;
  prescriptionNotes: string;
  setPrescriptionNotes: (notes: string) => void;
  totalPrice: number;
  insurancePayment: number;
  selfPayment: number;
  selectedPatient: any;
}

const MedicineList: React.FC<MedicineListProps> = ({
  selectedMedicines,
  handleEditMedicine,
  handleRemoveMedicine,
  prescriptionNotes,
  setPrescriptionNotes,
  totalPrice,
  insurancePayment,
  selfPayment,
  selectedPatient,
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        {selectedMedicines.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            尚未添加药品，请从左侧列表选择或使用AI推荐
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>药品名称</TableHead>
                <TableHead>规格</TableHead>
                <TableHead>用药剂量</TableHead>
                <TableHead>用药方式</TableHead>
                <TableHead>疗程</TableHead>
                <TableHead>单价</TableHead>
                <TableHead>小计</TableHead>
                <TableHead className="text-right">操作</TableHead>
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
                      <div className="text-sm">
                        ¥{medicine.price || 0}/{medicine.unit || "单位"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">¥{subtotal}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditMedicine(index)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={() => handleRemoveMedicine(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {selectedMedicines.length > 0 && selectedPatient && (
          <div className="p-4 pt-0 border-t mt-4 flex justify-between">
            <div>
              <div className="text-sm text-muted-foreground">处方备注:</div>
              <Textarea
                placeholder="处方备注信息..."
                value={prescriptionNotes}
                onChange={(e) => setPrescriptionNotes(e.target.value)}
                className="mt-1 min-h-[60px] w-[300px]"
              />
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
        )}
      </CardContent>
    </Card>
  );
};

export default MedicineList;
