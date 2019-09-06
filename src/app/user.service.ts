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






@Injectable({
  providedIn: 'root'
})
export class UserService {

   selectedUsers = [];
   userRoles = [];
   private customersUrl = 'http://localhost:8080/api/customers';  // U

    baseUri:string = 'http://localhost:8080/api';




  constructor(
    private http: HttpClient,
   private router: Router
  ) { 
}




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

    console.log("dasdadasd"+localStorage.getItem("currentUser"));


      return this.http.post<any>('http://localhost:8080/api/login', { username, password })
        .pipe(map(user => {
              if (user) {
                  localStorage.setItem('currentUser', user.token);
              }
              return user;
          }));
  }

   getToken() {
  return localStorage.getItem("currentUser")
}


private headers_Authorization = { headers: { Authorization: `Bearer ${this.getToken()}` }
    };


  //Get user details

  getUserDetails() {
    const token = this.getToken();
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  //check if user LoggedIn

   isLoggedIn(): boolean {
    const user = this.getUserDetails();

     try{
       return user.exp > Date.now() / 1000
    }
    catch(Error){
        return false
    }
  }



  // profile 
  public userList() {
    return this.http.get('http://localhost:8080/api/userList',this.headers_Authorization);
  }



  // profile 
  public jobList() {
    return this.http.get('http://localhost:8080/api/job/list',this.headers_Authorization);
  }

 // profile 
  public getJob(id) {
       let url = `${this.baseUri}/job/${id}`;
    return this.http.get(url,this.headers_Authorization);
  }



  public profile() {
        const token = this.getToken();

   return this.http.get(`http://localhost:8080/api/user/profile`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
 



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


      //add job
      createJob(data){
       return this.http.post('http://localhost:8080/api/job/create', data,this.headers_Authorization);
      }

    //logout

  logout() {

     this.token = ''
    window.localStorage.removeItem('currentUser')
    this.router.navigateByUrl('/')

   console.log("localdatastoarge"+localStorage.getItem("currentUser")); 

  }
  
}