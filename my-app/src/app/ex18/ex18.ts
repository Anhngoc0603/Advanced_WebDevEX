import { Component } from '@angular/core';
import { CustomerGroup } from '../myclasses/customersex18';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ex18',
  standalone: false,
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 {
  customerGroups: CustomerGroup[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<CustomerGroup[]>('/customers.json')
      .subscribe({
        next: (data) => {
          this.customerGroups = data;
        },
        error: (err) => {
          this.errorMessage = 'Không thể tải dữ liệu khách hàng: ' + err.message;
          console.error(err);
        }
      });
  }
}
