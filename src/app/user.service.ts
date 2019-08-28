import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'


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

  constructor(
    private http: HttpClient
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
  register(user:User): Observable<User> {
    console.log(user);
   return this.http.post('http://localhost:8080/api/register', user,httpOptions);
  }

   //login
    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:8080/api/login', { username, password })
          .pipe(map(user => {
            console.log(user.token);
                if (user) {
                    localStorage.setItem('currentUser', user.token);
                }
                return user;
            }));
    }

   



}