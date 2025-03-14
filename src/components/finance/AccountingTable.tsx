
import React, { useState } from "react";
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
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AccountingChargeDetail } from "@/components/finance/AccountingChargeDetail";
import { ReconcilingDialog } from "@/components/finance/ReconcilingDialog";
import { ChargeRecord } from "@/types/finance";
import { cn } from "@/lib/utils";

interface AccountingTableProps {
  charges: ChargeRecord[];
  onReconcile: (id: string, reconciled: boolean) => void;
}

export const AccountingTable: React.FC<AccountingTableProps> = ({ charges, onReconcile }) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [selectedCharge, setSelectedCharge] = useState<ChargeRecord | null>(null);
  const [showReconcilingDialog, setShowReconcilingDialog] = useState(false);

  const toggleRow = (chargeId: string) => {
    setExpandedRows((prevExpanded) =>
      prevExpanded.includes(chargeId)
        ? prevExpanded.filter((id) => id !== chargeId)
        : [...prevExpanded, chargeId]
    );
  };

  const handleViewDetails = (charge: ChargeRecord) => {
    setSelectedCharge(charge);
  };

  const handleReconcileClick = (charge: ChargeRecord) => {
    setSelectedCharge(charge);
    setShowReconcilingDialog(true);
  };

  const handleReconcileConfirm = (chargeId: string) => {
    onReconcile(chargeId, true);
    setShowReconcilingDialog(false);
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reconciled":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            已对账
          </Badge>
        );
      case "unreconciled":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            未对账
          </Badge>
        );
      case "exception":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            异常
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>收费单号</TableHead>
              <TableHead>患者姓名</TableHead>
              <TableHead>科室</TableHead>
              <TableHead>收费类型</TableHead>
              <TableHead>支付方式</TableHead>
              <TableHead>收费金额</TableHead>
              <TableHead>收费时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charges.map((charge) => (
              <React.Fragment key={charge.id}>
                <TableRow className={cn(expandedRows.includes(charge.id) && "bg-muted/50")}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRow(charge.id)}
                      className="h-6 w-6"
                    >
                      {expandedRows.includes(charge.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{charge.chargeId}</TableCell>
                  <TableCell>{charge.patientName}</TableCell>
                  <TableCell>{charge.department}</TableCell>
                  <TableCell>{charge.chargeType}</TableCell>
                  <TableCell>{charge.paymentMethod}</TableCell>
                  <TableCell className="font-medium">¥{charge.amount.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(charge.chargeTime)}</TableCell>
                  <TableCell>{getStatusBadge(charge.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(charge)}
                            className="h-8"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            详情
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>收费单详情</DialogTitle>
                            <DialogDescription>
                              收费单号: {selectedCharge?.chargeId}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedCharge && (
                            <AccountingChargeDetail charge={selectedCharge} />
                          )}
                        </DialogContent>
                      </Dialog>

                      {charge.status !== "reconciled" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleReconcileClick(charge)}
                          className="h-8"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          对账
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded row with details */}
                {expandedRows.includes(charge.id) && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={10} className="p-0">
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
                          <div>
                            <span className="font-medium">患者ID:</span> {charge.patientId}
                          </div>
                          <div>
                            <span className="font-medium">收费员:</span> {charge.cashier}
                          </div>
                          <div>
                            <span className="font-medium">医疗卡号:</span> {charge.medicalCardNumber || "无"}
                          </div>
                          <div>
                            <span className="font-medium">医保卡号:</span> {charge.insuranceNumber || "无"}
                          </div>
                          <div>
                            <span className="font-medium">交易参考号:</span> {charge.transactionReference || "无"}
                          </div>
                          <div>
                            <span className="font-medium">摘要:</span> {charge.summary}
                          </div>
                        </div>

                        <div className="mt-4 border rounded p-2">
                          <h4 className="font-medium mb-2">收费项目明细</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>项目名称</TableHead>
                                <TableHead>规格</TableHead>
                                <TableHead>单价</TableHead>
                                <TableHead>数量</TableHead>
                                <TableHead>小计</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {charge.items.map((item, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>{item.specification}</TableCell>
                                  <TableCell>¥{item.unitPrice.toFixed(2)}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>¥{(item.unitPrice * item.quantity).toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Reconciling Dialog */}
      {selectedCharge && (
        <ReconcilingDialog
          open={showReconcilingDialog}
          onOpenChange={setShowReconcilingDialog}
          charge={selectedCharge}
          onConfirm={() => handleReconcileConfirm(selectedCharge.id)}
        />
      )}
    </Card>
  );
};
