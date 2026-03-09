import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listproduct',
  standalone: false,
  templateUrl: './listproduct.html',
  styleUrl: './listproduct.css',
})
export class Listproduct {
  products=[{"id":1, "name":"Iphone 14 Pro", "price":30000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"},
            {"id":2, "name":"Samsung S23 Ultra", "price":28000000, "image":"https://clickbuy.com.vn/uploads/pro/samsung-galaxy-s23-ultra-5g-12gb-512gb-chinh-hang-lg-180190.jpg"},
            {"id":3, "name":"Xiaomi Mi 13", "price":-20000000, "image":"https://cdn.kalvo.com/uploads/img/gallery/45311-xiaomi-13-3.jpg"},
            {"id":4, "name":"Oppo Find X5 Pro", "price":22000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"},
            {"id":5, "name":"Vivo X90 Pro", "price":21000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"},
            {"id":6, "name":"Nokia X30", "price":-8000000, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWFcepWAuNn05P09Vr_CgxSjyv_wU-CFmHg&s"}
          ]
  selected_id: any;
  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    // dùng router để điều hướng
    // dùng activeRouter để điều hướng
    activeRouter.paramMap.subscribe((params) => {
      this.selected_id=params.get("id");
  })

  }
  view_detail(pid: number) 
  {
    // alert("View detail product " + pid);
    this.router.navigate(['/san-pham-1', pid]);
  }
}
