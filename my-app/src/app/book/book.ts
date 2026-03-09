import { Component } from '@angular/core';
import { BookAPIService } from '../../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: false,
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class Book {
  books:any;
  errMessage:string=''
  constructor(private _service: BookAPIService, private router: Router,
              private activeRouter: ActivatedRoute   
){
    this._service.getBooks().subscribe({
      next:(data)=>{this.books=data; console.log('Books:', data);},
      error:(err)=>{this.errMessage=err.message; console.error('Error:', err);}
    })
  }
  show_detail(id:any)
  {
    this.router.navigate(['ex41',id])
  }
  show_update(id:any)
  {
    this.router.navigate(['ex45',id])
  }
  
  request_delete(id:any) 
  {
    if(confirm("Are you sure you want to delete BookId=["+id+"]?"))
    {      
      this.deleteBook(id);
    } 
  }
  deleteBook(bookId:any)
  {
    this._service.deleteBook(bookId).subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
}
