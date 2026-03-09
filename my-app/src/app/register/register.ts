import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  jsonOutput: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {

    this.errorMessage = '';
    this.jsonOutput = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Email hoặc password không hợp lệ!';
      return;
    }

    const formValue = this.registerForm.value;

    const registerData = {
      email: formValue.email,
      password: formValue.password
    };

    // Hiển thị JSON
    this.jsonOutput = JSON.stringify(registerData, null, 2);

    // Gửi lên server
    this.http.post<any>('http://localhost:3002/register', registerData)
      .subscribe({
        next: (res) => {
          alert('Đăng ký thành công!');
          this.router.navigate(['/login']);   // chuyển sang trang login
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Đăng ký thất bại!';
        }
      });
  }
}
