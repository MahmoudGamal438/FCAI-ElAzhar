import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'الرئيسية',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'الرئيسية',
  },

  // ===== عن الكلية =====
  {
    path: 'about/dean-word',
    loadComponent: () => import('./features/about/dean-word/dean-word').then((m) => m.DeanWord),
    title: 'كلمة عميدة الكلية',
  },
  {
    path: 'about/administration',
    loadComponent: () =>
      import('./features/about/administration/administration').then((m) => m.Administration),
    title: 'إدارة الكلية',
  },
  {
    path: 'about/strategic-goals',
    loadComponent: () =>
      import('./features/about/strategic-goals/strategic-goals').then((m) => m.StrategicGoals),
    title: 'الأهداف الاستراتيجية',
  },
  {
    path: 'about/library',
    loadComponent: () => import('./features/about/library/library').then((m) => m.Library),
    title: 'مكتبة الكلية',
  },
  {
    path: 'about/history',
    loadComponent: () => import('./features/about/history/history').then((m) => m.History),
    title: 'تاريخ الكلية',
  },
  {
    path: 'about/vision',
    loadComponent: () => import('./features/about/vision/vision').then((m) => m.Vision),
    title: 'رؤية الكلية',
  },
  {
    path: 'about/mission',
    loadComponent: () => import('./features/about/mission/mission').then((m) => m.Mission),
    title: 'رسالة الكلية',
  },
  {
    path: 'about/activities',
    loadComponent: () => import('./features/about/activities/activities').then((m) => m.Activities),
    title: 'الأنشطة الطلابية',
  },

  // ===== البرامج - بكالوريوس =====
  {
    path: 'programs/bachelor/data',
    loadComponent: () =>
      import('./features/programs/bachelor/data-science/data-science').then((m) => m.DataScience),
    title: 'علوم البيانات - بكالوريوس',
  },
  {
    path: 'programs/bachelor/cs',
    loadComponent: () =>
      import('./features/programs/bachelor/computer-science/computer-science').then(
        (m) => m.ComputerScience,
      ),
    title: 'علوم الحاسب - بكالوريوس',
  },
  {
    path: 'programs/bachelor/ai',
    loadComponent: () =>
      import('./features/programs/bachelor/artifical-intelligence/artifical-intelligence').then(
        (m) => m.ArtificalIntelligence,
      ),
    title: 'الذكاء الاصطناعي - بكالوريوس',
  },
  {
    path: 'programs/bachelor/cyber',
    loadComponent: () =>
      import('./features/programs/bachelor/cyber-security/cyber-security').then(
        (m) => m.CyberSecurity,
      ),
    title: 'الأمن السيبراني - بكالوريوس',
  },

  // ===== البرامج - دراسات عليا =====
  {
    path: 'programs/graduate/data',
    loadComponent: () =>
      import('./features/programs/graduate/data-science/data-science').then((m) => m.DataScience),
    title: 'علوم البيانات - دراسات عليا',
  },
  {
    path: 'programs/graduate/cs',
    loadComponent: () =>
      import('./features/programs/graduate/computer-science/computer-science').then(
        (m) => m.ComputerScience,
      ),
    title: 'علوم الحاسب - دراسات عليا',
  },
  {
    path: 'programs/graduate/ai',
    loadComponent: () =>
      import('./features/programs/graduate/artifical-intelligence/artifical-intelligence').then(
        (m) => m.ArtificalIntelligence,
      ),
    title: 'الذكاء الاصطناعي - دراسات عليا',
  },
  {
    path: 'programs/graduate/cyber',
    loadComponent: () =>
      import('./features/programs/graduate/cyber-security/cyber-security').then(
        (m) => m.CyberSecurity,
      ),
    title: 'الأمن السيبراني - دراسات عليا',
  },

  // ===== خدمة الطلاب =====
  {
    path: 'services/lectures-schedule',
    loadComponent: () =>
      import('./features/services/lectures-schedule/lectures-schedule').then(
        (m) => m.LecturesSchedule,
      ),
    title: 'جدول المحاضرات',
  },
  {
    path: 'services/quizzes-schedule',
    loadComponent: () =>
      import('./features/services/quizzes-schedule/quizzes-schedule').then(
        (m) => m.QuizzesSchedule,
      ),
    title: 'جدول الكويزات',
  },
  {
    path: 'services/midterm-schedule',
    loadComponent: () =>
      import('./features/services/midterm-schedule/midterm-schedule').then(
        (m) => m.MidtermSchedule,
      ),
    title: 'جدول امتحان منتصف الفصل',
  },
  {
    path: 'services/practical-schedule',
    loadComponent: () =>
      import('./features/services/practical-schedule/practical-schedule').then(
        (m) => m.PracticalSchedule,
      ),
    title: 'جدول العملي',
  },
  {
    path: 'services/final-schedule',
    loadComponent: () =>
      import('./features/services/final-schedule/final-schedule').then((m) => m.FinalSchedule),
    title: 'جدول الفاينل',
  },

  // ===== اختبار القدرات =====
  {
    path: 'aptitude-test',
    loadComponent: () =>
      import('./features/aptitude-test/aptitude-test').then((m) => m.AptitudeTest),
    title: 'اختبار القدرات',
  },

  // ===== البوابة الإلكترونية =====
  {
    path: 'portal',
    loadComponent: () => import('./features/portal/portal').then((m) => m.Portal),
    title: 'البوابة الإلكترونية',
  },
  {
    path: 'portal/login/:role',
    loadComponent: () => import('./features/portal/login/login').then((m) => m.PortalLogin),
    title: 'تسجيل الدخول',
  },
  {
    path: 'portal/student',
    loadComponent: () => import('./features/portal/student/student').then((m) => m.StudentPortal),
    title: 'بوابة الطالبات',
    canActivate: [() => import('./shared/services/portal.guard').then((m) => m.portalGuard)],
    data: { role: 'student' },
  },
  {
    path: 'portal/faculty',
    loadComponent: () => import('./features/portal/faculty/faculty').then((m) => m.FacultyPortal),
    title: 'بوابة أعضاء هيئة التدريس',
    canActivate: [() => import('./shared/services/portal.guard').then((m) => m.portalGuard)],
    data: { role: 'faculty' },
  },
  {
    path: 'portal/admin',
    loadComponent: () => import('./features/portal/admin/admin').then((m) => m.AdminPortal),
    title: 'بوابة الإدارة',
    canActivate: [() => import('./shared/services/portal.guard').then((m) => m.portalGuard)],
    data: { role: 'admin' },
  },

  // ===== اتصل بنا =====
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'اتصل بنا',
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
