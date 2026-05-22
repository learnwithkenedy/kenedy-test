import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  NotificationService,
  Notification,
} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  private sub!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.sub = this.notificationService.notifications$.subscribe((n) => {
      this.notification = n;
      setTimeout(() => (this.notification = null), 3000);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
