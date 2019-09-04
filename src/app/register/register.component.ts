import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';



@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
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
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            file: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
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
                  this.registerForm.patchValue({
                 file: reader.result
               });
             };
           }
         }



    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        console.log(this.registerForm.get('file').value);

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
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