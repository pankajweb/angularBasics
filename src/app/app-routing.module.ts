import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SortedUsersComponent } from './sorted-users/sorted-users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { JoblistComponent } from './joblist/joblist.component';
import { CreateJobComponent } from './create-job/create-job.component';

import { AuthGuard } from './guard/auth.guard';
import { GuestGuard } from './guard/guest.guard';




const routes: Routes = [
  { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'user/:userId', component: UserDetailComponent },
  { path: 'sortedUsers', component: SortedUsersComponent },
  { path: 'register', component: RegisterComponent , canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'job-list', component: JoblistComponent },
  { path: 'create-job', component: CreateJobComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
