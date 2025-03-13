
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MedicalRecordDialogProps {
  patient: any;
  showViewDialog: boolean;
  setShowViewDialog: (show: boolean) => void;
  showEditSheet: boolean;
  setShowEditSheet: (show: boolean) => void;
}

const MedicalRecordDialog: React.FC<MedicalRecordDialogProps> = ({
  patient,
  showViewDialog,
  setShowViewDialog,
  showEditSheet,
  setShowEditSheet,
}) => {
  const { toast } = useToast();
  const [medicalRecord, setMedicalRecord] = useState({
    chiefComplaint: patient?.medicalRecord?.chiefComplaint || "头痛、发热三天",
    presentIllness: patient?.medicalRecord?.presentIllness || "患者三天前无明显诱因出现头痛，伴发热，体温最高达38.5℃，有畏寒、乏力、肌肉酸痛等症状。自服布洛芬后体温一度下降，但数小时后又升高。",
    pastHistory: patient?.medicalRecord?.pastHistory || "否认高血压、糖尿病等慢性病史，无手术外伤史，无药物过敏史。",
    personalHistory: patient?.medicalRecord?.personalHistory || "无烟酒嗜好，起居规律。",
    familyHistory: patient?.medicalRecord?.familyHistory || "父母健在，否认家族遗传病史。",
    physicalExamination: patient?.medicalRecord?.physicalExamination || "体温38.2℃，脉搏92次/分，呼吸20次/分，血压128/85mmHg。神志清楚，精神稍差，全身皮肤粘膜无黄染，浅表淋巴结未触及肿大。头颅无畸形，眼睑无水肿，巩膜无黄染，瞳孔等大同圆，对光反射灵敏。咽部粘膜充血，双侧扁桃体Ⅱ度肿大。",
    auxiliaryExamination: patient?.medicalRecord?.auxiliaryExamination || "血常规：WBC 10.5×10^9/L，NEU% 75.6%，LYM% 18.2%，RBC 4.56×10^12/L，HGB 135g/L，PLT 245×10^9/L。\nC反应蛋白：15mg/L。",
    diagnosis: patient?.medicalRecord?.diagnosis || "上呼吸道感染",
    treatmentPlan: patient?.medicalRecord?.treatmentPlan || "1. 对症治疗：布洛芬缓释胶囊，0.3g，每日2次，口服，共3天；\n2. 抗感染治疗：阿莫西林胶囊，0.5g，每日3次，口服，共5天；\n3. 多饮水，休息，清淡饮食；\n4. 如症状加重，及时复诊。",
  });

  const handleSave = () => {
    // In a real app, you would save the medical record to the backend
    toast({
      title: "保存成功",
      description: `患者 ${patient?.name} 的病历已更新`,
      duration: 3000,
    });
    setShowEditSheet(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setMedicalRecord({
      ...medicalRecord,
      [field]: e.target.value,
    });
  };

  return (
    <>
      {/* 查看病历弹窗 */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>病历详情</DialogTitle>
            <DialogDescription>
              患者：{patient?.name}（{patient?.id}）| {patient?.gender === "male" ? "男" : "女"} | {patient?.age}岁 | {patient?.department}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-semibold mb-2">主诉</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {medicalRecord.chiefComplaint}
                </p>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">诊断</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {medicalRecord.diagnosis}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">现病史</h3>
              <p className="text-sm bg-gray-50 p-3 rounded-md whitespace-pre-line">
                {medicalRecord.presentIllness}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-semibold mb-2">既往史</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {medicalRecord.pastHistory}
                </p>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">个人史</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {medicalRecord.personalHistory}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">家族史</h3>
              <p className="text-sm bg-gray-50 p-3 rounded-md">
                {medicalRecord.familyHistory}
              </p>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">体格检查</h3>
              <p className="text-sm bg-gray-50 p-3 rounded-md whitespace-pre-line">
                {medicalRecord.physicalExamination}
              </p>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">辅助检查</h3>
              <p className="text-sm bg-gray-50 p-3 rounded-md whitespace-pre-line">
                {medicalRecord.auxiliaryExamination}
              </p>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2">治疗计划</h3>
              <p className="text-sm bg-gray-50 p-3 rounded-md whitespace-pre-line">
                {medicalRecord.treatmentPlan}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>就诊时间：{patient?.registerTime.toLocaleString()}</div>
              <div>记录医师：{patient?.doctor}</div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowViewDialog(false);
                setShowEditSheet(true);
              }}
            >
              编辑病历
            </Button>
            <Button onClick={() => setShowViewDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑病历抽屉 */}
      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>编辑病历</SheetTitle>
            <SheetDescription>
              患者：{patient?.name}（{patient?.id}）| {patient?.gender === "male" ? "男" : "女"} | {patient?.age}岁
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="chiefComplaint">主诉</Label>
              <Input
                id="chiefComplaint"
                value={medicalRecord.chiefComplaint}
                onChange={(e) => handleChange(e, "chiefComplaint")}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="presentIllness">现病史</Label>
              <Textarea
                id="presentIllness"
                rows={4}
                value={medicalRecord.presentIllness}
                onChange={(e) => handleChange(e, "presentIllness")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="pastHistory">既往史</Label>
              <Textarea
                id="pastHistory"
                rows={2}
                value={medicalRecord.pastHistory}
                onChange={(e) => handleChange(e, "pastHistory")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="personalHistory">个人史</Label>
              <Input
                id="personalHistory"
                value={medicalRecord.personalHistory}
                onChange={(e) => handleChange(e, "personalHistory")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="familyHistory">家族史</Label>
              <Input
                id="familyHistory"
                value={medicalRecord.familyHistory}
                onChange={(e) => handleChange(e, "familyHistory")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="physicalExamination">体格检查</Label>
              <Textarea
                id="physicalExamination"
                rows={4}
                value={medicalRecord.physicalExamination}
                onChange={(e) => handleChange(e, "physicalExamination")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="auxiliaryExamination">辅助检查</Label>
              <Textarea
                id="auxiliaryExamination"
                rows={3}
                value={medicalRecord.auxiliaryExamination}
                onChange={(e) => handleChange(e, "auxiliaryExamination")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="diagnosis" className="font-medium">诊断</Label>
              <Input
                id="diagnosis"
                value={medicalRecord.diagnosis}
                onChange={(e) => handleChange(e, "diagnosis")}
                className="font-medium"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="treatmentPlan">治疗计划</Label>
              <Textarea
                id="treatmentPlan"
                rows={4}
                value={medicalRecord.treatmentPlan}
                onChange={(e) => handleChange(e, "treatmentPlan")}
              />
            </div>
          </div>
          <SheetFooter className="pt-2">
            <Button onClick={handleSave}>保存病历</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MedicalRecordDialog;
