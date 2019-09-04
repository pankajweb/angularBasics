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
  public userList() {
    return this.http.get('http://localhost:8080/api/userList',headers_Authorization);
  }



  // profile 
  public jobList() {
    return this.http.get('http://localhost:8080/api/job/list',headers_Authorization);
  }


  public profile() {
    return this.http.get('http://localhost:8080/api/user/profile',headers_Authorization);
  }

   getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
        
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    

  
}