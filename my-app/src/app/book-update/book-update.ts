import { Component } from '@angular/core';
import { Book } from '../../app/myclasses/ibook';
import { BookAPIService } from '../../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-update',
  standalone: false,
  templateUrl: './book-update.html',
  styleUrl: './book-update.css',
})
export class BookUpdate {
  book=new Book();
  books:any
  errMessage:string=''
  constructor(private _service: BookAPIService,
              private router: Router,
              private activeRouter: ActivatedRoute   
  ){
    this._service.getBooks().subscribe({
    next:(data)=>{this.books=data},
    error:(err)=>{this.errMessage=err}
    })

    activeRouter.paramMap.subscribe((param)=>{
      let id=param.get("id")
      if (id!=null)
      {
      this.searchBook(id)
    }
  })
  }
  putBook()
  {
    this._service.putBook(this.book).subscribe({
    next:(data)=>{this.books=data},
    error:(err)=>{this.errMessage=err}
    })
  }

  searchBook(bookId: string) 
  {
    this._service.getBook(bookId).subscribe({
      next: (data) => {this.book=data},
      error: (err) => {this.errMessage = err}
      })
  }
}
