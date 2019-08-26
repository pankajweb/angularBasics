import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-sorted-users',
  templateUrl: './sorted-users.component.html',
  styleUrls: ['./sorted-users.component.css']
})
export class SortedUsersComponent implements OnInit {
	title= "Selected Users";
selectedUsers;
selectedUsersRole=[];

  constructor(private userService: UserService) { 
	this.selectedUsers = this.userService.getSelectedUsers();


this.selectedUsersRole.push(localStorage.getItem('stored_role'));
console.log(this.selectedUsersRole);
  }

  ngOnInit() {
  
  }
clearUser(){
this.selectedUsers = this.userService.clearSelection();
}

onUserDeleted(index){ 
	this.selectedUsers = this.userService.getSelectedUsers();
    this.selectedUsers.splice(index, 1); 
    console.log(this.selectedUsers);
}
}