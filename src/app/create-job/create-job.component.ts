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


	jobForm: FormGroup;
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
            file: ['', Validators.required],
            job_type: [null, Validators.required],
            country: [null, Validators.required]
        });
  }


     public onFileChange(event) {
           const reader = new FileReader();
           if (event.target.files && event.target.files.length) {
             this.fileName = event.target.files[0].name;
             alert(this.fileName);
             const [file] = event.target.files;
             reader.readAsDataURL(file);
            
             reader.onload = () => {
                  this.jobForm.patchValue({
                 file: reader.result
               });
             };
           }
         }

      get f() { return this.jobForm.controls; }


   onSubmit() {


        this.submitted = true;

        // stop here if form is invalid
        if (this.jobForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.createJob(this.jobForm.value)
            .pipe(first())
            .subscribe((data:any) => {
                    this.messgae = data.message;
                   this.router.navigate(['/job-list']);

                },
                error => {
                    this.loading = false;
                });
      
    }


}
