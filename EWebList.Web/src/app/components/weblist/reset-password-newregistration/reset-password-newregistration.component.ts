import { Component, OnInit } from '@angular/core';
import { AppMessages, AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-reset-password-newregistration',
  templateUrl: './reset-password-newregistration.component.html',
  styleUrls: ['./reset-password-newregistration.component.css']
})
export class ResetPasswordNewregistrationComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isSubmit: boolean;
  userId: number;
  userMaster: UserMasterModel;
  isValidUrl = true;
  isPassowrdTextFocus = false;
  constructor(
    private alertService: ToastrService,
    private userMasterService: UserMasterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.route.params.subscribe(params =>
      this.userId = +atob(params.userid)
    );
    this.InitilizeResetPasswordForm();
    this.GetUserDetail();
  }

  private GetUserDetail() {
    if (this.userId !== undefined) {
      return this.userMasterService.GetUserDetailForResetPassword(this.userId)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            if (data.Result !== null) {
              this.userMaster = data.Result;
              if (!this.userMaster.IsApproved) {
                this.isValidUrl = true;
              } else {
                this.isValidUrl = false;
              }
            } else {
              this.isValidUrl = false;
            }
          }
        });
    } else {
      this.isValidUrl = false;
    }
  }

  // Initilize login for on first load
  private InitilizeResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      Password: new FormControl('', [Validators.required,
      Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/), Validators.maxLength(15)]),
      ConfirmPassword: new FormControl(''),
    }, {
      validators: this.password.bind(this)
    });
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('Password');
    const { value: confirmPassword } = formGroup.get('ConfirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  // get the value of form control to validate on html file
  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.isSubmit = true;
    if (this.resetPasswordForm.invalid) {
      return false;
    } else {
      this.userMaster.Password = this.resetPasswordForm.value.Password;
      this.userMasterService.ResetPasswordNewUser(this.userMaster)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            this.isSubmit = false;
            this.alertService.success(AppMessages.PASSWORD_Change_SUCCESS);
            this.router.navigate(['/login']);
          }
        });
    }
  }

}
