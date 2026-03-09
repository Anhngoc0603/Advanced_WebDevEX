import { Component } from '@angular/core';
import { Ex13product } from '../ex13product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex13',
  standalone: false,
  templateUrl: './ex13.html',
  styleUrl: './ex13.css',
})
export class Ex13 {
  public products:any
constructor(pservice: Ex13product,private router:Router){
this.products=pservice.getProductsWithImages()
}
viewDetail(f:any)
{
this.router.navigate(['ex13-product',f.id])
}
}
