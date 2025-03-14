
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import { ChargeRecord } from "@/types/finance";
import { Check, X } from "lucide-react";

interface ReconcilingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  charge: ChargeRecord;
  onConfirm: () => void;
}

export const ReconcilingDialog: React.FC<ReconcilingDialogProps> = ({
  open,
  onOpenChange,
  charge,
  onConfirm,
}) => {
  const [result, setResult] = useState<"matched" | "discrepancy">("matched");
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>对账确认</DialogTitle>
          <DialogDescription>
            请确认收费单号 {charge.chargeId} 的对账信息
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">患者姓名:</span>
              <span className="ml-1 font-medium">{charge.patientName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">收费金额:</span>
              <span className="ml-1 font-medium">¥{charge.amount.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">支付方式:</span>
              <span className="ml-1">{charge.paymentMethod}</span>
            </div>
            <div>
              <span className="text-muted-foreground">收费类型:</span>
              <span className="ml-1">{charge.chargeType}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reconcile-result">对账结果</Label>
              <Select 
                value={result} 
                onValueChange={(value: "matched" | "discrepancy") => setResult(value)}
              >
                <SelectTrigger id="reconcile-result">
                  <SelectValue placeholder="选择对账结果" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matched">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>匹配</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="discrepancy">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-600" />
                      <span>不匹配</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reconcile-notes">备注</Label>
              <Textarea
                id="reconcile-notes"
                placeholder="请输入对账备注信息..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleConfirm}>确认对账</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
