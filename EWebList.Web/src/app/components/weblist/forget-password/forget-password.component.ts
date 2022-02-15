import { Component, OnInit } from '@angular/core';
import { AppJsPath, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  isSubmit: boolean;
  constructor(
    private alertService: ToastrService,
    private userMasterService: UserMasterService) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeforgetPasswordForm();
  }


  // Initilize login for on first load
  private InitilizeforgetPasswordForm() {
    this.forgetPasswordForm = new FormGroup({
      Email: new FormControl('', [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
    });
  }
  // get the value of form control to validate on html file
  get f() { return this.forgetPasswordForm.controls; }

  onSubmit() {
    this.isSubmit = true;
    if (this.forgetPasswordForm.invalid) {
      return false;
    } else {
      this.userMasterService.ForgetPassword(this.forgetPasswordForm.value.Email)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            if (!data.Result) {
              this.alertService.error(AppMessages.EMAIL_NOTEXISTS);
            } else {
              this.isSubmit = false;
              this.alertService.success(AppMessages.FORGET_MAIL_SEND);
              this.forgetPasswordForm.reset();
            }
          }
        })
    }
  }
}
