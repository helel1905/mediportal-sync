
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BrainCircuit, LoaderCircle } from "lucide-react";

interface DiagnosisInputProps {
  diagnosis: string;
  setDiagnosis: (diagnosis: string) => void;
  handleAIRecommendation: () => void;
  isAILoading: boolean;
}

const DiagnosisInput: React.FC<DiagnosisInputProps> = ({
  diagnosis,
  setDiagnosis,
  handleAIRecommendation,
  isAILoading,
}) => {
  return (
    <div>
      <Label className="mb-2 block">诊断信息</Label>
      <div className="space-y-2">
        <Textarea
          placeholder="请输入诊断信息..."
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="min-h-[80px]"
        />
        <Button
          variant="secondary"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleAIRecommendation}
          disabled={isAILoading || !diagnosis.trim()}
        >
          {isAILoading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              AI正在分析诊断...
            </>
          ) : (
            <>
              <BrainCircuit className="h-4 w-4" />
              AI推荐药品
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DiagnosisInput;
