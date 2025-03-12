
import { format, differenceInMinutes, parse } from "date-fns";
import { zhCN } from "date-fns/locale";

export interface ConsultationRecord {
  patientId: number;
  patientName: string;
  startTime: Date;
  endTime: Date | null;
  duration: number | null;
  status: "待诊" | "进行中" | "已完成";
}

export interface TimeSegment {
  hour: string;
  avgDuration: number;
  consultationCount: number;
  efficiency: number; // Efficiency score (0-100)
}

// Generate today's consultation records (mock data for now)
export const getTodayConsultations = (): ConsultationRecord[] => {
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  
  // In a real app, this would fetch from an API
  return [
    {
      patientId: 1,
      patientName: "王明",
      startTime: parse(`${today} 09:30`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: parse(`${today} 09:48`, "yyyy-MM-dd HH:mm", new Date()),
      duration: 18,
      status: "已完成"
    },
    {
      patientId: 2,
      patientName: "李华",
      startTime: parse(`${today} 10:15`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: parse(`${today} 10:30`, "yyyy-MM-dd HH:mm", new Date()),
      duration: 15,
      status: "已完成"
    },
    {
      patientId: 3,
      patientName: "陈静",
      startTime: parse(`${today} 10:45`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: null,
      duration: null,
      status: "进行中"
    },
    {
      patientId: 4,
      patientName: "赵伟",
      startTime: parse(`${today} 11:30`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: null,
      duration: null,
      status: "待诊"
    },
    {
      patientId: 5,
      patientName: "张丽",
      startTime: parse(`${today} 13:00`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: parse(`${today} 13:20`, "yyyy-MM-dd HH:mm", new Date()),
      duration: 20,
      status: "已完成"
    },
    {
      patientId: 6,
      patientName: "刘德华",
      startTime: parse(`${today} 14:15`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: parse(`${today} 14:35`, "yyyy-MM-dd HH:mm", new Date()),
      duration: 20,
      status: "已完成"
    },
    {
      patientId: 7,
      patientName: "林志玲",
      startTime: parse(`${today} 15:00`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: parse(`${today} 15:10`, "yyyy-MM-dd HH:mm", new Date()),
      duration: 10,
      status: "已完成"
    },
    {
      patientId: 8,
      patientName: "周杰伦",
      startTime: parse(`${today} 15:45`, "yyyy-MM-dd HH:mm", new Date()),
      endTime: parse(`${today} 16:10`, "yyyy-MM-dd HH:mm", new Date()),
      duration: 25,
      status: "已完成"
    }
  ];
};

// Calculate time trends by hour segments
export const calculateTimeTrends = (): TimeSegment[] => {
  const consultations = getTodayConsultations();
  const hourSegments: { [key: string]: TimeSegment } = {};
  
  // Initialize hour segments (8:00 - 17:00, standard clinic hours)
  for (let i = 8; i <= 17; i++) {
    const hourStr = `${i.toString().padStart(2, '0')}:00`;
    hourSegments[hourStr] = {
      hour: hourStr,
      avgDuration: 0,
      consultationCount: 0,
      efficiency: 0
    };
  }
  
  // Process each consultation
  consultations.forEach(consultation => {
    if (consultation.status !== "已完成" || !consultation.duration) return;
    
    const hour = format(consultation.startTime, 'HH:00');
    if (hourSegments[hour]) {
      const segment = hourSegments[hour];
      segment.consultationCount += 1;
      
      // Update average duration
      if (segment.avgDuration === 0) {
        segment.avgDuration = consultation.duration;
      } else {
        segment.avgDuration = (segment.avgDuration + consultation.duration) / 2;
      }
      
      // Calculate efficiency (lower duration = higher efficiency, capped at 100)
      // A consultation of 15 minutes or less is considered 100% efficient
      segment.efficiency = Math.min(100, (30 / segment.avgDuration) * 100);
    }
  });
  
  // Convert object to array and sort by hour
  return Object.values(hourSegments).sort((a, b) => 
    a.hour.localeCompare(b.hour)
  );
};

// Get current consultation statistics
export const getConsultationStats = () => {
  const consultations = getTodayConsultations();
  const completed = consultations.filter(c => c.status === "已完成").length;
  const inProgress = consultations.filter(c => c.status === "进行中").length;
  const waiting = consultations.filter(c => c.status === "待诊").length;
  const total = consultations.length;
  
  // Calculate average consultation time
  const completedConsultations = consultations.filter(c => c.status === "已完成" && c.duration !== null);
  const totalDuration = completedConsultations.reduce((sum, c) => sum + (c.duration || 0), 0);
  const avgDuration = completedConsultations.length > 0 ? totalDuration / completedConsultations.length : 0;
  
  return {
    completed,
    inProgress,
    waiting,
    total,
    avgDuration: Math.round(avgDuration),
    completionRate: Math.round((completed / total) * 100)
  };
};
