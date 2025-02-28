
import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  MessageCircle,
  Plus,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Send,
  Paperclip,
  Clock,
  Search,
  FileText,
  Stethoscope,
  User,
  Info,
  X,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// 模拟的对话历史数据
const mockHistoryConversations = [
  {
    id: "conv1",
    title: "腹痛和消化不良诊断",
    date: "今天",
    preview: "我的患者反复出现腹痛和消化不良症状，伴有...",
  },
  {
    id: "conv2",
    title: "慢性头痛分析",
    date: "昨天",
    preview: "患者报告持续性头痛超过3个月，疼痛部位在...",
  },
  {
    id: "conv3",
    title: "皮疹鉴别诊断",
    date: "2023/10/15",
    preview: "患者手臂和躯干出现红色皮疹，有轻微瘙痒...",
  },
  {
    id: "conv4",
    title: "糖尿病并发症评估",
    date: "2023/10/10",
    preview: "糖尿病患者最近出现视力模糊和足部刺痛...",
  },
];

// 模拟的患者病历数据
const mockPatientRecords = [
  {
    id: "P20230001",
    name: "王明",
    age: 45,
    gender: "男",
    visitDate: "2023-10-20",
    diagnosis: "高血压",
    symptoms: "头痛、眩晕、疲劳",
    medications: ["降压药A", "降压药B"],
  },
  {
    id: "P20230002",
    name: "李华",
    age: 35,
    gender: "男",
    visitDate: "2023-10-18",
    diagnosis: "胃炎",
    symptoms: "腹痛、恶心、食欲不振",
    medications: ["制酸剂", "胃粘膜保护剂"],
  },
  {
    id: "P20230003",
    name: "张丽",
    age: 28,
    gender: "女",
    visitDate: "2023-10-15",
    diagnosis: "偏头痛",
    symptoms: "头痛、视觉障碍、恶心",
    medications: ["止痛药", "抗偏头痛药"],
  },
];

// 消息类型枚举
type MessageType = "user" | "assistant" | "system";

// 消息接口
interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  relatedRecords?: string[];
}

