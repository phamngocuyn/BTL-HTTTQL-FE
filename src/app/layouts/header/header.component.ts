import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    window.localStorage.removeItem('loginToken');
    window.localStorage.removeItem('userRole');
    this.router.navigate(['/auth/login']);
  } 
}
