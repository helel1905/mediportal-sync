
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, AlertCircle } from "lucide-react";

interface InsuranceSubmitDialogProps {
  open: boolean;
  onClose: () => void;
  settlement: InsuranceSettlement | null;
  onSubmit: () => void;
}

const InsuranceSubmitDialog: React.FC<InsuranceSubmitDialogProps> = ({
  open,
  onClose,
  settlement,
  onSubmit,
}) => {
  const [notes, setNotes] = useState("");
  const [confirmDiagnosis, setConfirmDiagnosis] = useState(false);
  const [confirmFees, setConfirmFees] = useState(false);
  const [confirmDocuments, setConfirmDocuments] = useState(false);

  const isFormValid = confirmDiagnosis && confirmFees && confirmDocuments;

  if (!settlement) return null;

  const handleSubmit = () => {
    onSubmit();
    setNotes("");
    setConfirmDiagnosis(false);
    setConfirmFees(false);
    setConfirmDocuments(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>提交医保结算</DialogTitle>
          <DialogDescription>
            确认信息准确无误后，提交至医保中心进行审核处理。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">结算单信息</h3>
            <p className="text-sm text-muted-foreground">
              结算单号: {settlement.id}
            </p>
            <p className="text-sm text-muted-foreground">
              患者: {settlement.patientName} ({settlement.patientId})
            </p>
            <p className="text-sm text-muted-foreground">
              医保类型: {settlement.insuranceType}
            </p>
            <p className="text-sm text-muted-foreground">
              总金额: ¥{settlement.totalAmount.toFixed(2)} (医保支付: ¥
              {settlement.insurancePayment.toFixed(2)})
            </p>
          </div>

          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              提交后将无法修改结算信息，请确认无误后再提交。
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm-diagnosis"
                checked={confirmDiagnosis}
                onCheckedChange={(checked) => setConfirmDiagnosis(checked === true)}
              />
              <Label htmlFor="confirm-diagnosis" className="text-sm">
                确认诊断信息与医保目录匹配
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm-fees"
                checked={confirmFees}
                onCheckedChange={(checked) => setConfirmFees(checked === true)}
              />
              <Label htmlFor="confirm-fees" className="text-sm">
                确认费用计算准确无误
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm-documents"
                checked={confirmDocuments}
                onCheckedChange={(checked) => setConfirmDocuments(checked === true)}
              />
              <Label htmlFor="confirm-documents" className="text-sm">
                确认相关证明材料已完备
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">备注信息 (可选)</Label>
            <Textarea
              id="notes"
              placeholder="请输入需要备注的内容..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            <Send className="h-4 w-4 mr-1" />
            提交医保
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceSubmitDialog;
