import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUsers = [];

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
}
