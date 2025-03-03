
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface InventoryItemProps {
  id: string;
  name: string;
  specification: string;
  manufacturer: string;
  stock: number;
  unit: string;
  expiryDate: string;
  lowStockThreshold: number;
  onStockUpdate: (id: string, newStock: number) => void;
}

const InventoryItem = ({
  id,
  name,
  specification,
  manufacturer,
  stock,
  unit,
  expiryDate,
  lowStockThreshold,
  onStockUpdate
}: InventoryItemProps) => {
  const [showStockInDialog, setShowStockInDialog] = useState(false);
  const [showStockOutDialog, setShowStockOutDialog] = useState(false);
  const [stockChangeAmount, setStockChangeAmount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stockOutReason, setStockOutReason] = useState("");

  // Format expiry date
  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // Check if expiry date is near (within 90 days)
  const isNearExpiry = () => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  };

  // Check if item is expired
  const isExpired = () => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  // Handle stock in (add inventory)
  const handleStockIn = () => {
    if (stockChangeAmount <= 0) {
      toast.error("请输入有效的入库数量");
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const newStock = stock + stockChangeAmount;
      onStockUpdate(id, newStock);
      
      setIsProcessing(false);
      setShowStockInDialog(false);
      setStockChangeAmount(1);
      
      toast.success(`入库成功：${name} 增加了 ${stockChangeAmount}${unit}`);
    }, 1000);
  };

  // Handle stock out (reduce inventory)
  const handleStockOut = () => {
    if (stockChangeAmount <= 0 || stockChangeAmount > stock) {
      toast.error("请输入有效的出库数量");
      return;
    }

    if (!stockOutReason.trim()) {
      toast.error("请输入出库原因");
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const newStock = stock - stockChangeAmount;
      onStockUpdate(id, newStock);
      
      setIsProcessing(false);
      setShowStockOutDialog(false);
      setStockChangeAmount(1);
      setStockOutReason("");
      
      toast.success(`出库成功：${name} 减少了 ${stockChangeAmount}${unit}`);
    }, 1000);
  };

  // Get stock status badge
  const getStockStatusBadge = () => {
    if (isExpired()) {
      return <Badge variant="destructive">已过期</Badge>;
    }
    
    if (isNearExpiry()) {
      return <Badge variant="warning" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">近效期</Badge>;
    }
    
    if (stock <= 0) {
      return <Badge variant="destructive">缺货</Badge>;
    }
    
    if (stock < lowStockThreshold) {
      return <Badge variant="destructive">库存低</Badge>;
    }
    
    return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">充足</Badge>;
  };

  return (
    <>
      <tr className="border-b hover:bg-muted/50">
        <td className="p-3 font-medium">{name}</td>
        <td className="p-3">{specification}</td>
        <td className="p-3">{manufacturer}</td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            <span className={stock < lowStockThreshold ? "text-red-500 font-medium" : ""}>
              {stock}{unit}
            </span>
            {getStockStatusBadge()}
          </div>
        </td>
        <td className="p-3">{formatExpiryDate(expiryDate)}</td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 gap-1"
              onClick={() => setShowStockInDialog(true)}
            >
              <ArrowDown className="h-3.5 w-3.5" />
              入库
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 gap-1"
              onClick={() => setShowStockOutDialog(true)}
              disabled={stock <= 0}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              出库
            </Button>
          </div>
        </td>
      </tr>

      {/* Stock In Dialog */}
      <Dialog open={showStockInDialog} onOpenChange={setShowStockInDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>药品入库</DialogTitle>
            <DialogDescription>
              请输入 {name} {specification} 的入库数量
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="stockInAmount">入库数量</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="stockInAmount"
                  type="number"
                  min={1}
                  value={stockChangeAmount}
                  onChange={(e) => setStockChangeAmount(parseInt(e.target.value) || 0)}
                />
                <span>{unit}</span>
              </div>
            </div>
            
            <div className="text-sm">
              <p>当前库存: <span className="font-medium">{stock}{unit}</span></p>
              <p>入库后库存: <span className="font-medium">{stock + stockChangeAmount}{unit}</span></p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStockInDialog(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button onClick={handleStockIn} disabled={isProcessing || stockChangeAmount <= 0}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中...
                </>
              ) : (
                <>确认入库</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Out Dialog */}
      <Dialog open={showStockOutDialog} onOpenChange={setShowStockOutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>药品出库</DialogTitle>
            <DialogDescription>
              请输入 {name} {specification} 的出库数量和原因
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="stockOutAmount">出库数量</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="stockOutAmount"
                  type="number"
                  min={1}
                  max={stock}
                  value={stockChangeAmount}
                  onChange={(e) => setStockChangeAmount(parseInt(e.target.value) || 0)}
                />
                <span>{unit}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stockOutReason">出库原因</Label>
              <Input
                id="stockOutReason"
                placeholder="例如：处方发药、药品损耗、退货等"
                value={stockOutReason}
                onChange={(e) => setStockOutReason(e.target.value)}
              />
            </div>
            
            <div className="text-sm">
              <p>当前库存: <span className="font-medium">{stock}{unit}</span></p>
              <p>出库后库存: <span className={`font-medium ${stock - stockChangeAmount < lowStockThreshold ? "text-red-500" : ""}`}>
                {stock - stockChangeAmount}{unit}
              </span></p>
              {stock - stockChangeAmount < lowStockThreshold && (
                <p className="text-red-500 text-xs mt-1">
                  注意：出库后库存低于警戒线 ({lowStockThreshold}{unit})
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStockOutDialog(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button 
              onClick={handleStockOut} 
              disabled={isProcessing || stockChangeAmount <= 0 || stockChangeAmount > stock || !stockOutReason.trim()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中...
                </>
              ) : (
                <>确认出库</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryItem;
