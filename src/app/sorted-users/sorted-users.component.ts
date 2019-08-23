import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-sorted-users',
  templateUrl: './sorted-users.component.html',
  styleUrls: ['./sorted-users.component.css']
})
export class SortedUsersComponent implements OnInit {
selectedUsers;
  constructor(private userService: UserService) { 
	this.selectedUsers = this.userService.getSelectedUsers();
console.log(this.selectedUsers);
  }

  ngOnInit() {
  
  }

}
