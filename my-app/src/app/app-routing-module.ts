import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Notfound } from './notfound/notfound';
import { About } from './about/about';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { Ex13 } from './ex13/ex13';
import { Ex13detail } from './ex13detail/ex13detail';
import { FakeProduct } from './fake-product/fake-product';
import { FakeProduct2 } from './fake-product2/fake-product2';
import { CoindeskAPI } from './coindesk-api/coindesk-api';
import { Catalog } from './catalog/catalog';
import { Ex18 } from './ex18/ex18';
import { Login } from './login/login';
import { Registration } from './registration/registration';
import { Mathematics } from './mathematics/mathematics';
import { Book } from './book/book';
import { Bookdetail } from './bookdetail/bookdetail';
import { Newbook } from './newbook/newbook';
import { BookUpdate } from './book-update/book-update';
import { BookDelete } from './book-delete/book-delete';
import { Fashion } from './fashion/fashion';
import { Bookex50 } from './bookex50/bookex50';
import { FashionDetail } from './fashion-detail/fashion-detail';
import { Register } from './register/register';
import { Loginex61 } from './loginex61/loginex61';
import { Cart } from './cart/cart';
import { Products } from './products/products';
const routes: Routes = [
  {path:"gioi-thieu", component: About},
  // {path:"khach-hang-1", component: Listcustomer},
  // {path:"khach-hang-2", component: Listcustomer2},
  // {path:"khach-hang-3", component: Listcustomer3},
  {path:"san-pham-1", component: Listproduct},
  {path:"san-pham-1/:id", component: Productdetail},
  {path:'ex13-product',component:Ex13},
  {path:'ex13-product/:id', component:Ex13detail},
  {path:"ex26", component: FakeProduct},
  {path:"ex27", component: FakeProduct2},
  {path:"ex28", component: CoindeskAPI},
  {path:"ex14-product", component: Catalog},
  {path:"khach-hang-4", component: Ex18},
  {path:"login", component: Login},
  {path:"register", component: Registration},
  {path: "mathematics", component:Mathematics},
  {path: "ex39", component:Book},
  {path: "ex41", component:Bookdetail},
  {path: "ex41/:id", component:Bookdetail},
  {path: "ex43", component:Newbook},
  {path: "ex45", component:BookUpdate},
  {path: "ex45/:id", component:BookUpdate},
  {path: "ex47", component:BookDelete},
  {path: "ex53", component:Fashion},
  {path:"ex50",component: Bookex50},
  {path:"ex54",component: FashionDetail},
  {path:"ex61",component: Loginex61},
  {path:"", redirectTo: "/products", pathMatch: "full"},
  {path:"products",component: Products},
  {path:"cart",component: Cart},
  {path:"registerweb",component: Register},
  // {path:"**", component: Notfound},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Routing=[
Listproduct,
Ex18,
Login,
]