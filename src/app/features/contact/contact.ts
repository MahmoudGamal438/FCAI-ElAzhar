import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  subjects = [
    'استفسار عن البرامج',
    'استفسار عن التقديم',
    'استفسار عن التدريب',
    'استفسار عن البحث العلمي',
    'شكوى أو اقتراح',
    'أخرى',
  ];

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('بيانات النموذج:', this.contactForm.value);
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    this.contactForm.reset();
  }
}
