// استيراد Zone.js أولاً - هذا مهم جداً
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('خطأ في تشغيل التطبيق:', err));