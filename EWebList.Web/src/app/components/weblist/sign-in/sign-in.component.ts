import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { AppJsPath, AppSecurity, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { UserRememberData } from 'src/app/_models/user.remember.data';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  isSubmit: boolean;
  rememberMeDetail: UserRememberData;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: ToastrService) {
    this.rememberMeDetail = this.authService.GetRememberMedata();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeLoginForm();
    this.checkRememberedUserDetail();
  }
  private checkRememberedUserDetail() {
    if (this.rememberMeDetail !== null) {
      this.loginForm.patchValue({
        Email: this.rememberMeDetail.Email,
        Password: atob(this.rememberMeDetail.Password)
      });
    }
  }

  // Initilize login for on first load
  private InitilizeLoginForm() {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      Password: new FormControl('', [
        Validators.required
      ]),
      Remember: new FormControl(true),
    });
  }
  // get the value of form control to validate on html file
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return false;
    } else {
      this.authService.AuthenticateUser(this.loginForm.value)
        .subscribe((loginResponseData) => {
          if (typeof loginResponseData !== 'undefined' && loginResponseData) {
            if (loginResponseData.StatusCode === 200) {
              if (loginResponseData.Result === null) {
                this.alertService.error(AppMessages.LOGIN_FAILED);
              } else {
                if (loginResponseData.Result.IsActive) {
                  this.alertService.success(AppMessages.LOGIN_SUCCESS);
                  this.authService.SetUserLoginDataInSesion(this.loginForm.controls.Remember.value, loginResponseData.Result);
                  this.router.navigate(['/user']);
                } else {
                  this.alertService.warning(AppMessages.ACCOUNT_DEACTIVATED);
                }
              }
            }
          } else {
            this.alertService.error(AppMessages.LOGIN_FAILED);
          }
        }, (err) => {
          this.alertService.error(AppMessages.LOGIN_FAILED);
        });
    }
  }
}
