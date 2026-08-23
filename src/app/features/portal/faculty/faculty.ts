import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortalService } from '../../../shared/services/portal.service';
import { PortalTitlePipe } from '../../../shared/pipes/portal-title.pipe';

type Section = 'overview' | 'my-courses' | 'students' | 'grade-entry' | 'faculty-schedule' | 'faculty-announcements';

@Component({
  selector: 'app-faculty-portal',
  imports: [RouterLink, PortalTitlePipe],
  templateUrl: './faculty.html',
  styleUrl: './faculty.css',
})
export class FacultyPortal {
  private portal = inject(PortalService);

  activeSection = signal<Section>('overview');

  navItems: { key: Section; label: string; icon: string }[] = [
    { key: 'overview', label: 'نظرة عامة', icon: '📊' },
    { key: 'my-courses', label: 'مقرراتي الدراسية', icon: '📚' },
    { key: 'students', label: 'طالبات المقرر', icon: '👩‍🎓' },
    { key: 'grade-entry', label: 'رصد الدرجات', icon: '📝' },
    { key: 'faculty-schedule', label: 'الجداول الدراسية', icon: '📅' },
    { key: 'faculty-announcements', label: 'الإعلانات', icon: '🔔' },
  ];

  user = computed(() => this.portal.currentUser());

  courses = this.portal.getCourses('faculty');
  schedule = this.portal.getSchedule('faculty');
  students = this.portal.getStudents();
  announcements = this.portal.getAnnouncements();

  gradeEntry = signal<Record<string, number | null>>({});

  setSection(section: Section): void {
    this.activeSection.set(section);
  }

  setGrade(studentId: string, value: string): void {
    const num = Number(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      this.gradeEntry.set({ ...this.gradeEntry(), [studentId]: num });
    } else {
      this.gradeEntry.set({ ...this.gradeEntry(), [studentId]: null });
    }
  }

  saveGrades(): void {
    alert('تم حفظ درجات المقرر بنجاح.');
  }

  logout(): void {
    this.portal.logout();
  }
}
