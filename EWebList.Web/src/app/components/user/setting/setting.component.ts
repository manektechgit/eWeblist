import { Component, OnInit } from '@angular/core';
import { UserSettingModel } from 'src/app/_models/user-setting.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { UserSettingService } from 'src/app/_services/user-setting.service';
import { AppMessages } from 'src/app/_app-constants/app-constants.config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  userSetting: UserSettingModel;
  currentUserLogin: LoginResponseModel;
  constructor(
    private authService: AuthenticationService,
    private userSettingService: UserSettingService,
    private alertService: ToastrService) {
    this.currentUserLogin = this.authService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    this.GetUserSetting();
  }
  private GetUserSetting() {
    this.userSettingService.GetUserSetting(this.currentUserLogin.UserId)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.userSetting = data.Result;
        }
      });
  }

  onChange(isChecked: boolean, usersetting: UserSettingModel) {
    usersetting.SettingValue = isChecked;
    this.UpdateSetting(usersetting);
  }

  private UpdateSetting(usersetting: UserSettingModel) {
    this.userSettingService.UpdateUserSetting(usersetting)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.alertService.success(AppMessages.SETTING_UPDATED);
        }
      });
  }
}
