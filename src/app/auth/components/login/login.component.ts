import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  errorMessage!: string;
  showPassword: boolean = false;
  
  
  constructor(
    private formbuilder : FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }
  
  ngOnInit(): void {
  }
  getInputBorderColor(controlName: string): string {
    const control = this.loginForm.get(controlName);
  
    if (control) {
      if (control.invalid && (control.dirty || control.touched)) {
        return 'red'; // Trường không hợp lệ và đã được thay đổi hoặc chạm vào
      } else if (control.valid && (control.dirty || control.touched)) {
        return 'green'; // Trường hợp lệ và đã được thay đổi
      }
    }
  
    return 'black'; // Trường chưa được chạm vào
  }
   
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.onLogin({ username, password }).subscribe({
        next: (response) => {
          console.log('Login success', response);
          // localStorage.setItem('loginToken', response.token);
          // Check the role and navigate accordingly
          if (response.role === 'ADMIN') {
            this.router.navigateByUrl('/admin');
          } else if (response.role === 'CUSTOMER') {
            this.router.navigateByUrl('/');
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  
}