const AIDiagnosis = () => {
  const [currentChat, setCurrentChat] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content: "您好，我是AI医疗助手。我可以帮助您进行疾病诊断和医疗建议。请描述患者症状或上传相关检查资料。",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistorySidebar, setShowHistorySidebar] = useState(true);
  const [linkedRecords, setLinkedRecords] = useState<string[]>([]);
  const [isLinkingRecords, setIsLinkingRecords] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 滚动到最新消息
  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 发送消息
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      relatedRecords: linkedRecords.length > 0 ? [...linkedRecords] : undefined,
    };

    setCurrentChat((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // 模拟AI回复延迟
    setTimeout(() => {
      // 根据是否有关联病历生成不同的回复
      let aiResponse: Message;
      
      if (linkedRecords.length > 0) {
        const linkedPatientsDetails = mockPatientRecords
          .filter(p => linkedRecords.includes(p.id))
          .map(p => `${p.name}(${p.id})的症状：${p.symptoms}；现有诊断：${p.diagnosis}；用药情况：${p.medications.join('、')}`)
          .join('\n');
        
        aiResponse = {
          id: Date.now().toString(),
          type: "assistant",
          content: `**病情分析**：\n结合您的描述和患者${linkedPatientsDetails.substring(0, 20)}...等病历信息，这可能是由于消化系统炎症引起的症状。\n\n**诊断建议**：\n1. 建议进行胃镜检查，排除胃溃疡或胃炎可能\n2. 完善肝胆B超检查\n3. 考虑进行H.pylori检测\n\n**治疗方案**：\n可考虑使用质子泵抑制剂和胃黏膜保护剂治疗，同时注意饮食调理，避免辛辣刺激食物。`,
          timestamp: new Date(),
        };
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "assistant",
          content: `**病情分析**：\n根据您描述的症状，这可能是消化不良或轻度胃炎的表现。\n\n**诊断建议**：\n1. 建议完善胃镜检查\n2. 考虑进行腹部超声检查\n\n**治疗建议**：\n短期可使用抑酸药物缓解症状，注意饮食规律，避免过度劳累。\n\n*请注意，以上建议仅供参考，详细诊断还需结合患者完整病史和检查结果。如需更精准的分析，可以提供患者的病历信息。*`,
          timestamp: new Date(),
        };
      }

      setCurrentChat((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      // 清除已关联的病历
      setLinkedRecords([]);
    }, 2000);
  };

  // 处理键盘事件（按Enter发送）
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 开始新对话
  const handleNewChat = () => {
    setCurrentChat([
      {
        id: "welcome",
        type: "system",
        content: "您好，我是AI医疗助手。我可以帮助您进行疾病诊断和医疗建议。请描述患者症状或上传相关检查资料。",
        timestamp: new Date(),
      },
    ]);
    setLinkedRecords([]);
    toast({
      title: "已开始新对话",
      description: "您可以开始输入新的诊断问题",
      duration: 3000,
    });
  };

  // 切换历史会话侧边栏显示
  const toggleHistorySidebar = () => {
    setShowHistorySidebar(!showHistorySidebar);
  };

  // 切换关联病历
  const toggleRecordLink = (recordId: string) => {
    setLinkedRecords((prevRecords) => {
      if (prevRecords.includes(recordId)) {
        return prevRecords.filter((id) => id !== recordId);
      } else {
        return [...prevRecords, recordId];
      }
    });
  };

  // 格式化时间
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧边栏：历史和新建对话 */}
          <div 
            className={cn(
              "h-full border-r flex flex-col bg-muted/30 transition-all duration-300",
              showHistorySidebar ? "w-72" : "w-0"
            )}
          >
            {showHistorySidebar && (
              <>
                <div className="p-4 border-b">
                  <Button 
                    variant="default" 
                    className="w-full justify-start"
                    onClick={handleNewChat}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    新建对话
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <Accordion type="single" collapsible defaultValue="history" className="w-full">
                    <AccordionItem value="history" className="border-b-0">
                      <AccordionTrigger className="px-4 py-2 hover:no-underline">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>历史会话</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          {mockHistoryConversations.map((conv) => (
                            <Button 
                              key={conv.id} 
                              variant="ghost" 
                              className="w-full justify-start px-6 py-2 h-auto text-left"
                            >
                              <div className="truncate">
                                <div className="font-medium">{conv.title}</div>
                                <div className="text-xs text-muted-foreground flex justify-between mt-1">
                                  <span>{conv.date}</span>
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ScrollArea>
              </>
            )}
          </div>

          {/* 右侧主要内容：聊天界面 */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* 头部 */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2" 
                  onClick={toggleHistorySidebar}
                >
                  {showHistorySidebar ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </Button>
                <h2 className="text-lg font-semibold">AI辅助诊断</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleNewChat}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  新对话
                </Button>
                {linkedRecords.length > 0 && (
                  <Badge variant="secondary" className="flex items-center">
                    已关联 {linkedRecords.length} 份病历
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 p-0"
                      onClick={() => setLinkedRecords([])}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>

            {/* 消息区域 */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6 max-w-3xl mx-auto">
                {currentChat.map((message) => (
                  <div 
                    key={message.id} 
                    className={cn(
                      "flex", 
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        message.type === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : message.type === "assistant"
                          ? "bg-muted" 
                          : "bg-blue-50 border border-blue-100"
                      )}
                    >
                      {message.type === "assistant" && (
                        <div className="flex items-center mb-2">
                          <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">AI医疗助手</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {formatMessageTime(message.timestamp)}
                          </span>
                        </div>
                      )}
                      
                      {message.type === "user" && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs">
                            {formatMessageTime(message.timestamp)}
                          </span>
                          <span className="font-medium ml-2">医生</span>
                        </div>
                      )}
                      
                      {message.type === "system" && (
                        <div className="flex items-center mb-2">
                          <Info className="h-5 w-5 mr-2 text-blue-500" />
                          <span className="font-medium">系统消息</span>
                        </div>
                      )}
                      
                      <div className={cn(
                        "whitespace-pre-line",
                        message.type === "assistant" ? "prose prose-sm max-w-none" : ""
                      )}>
                        {message.content}
                      </div>
                      
                      {message.relatedRecords && message.relatedRecords.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.relatedRecords.map(recordId => {
                            const record = mockPatientRecords.find(r => r.id === recordId);
                            return (
                              <Badge key={recordId} variant="outline" className="bg-background">
                                <FileText className="h-3 w-3 mr-1" />
                                {record?.name || recordId}
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
                        <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        <span className="text-sm text-muted-foreground ml-2">AI正在思考中...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* 功能工具栏 */}
            <div className="flex items-center gap-2 px-4 py-2 border-t">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-1"
                    onClick={() => setIsLinkingRecords(true)}
                  >
                    <FileText className="h-4 w-4" />
                    关联病历
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>选择关联病历</SheetTitle>
                    <SheetDescription>
                      关联患者病历可以让AI助手提供更准确的诊断建议
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="搜索患者姓名或ID..." 
                        className="pl-10"
                      />
                    </div>
                    <div className="space-y-2">
                      {mockPatientRecords.map((record) => (
                        <Card key={record.id} className={cn(
                          "cursor-pointer transition-all",
                          linkedRecords.includes(record.id) ? "border-primary" : ""
                        )}>
                          <CardHeader className="p-4 pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User className="h-6 w-6 text-muted-foreground" />
                                <CardTitle className="text-lg">{record.name}</CardTitle>
                                <Badge variant="outline">{record.gender}</Badge>
                                <span className="text-sm text-muted-foreground">{record.age}岁</span>
                              </div>
                              <Button 
                                variant={linkedRecords.includes(record.id) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleRecordLink(record.id)}
                              >
                                {linkedRecords.includes(record.id) ? "已选择" : "选择"}
                              </Button>
                            </div>
                            <CardDescription>
                              <div className="flex justify-between items-center">
                                <span>患者ID: {record.id}</span>
                                <span>就诊日期: {record.visitDate}</span>
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="space-y-2">
                              <div className="flex gap-2">
                                <span className="font-medium">诊断:</span>
                                <span>{record.diagnosis}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-medium">症状:</span>
                                <span>{record.symptoms}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-medium">用药:</span>
                                <span>{record.medications.join(', ')}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <SheetFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setLinkedRecords([])}
                    >
                      重置
                    </Button>
                    <SheetClose asChild>
                      <Button>
                        确认选择 ({linkedRecords.length})
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" size="sm" className="gap-1">
                <Paperclip className="h-4 w-4" />
                上传检查报告
              </Button>
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t">
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <Textarea
                    placeholder="输入您的诊断问题，描述患者症状..."
                    className="min-h-[100px] pr-20 resize-none"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <Button
                    className="absolute bottom-3 right-3"
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    发送
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIDiagnosis;
