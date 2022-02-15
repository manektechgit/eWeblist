import { Component, OnInit } from '@angular/core';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { environment } from 'src/environments/environment';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AppMessages } from 'src/app/_app-constants/app-constants.config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html'
})
export class ManageUserComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  users: any;
  selectedUser: UserMasterModel;
  displayMode: 'view' | 'detail' = 'view';
  siteUserMode: 'site' | 'user';
  searchText = '';
  // selected use modes are site or user

  constructor(
    private userService: UserMasterService,
    private authService: AuthenticationService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: ToastrService) {
    this.currentLoginUser = this.authService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    this.GetAllUsers();
  }

  private GetAllUsers() {
    this.userService.GetUsers().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.users = data.Result;
      }
    });
  }

  ToggleMode(mode: 'view' | 'detail', siteUserMode: 'site' | 'user') {
    this.displayMode = mode;
    this.siteUserMode = siteUserMode;
  }
  SetSelectedUser(selectedUser: UserMasterModel) {
    this.selectedUser = selectedUser;
  }
  onChange(isChecked: boolean, user: UserMasterModel) {
    let active = '';
    if (isChecked) {
      active = 'active';
    }
    else {
      active = 'de-active';
    }
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to  ' + active + ' ' + user.RegistrationName + ' ?',
      'Ok', 'Cancel', 'lg')
      .then((confirmed) => {
        if (confirmed) {
          user.IsActive = isChecked;
          this.UpdateUser(user);
        }
      })
      .catch();

  }

  private UpdateUser(user: UserMasterModel) {
    user.ModifiedBy = this.currentLoginUser.UserId;
    this.userService.ActiveDeactiveUser(user).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.alertService.success(AppMessages.USER_UPDATED);
      }
    });
  }
}
