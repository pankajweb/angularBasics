import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job=[];
  constructor(private actRoute: ActivatedRoute,private userService: UserService) { }

  ngOnInit() {

      let id = this.actRoute.snapshot.paramMap.get('id');
     this.getJob(id);

  }

    getJob(id) {
    this.userService.getJob(id).subscribe(data => {
    	 this.job = data[0];
    });
  }


}
