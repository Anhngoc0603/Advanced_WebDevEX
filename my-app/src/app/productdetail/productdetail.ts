import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  standalone: false,
  templateUrl: './productdetail.html',
  styleUrl: './productdetail.css',
})
export class Productdetail {
products=[{"id":1, "name":"Iphone 14 Pro", "price":30000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"},
            {"id":2, "name":"Samsung S23 Ultra", "price":28000000, "image":"https://clickbuy.com.vn/uploads/pro/samsung-galaxy-s23-ultra-5g-12gb-512gb-chinh-hang-lg-180190.jpg"},
            {"id":3, "name":"Xiaomi Mi 13", "price":20000000, "image":"https://cdn.kalvo.com/uploads/img/gallery/45311-xiaomi-13-3.jpg"},
            {"id":4, "name":"Oppo Find X5 Pro", "price":22000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"},
            {"id":5, "name":"Vivo X90 Pro", "price":21000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"},
            {"id":6, "name":"Nokia X30", "price":8000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"}
          ]
  product_selected: any;
  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    // dùng router để điều hướng - đẩy cho cái khác
    // dùng activeRouter để điều hướng - nhận từ cái khác
    activeRouter.paramMap.subscribe((params) => {
      let id=params.get("id");
      this.product_selected=this.products.find(p=>p.id==Number(id))
  })
  }
  goback()
  {this.router.navigate(["san-pham-1"]);}
}
