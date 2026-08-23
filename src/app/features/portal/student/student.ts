import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortalService } from '../../../shared/services/portal.service';
import { PortalTitlePipe } from '../../../shared/pipes/portal-title.pipe';

type Section =
  | 'overview'
  | 'courses'
  | 'grades'
  | 'schedule'
  | 'exams'
  | 'requests'
  | 'announcements';

@Component({
  selector: 'app-student-portal',
  imports: [RouterLink, PortalTitlePipe],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class StudentPortal {
  private portal = inject(PortalService);

  activeSection = signal<Section>('overview');

  navItems: { key: Section; label: string; icon: string }[] = [
    { key: 'overview', label: 'نظرة عامة', icon: '📊' },
    { key: 'courses', label: 'المقررات الدراسية', icon: '📚' },
    { key: 'grades', label: 'الدرجات والنتائج', icon: '📈' },
    { key: 'schedule', label: 'جدولي الدراسي', icon: '📅' },
    { key: 'exams', label: 'الامتحانات', icon: '🏆' },
    { key: 'requests', label: 'طلباتي', icon: '📝' },
    { key: 'announcements', label: 'الإعلانات', icon: '🔔' },
  ];

  user = computed(() => this.portal.currentUser());

  courses = this.portal.getCourses('student');
  grades = this.portal.getGrades();
  schedule = this.portal.getSchedule('student');
  exams = this.portal.getExams();
  requests = this.portal.getRequests();
  announcements = this.portal.getAnnouncements();
  pendingRequests = this.requests.filter((r) => r.status === 'قيد المراجعة').length;

  gpa = '3.62';

  setSection(section: Section): void {
    this.activeSection.set(section);
  }

  logout(): void {
    this.portal.logout();
  }
}
