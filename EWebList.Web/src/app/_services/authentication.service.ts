import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSecurity } from '../_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../_models/login-response.model';
import { ApiResponseModel } from '../_models/api-response.model';
import { UserMasterModel } from '../_models/user-master.model';
import { UserRememberData } from '../_models/user.remember.data';

@Injectable()
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  AuthenticateUser(loginDetails: any) {
    return this.httpClient.post<ApiResponseModel>('User/authenticateuser', loginDetails).pipe(
      map(loginResponse => {
        return loginResponse;
      }
      )
    );
  }

  //#region AllGetMethods
  GetLoginUserDetail(): LoginResponseModel {
    const savedCredentials = sessionStorage.getItem(AppSecurity.currentLoginUser)
      || localStorage.getItem(AppSecurity.currentLoginUser);
    return JSON.parse(savedCredentials);
  }

  GetRememberMedata(): UserRememberData {
    const savedCredentials = localStorage.getItem(AppSecurity.rememberMe);
    if (savedCredentials != null) {
      return JSON.parse(atob(savedCredentials));
    }
    else {
      return null;
    }
  }
  //#endregion

  //#region add or remove data from local/session storage for login and logout
  SetUserLoginDataInSesion(remember: boolean, loginResponse: LoginResponseModel) {
    localStorage.removeItem(AppSecurity.currentLoginUser);
    localStorage.removeItem(AppSecurity.rememberMe);
    sessionStorage.removeItem(AppSecurity.currentLoginUser);
    if (remember) {
      loginResponse.IsLocalStorage = true;
      loginResponse.Password = btoa(loginResponse.Password);
      localStorage.setItem(AppSecurity.currentLoginUser, JSON.stringify(loginResponse));
      this.RememberMe(loginResponse);
    }
    else {
      loginResponse.IsLocalStorage = false;
      sessionStorage.setItem(AppSecurity.currentLoginUser, JSON.stringify(loginResponse));
    }
  }

  private RememberMe(loginResponse: LoginResponseModel) {
    const rememberMeData = {
      Email: loginResponse.Email,
      Password: loginResponse.Password
    } as UserRememberData;
    localStorage.setItem(AppSecurity.rememberMe, btoa(JSON.stringify(rememberMeData)));
  }

  UpdateLocalStorage(userProfile: UserMasterModel) {
    let savedData = this.GetLoginUserDetail();
    savedData.ContactNo = userProfile.ContactNo;
    savedData.Email = userProfile.Email;
    savedData.RegistrationName = userProfile.RegistrationName;
    savedData.ProfilePicture = userProfile.ProfilePicture;
    this.SetUserLoginDataInSesion(savedData.IsLocalStorage, savedData);
  }
  LogoutUser() {
    localStorage.removeItem(AppSecurity.currentLoginUser);
    sessionStorage.removeItem(AppSecurity.currentLoginUser);
    this.router.navigate(['/home']);
  }
  //#endregion
}
