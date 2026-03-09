import { Component } from '@angular/core';
import { BookAPIService } from '../../myservices/book-apiservice';

@Component({
  selector: 'app-book-delete',
  standalone: false,
  templateUrl: './book-delete.html',
  styleUrl: './book-delete.css',
})
export class BookDelete {
  books:any
  errMessage:string=''
  constructor(private _service: BookAPIService){
    this._service.getBooks().subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  deleteBook(bookId:any)
  {
    this._service.deleteBook(bookId).subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
}
