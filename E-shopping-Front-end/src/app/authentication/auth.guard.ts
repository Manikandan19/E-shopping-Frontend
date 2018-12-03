import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {Route, UrlSegment} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad {

  constructor(private authenticationService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authenticationService.isAuthenticatedUser()) {
        return true;
      } else {
        Swal('Error', 'Authentication Failed....Please Login', 'error');
        this.router.navigate(['home']);
        return false;
      }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log( 'URL SEGMENT - ' , segments);
    console.log('ROUTE - ', route);
    if (!this.authenticationService.isAuthenticatedUser()) {
      Swal('Error', 'Authentication Failed....Please Login', 'error');
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
