import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
joblist;
 show = 3;
constructor(private userService: UserService) { }

  ngOnInit() {
this.userService.jobList().subscribe((response:any) => {
   this.joblist = response;
   console.log(this.joblist);
   });
  }

  increaseShow() {
    this.show += 3; 
  }

  }

