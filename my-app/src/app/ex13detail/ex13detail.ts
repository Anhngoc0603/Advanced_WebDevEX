import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ex13product } from '../ex13product';

@Component({
  selector: 'app-ex13detail',
  standalone: false,
  templateUrl: './ex13detail.html',
  styleUrl: './ex13detail.css',
})
export class Ex13detail {
  products=[{"id":"p1","name":"Cocacola","unitprice": 100, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzt195S7GGcateTEtzXMGPq4HwC9Xp55d2TA&s"},
          {"id":"p2","name":"Pepsi","unitprice": 120, "image":"https://png.pngtree.com/png-clipart/20250222/original/pngtree-classic-pepsi-can-refreshing-carbonated-soft-drink-png-image_20493806.png"},  
          {"id":"p3","name":"7up","unitprice": 90, "image":"https://icon2.cleanpng.com/20180331/kkw/avcec8vxv.webp"}
          ]
  selectedProduct:any
constructor(private activateRoute:ActivatedRoute,private _fs:Ex13product, private router:Router)
  {
  activateRoute.paramMap.subscribe((param)=>{
    let id=param.get('id')
    if(id!=null)
      {
      this.selectedProduct=_fs.getProductDetail(id)
      }
    }
  )
  }
  goBack()
  {
    this.router.navigate(['ex13-product'])
  }
}
