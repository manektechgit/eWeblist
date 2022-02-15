import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';



@Injectable()
export class UserAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.chekUser(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.chekUser(route, state);
  }
  private chekUser(route, state): boolean {
    const checkuser = this.authenticationService.GetLoginUserDetail();
    if (checkuser !== undefined && checkuser !== null) {
      if (route.data.role !== undefined && route.data.role !== checkuser.RoleId) {
        this.router.navigate(['/user/dashboard']);
        return false;
      }
      return true;
    } else {
      this.authenticationService.LogoutUser();
      return false;
    }
  }
}

