import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IBitcoinPrice } from '../app/myclasses/iBitcoin';

@Injectable({
  providedIn: 'root',
})
export class CoindeskAPIService {
  private _url:string="currentprice.json"
  constructor(private _http: HttpClient) { }
  getCoindeskAPI():Observable<IBitcoinPrice> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<string>(this._url,requestOptions).pipe(
      map(res=>JSON.parse(res) as IBitcoinPrice),
      retry(3),
      catchError(this.handleError))
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
