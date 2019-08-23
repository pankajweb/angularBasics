import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SortedUsersComponent } from './sorted-users/sorted-users.component';



const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'user/:userId', component: UserDetailComponent },
  { path: 'sortedUsers', component: SortedUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
