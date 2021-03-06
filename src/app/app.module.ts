import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserAlertComponent } from './user-alert/user-alert.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SortedUsersComponent } from './sorted-users/sorted-users.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { GuestGuard } from './guard/guest.guard';
import { JoblistComponent } from './joblist/joblist.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    UserAlertComponent,
    UserDetailComponent,
    SortedUsersComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    JoblistComponent,
    CreateJobComponent,
    JobDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
     FroalaViewModule.forRoot()
  ],
  providers: [AuthGuard,GuestGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
