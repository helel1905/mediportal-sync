
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";

interface ReportDetailsProps {
  reportType: string;
}

export const ReportDetails: React.FC<ReportDetailsProps> = ({ reportType }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - in a real app, this would come from API calls
  const transactionData = [
    { id: "TX-20230701-0001", date: "2023-07-01", patientId: "P2023001", patientName: "张三", department: "内科", amount: 580, paymentMethod: "医保", category: "门诊" },
    { id: "TX-20230701-0002", date: "2023-07-01", patientId: "P2023002", patientName: "李四", department: "外科", amount: 1200, paymentMethod: "现金", category: "手术" },
    { id: "TX-20230702-0001", date: "2023-07-02", patientId: "P2023003", patientName: "王五", department: "儿科", amount: 350, paymentMethod: "微信支付", category: "检查" },
    { id: "TX-20230702-0002", date: "2023-07-02", patientId: "P2023004", patientName: "赵六", department: "妇产科", amount: 780, paymentMethod: "支付宝", category: "住院" },
    { id: "TX-20230703-0001", date: "2023-07-03", patientId: "P2023005", patientName: "孙七", department: "眼科", amount: 420, paymentMethod: "医保", category: "药品" },
    { id: "TX-20230703-0002", date: "2023-07-03", patientId: "P2023006", patientName: "周八", department: "内科", amount: 650, paymentMethod: "微信支付", category: "门诊" },
    { id: "TX-20230704-0001", date: "2023-07-04", patientId: "P2023007", patientName: "吴九", department: "外科", amount: 1500, paymentMethod: "医保", category: "手术" },
    { id: "TX-20230704-0002", date: "2023-07-04", patientId: "P2023008", patientName: "郑十", department: "内科", amount: 480, paymentMethod: "现金", category: "检查" },
    { id: "TX-20230705-0001", date: "2023-07-05", patientId: "P2023009", patientName: "钱十一", department: "儿科", amount: 320, paymentMethod: "医保", category: "门诊" },
    { id: "TX-20230705-0002", date: "2023-07-05", patientId: "P2023010", patientName: "孙十二", department: "妇产科", amount: 890, paymentMethod: "微信支付", category: "住院" },
  ];
  
  const filteredData = transactionData.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "门诊": return "bg-blue-100 text-blue-800 border-blue-200";
      case "手术": return "bg-green-100 text-green-800 border-green-200";
      case "检查": return "bg-purple-100 text-purple-800 border-purple-200";
      case "住院": return "bg-amber-100 text-amber-800 border-amber-200";
      case "药品": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">交易明细</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            导出
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>交易编号</TableHead>
              <TableHead>日期</TableHead>
              <TableHead>患者姓名</TableHead>
              <TableHead>所属科室</TableHead>
              <TableHead>金额 (¥)</TableHead>
              <TableHead>支付方式</TableHead>
              <TableHead>类别</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    {transaction.patientName}
                    <div className="text-xs text-muted-foreground">{transaction.patientId}</div>
                  </TableCell>
                  <TableCell>{transaction.department}</TableCell>
                  <TableCell className="font-medium">{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(transaction.category)}>
                      {transaction.category}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  没有找到匹配的交易记录
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
