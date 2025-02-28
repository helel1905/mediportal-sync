
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Pill, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIRecommendationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aiRecommendation: {
    description: string;
    medicines: string[];
  } | null;
  recommendedMedicines: any[];
  selectedRecommendedMedicines: string[];
  toggleRecommendedMedicine: (id: string) => void;
  applyAIRecommendation: () => void;
}

const AIRecommendationDialog: React.FC<AIRecommendationDialogProps> = ({
  open,
  onOpenChange,
  aiRecommendation,
  recommendedMedicines,
  selectedRecommendedMedicines,
  toggleRecommendedMedicine,
  applyAIRecommendation,
}) => {
  if (!aiRecommendation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            AI药品推荐
          </DialogTitle>
          <DialogDescription>
            基于诊断信息，AI系统为您推荐以下药品组合
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="bg-muted/30 p-4 rounded-lg whitespace-pre-line">
            {aiRecommendation.description}
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Pill className="h-4 w-4 mr-2 text-primary" />
              推荐药品（请选择要添加的药品）
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendedMedicines.map((medicine) => (
                <Card 
                  key={medicine.id}
                  className={cn(
                    "cursor-pointer hover:shadow transition-all", 
                    selectedRecommendedMedicines.includes(medicine.id) ? "border-primary bg-primary/5" : ""
                  )}
                  onClick={() => toggleRecommendedMedicine(medicine.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{medicine.name}</div>
                          {medicine.isInsurance && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              医保
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {medicine.specification} · {medicine.formulation}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="text-muted-foreground">价格: </span>
                          <span className="font-medium">¥{medicine.price}/{medicine.unit}</span>
                        </div>
                        <div className="text-sm mt-2">
                          {medicine.description && (
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {medicine.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                        selectedRecommendedMedicines.includes(medicine.id) 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "border-input"
                      )}>
                        {selectedRecommendedMedicines.includes(medicine.id) && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button 
            onClick={applyAIRecommendation}
            disabled={selectedRecommendedMedicines.length === 0}
          >
            添加所选药品 ({selectedRecommendedMedicines.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIRecommendationDialog;
