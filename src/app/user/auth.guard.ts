import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private afAuth: AngularFireAuth){}
 async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

       const user = await this.afAuth.currentUser;
       const isLoggedIn = !!user;
      // if (!isLoggedIn) {
      //   //this.snack.authError();
      // }
      return isLoggedIn;
      //return false;
  }

}
