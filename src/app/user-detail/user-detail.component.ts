import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


user;

users = [
{
id:'1',
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
    window.alert('asdfadf');
    this.userService.addToSelected(user);
  }



}
