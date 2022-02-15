import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppJsPath, AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { SearchModel } from 'src/app/_models/serach.model';
import { SearchBy } from 'src/app/_app-constants/app-enum.config';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { environment } from 'src/environments/environment';
import { SubCategoryMasterService } from 'src/app/_services/sub-categorymaster.service';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
import { DirectoryClickService } from 'src/app/_services/directory-click.service';
import { TitleService } from 'src/app/_services/title.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { SearchbarComponent } from 'src/app/shared/searchbar/searchbar.component';
import { Subscription, iif } from 'rxjs';
import { SubCategoryMasterModel } from 'src/app/_models/sub-category-master.model';
import { DeSlugifyPipe } from 'src/app/pipes/de-slugify.pipe';
declare var $: any;
@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html'
})
export class DirectoryListComponent implements OnInit, OnDestroy {
  //#region  Declaration
  @ViewChild('appSearchBar') appSearchBar: SearchbarComponent;
  directories: any;
  subCategories: any;
  searchCondition: SearchModel;
  directoryImageServerPath = environment.directoryImagePath;
  filterSubCategoryId = 0;
  categoryName: string;
  subCategoryName: string;
  categoryData: CategoryMasterModel;
  subCategoryData: SubCategoryMasterModel;
  paramsSubscription: Subscription;

  // paging
  startIndex = 0;
  endIndex = 50;
  showTotalRecords = 50;
  //#endregion

  //#region Constructor And Lifecycle events
  constructor(
    private directoryService: DirectoryMasterService,
    private subCategoryService: SubCategoryMasterService,
    private directoryClickService: DirectoryClickService,
    private titleService: TitleService,
    private route: ActivatedRoute,
    private categoryService: CategoryMasterService) {
    $.getScript(AppJsPath.customJs);
  }
  ngOnInit(): void {
    this.GetRouteData();
  }
  ngOnDestroy() {
    localStorage.removeItem(AppSecurity.listSearch);
    this.paramsSubscription.unsubscribe();
  }
  //#endregion


  //#region All GET Api Calls
  private GetSetSearchCondition() {
    if (localStorage.getItem(AppSecurity.listSearch) !== undefined && localStorage.getItem(AppSecurity.listSearch) !== null) {
      this.searchCondition = JSON.parse(localStorage.getItem(AppSecurity.listSearch));
      if (this.categoryData !== undefined) {
        this.searchCondition.categoryName = this.categoryData.Name;
        this.searchCondition.categoryId = this.categoryData.CategoryId;
      }
      this.searchCondition.subCategoryId = this.filterSubCategoryId;
    } else {
      const searchCondition = {
        searchBy: SearchBy.Category,
        categoryId: this.categoryData.CategoryId,
        categoryName: this.categoryData.Name,
        serachText: null,
        subCategoryId: this.filterSubCategoryId
      } as SearchModel;
      this.searchCondition = searchCondition;
      this.appSearchBar.selectedCategoryId = this.categoryData.CategoryId;
    }
  }
  private GetSearchedDirectory() {
    const pagination = this.setPagination();
    this.GetAllDirectory(pagination);
  }
  private GetAllDirectory(paginationModel: PaginationModel) {
    this.directoryService.GetAllDirectory(paginationModel).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.directories = data.Result;
      }
      else {
        this.directories = null;
      }
    });
  }
  private GetSubCategoryData() {
    if (this.searchCondition.categoryId !== null) {
      this.subCategoryService.GetSubCategoryTotalDirectoryByCategory(this.searchCondition.categoryId)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            this.subCategories = data.Result;
          }
        });
    }
  }
  private GetRouteData() {
    this.paramsSubscription = this.route.params.subscribe(
      params => {
        this.categoryName = params.categoryName;
        this.subCategoryName = params.subCategoryName;
        if (this.categoryName !== 'all') {
          this.GetSetDirectoryFromCategoryAndSubcategory();
        }
        else {
          this.titleService.SetTitleFromComponent('All');
          this.GetSetSearchCondition();
          this.GetSearchedDirectory();
          this.GetSubCategoryData();
        }
      }
    );
  }
  private GetSetDirectoryFromCategoryAndSubcategory() {
    this.categoryService.GetCategoryByName(this.categoryName).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.categoryData = data.Result;
        this.titleService.SetTitleFromComponent(this.categoryData.Name);
        if (this.subCategoryName !== undefined) {
          this.subCategoryService.SubCategoryByName(this.categoryData.CategoryId, this.subCategoryName)
            .subscribe((subData) => {
              if (subData.StatusCode === 200) {
                this.subCategoryData = subData.Result;
                this.filterSubCategoryId = this.subCategoryData.SubCategoryId;
                this.GetSetSearchCondition();
                this.GetSearchedDirectory();
                this.GetSubCategoryData();
              }
            });
        }
        else {
          this.GetSetSearchCondition();
          this.GetSearchedDirectory();
          this.GetSubCategoryData();
        }
      }
    });
  }

  //#endregion

  //#region Search Bar Serach Handler And Side Menu Sub CategoryClick
  SearchDirectory(searchText: string) {
    this.filterSubCategoryId = 0;
    this.GetSetSearchCondition();
    this.GetSearchedDirectory();
  }

  SetSubCategoryFilter(subCategoryId: number) {
    this.startIndex = 0;
    this.endIndex = +this.showTotalRecords;
    this.filterSubCategoryId = subCategoryId;
    this.GetSearchedDirectory();

  }
  //#endregion

  //#region Paging
  IncreasePaging() {
    if (+this.showTotalRecords > 0) {
      this.startIndex = 0;
      this.endIndex = +this.showTotalRecords;
      this.GetSearchedDirectory();
    }
  }
  NextPage() {
    if (this.endIndex <= this.directories[0]?.recordsTotal) {
      this.startIndex = (+this.startIndex + +this.showTotalRecords);
      this.endIndex = (+this.endIndex + +this.showTotalRecords);
      this.GetSearchedDirectory();
    }
  }
  PrevPage() {
    if (this.startIndex !== 0) {
      this.startIndex = +this.startIndex - +this.showTotalRecords;
      this.endIndex = +this.endIndex - +this.showTotalRecords;
      this.GetSearchedDirectory();
    }
  }
  private setPagination() {
    return {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      Search: this.searchCondition.serachText,
      SortCol: '',
      SortDir: 'desc',
      UserId: 0,
      CategoryId: (this.categoryName !== 'all' ? +this.searchCondition.categoryId : 0),
      SubCategoryId: (this.categoryName !== 'all' ? +this.filterSubCategoryId : 0)
    } as PaginationModel;
  }
  //#endregion

  //#region Directory Click
  InsertDirectoryClick(directory: DirectoryMasterModel) {
    this.directoryClickService.InsertDirectoryClick(directory).subscribe((data) => {
      if (data.StatusCode === 200) {
      }
    });
  }
  //#endregion
}
