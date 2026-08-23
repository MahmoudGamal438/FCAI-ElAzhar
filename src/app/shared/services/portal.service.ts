import { Injectable, signal } from '@angular/core';

export type Role = 'student' | 'faculty' | 'admin';

export interface PortalUser {
  id: string;
  username: string;
  password: string;
  role: Role;
  name: string;
  email: string;
  dept: string;
  phone: string;
  avatar?: string;
}

export interface Course {
  code: string;
  name: string;
  hours: number;
  semester: string;
  grade?: string;
}

export interface Grade {
  code: string;
  name: string;
  work: number;
  midterm: number;
  practical: number;
  final: number;
  total: number;
  letter: string;
}

export interface ScheduleItem {
  day: string;
  time: string;
  course: string;
  room: string;
  type: 'نظري' | 'عملي';
}

export interface ExamItem {
  course: string;
  date: string;
  time: string;
  room: string;
  kind: 'midterm' | 'final';
}

export interface PortalRequest {
  id: string;
  type: string;
  subject: string;
  date: string;
  status: 'قيد المراجعة' | 'مقبول' | 'مرفوض';
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  audience: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class PortalService {
  readonly currentUser = signal<PortalUser | null>(null);
  readonly role = signal<Role | null>(null);

  private readonly sessionKey = 'azhar_portal_session';

  private readonly users: PortalUser[] = [
    {
      id: '20231101',
      username: 'student',
      password: '123456',
      role: 'student',
      name: 'مريم خالد عبدالرحمن',
      email: 'maram.khaled@azhar.edu.eg',
      dept: 'علوم الحاسب',
      phone: '01012345678',
    },
    {
      id: '20241102',
      username: 'student2',
      password: '123456',
      role: 'student',
      name: 'سلمى أحمد محمد',
      email: 'salma.ahmed@azhar.edu.eg',
      dept: 'الذكاء الاصطناعي',
      phone: '01112345678',
    },
    {
      id: 'F-1001',
      username: 'faculty',
      password: '123456',
      role: 'faculty',
      name: 'أ.م.د. هالة مصطفى عبدالفتاح',
      email: 'hala.mostafa@azhar.edu.eg',
      dept: 'علوم الحاسب',
      phone: '01098765432',
    },
    {
      id: 'F-1002',
      username: 'faculty2',
      password: '123456',
      role: 'faculty',
      name: 'د. منى سامي محمود',
      email: 'mona.samy@azhar.edu.eg',
      dept: 'الذكاء الاصطناعي',
      phone: '01198765432',
    },
    {
      id: 'A-001',
      username: 'admin',
      password: '123456',
      role: 'admin',
      name: 'أ. نادية حسن إبراهيم',
      email: 'nadia.hassan@azhar.edu.eg',
      dept: 'شئون الطلاب',
      phone: '01234567890',
    },
  ];

  constructor() {
    const raw = localStorage.getItem(this.sessionKey);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        const user = this.users.find((u) => u.username === saved.username);
        if (user) {
          this.currentUser.set(user);
          this.role.set(user.role);
        } else {
          localStorage.removeItem(this.sessionKey);
        }
      } catch {
        localStorage.removeItem(this.sessionKey);
      }
    }
  }

  login(username: string, password: string): PortalUser | null {
    const user = this.users.find(
      (u) => u.username === username.trim() && u.password === password,
    );
    if (!user) return null;
    this.currentUser.set(user);
    this.role.set(user.role);
    localStorage.setItem(this.sessionKey, JSON.stringify({ username: user.username }));
    return user;
  }

  logout(): void {
    this.currentUser.set(null);
    this.role.set(null);
    localStorage.removeItem(this.sessionKey);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  // ===== Mock Data =====
  getCourses(role: Role, userId?: string): Course[] {
    if (role === 'student') {
      return [
        { code: 'CS301', name: 'هياكل البيانات المتقدمة', hours: 3, semester: 'الترم الثاني' },
        { code: 'CS302', name: 'قواعد البيانات', hours: 3, semester: 'الترم الثاني' },
        { code: 'CS303', name: 'هندسة البرمجيات', hours: 3, semester: 'الترم الثاني' },
        { code: 'CS304', name: 'شبكات الحاسب', hours: 3, semester: 'الترم الثاني' },
        { code: 'CS305', name: 'الذكاء الاصطناعي', hours: 3, semester: 'الترم الثاني' },
        { code: 'CS306', name: 'أمن المعلومات', hours: 2, semester: 'الترم الثاني' },
      ];
    }
    return [
      { code: 'CS301', name: 'هياكل البيانات المتقدمة', hours: 3, semester: 'الترم الثاني' },
      { code: 'CS302', name: 'قواعد البيانات', hours: 3, semester: 'الترم الثاني' },
      { code: 'AI401', name: 'التعلم الآلي', hours: 3, semester: 'الترم الثاني' },
    ];
  }

  getGrades(): Grade[] {
    return [
      { code: 'CS201', name: 'البرمجة الشيئية', work: 10, midterm: 15, practical: 10, final: 55, total: 90, letter: 'A' },
      { code: 'CS202', name: 'الرياضيات المتقطعة', work: 8, midterm: 12, practical: 0, final: 50, total: 70, letter: 'B' },
      { code: 'CS203', name: 'هياكل البيانات', work: 9, midterm: 14, practical: 10, final: 52, total: 85, letter: 'A' },
      { code: 'CS204', name: 'نظم التشغيل', work: 7, midterm: 10, practical: 8, final: 42, total: 67, letter: 'B' },
      { code: 'CS205', name: 'تحليل وتصميم النظم', work: 9, midterm: 13, practical: 0, final: 48, total: 70, letter: 'B' },
      { code: 'CS206', name: 'اللغة الإنجليزية', work: 10, midterm: 15, practical: 0, final: 58, total: 83, letter: 'A' },
    ];
  }

  getSchedule(role: Role): ScheduleItem[] {
    if (role === 'student') {
      return [
        { day: 'السبت', time: '09:00 - 11:00', course: 'هياكل البيانات المتقدمة', room: 'قاعة 203', type: 'نظري' },
        { day: 'السبت', time: '11:00 - 13:00', course: 'شبكات الحاسب', room: 'معمل 2', type: 'عملي' },
        { day: 'الأحد', time: '09:00 - 11:00', course: 'قواعد البيانات', room: 'قاعة 205', type: 'نظري' },
        { day: 'الاثنين', time: '11:00 - 13:00', course: 'هندسة البرمجيات', room: 'قاعة 201', type: 'نظري' },
        { day: 'الثلاثاء', time: '09:00 - 11:00', course: 'الذكاء الاصطناعي', room: 'قاعة 208', type: 'نظري' },
        { day: 'الثلاثاء', time: '11:00 - 13:00', course: 'أمن المعلومات', room: 'معمل 3', type: 'عملي' },
        { day: 'الأربعاء', time: '09:00 - 11:00', course: 'قواعد البيانات', room: 'معمل 1', type: 'عملي' },
        { day: 'الخميس', time: '10:00 - 12:00', course: 'متابعة المشروع', room: 'قاعة 210', type: 'نظري' },
      ];
    }
    return [
      { day: 'السبت', time: '09:00 - 11:00', course: 'هياكل البيانات المتقدمة (فرقة ثالثة)', room: 'قاعة 203', type: 'نظري' },
      { day: 'الأحد', time: '11:00 - 13:00', course: 'قواعد البيانات (فرقة ثانية)', room: 'قاعة 205', type: 'نظري' },
      { day: 'الثلاثاء', time: '09:00 - 11:00', course: 'التعلم الآلي (فرقة رابعة)', room: 'قاعة 208', type: 'نظري' },
      { day: 'الثلاثاء', time: '11:00 - 13:00', course: 'التعلم الآلي (عملي)', room: 'معمل 3', type: 'عملي' },
    ];
  }

  getExams(): ExamItem[] {
    return [
      { course: 'هياكل البيانات المتقدمة', date: '31 مايو 2026', time: '09:00 - 12:00', room: 'المدرج أ', kind: 'final' },
      { course: 'قواعد البيانات', date: '2 يونيو 2026', time: '09:00 - 12:00', room: 'المدرج ب', kind: 'final' },
      { course: 'هندسة البرمجيات', date: '4 يونيو 2026', time: '09:00 - 12:00', room: 'المدرج أ', kind: 'final' },
      { course: 'شبكات الحاسب', date: '7 يونيو 2026', time: '09:00 - 12:00', room: 'المدرج ب', kind: 'final' },
      { course: 'الذكاء الاصطناعي', date: '9 يونيو 2026', time: '09:00 - 12:00', room: 'المدرج أ', kind: 'final' },
      { course: 'أمن المعلومات', date: '11 يونيو 2026', time: '09:00 - 12:00', room: 'المدرج ب', kind: 'final' },
    ];
  }

  getRequests(): PortalRequest[] {
    return [
      { id: 'REQ-1001', type: 'إفادة قيد', subject: 'طلب إفادة قيد للجهة المانحة', date: '12 فبراير 2026', status: 'قيد المراجعة' },
      { id: 'REQ-1002', type: 'تظلم درجات', subject: 'تظلم في مادة نظم التشغيل', date: '20 يناير 2026', status: 'قيد المراجعة' },
      { id: 'REQ-1003', type: 'تحويل بيانات', subject: 'تحديث رقم الهاتف', date: '5 يناير 2026', status: 'مقبول' },
    ];
  }

  getAnnouncements(): Announcement[] {
    return [
      {
        id: 'AN-001',
        title: 'مواعيد امتحانات الفصل الدراسي الثاني 2025/2026',
        body: 'أعلنت الكلية عن جدول امتحانات نهاية الفصل الدراسي الثاني، وتنطلق الامتحانات من الأحد 31 مايو 2026. نرجو من الطالبات الاطلاع على الجدول النهائي من صفحة خدمات الطلاب.',
        date: '15 فبراير 2026',
        audience: 'الطالبات',
        author: 'شئون التعليم والطلاب',
      },
      {
        id: 'AN-002',
        title: 'بدء التسجيل في مشروعات التخرج',
        body: 'يبدأ تسجيل مشروعات التخرج للفرقة الرابعة عبر البوابة الإلكترونية اعتباراً من الأسبوع الأول من مارس 2026، على أن يتم اختيار المشرف من خلال قوائم الأقسام.',
        date: '10 فبراير 2026',
        audience: 'الفرقة الرابعة',
        author: 'وكيلة الدراسات العليا',
      },
      {
        id: 'AN-003',
        title: 'ورشة عمل عن الأمن السيبراني',
        body: 'تنظم الكلية ورشة عمل مجانية عن أساسيات الأمن السيبراني بالتعاون مع نادي الأمن السيبراني، يوم الأربعاء 25 فبراير بقاعة المؤتمرات.',
        date: '8 فبراير 2026',
        audience: 'جميع الطالبات',
        author: 'إدارة الأنشطة الطلابية',
      },
    ];
  }

  getStudents(): { id: string; name: string; level: string; gpa: number; status: string }[] {
    return [
      { id: '20221101', name: 'مريم خالد عبدالرحمن', level: 'الفرقة الثالثة', gpa: 3.62, status: 'منتظمة' },
      { id: '20221102', name: 'سلمى أحمد محمد', level: 'الفرقة الثالثة', gpa: 3.48, status: 'منتظمة' },
      { id: '20221103', name: 'حبيبة محمود السيد', level: 'الفرقة الثالثة', gpa: 3.21, status: 'منتظمة' },
      { id: '20221104', name: 'أسماء عصام فتحي', level: 'الفرقة الثالثة', gpa: 3.05, status: 'منتظمة' },
      { id: '20221105', name: 'نورهان محمد علي', level: 'الفرقة الثالثة', gpa: 2.87, status: 'إنذار' },
      { id: '20221106', name: 'فاطمة الزهراء حسن', level: 'الفرقة الثالثة', gpa: 3.74, status: 'منتظمة' },
      { id: '20221107', name: 'رنا عبدالله السعيد', level: 'الفرقة الثالثة', gpa: 3.31, status: 'منتظمة' },
      { id: '20221108', name: 'شهد إيهاب صبري', level: 'الفرقة الثالثة', gpa: 2.94, status: 'منتظمة' },
    ];
  }
}
