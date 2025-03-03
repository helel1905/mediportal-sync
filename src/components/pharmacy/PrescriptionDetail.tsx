
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Info, 
  Loader2, 
  UserRound, 
  XCircle 
} from "lucide-react";
import { toast } from "sonner";
import { getMockPrescriptionById, updatePrescriptionStatus } from "@/lib/mockData";
import { Medicine, Prescription } from "@/types/pharmacy";

interface PrescriptionDetailProps {
  prescriptionId: string;
  onReviewComplete: () => void;
}

const PrescriptionDetail = ({ prescriptionId, onReviewComplete }: PrescriptionDetailProps) => {
  const [prescription, setPrescription] = useState<Prescription | null>(
    getMockPrescriptionById(prescriptionId)
  );
  const [reviewNote, setReviewNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDispenseDialog, setShowDispenseDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Check if all medicines are in stock
  const allMedicinesInStock = prescription?.medicines.every(med => med.inStock && med.stock >= med.quantity) ?? false;

  // Format date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle approve prescription
  const handleApprove = () => {
    if (allMedicinesInStock) {
      setShowDispenseDialog(true);
    } else {
      toast.error("无法批准处方，部分药品库存不足");
    }
  };

  // Handle reject prescription
  const handleReject = () => {
    setShowRejectDialog(true);
  };

  // Complete dispense process
  const completeDispense = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const updatedPrescription = updatePrescriptionStatus(prescriptionId, "approved", reviewNote);
      setPrescription(updatedPrescription);
      setShowDispenseDialog(false);
      setIsProcessing(false);
      toast.success("处方已批准，药品已出库");
      onReviewComplete();
    }, 1500);
  };

  // Complete reject process
  const completeReject = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const updatedPrescription = updatePrescriptionStatus(prescriptionId, "rejected", reviewNote);
      setPrescription(updatedPrescription);
      setShowRejectDialog(false);
      setIsProcessing(false);
      toast.success("处方已被拒绝");
      onReviewComplete();
    }, 1500);
  };

  if (!prescription) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">处方未找到</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">处方详情</CardTitle>
            <div className="space-x-2">
              {prescription.status === "pending" ? (
                <>
                  <Button 
                    onClick={handleReject} 
                    variant="outline" 
                    className="gap-1"
                  >
                    <XCircle className="h-4 w-4" />
                    拒绝
                  </Button>
                  <Button 
                    onClick={handleApprove} 
                    variant="default"
                    className="gap-1" 
                    disabled={!allMedicinesInStock}
                  >
                    <CheckCircle className="h-4 w-4" />
                    批准并发药
                  </Button>
                </>
              ) : (
                <Badge variant={prescription.status === "approved" ? "secondary" : "destructive"}>
                  {prescription.status === "approved" ? "已批准" : "已拒绝"}
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>
            处方编号: {prescription.id} | 创建时间: {formatDate(prescription.createdAt)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              <h3 className="font-medium">患者信息</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">姓名</p>
                <p className="font-medium">{prescription.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">性别/年龄</p>
                <p>{prescription.patientGender} / {prescription.patientAge}岁</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">开方医生</p>
                <p>{prescription.doctorName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">科室</p>
                <p>{prescription.department}</p>
              </div>
            </div>
          </div>

          {/* Diagnosis Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">诊断结果</h3>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-md">
              <p>{prescription.diagnosis}</p>
            </div>
          </div>

          {/* Medicines List */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">药品清单</h3>
              {!allMedicinesInStock && (
                <Badge variant="destructive" className="ml-2">库存不足</Badge>
              )}
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>药品名称</TableHead>
                  <TableHead>规格</TableHead>
                  <TableHead>用法用量</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>库存状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescription.medicines.map((medicine: Medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell className="font-medium">{medicine.name}</TableCell>
                    <TableCell>{medicine.specification}</TableCell>
                    <TableCell>{medicine.dosage}, {medicine.frequency}, {medicine.duration}天</TableCell>
                    <TableCell>{medicine.quantity}{medicine.unit}</TableCell>
                    <TableCell>
                      {medicine.inStock && medicine.stock >= medicine.quantity ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          充足 ({medicine.stock})
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          {medicine.inStock ? `不足 (${medicine.stock})` : "缺货"}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Review Notes Section (only if already reviewed) */}
          {prescription.status !== "pending" && prescription.reviewNote && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-medium">审核备注</h3>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-md">
                <p>{prescription.reviewNote}</p>
              </div>
            </div>
          )}

          {/* Review Notes Input (only if pending) */}
          {prescription.status === "pending" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-medium">审核备注</h3>
              </div>
              
              <Textarea
                placeholder="添加审核备注（可选）"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                className="min-h-24"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval and Dispense Dialog */}
      <Dialog open={showDispenseDialog} onOpenChange={setShowDispenseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>批准处方并发药</DialogTitle>
            <DialogDescription>
              确认批准此处方并发放药品吗？此操作将记录药品出库。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-4">
            <h4 className="font-medium">出库药品清单：</h4>
            <ul className="space-y-2">
              {prescription.medicines.map((medicine) => (
                <li key={medicine.id} className="flex justify-between text-sm">
                  <span>• {medicine.name}</span>
                  <span className="font-medium">{medicine.quantity}{medicine.unit}</span>
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDispenseDialog(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button onClick={completeDispense} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中...
                </>
              ) : (
                <>确认批准并发药</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>拒绝处方</DialogTitle>
            <DialogDescription>
              确认拒绝此处方吗？请提供拒绝原因。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-4">
            <div className="space-y-2">
              <Label htmlFor="rejectReason">拒绝原因</Label>
              <Textarea
                id="rejectReason"
                placeholder="请输入拒绝原因..."
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button 
              variant="destructive" 
              onClick={completeReject} 
              disabled={isProcessing || !reviewNote.trim()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中...
                </>
              ) : (
                <>确认拒绝</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrescriptionDetail;
