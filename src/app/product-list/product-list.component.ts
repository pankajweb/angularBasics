import { Component, OnInit,Input ,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
title ='Users List';
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
  constructor() { }


  ngOnInit() {

  }

  viewDetail(event){
   window.alert(event.target.id);
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }


}
