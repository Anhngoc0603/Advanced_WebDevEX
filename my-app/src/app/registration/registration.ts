import { Component } from '@angular/core';
import { CourseRegistration } from '../myclasses/iCourse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  registrationForm: FormGroup;
  submitted = false;
  jsonOutput: string = '';

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['Nam Anh', Validators.required],
      email: ['anh@gmail.com', [Validators.required, Validators.email]],
      phone: ['0909090909', [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]],
      course: ['Ruby', Validators.required],
      time: ['toi', Validators.required],
      agree: [true, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      const formValue: CourseRegistration = this.registrationForm.value;
      this.jsonOutput = JSON.stringify(formValue, null, 2);  // Định dạng đẹp với indent
    } else {
      this.jsonOutput = 'Form chưa hợp lệ!';
    }
  }

  // Optional: Reset form
  onReset() {
    this.registrationForm.reset({
      name: 'Nam Anh',
      email: 'anh@gmail.com',
      phone: '0909090909',
      course: 'Ruby',
      time: 'toi',
      agree: true
    });
    this.submitted = false;
    this.jsonOutput = '';
  }
}
