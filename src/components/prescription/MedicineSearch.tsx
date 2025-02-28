
import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface MedicineSearchProps {
  searchMedicineTerm: string;
  setSearchMedicineTerm: (term: string) => void;
  filteredMedicines: any[];
  selectedMedicine: any;
  onSelectMedicine: (medicine: any) => void;
}

const MedicineSearch: React.FC<MedicineSearchProps> = ({
  searchMedicineTerm,
  setSearchMedicineTerm,
  filteredMedicines,
  selectedMedicine,
  onSelectMedicine,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="搜索药品（名称、拼音）..."
          value={searchMedicineTerm}
          onChange={(e) => setSearchMedicineTerm(e.target.value)}
        />
      </div>
      <div className="bg-muted/30 rounded-lg p-4 max-h-[500px] overflow-y-auto">
        {filteredMedicines.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            未找到符合条件的药品
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMedicines.map((medicine) => (
              <Card
                key={medicine.id}
                className={cn(
                  "cursor-pointer hover:shadow transition-all",
                  selectedMedicine?.id === medicine.id ? "border-primary" : ""
                )}
                onClick={() => onSelectMedicine(medicine)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">
                      {medicine.name}
                      {medicine.isInsurance && (
                        <Badge
                          variant="outline"
                          className="ml-2 bg-blue-50 text-blue-700 border-blue-200"
                        >
                          医保
                        </Badge>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        medicine.stockStatus === "充足"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : medicine.stockStatus === "较少"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      )}
                    >
                      {medicine.stockStatus}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    <div className="flex justify-between">
                      <span>{medicine.specification}</span>
                      <span className="font-medium text-primary">
                        ¥{medicine.price}/{medicine.unit}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>
                        {medicine.formulation} · {medicine.category}
                      </span>
                      <span>{medicine.company}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineSearch;
