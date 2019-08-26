import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUsers = [];
  userRoles = [];

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

    this.userRoles.push(user);
    localStorage.setItem('stored_role', this.userRoles)

  }
  getRole() {
    return this.userRoles;
  }


  clearSelection(){
  this.selectedUsers=[];
return this.selectedUsers;

  }
}
