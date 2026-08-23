import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortalService, Role } from '../../../shared/services/portal.service';

@Component({
  selector: 'app-portal-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class PortalLogin {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private portal = inject(PortalService);
  private fb = inject(FormBuilder);

  readonly role = signal<Role>('student');
  readonly error = signal('');

  readonly roleMeta: Record<Role, { title: string; icon: string; desc: string }> = {
    student: { title: 'بوابة الطالبات', icon: '🎓', desc: 'تسجيل دخول الطالبات' },
    faculty: { title: 'بوابة أعضاء هيئة التدريس', icon: '👩‍🏫', desc: 'تسجيل دخول أعضاء هيئة التدريس' },
    admin: { title: 'بوابة الإدارة', icon: '🗂️', desc: 'تسجيل دخول الإدارة' },
  };

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor() {
    const param = this.route.snapshot.paramMap.get('role') as Role | null;
    if (param && ['student', 'faculty', 'admin'].includes(param)) {
      this.role.set(param);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  get meta() {
    return this.roleMeta[this.role()];
  }

  onSubmit(): void {
    this.error.set('');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { username, password } = this.loginForm.value;
    const user = this.portal.login(username ?? '', password ?? '');
    if (!user) {
      this.error.set('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
      return;
    }
    this.router.navigate([`/portal/${user.role}`]);
  }
}
