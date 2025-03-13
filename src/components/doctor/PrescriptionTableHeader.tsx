
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PrescriptionTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>患者ID</TableHead>
        <TableHead>姓名</TableHead>
        <TableHead>年龄/性别</TableHead>
        <TableHead>科室</TableHead>
        <TableHead>主治医生</TableHead>
        <TableHead>处方状态</TableHead>
        <TableHead className="text-right">操作</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PrescriptionTableHeader;
