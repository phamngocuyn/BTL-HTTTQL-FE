import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeaderAndFooter = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      // Bộ lọc để chỉ xử lý sự kiện NavigationEnd
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Ẩn header và footer khi đường dẫn bắt đầu bằng '/admin'
      this.showHeaderAndFooter = !event.url.startsWith('/admin');
      // this.showHeaderAndFooter = !event.url.startsWith('/auth');
    });
  }
}
