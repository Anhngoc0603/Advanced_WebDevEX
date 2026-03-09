import { Component } from '@angular/core';
import { Fashion } from '../fashion/fashion';
import { map } from 'rxjs/internal/operators/map';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BookAPIService } from '../../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail {
  errMessage: string = '';
  fashion: any;

  constructor(private _http: HttpClient,
              private_service: BookAPIService,
              private router: Router,
              private activeRouter: ActivatedRoute   
  ) {
    activeRouter.paramMap.subscribe((param)=>{
      let id=param.get("id")
      if (id!=null)
      {
      this.searchFashion(id)
    }
  })
  }

  searchFashion(fashionId: string) {
    this.getFashionById(fashionId).subscribe({
      next: (data) => {
        this.fashion = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = err.message;
        this.fashion = undefined;
      }
    });
  }

  getFashion():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/fashions",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Fashion>),
      retry(3),
      catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
  getFashionById(fashionId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:3002/fashions/"+fashionId,requestOptions).pipe(
    map(res=>JSON.parse(res) as Fashion),
    retry(3),
    catchError(this.handleError))
  }
  view_detail (BookId:any)
  {
    this.router.navigate(['ex41', BookId]);
  }
}
