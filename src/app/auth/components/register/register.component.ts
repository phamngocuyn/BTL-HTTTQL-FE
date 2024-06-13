import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage !: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private http: HttpClient,
    private router: Router
    ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', [Validators.required]],
      last_name: [''],
      first_name: [''],
      phone: [''],
      password_confirmation: ['']
    });
  }
  ngOnInit(): void {

  }
  
  onSubmit() {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;
      const email = this.registerForm.get('email')?.value;
      const last_name = this.registerForm.get('last_name')?.value;
      const first_name = this.registerForm.get('first_name')?.value;
      const phone = this.registerForm.get('phone')?.value;
      const password_confirmation = this.registerForm.get('password_confirmation')?.value;

      this.authService.onRegister({ username, password, last_name, phone, email, first_name, password_confirmation}).subscribe({
        next: (response) => {
          console.log('Register success', response);
          alert("Đăng Ký thành công")
          localStorage.setItem('registerToken', response.token);
          this.router.navigateByUrl("/auth/login");
        },
        error: (error) => {
          alert("Đăng Ký thất bại")
          console.log("Lỗi: ", error)
          this.errorMessage = error.message;
        }
      });
    }
  }
}
