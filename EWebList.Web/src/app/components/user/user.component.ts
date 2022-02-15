import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  role: number;
  showSideBar = false;
  constructor(private authenticateService: AuthenticationService) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
  }
  ToggleHeader(showHideBar: boolean) {
    this.showSideBar = showHideBar;
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('overflow_body');
  }


  CloseSideBar() {
    if (this.showSideBar) {
      this.showSideBar = !this.showSideBar;
    }
  }
}
