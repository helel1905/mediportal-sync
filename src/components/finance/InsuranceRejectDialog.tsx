
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InsuranceSettlement } from "@/types/finance";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

interface InsuranceRejectDialogProps {
  open: boolean;
  onClose: () => void;
  settlement: InsuranceSettlement | null;
  onReject: (reason: string) => void;
}

const InsuranceRejectDialog: React.FC<InsuranceRejectDialogProps> = ({
  open,
  onClose,
  settlement,
  onReject,
}) => {
  const [reason, setReason] = useState("");
  const [reasonType, setReasonType] = useState("");

  if (!settlement) return null;

  const reasonOptions = [
    { value: "documents", label: "材料不完整" },
    { value: "diagnosis", label: "诊断与医保范围不符" },
    { value: "calculation", label: "费用计算错误" },
    { value: "policy", label: "不符合医保政策" },
    { value: "mismatch", label: "病历与结算不匹配" },
    { value: "other", label: "其他原因" },
  ];

  const handleReject = () => {
    onReject(reason);
    setReason("");
    setReasonType("");
  };

  const handleReasonTypeChange = (value: string) => {
    setReasonType(value);
    
    // Set default reason text based on selected type
    switch (value) {
      case "documents":
        setReason("所需材料不完整，请补充以下材料：1. 病历原件 2. 医保卡信息");
        break;
      case "diagnosis":
        setReason("所提供诊断与医保报销范围不符，详情请参考医保目录规定。");
        break;
      case "calculation":
        setReason("结算单中费用计算有误，请核对后重新提交。");
        break;
      case "policy":
        setReason("不符合当前医保政策规定，具体原因：");
        break;
      case "mismatch":
        setReason("病历记录与结算清单不匹配，请核对后重新提交。");
        break;
      default:
        setReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-1" />
            标记医保结算拒绝
          </DialogTitle>
          <DialogDescription>
            请提供被医保中心拒绝的原因，此信息将发送给相关人员处理。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              结算单号: {settlement.id}
            </p>
            <p className="text-sm text-muted-foreground">
              患者: {settlement.patientName}
            </p>
            <p className="text-sm text-muted-foreground">
              金额: ¥{settlement.totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason-type">拒绝原因类型</Label>
            <Select
              value={reasonType}
              onValueChange={handleReasonTypeChange}
            >
              <SelectTrigger id="reason-type">
                <SelectValue placeholder="选择拒绝原因类型" />
              </SelectTrigger>
              <SelectContent>
                {reasonOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">详细拒绝原因</Label>
            <Textarea
              id="reason"
              placeholder="请详细描述拒绝原因..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={!reason.trim()}
          >
            确认拒绝
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceRejectDialog;
