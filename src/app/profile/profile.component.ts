import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userInfo=[];
userJobsInfo=[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
    ) {
           this.userService.profile().subscribe(
      (datainfo:any) => {
        this.userInfo = datainfo.useriwthjobs[0];
        this.userJobsInfo = datainfo.useriwthjobs;
      
      },
      err => {
        console.error(err)
      } );
      
    }
  ngOnInit() {


  
  }


}
