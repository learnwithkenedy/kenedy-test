import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  onSubmit(): void {
    this.error = false;
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/employees']);
    } else {
      this.error = true;
    }
  }
}
