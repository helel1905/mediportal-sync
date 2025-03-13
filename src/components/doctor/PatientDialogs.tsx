
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PatientDialogsProps {
  currentPatient: any;
  showingMedicalInsurance: boolean;
  setShowingMedicalInsurance: (show: boolean) => void;
  idCardPreview: boolean;
  setIdCardPreview: (show: boolean) => void;
  geneticReport: boolean;
  setGeneticReport: (show: boolean) => void;
  showPrescriptionDialog: boolean;
  setShowPrescriptionDialog: (show: boolean) => void;
}

const PatientDialogs: React.FC<PatientDialogsProps> = ({
  currentPatient,
  showingMedicalInsurance,
  setShowingMedicalInsurance,
  idCardPreview,
  setIdCardPreview,
  geneticReport,
  setGeneticReport,
  showPrescriptionDialog,
  setShowPrescriptionDialog,
}) => {
  return (
    <>
      {/* 医保信息对话框 */}
      <Dialog open={showingMedicalInsurance} onOpenChange={setShowingMedicalInsurance}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>医保信息</DialogTitle>
            <DialogDescription>
              患者 {currentPatient?.name} 的医保信息
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm mb-2">医保卡号: <span className="font-mono">3301****5678</span></p>
              <p className="text-sm mb-2">参保类型: 城镇职工医保</p>
              <p className="text-sm mb-2">报销比例: 85%</p>
              <p className="text-sm">年度累计: ¥1,257.00</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowingMedicalInsurance(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 身份证预览对话框 */}
      <Dialog open={idCardPreview} onOpenChange={setIdCardPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>身份证信息</DialogTitle>
            <DialogDescription>
              患者 {currentPatient?.name} 的身份证照片
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="bg-gray-100 border rounded-md p-6 w-full max-w-xs aspect-[1.58/1] flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="text-xs">中华人民共和国居民身份证</div>
                <div className="text-xs">No. 3301****5678</div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-50 w-20 h-24"></div>
                <div className="text-sm space-y-1">
                  <p>姓名：{currentPatient?.name}</p>
                  <p>性别：{currentPatient?.gender === "male" ? "男" : "女"}</p>
                  <p>民族：汉</p>
                  <p>出生：{currentPatient?.birthDate}</p>
                  <p className="text-xs">住址：浙江省杭州市西湖区</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIdCardPreview(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 基因报告对话框 */}
      <Dialog open={geneticReport} onOpenChange={setGeneticReport}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>基因检测报告</DialogTitle>
            <DialogDescription>
              患者 {currentPatient?.name} 的基因检测结果
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-semibold mb-2">基因变异检测结果</p>
              <p className="text-xs mb-1">BRCA1/2: <span className="text-green-600">阴性</span></p>
              <p className="text-xs mb-1">TP53: <span className="text-green-600">阴性</span></p>
              <p className="text-xs mb-1">EGFR: <span className="text-yellow-600">变异</span></p>
              <p className="text-xs mb-1">ALK: <span className="text-green-600">阴性</span></p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm font-semibold mb-2">药物代谢基因</p>
              <p className="text-xs mb-1">CYP2D6: <span className="text-yellow-600">慢代谢型</span></p>
              <p className="text-xs mb-1">CYP2C19: <span className="text-green-600">正常代谢型</span></p>
              <p className="text-xs mb-3">VKORC1: <span className="text-red-600">高敏感型</span></p>
              <p className="text-xs text-gray-500">* 患者对华法林等抗凝药物敏感性较高，建议减量使用</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setGeneticReport(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 处方对话框 */}
      <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentPatient?.hasPrescription ? "查看处方" : "开具处方"}</DialogTitle>
            <DialogDescription>
              患者: {currentPatient?.name} ({currentPatient?.id})
            </DialogDescription>
          </DialogHeader>
          {currentPatient?.hasPrescription ? (
            <div className="grid gap-4 py-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium">药品清单</p>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm flex justify-between">
                    <span>阿莫西林胶囊</span>
                    <span className="text-gray-500">0.25g × 3次/日 × 5天</span>
                  </li>
                  <li className="text-sm flex justify-between">
                    <span>布洛芬缓释胶囊</span>
                    <span className="text-gray-500">0.3g × 2次/日 × 3天</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>处方医生：{currentPatient?.doctor}</span>
                <span className="text-gray-500">开具时间：2023-06-15</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <p className="text-sm text-center text-gray-500">表单内容将在此处显示</p>
            </div>
          )}
          <DialogFooter>
            {currentPatient?.hasPrescription ? (
              <Button variant="default" onClick={() => setShowPrescriptionDialog(false)}>
                打印处方
              </Button>
            ) : (
              <Button variant="default" onClick={() => setShowPrescriptionDialog(false)}>
                保存处方
              </Button>
            )}
            <Button variant="secondary" onClick={() => setShowPrescriptionDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientDialogs;
