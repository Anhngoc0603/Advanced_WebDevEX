import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../myclasses/iLogin';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  jsonOutput: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;

  // Giả lập tài khoản đúng (cho Additional 2)
  private correctCredentials = {
    email: 'teacher@fis.edu.vn',
    password: '123456'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Additional 3: Load từ localStorage nếu có
    const savedData = localStorage.getItem('loginInfo');
    if (savedData) {
      const parsed = JSON.parse(savedData) as LoginModel & { rememberMe: boolean };
      this.loginForm.patchValue({
        email: parsed.email,
        password: parsed.password,
        rememberMe: parsed.rememberMe
      });
      this.rememberMe = parsed.rememberMe;
    }
  }

  onSubmit(): void {
    this.jsonOutput = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Vui lòng nhập đúng định dạng email và password ít nhất 5 ký tự!';
      return;
    }

    const formValue = this.loginForm.value;
    const loginData: LoginModel = {
      email: formValue.email,
      password: formValue.password
    };

    // Hiển thị JSON string (yêu cầu chính)
    this.jsonOutput = JSON.stringify(loginData, null, 2);

    // Additional 3: Lưu localStorage nếu checkbox checked
    if (formValue.rememberMe) {
      localStorage.setItem('loginInfo', JSON.stringify({ ...loginData, rememberMe: true }));
    } else {
      localStorage.removeItem('loginInfo');
    }

    // Additional 2: Giả lập login thành công → navigate
    if (
      loginData.email === this.correctCredentials.email &&
      loginData.password === this.correctCredentials.password
    ) {
      // Ví dụ: navigate đến trang danh sách khách hàng
      this.router.navigate(['/customers']);
    } else {
      this.errorMessage = 'Email hoặc password không đúng!';
    }
  }

  // Để checkbox thay đổi rememberMe
  onRememberChange(event: any): void {
    this.rememberMe = event.target.checked;
    this.loginForm.patchValue({ rememberMe: this.rememberMe });
  }
}
