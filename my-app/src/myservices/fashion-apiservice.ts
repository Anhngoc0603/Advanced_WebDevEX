import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { Fashion } from '../app/myclasses/Fashion';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
  constructor(private _http: HttpClient) { }
  getFashions():Observable<any>
    {
      const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.get<any>("http://localhost:3002/fashions",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Fashion>),
      retry(3),
      catchError(this.handleError))
    }
  
  handleError(error:HttpErrorResponse){
      return throwError(()=>new Error(error.message))
    }
  postFashion(aFashion:any):Observable<any>
  {
    const headers=new HttpHeaders().set("ContentType","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("/fashions",JSON.stringify(aFashion),requestOptions).pipe(
    map(res=>JSON.parse(res) as Fashion),
    retry(3),
    catchError(this.handleError))
  }
}
