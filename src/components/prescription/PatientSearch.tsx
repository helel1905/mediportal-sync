
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, History } from "lucide-react";

interface PatientSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredPatients: any[];
  handleSelectPatient: (patient: any) => void;
  onViewHistory: (patient: any) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({
  searchTerm,
  setSearchTerm,
  filteredPatients,
  handleSelectPatient,
  onViewHistory,
}) => {
  return (
    <div className="space-y-6">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="搜索患者（姓名或ID）..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>患者ID</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>性别</TableHead>
                <TableHead>年龄</TableHead>
                <TableHead>过敏史</TableHead>
                <TableHead>医疗保险</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    未找到符合条件的患者
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.age}岁</TableCell>
                    <TableCell>
                      {patient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {patient.allergies.map((allergy: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">无</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {patient.insuranceType !== "自费" ? (
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {patient.insuranceType}
                          </Badge>
                          <span className="ml-2 text-sm">
                            ({(patient.insuranceCoverage * 100).toFixed(0)}%)
                          </span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50">
                          自费
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => onViewHistory(patient)}
                        >
                          <History className="mr-1 h-4 w-4" />
                          用药史
                        </Button>
                        <Button
                          size="sm"
                          className="h-8"
                          onClick={() => handleSelectPatient(patient)}
                        >
                          选择
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientSearch;
