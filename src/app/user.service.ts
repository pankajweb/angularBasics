import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUsers = [];
  userRoles:string = [];

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
}
