import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fashiondetail } from './fashiondetail/fashiondetail';
import { Fashionlist } from './fashionlist/fashionlist';
import { Fashionform } from './fashionform/fashionform';

const routes: Routes = [
  { path: '', component: Fashionlist },
  { path: 'fashion/new', component: Fashionform },
  { path: 'fashion/edit/:id', component: Fashionform },
  { path: 'fashion/:id', component: Fashiondetail },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
