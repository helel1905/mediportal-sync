
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody
} from "@/components/ui/table";
import { 
  AlertTriangle, 
  Download, 
  FileText, 
  Pill, 
  PlusCircle, 
  RefreshCw, 
  Search 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import InventoryItem from "@/components/pharmacy/InventoryItem";
import { getMockInventory } from "@/lib/mockData";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(getMockInventory());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.specification.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle inventory refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refreshing data
    setTimeout(() => {
      setInventory(getMockInventory());
      setIsRefreshing(false);
    }, 1000);
  };

  // Calculate stats
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.stock < item.lowStockThreshold).length;
  const nearExpiryItems = inventory.filter(item => {
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  }).length;

  // Update stock quantity
  const handleStockUpdate = (id: string, newStock: number) => {
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === id ? { ...item, stock: newStock } : item
      )
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">药品库存</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              刷新
            </Button>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              导出
            </Button>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              新增药品
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <div className="flex items-center gap-2">
              <Pill className="text-primary h-5 w-5" />
              <h3 className="text-sm font-medium">药品总数</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{totalItems}</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-destructive h-5 w-5" />
              <h3 className="text-sm font-medium">库存不足</h3>
            </div>
            <p className="text-2xl font-bold mt-2 text-destructive">{lowStockItems}</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <div className="flex items-center gap-2">
              <FileText className="text-yellow-500 h-5 w-5" />
              <h3 className="text-sm font-medium">近效期药品</h3>
            </div>
            <p className="text-2xl font-bold mt-2 text-yellow-500">{nearExpiryItems}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索药品名称、规格或厂商..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="ml-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredInventory.length} 个药品
            </span>
            
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                搜索: {searchTerm}
                <button 
                  className="ml-1 h-4 w-4 rounded-full bg-muted-foreground/20 inline-flex items-center justify-center text-muted-foreground hover:bg-muted-foreground/30"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>药品名称</TableHead>
                <TableHead>规格</TableHead>
                <TableHead>生产厂家</TableHead>
                <TableHead>库存</TableHead>
                <TableHead>有效期至</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <td colSpan={6} className="text-center py-4 text-muted-foreground">
                    {searchTerm ? "没有找到匹配的药品" : "暂无库存数据"}
                  </td>
                </TableRow>
              ) : (
                filteredInventory.map(item => (
                  <InventoryItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    specification={item.specification}
                    manufacturer={item.manufacturer}
                    stock={item.stock}
                    unit={item.unit}
                    expiryDate={item.expiryDate}
                    lowStockThreshold={item.lowStockThreshold}
                    onStockUpdate={handleStockUpdate}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Inventory;
