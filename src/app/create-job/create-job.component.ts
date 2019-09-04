import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

countries = [ 
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'}
];


	jonForm: FormGroup;
	loading = false;
	submitted = false;
	messgae:any;
	private fileName;

	constructor(
	private formBuilder: FormBuilder,
	private router: Router,
	private userService: UserService,
	) { 

	}

  ngOnInit() {

  	console.log(localStorage.getItem('currentUser'));
        this.jobForm = this.formBuilder.group({
            job_title: ['', Validators.required],
            job_desc: ['', Validators.required],
            job_price: ['', Validators.required],
            job_type: ['', Validators.required],
            image: ['', Validators.required],
            country: ['', Validators.required]
        });
  }

      get f() { return this.jobForm.controls; }


   onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.jobForm.invalid) {
            return;
        }

        this.loading = true;
      
    }


}
