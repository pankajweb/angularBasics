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
userlist;
selectedUsersRole=[];
agentUsers;
totalAgentUser;

// pager object
pager: any = {};

// paged items
pagedItems: any[];


  constructor(private userService: UserService) { 
	




    this.selectedUsers = this.userService.getSelectedUsers();
    this.agentUsers    = JSON.parse(localStorage.getItem('products'));
    if(this.agentUsers) {
          this.totalAgentUser = this.agentUsers.length;
        }


  }

  ngOnInit() {
     this.userService.userList().subscribe((response:any) => {
           this.userlist = response;
              this.setPage(1);
           });
  }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.userService.getPager(this.userlist.length, page);

        // get current page of items
        this.pagedItems = this.userlist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


clearUser(){
this.selectedUsers = this.userService.clearSelection();
}
clearUserRole(){
  localStorage.clear();
  this.totalAgentUser ='';
  this.agentUsers =[];
}

onUserDeleted(index){ 
	this.selectedUsers = this.userService.getSelectedUsers();
  this.selectedUsers.splice(index, 1); 
}
onUserRoleDeleted(index){ 
 let products=[];
 this.agentUsers =  JSON.parse(localStorage.getItem('products'));
 this.agentUsers.splice(index, 1); 
 console.log(this.agentUsers);
 localStorage.setItem('products', JSON.stringify(this.agentUsers));
}

}