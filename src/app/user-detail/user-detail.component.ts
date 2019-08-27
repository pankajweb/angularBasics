import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
selectedUsers;
agentRole_By =[];

user;
target;
users = [
{
name:'Pankaj',
company_name:"Wegile",
user_desc:"Web developer",
},
{
name:'Naval',
company_name:"Wegile",
user_desc:'Web developer'
},
{
name:'Amit',
company_name:'Wegile',
user_desc:''

}
];


  constructor( private route: ActivatedRoute,private userService: UserService) { }

  ngOnInit() {
  	  this.route.paramMap.subscribe(params => {
       this.user = this.users[+params.get('userId')];
  });
  }

  addToSortedList(user) {
    this.target = this.userService.getSelectedUsers().find(checkUser=>checkUser.name==user.name)
    if(this.target) {
    window.alert("User Already Selected");
    }
    else{
    this.userService.addToSelected(user);
    window.alert("Selected Successfully!");
    }
  }

  addToUserRole(user) {
    if(localStorage.getItem('products')){
          this.target = JSON.parse(localStorage.getItem('products')).find(checkUser=>checkUser.name==user.name)
    if(this.target) {
    window.alert("User Already Selected");
    }
    else{
    this.userService.setRole(user);
    window.alert("Role Set Successfully!");
    } 
    } else {
    this.userService.setRole(user);
    window.alert("Role Set Successfully!");

      
    }

 
  }
}
