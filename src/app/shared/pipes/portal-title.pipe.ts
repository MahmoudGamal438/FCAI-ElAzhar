import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'portalTitle',
  standalone: true,
})
export class PortalTitlePipe implements PipeTransform {
  private titles: Record<string, string> = {
    overview: 'نظرة عامة',
    courses: 'المقررات الدراسية',
    grades: 'الدرجات والنتائج',
    schedule: 'جدولي الدراسي',
    exams: 'الامتحانات',
    requests: 'طلباتي',
    announcements: 'الإعلانات',
    'my-courses': 'مقرراتي',
    students: 'طالبات المقرر',
    'grade-entry': 'رصد الدرجات',
    'faculty-schedule': 'الجداول الدراسية',
    'faculty-requests': 'الطلبات الواردة',
    'faculty-announcements': 'الإعلانات',
    users: 'إدارة المستخدمين',
    departments: 'الأقسام والوحدات',
    'admin-requests': 'الطلبات الإدارية',
    'admin-announcements': 'إدارة الإعلانات',
  };

  transform(value: string): string {
    return this.titles[value] ?? value;
  }
}
