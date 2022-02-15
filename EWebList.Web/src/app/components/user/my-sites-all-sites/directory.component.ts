import { Component, OnInit, OnDestroy } from '@angular/core';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AddEditModes, AppJsPath, AppMessages, AppSecurity, AppRoutesLinkNonLogin, AppRoutesLinkLogin } from 'src/app/_app-constants/app-constants.config';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { DirectoryClickService } from 'src/app/_services/directory-click.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DirectoryPlanDetailModel } from 'src/app/_models/directory-plan.model';
import { DirectoryPlanService } from 'src/app/_services/directory-plan.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html'
})
export class DirectoryComponent implements OnInit, OnDestroy {
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

  // paging
  startIndex = 0;
  endIndex = 50;
  showTotalRecords = 50;

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
    // this.CheckAllDirectoryHavePlan();
    this.GetCategory();
    this.GetCategorywithDirectoryCount();
    this.GetDirectoryByRoute();
  }
  private CheckAllDirectoryHavePlan() {
    this.directoryPlanService.GetUserDirectoryPlan(this.currentLoginUser.UserId)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.directoryPlanDetail = data.Result;
          if (this.directoryPlanDetail.filter(x => x.PlanId == null).length > 0) {
            localStorage.setItem(AppSecurity.temp_directory_Detail,
              this.directoryPlanDetail.filter(x => x.PlanId == null)[0].DirectoryId.toString());
            this.router.navigate([AppRoutesLinkLogin.PLAN_PAGE]);
          }
        }
      });
  }

  private GetDirectoryByRoute() {
    if (this.pageName === 'all-site') {
      const pagination = this.setPagination();
      this.GetAllDirectory(pagination);
    }
    else if (this.pageName === 'my-site') {
      const pagination = this.setPagination();
      this.GetAllDirectory(pagination);
    }
  }
  private GetAllDirectory(paginationModel: PaginationModel) {
    this.directoryMasterService.GetAllDirectory(paginationModel).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.directories = data.Result;
      }
      else {
        this.directories = null;
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
    if (this.pageName === 'all-site') {
      this.siteLabel = 'All Web Sites';
      this.categoryService.GetAllCategoryDetailWithTotalDirectory().subscribe((data) => {
        if (data.StatusCode === 200) {
          this.leftCategories = data.Result;
        }
      });
    }
    else if (this.pageName === 'my-site') {
      this.siteLabel = 'My Web Sites';
      this.categoryService.GetCategoryByTotalDirectoryUser(this.currentLoginUser.UserId).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.leftCategories = data.Result;
        }
      });
    }
  }
  FilterDirectoryByCategory() {
    const pagination = this.setPagination();
    this.GetAllDirectory(pagination);
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
              this.GetDirectoryByRoute();
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
  //#region Paging
  IncreasePaging() {
    if (+this.showTotalRecords > 0) {
      this.startIndex = 0;
      this.endIndex = +this.showTotalRecords;
      this.GetDirectoryByRoute();
    }
  }
  NextPage() {
    if (this.endIndex <= this.directories[0]?.recordsTotal) {
      this.startIndex = (+this.startIndex + +this.showTotalRecords);
      this.endIndex = (+this.endIndex + +this.showTotalRecords);
      this.GetDirectoryByRoute();
    }
  }
  PrevPage() {
    if (this.startIndex !== 0) {
      this.startIndex = +this.startIndex - +this.showTotalRecords;
      this.endIndex = +this.endIndex - +this.showTotalRecords;
      this.GetDirectoryByRoute();
    }
  }
  private setPagination() {
    let userId = 0;
    if (this.pageName === 'my-site') {
      userId = this.currentLoginUser.UserId;
    }
    return {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      Search: '',
      SortCol: '',
      SortDir: 'desc',
      UserId: +userId,
      CategoryId: +this.SelectedCategoryId
    } as PaginationModel;
  }
  //#endregion
  ngOnDestroy(): void {
    //remove list search data on page destoy
    localStorage.removeItem(AppSecurity.listSearch);
  }
}
