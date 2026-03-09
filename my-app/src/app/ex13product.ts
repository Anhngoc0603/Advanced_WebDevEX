import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Ex13product {
  products=[{"id":"p1","name":"Cocacola","unitprice": 100, "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzt195S7GGcateTEtzXMGPq4HwC9Xp55d2TA&s"},
          {"id":"p2","name":"Pepsi","unitprice": 120, "image":"https://png.pngtree.com/png-clipart/20250222/original/pngtree-classic-pepsi-can-refreshing-carbonated-soft-drink-png-image_20493806.png"},  
          {"id":"p3","name":"7up","unitprice": 90, "image":"https://shop.annam-gourmet.com/pub/media/catalog/product/cache/ee0af4cad0f3673c5271df64bd520339/i/t/item_F143858_33f7.jpg"}
          ]
  constructor() { }
getProductsWithImages()
{
return this.products
}
getProductDetail(id:any){
return this.products.find(p=>p.id==id)
}
}
