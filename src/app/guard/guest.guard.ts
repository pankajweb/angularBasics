import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  
     constructor(
        private router: Router,
        private userService: UserService,
    ) { }

       canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.userService.isLoggedIn()){
       this.router.navigate(["/profile"]);
       return false;
    }else{
      return true;
    }
  }



}
