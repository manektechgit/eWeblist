import { Component, OnInit } from '@angular/core';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { environment } from 'src/environments/environment';
import { DirectoryPlanDetailModel } from 'src/app/_models/directory-plan.model';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DirectoryClickService } from 'src/app/_services/directory-click.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DirectoryPlanService } from 'src/app/_services/directory-plan.service';
import { AppJsPath, AppSecurity, AppRoutesLinkLogin, AddEditModes, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-my-sites',
  templateUrl: './my-sites.component.html',
  styleUrls: ['./my-sites.component.css']
})
export class MySitesComponent implements OnInit {

  directories: any;
  categories: CategoryMasterModel;
  leftCategories: any;
  currentLoginUser: LoginResponseModel;
  directoryImageServerPath = environment.directoryImagePath;
  SelectedCategoryId = 0;
  siteLabel: 'My Web Sites' | 'All Web Sites';
  pageName: string;
  isMyWesitesOpen = false;
  directoryPlanDetail: DirectoryPlanDetailModel[] = [];


  constructor(
    private categoryService: CategoryMasterService,
    private authenticateService: AuthenticationService,
    private directoryMasterService: DirectoryMasterService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private directoryClickService: DirectoryClickService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: ToastrService,
    private directoryPlanService: DirectoryPlanService) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.pageName = this.router.url.split('/')[2].toLowerCase();
    this.GetCategory();
    this.GetCategorywithDirectoryCount();
    this.GetUserAllDirectory();
  }

  private GetUserAllDirectory() {
    this.directoryMasterService.GetMySites(this.currentLoginUser.UserId).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.directories = data.Result;
      }
    });
  }
  private GetCategory() {
    this.categoryService.GetAllCategory().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.categories = data.Result;
      }
    });
  }
  private GetCategorywithDirectoryCount() {
    this.siteLabel = 'My Web Sites';
    this.categoryService.GetCategoryByTotalDirectoryUser(this.currentLoginUser.UserId).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.leftCategories = data.Result;
      }
    });
  }

  EditDirectory(directoryId: number, name: string) {
    name = name.replace(' ', '-');
    this.router.navigate(['user/submit-site', AddEditModes.edit, directoryId, name]);
  }

  DeleteDirectory(directory: DirectoryMasterModel) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + directory.BusinessName + ' ?', 'Ok', 'Cancel', 'lg')
      .then((confirmed) => {
        if (confirmed) {
          directory.UserId = this.currentLoginUser.UserId;
          this.directoryMasterService.DeletDirectory(directory).subscribe((data) => {
            if (data.StatusCode === 200) {
              this.alertService.success(AppMessages.SITE_DELETED);
              this.GetUserAllDirectory();
              this.GetCategorywithDirectoryCount();
            }
          });
        }
      })
      .catch();
  }
  ToggleSideBar() {
    this.isMyWesitesOpen = !this.isMyWesitesOpen;
  }

  Upgrade(directoryId: any) {
    localStorage.setItem(AppSecurity.temp_directory_Detail, directoryId);
    this.router.navigate([AppRoutesLinkLogin.PLAN_PAGE]);
    localStorage.setItem(AppSecurity.last_route_url, '/user/my-site');
  }
  //#region Directory Click
  InsertDirectoryClick(directory: DirectoryMasterModel) {
    this.directoryClickService.InsertDirectoryClick(directory).subscribe((data) => {
      if (data.StatusCode === 200) {
      }
    });
  }
  //#endregion

  ngOnDestroy(): void {
    //remove list search data on page destoy
    localStorage.removeItem(AppSecurity.listSearch);
  }
}
