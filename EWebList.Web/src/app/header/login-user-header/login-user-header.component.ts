import { Component, OnInit, Inject, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { environment } from 'src/environments/environment';
import { AppJsPath, AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { SearchBy } from 'src/app/_app-constants/app-enum.config';
import { SearchModel } from 'src/app/_models/serach.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-user-header',
  templateUrl: './login-user-header.component.html'
})
export class LoginUserHeaderComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  userImageServerPath = environment.userImagePath;
  @Output() togleHeader = new EventEmitter<boolean>();
  @Input() isHeaderShow = false;
  searchText='';
  constructor(
    private authenticateService: AuthenticationService,
    private router: Router) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
  }

  ngOnInit(): void {
  }
  Logout() {
    this.authenticateService.LogoutUser();
  }
  ToggleHeader() {
    this.isHeaderShow = !this.isHeaderShow;
    this.togleHeader.emit(this.isHeaderShow);
  }

  SetSearchDataAndNavigate() {
    const searchCondition = {
      searchBy: SearchBy.SearchText,
      categoryId: 0,
      subCategoryId: 0,
      categoryName: '',
      serachText: this.searchText,
    } as SearchModel;

    localStorage.setItem(AppSecurity.listSearch, JSON.stringify(searchCondition));
    this.router.navigate(['user/list']);
  }
}
