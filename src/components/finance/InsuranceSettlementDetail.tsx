
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InsuranceSettlement } from "@/types/finance";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Send, Printer, Download, Copy } from "lucide-react";

interface InsuranceSettlementDetailProps {
  open: boolean;
  onClose: () => void;
  settlement: InsuranceSettlement | null;
  onSubmit: (settlement: InsuranceSettlement) => void;
}

const InsuranceSettlementDetail: React.FC<InsuranceSettlementDetailProps> = ({
  open,
  onClose,
  settlement,
  onSubmit,
}) => {
  if (!settlement) return null;

  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: {
      label: "待处理",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    processing: {
      label: "处理中",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    approved: {
      label: "已批准",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    rejected: {
      label: "已拒绝",
      color: "bg-red-100 text-red-800 border-red-200",
    },
    completed: {
      label: "已完成",
      color: "bg-gray-100 text-gray-800 border-gray-200",
    },
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "——";
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  const insuranceCategoryConfig: Record<string, string> = {
    "甲类": "bg-green-50 text-green-700 border-green-200",
    "乙类": "bg-blue-50 text-blue-700 border-blue-200",
    "丙类": "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>医保结算单 - {settlement.id}</span>
            <Badge
              variant="outline"
              className={cn(statusConfig[settlement.status].color)}
            >
              {statusConfig[settlement.status].label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-sm">患者信息</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                  <div className="text-muted-foreground">患者姓名:</div>
                  <div>{settlement.patientName}</div>
                  <div className="text-muted-foreground">患者ID:</div>
                  <div>{settlement.patientId}</div>
                  <div className="text-muted-foreground">医保号:</div>
                  <div>{settlement.insuranceNumber}</div>
                  <div className="text-muted-foreground">医保类型:</div>
                  <div>{settlement.insuranceType}</div>
                  <div className="text-muted-foreground">就诊日期:</div>
                  <div>{formatDate(settlement.visitDate)}</div>
                  <div className="text-muted-foreground">就诊科室:</div>
                  <div>{settlement.department}</div>
                  <div className="text-muted-foreground">主诊医生:</div>
                  <div>{settlement.doctor}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-sm">诊断与结算信息</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                  <div className="text-muted-foreground">诊断:</div>
                  <div>{settlement.diagnosis}</div>
                  <div className="text-muted-foreground">医疗总费用:</div>
                  <div className="font-medium">¥{settlement.totalAmount.toFixed(2)}</div>
                  <div className="text-muted-foreground">医保报销:</div>
                  <div className="text-blue-600">¥{settlement.insurancePayment.toFixed(2)}</div>
                  <div className="text-muted-foreground">患者自付:</div>
                  <div className="text-red-600">¥{settlement.selfPayment.toFixed(2)}</div>
                  <div className="text-muted-foreground">提交日期:</div>
                  <div>{formatDate(settlement.submittedAt)}</div>
                  <div className="text-muted-foreground">经办人:</div>
                  <div>{settlement.operator}</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium text-sm">项目明细</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目名称</TableHead>
                  <TableHead>规格</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>单价</TableHead>
                  <TableHead>医保类别</TableHead>
                  <TableHead>医保报销</TableHead>
                  <TableHead>患者自付</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settlement.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </TableCell>
                    <TableCell>{item.specification}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>¥{item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {item.insuranceCategory ? (
                        <Badge 
                          variant="outline" 
                          className={insuranceCategoryConfig[item.insuranceCategory]}
                        >
                          {item.insuranceCategory}
                        </Badge>
                      ) : (
                        <Badge variant="outline">非医保</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-blue-600">
                      ¥{item.insurancePayment.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-red-600">
                      ¥{item.selfPayment.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {settlement.status === "rejected" && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-md">
              <h3 className="font-medium text-sm text-red-800">拒绝原因</h3>
              <p className="mt-1 text-sm text-red-700">{settlement.rejectionReason}</p>
            </div>
          )}

          {settlement.remarks && (
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-md">
              <h3 className="font-medium text-sm">备注</h3>
              <p className="mt-1 text-sm">{settlement.remarks}</p>
            </div>
          )}

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => console.log('打印结算单')}>
                <Printer className="h-4 w-4 mr-1" />
                打印
              </Button>
              <Button variant="outline" size="sm" onClick={() => console.log('导出PDF')}>
                <Download className="h-4 w-4 mr-1" />
                导出PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => console.log('复制ID')}>
                <Copy className="h-4 w-4 mr-1" />
                复制ID
              </Button>
            </div>
            
            {settlement.status === "pending" && (
              <Button onClick={() => onSubmit(settlement)}>
                <Send className="h-4 w-4 mr-1" />
                提交医保
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceSettlementDetail;
