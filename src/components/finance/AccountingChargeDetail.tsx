
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChargeRecord } from "@/types/finance";
import { Check, AlertCircle } from "lucide-react";

interface AccountingChargeDetailProps {
  charge: ChargeRecord;
}

export const AccountingChargeDetail: React.FC<AccountingChargeDetailProps> = ({
  charge,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <h3 className="text-sm font-medium">基本信息</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">收费单号:</span>
              <span className="font-medium">{charge.chargeId}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">状态:</span>
              <Badge
                variant="outline"
                className={
                  charge.status === "reconciled"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : charge.status === "exception"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }
              >
                {charge.status === "reconciled"
                  ? "已对账"
                  : charge.status === "exception"
                  ? "异常"
                  : "未对账"}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">患者姓名:</span>
              <span>{charge.patientName}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">患者ID:</span>
              <span>{charge.patientId}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">收费时间:</span>
              <span>{formatDate(charge.chargeTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">收费员:</span>
              <span>{charge.cashier}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-medium">支付信息</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">收费类型:</span>
              <span>{charge.chargeType}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">支付方式:</span>
              <span>{charge.paymentMethod}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">总金额:</span>
              <span className="font-medium">¥{charge.amount.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">实付金额:</span>
              <span>¥{charge.actualAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">医保报销:</span>
              <span>¥{charge.insuranceCoverage.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">交易参考号:</span>
              <span>{charge.transactionReference || "无"}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">收费项目明细</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>项目名称</TableHead>
              <TableHead>项目类型</TableHead>
              <TableHead>规格</TableHead>
              <TableHead>单价 (¥)</TableHead>
              <TableHead>数量</TableHead>
              <TableHead>小计 (¥)</TableHead>
              <TableHead>
                <div className="flex justify-end">医保类型</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charge.items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.specification}</TableCell>
                <TableCell>{item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>{(item.unitPrice * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Badge
                      variant="outline"
                      className={
                        item.insuranceCategory === "甲类"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : item.insuranceCategory === "乙类"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : item.insuranceCategory === "丙类"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {item.insuranceCategory || "非医保"}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {charge.reconciliationInfo && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-sm font-medium">对账信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-muted rounded-md">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">对账时间:</span>
                  <span>{formatDate(charge.reconciliationInfo.reconciliationTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">对账人员:</span>
                  <span>{charge.reconciliationInfo.reconciledBy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">对账结果:</span>
                  <span className="flex items-center gap-1">
                    {charge.reconciliationInfo.result === "matched" ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">匹配</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">不匹配</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">备注:</span>
                </div>
                <div className="text-sm p-2 bg-background rounded border min-h-[60px]">
                  {charge.reconciliationInfo.notes || "无备注"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
