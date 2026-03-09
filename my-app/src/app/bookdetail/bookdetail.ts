import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { IBook } from '../myclasses/ibook';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BookAPIService } from '../../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';
import id from '@angular/common/locales/extra/id';

@Component({
  selector: 'app-bookdetail',
  standalone: false,
  templateUrl: './bookdetail.html',
  styleUrl: './bookdetail.css',
})
export class Bookdetail {
  errMessage: string = '';
  book: any;

  constructor(private _http: HttpClient,
              private_service: BookAPIService,
              private router: Router,
              private activeRouter: ActivatedRoute   
  ) {
    activeRouter.paramMap.subscribe((param)=>{
      let id=param.get("id")
      if (id!=null)
      {
      this.searchBook(id)
    }
  })
  }

  searchBook(bookId: string) {
    this.getBook(bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = err.message;
        this.book = undefined;
      }
    });
  }

  getBooks():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/books",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IBook>),
      retry(3),
      catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
  getBook(bookId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:3000/books/"+bookId,requestOptions).pipe(
    map(res=>JSON.parse(res) as IBook),
    retry(3),
    catchError(this.handleError))
  }
  view_detail (BookId:any)
  {
    this.router.navigate(['ex41', BookId]);
  }
}
