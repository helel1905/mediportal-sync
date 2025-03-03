
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  Archive, 
  CalendarDays, 
  Clock,
  Loader2, 
  Package,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import { getMockExpiryAlertById } from "@/lib/mockData";
import { ExpiryAlert, ExpiryStatus } from "@/types/pharmacy";
import { cn } from "@/lib/utils";

interface ExpiryAlertDetailProps {
  alertId: string;
}

const ExpiryAlertDetail = ({ alertId }: ExpiryAlertDetailProps) => {
  const [alert, setAlert] = useState<ExpiryAlert | null>(
    getMockExpiryAlertById(alertId)
  );
  const [note, setNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDisposeDialog, setShowDisposeDialog] = useState(false);

  if (!alert) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">记录未找到</p>
        </CardContent>
      </Card>
    );
  }

  // Helper function to get color based on expiry status
  const getStatusColor = (status: ExpiryStatus) => {
    switch (status) {
      case "normal":
        return "text-green-600";
      case "approaching":
        return "text-amber-600";
      case "expired":
        return "text-red-600";
      default:
        return "";
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  // Handle dispose medicine
  const handleDispose = () => {
    setShowDisposeDialog(true);
  };

  // Complete dispose process
  const completeDispose = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setShowDisposeDialog(false);
      setIsProcessing(false);
      toast.success("药品已成功处理");
      // In a real app, we would update the alert status here
    }, 1500);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{alert.medicineName}</CardTitle>
            <Badge 
              variant={
                alert.status === "normal" 
                  ? "secondary" 
                  : alert.status === "approaching" 
                    ? "warning" 
                    : "destructive"
              }
            >
              {alert.status === "normal" 
                ? "正常" 
                : alert.status === "approaching" 
                  ? "临近效期" 
                  : "已过期"}
            </Badge>
          </div>
          <CardDescription>
            规格: {alert.specification} | 生产厂家: {alert.manufacturer}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h3 className="font-medium">基本信息</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">批号</p>
                <p className="font-medium">{alert.batchNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">当前库存</p>
                <p>{alert.currentStock}{alert.unit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">存放位置</p>
                <p>{alert.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">状态</p>
                <p className={getStatusColor(alert.status)}>
                  {alert.status === "normal" 
                    ? "正常" 
                    : alert.status === "approaching" 
                      ? "临近效期" 
                      : "已过期"}
                </p>
              </div>
            </div>
          </div>

          {/* Expiry Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h3 className="font-medium">效期信息</h3>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-md">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">有效期至</p>
                  <p className="font-medium">{formatDate(alert.expiryDate)}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">剩余天数</p>
                  <p className={getStatusColor(alert.status)}>
                    {alert.daysRemaining > 0 
                      ? `${alert.daysRemaining}天` 
                      : "已过期"}
                  </p>
                </div>
              </div>
              
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    alert.status === "normal" 
                      ? "bg-green-500" 
                      : alert.status === "approaching" 
                        ? "bg-amber-500" 
                        : "bg-red-500"
                  )}
                  style={{ 
                    width: `${Math.max(
                      0, 
                      Math.min(
                        100, 
                        alert.daysRemaining <= 0 
                          ? 0 
                          : alert.daysRemaining > 180 
                            ? 100 
                            : (alert.daysRemaining / 180) * 100
                      )
                    )}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Warning Message for Approaching/Expired */}
          {alert.status !== "normal" && (
            <div className={cn(
              "p-4 rounded-md flex items-start gap-3",
              alert.status === "approaching" ? "bg-amber-50" : "bg-red-50"
            )}>
              <AlertTriangle className={cn(
                "h-5 w-5 mt-0.5",
                alert.status === "approaching" ? "text-amber-500" : "text-red-500"
              )} />
              <div>
                <p className={cn(
                  "font-medium",
                  alert.status === "approaching" ? "text-amber-800" : "text-red-800"
                )}>
                  {alert.status === "approaching" 
                    ? "药品临近效期提醒" 
                    : "药品已过期警告"}
                </p>
                <p className={cn(
                  "text-sm",
                  alert.status === "approaching" ? "text-amber-700" : "text-red-700"
                )}>
                  {alert.status === "approaching" 
                    ? `该药品将在${alert.daysRemaining}天后过期，请尽快安排使用或处理。` 
                    : "该药品已经过期，请立即下架并按照规定流程处理。"}
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between pt-3">
          <div>
            {alert.status === "expired" && (
              <Button 
                variant="destructive" 
                className="gap-1"
                onClick={handleDispose}
              >
                <Trash2 className="h-4 w-4" />
                处理过期药品
              </Button>
            )}
          </div>
          <Button variant="outline" className="gap-1">
            <Archive className="h-4 w-4" />
            导出报表
          </Button>
        </CardFooter>
      </Card>

      {/* Dispose Dialog */}
      <Dialog open={showDisposeDialog} onOpenChange={setShowDisposeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>处理过期药品</DialogTitle>
            <DialogDescription>
              确认处理此过期药品吗？请记录处理原因和方式。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-4">
            <div className="space-y-2">
              <Label htmlFor="disposeNote">处理记录</Label>
              <Textarea
                id="disposeNote"
                placeholder="请输入处理方式和备注..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisposeDialog(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button 
              variant="destructive" 
              onClick={completeDispose} 
              disabled={isProcessing || !note.trim()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中...
                </>
              ) : (
                <>确认处理</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpiryAlertDetail;
