import { Component, OnInit,Input ,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.css']
})
export class UserAlertComponent implements OnInit {

 @Input() product;
 @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
