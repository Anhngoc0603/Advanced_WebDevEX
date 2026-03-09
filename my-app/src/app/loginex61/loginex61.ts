import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loginex61',
  standalone: false,
  templateUrl: './loginex61.html',
  styleUrl: './loginex61.css',
})
export class Loginex61 {
  username=""
  password=""

  constructor(private http:HttpClient){}

  ngOnInit(){

    this.http.get<any>("http://localhost:3002/getCookie")
    .subscribe(res=>{
      if(res.username){
        this.username=res.username
        this.password=res.password
      }
    })

  }

  login(){

    const body={
      username:this.username,
      password:this.password
    }

    this.http.post<any>("http://localhost:3002/login",body)
    .subscribe(res=>{
      if(res.status=="success"){
        alert("Login success")
      }
      else{
        alert("Login fail")
      }
    })

  }
}
