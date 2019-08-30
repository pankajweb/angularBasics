import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import * as jwt_decode from 'jwt-decode';
import { AuthGuard } from './guard/auth.guard';
import { Router } from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const headers_Authorization = {
  headers: new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("currentUser") })
};





@Injectable({
  providedIn: 'root'
})
export class UserService {

   selectedUsers = [];
   userRoles = [];
   private customersUrl = 'http://localhost:8080/api/customers';  // U

  constructor(
    private http: HttpClient,
   private router: Router

  ) {}





   addToSelected(user) {
 
    this.selectedUsers.push(user);
    console.log(this.selectedUsers);
  }

  getSelectedUsers() {
    return this.selectedUsers;
  }

  setRole(user) {

     let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push(user);
    localStorage.setItem('products', JSON.stringify(products));
      

  }
  getRole() {
    return this.userRoles;
  }


  clearSelection(){
  this.selectedUsers=[];
return this.selectedUsers;

  }
  //user auth funtionality
  //register
  register(user:User){
   return this.http.post('http://localhost:8080/api/register', user,httpOptions);
  }

 //login
  login(username: string, password: string) {
      return this.http.post<any>('http://localhost:8080/api/login', { username, password })
        .pipe(map(user => {
          console.log(user);
              if (user) {
                  localStorage.setItem('currentUser', user.token);
              }
              return user;
          }));
  }

   getToken() {
  return localStorage.getItem("currentUser")
}

  //Get user details

  getUserDetails() {
    const token = this.getToken()
    let userinfo
    if (token) {
      userinfo = token.split('.')[1]
      userinfo = window.atob(userinfo)
      return JSON.parse(userinfo)
    } else {
      return null
    }
  }

  //check if user LoggedIn

   isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

    //logout

  logout(){
    window.localStorage.removeItem('currentUser')
    this.router.navigate(['/login']);
  }

  // profile 


  public profile() {
    return this.http.get('http://localhost:8080/api/profile', headers_Authorization
    )
  }
  
}