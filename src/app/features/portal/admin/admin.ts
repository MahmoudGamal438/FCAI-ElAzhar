import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortalService } from '../../../shared/services/portal.service';
import { PortalTitlePipe } from '../../../shared/pipes/portal-title.pipe';

type Section = 'overview' | 'users' | 'admin-announcements' | 'departments' | 'admin-requests';

@Component({
  selector: 'app-admin-portal',
  imports: [RouterLink, PortalTitlePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminPortal {
  private portal = inject(PortalService);

  activeSection = signal<Section>('overview');

  navItems: { key: Section; label: string; icon: string }[] = [
    { key: 'overview', label: 'لوحة التحكم', icon: '📊' },
    { key: 'users', label: 'إدارة المستخدمين', icon: '👥' },
    { key: 'admin-announcements', label: 'إدارة الإعلانات', icon: '📢' },
    { key: 'departments', label: 'الأقسام والوحدات', icon: '🏛️' },
    { key: 'admin-requests', label: 'الطلبات الإدارية', icon: '📝' },
  ];

  user = computed(() => this.portal.currentUser());

  students = this.portal.getStudents();
  requests = this.portal.getRequests();
  announcements = signal(this.portal.getAnnouncements());

  newAnnouncement = signal({ title: '', body: '', audience: 'جميع الطالبات' });

  departments = [
    { name: 'قسم علوم الحاسب', head: 'أ.م.د. هالة مصطفى عبدالفتاح', students: 1250 },
    { name: 'قسم الذكاء الاصطناعي', head: 'أ.م.د. سارة محمود فتحي', students: 980 },
    { name: 'قسم الأمن السيبراني', head: 'د. نورهان عادل سيد', students: 760 },
    { name: 'قسم نظم المعلومات', head: 'د. منى سامي محمود', students: 860 },
    { name: 'وحدة الجودة وتقييم الأداء', head: 'د. أمل رمضان', students: 0 },
    { name: 'وحدة تكنولوجيا المعلومات', head: 'م. هدير عاطف', students: 0 },
  ];

  setSection(section: Section): void {
    this.activeSection.set(section);
  }

  updateAnnouncementField(field: 'title' | 'body' | 'audience', value: string): void {
    this.newAnnouncement.set({ ...this.newAnnouncement(), [field]: value });
  }

  addAnnouncement(): void {
    const { title, body, audience } = this.newAnnouncement();
    if (!title.trim() || !body.trim()) return;
    const next = {
      id: `AN-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      audience,
      date: '23 فبراير 2026',
      author: this.user()?.name ?? 'الإدارة',
    };
    this.announcements.set([next, ...this.announcements()]);
    this.newAnnouncement.set({ title: '', body: '', audience: 'جميع الطالبات' });
  }

  logout(): void {
    this.portal.logout();
  }
}
