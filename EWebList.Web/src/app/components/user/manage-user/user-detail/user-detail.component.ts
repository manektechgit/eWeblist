import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { environment } from 'src/environments/environment';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  @Input() selectedUser: UserMasterModel;
  @Input() siteUserMode: 'site' | 'user';

  @Output() changeDisplayMode = new EventEmitter<string>();

  directories: DirectoryMasterModel;
  currentLoginUser: LoginResponseModel;
  userImageServerPath = environment.userImagePath;
  directoryImageServerPath = environment.directoryImagePath;
  constructor(
    private directoryService: DirectoryMasterService,
    private authenticateService: AuthenticationService,
    private confirmationDialogService: ConfirmationDialogService) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    if (this.siteUserMode === 'site') {
      this.GetUserDirectory(this.selectedUser.UserId);
    }
  }
  private GetUserDirectory(userId: number) {
    this.directories = null;
    this.directoryService.GetDirectoryByUser(userId).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.directories = data.Result;
      }
    });
  }
  DeleteDirectory(directory: DirectoryMasterModel) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + directory.BusinessName + ' ?', 'Ok', 'Cancel', 'lg')
      .then((confirmed) => {
        if (confirmed) {
          directory.UserId = this.currentLoginUser.UserId;
          this.directoryService.DeletDirectory(directory).subscribe((data) => {
            if (data.StatusCode === 200) {
              this.GetUserDirectory(this.selectedUser.UserId);
            }
          });
        }
      })
      .catch();
  }
  ToggleMode() {
    this.changeDisplayMode.emit();
  }
}
