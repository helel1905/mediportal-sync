
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InsuranceSettlement } from "@/types/finance";
import { cn } from "@/lib/utils";
import { FileText, Send, AlertTriangle, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InsuranceSettlementTableProps {
  settlements: InsuranceSettlement[];
  onViewDetail: (settlement: InsuranceSettlement) => void;
  onSubmit: (settlement: InsuranceSettlement) => void;
  onEdit: (settlement: InsuranceSettlement) => void;
  onReject: (settlement: InsuranceSettlement) => void;
}

const InsuranceSettlementTable: React.FC<InsuranceSettlementTableProps> = ({
  settlements,
  onViewDetail,
  onSubmit,
  onEdit,
  onReject,
}) => {
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
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>结算单号</TableHead>
            <TableHead>患者信息</TableHead>
            <TableHead>就诊科室</TableHead>
            <TableHead>就诊日期</TableHead>
            <TableHead>总金额</TableHead>
            <TableHead>医保报销</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settlements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                暂无医保结算记录
              </TableCell>
            </TableRow>
          ) : (
            settlements.map((settlement) => (
              <TableRow key={settlement.id}>
                <TableCell className="font-medium">{settlement.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{settlement.patientName}</div>
                  <div className="text-sm text-muted-foreground">
                    {settlement.patientId}
                  </div>
                </TableCell>
                <TableCell>{settlement.department}</TableCell>
                <TableCell>{formatDate(settlement.visitDate)}</TableCell>
                <TableCell>¥{settlement.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <div>¥{settlement.insurancePayment.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">
                    自付: ¥{settlement.selfPayment.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusConfig[settlement.status].color)}
                  >
                    {statusConfig[settlement.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetail(settlement)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>结算单操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {settlement.status === "pending" && (
                          <DropdownMenuItem onClick={() => onSubmit(settlement)}>
                            <Send className="h-4 w-4 mr-2" />
                            提交医保
                          </DropdownMenuItem>
                        )}
                        {(settlement.status === "pending" || settlement.status === "rejected") && (
                          <DropdownMenuItem onClick={() => onEdit(settlement)}>
                            <Edit className="h-4 w-4 mr-2" />
                            编辑信息
                          </DropdownMenuItem>
                        )}
                        {settlement.status === "processing" && (
                          <DropdownMenuItem onClick={() => onReject(settlement)}>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            标记拒绝
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InsuranceSettlementTable;
