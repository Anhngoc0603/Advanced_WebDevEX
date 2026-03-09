import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, Routing } from './app-routing-module';
import { App } from './app';
import { Notfound } from './notfound/notfound';
import { About } from './about/about';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { Ex13 } from './ex13/ex13';
import { Ex13detail } from './ex13detail/ex13detail';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FakeProduct } from './fake-product/fake-product';
import { FakeProduct2 } from './fake-product2/fake-product2';
import { CoindeskAPI } from './coindesk-api/coindesk-api';
import { Catalog } from './catalog/catalog';
import { Ex18 } from './ex18/ex18';
import { Login } from './login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Registration } from './registration/registration';
import { Mathematics } from './mathematics/mathematics';
import { Book } from './book/book';
import { FileUpload } from './file-upload/file-upload';
import { Newbook } from './newbook/newbook';
import { BookUpdate } from './book-update/book-update';
import { BookDelete } from './book-delete/book-delete';
import { Fashion } from './fashion/fashion';
import { Bookex50 } from './bookex50/bookex50';
import { FashionDetail } from './fashion-detail/fashion-detail';
import { Register } from './register/register';
import { Loginex61 } from './loginex61/loginex61';
import { Products } from './products/products';
import { Cart } from './cart/cart';

@NgModule({
  declarations: [
    Routing,
    App,
    Notfound,
    About,
    Listproduct,
    Productdetail,
    Ex13,
    Ex13detail,
    FakeProduct,
    FakeProduct2,
    CoindeskAPI,
    Catalog,
    Ex18,
    Login,
    Registration,
    Mathematics,
    Book,
    FileUpload,
    Newbook,
    BookUpdate,
    BookDelete,
    Fashion,
    Bookex50,
    FashionDetail,
    Register,
    Loginex61,
    Products,
    Cart
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
