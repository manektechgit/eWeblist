import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchModel } from 'src/app/_models/serach.model';
import { environment } from 'src/environments/environment';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { SubCategoryMasterService } from 'src/app/_services/sub-categorymaster.service';
import { AppJsPath, AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { DirectoryClickModel } from 'src/app/_models/directory-click.model';
import { DirectoryClickService } from 'src/app/_services/directory-click.service';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
declare var $: any;

@Component({
  selector: 'app-directory-list-by-category',
  templateUrl: './directory-list-by-category.component.html',
  styleUrls: ['./directory-list-by-category.component.css']
})
export class DirectoryListByCategoryComponent implements OnInit, OnDestroy {
  directories: any;
  categories: CategoryMasterModel;
  subCategories: any;
  searchCondition: SearchModel;
  directoryImageServerPath = environment.directoryImagePath;
  filterSubCategoryId = 0;
  filterCategoryId = 0;

  // paging
  startIndex = 0;
  endIndex = 50;
  showTotalRecords = 50;
  constructor(
    private categoryService: CategoryMasterService,
    private directoryService: DirectoryMasterService,
    private directoryClickService: DirectoryClickService,
    private subCategoryService: SubCategoryMasterService) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetCategory();
    this.GetSetSearchCondition();
    this.GetSubCategoryData();
    this.GetSearchedDirectory();
  }
  private GetSetSearchCondition() {
    if (localStorage.getItem(AppSecurity.listSearch) !== undefined) {
      this.searchCondition = JSON.parse(localStorage.getItem(AppSecurity.listSearch));
      this.filterSubCategoryId = this.searchCondition.subCategoryId;
      this.filterCategoryId = this.searchCondition.categoryId;
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
  private GetCategory() {
    this.categoryService.GetAllCategory().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.categories = data.Result;
      }
    });
  }

  private GetSubCategoryData() {
    this.subCategoryService.GetSubCategoryTotalDirectoryByCategory(this.filterCategoryId)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.subCategories = data.Result;
        }
      });
  }

  SetSubCategoryFilter(subCategoryId: number) {
    this.filterSubCategoryId = subCategoryId;
    this.GetSearchedDirectory();
  }

  FilterDirectoryByCategory() {
    this.filterSubCategoryId = 0;
    this.GetSubCategoryData();
    this.GetSearchedDirectory();
  }
  //#region Paging
  IncreasePaging() {
    if (+this.showTotalRecords > 0) {
      this.startIndex = 0;
      this.endIndex = +this.showTotalRecords;
      this.GetSearchedDirectory();
    }
  }
  NextPage() {
    if (this.endIndex <= this.directories.length - 1) {
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
      CategoryId: +this.filterCategoryId,
      SubCategoryId: +this.filterSubCategoryId
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
  ngOnDestroy() {
    localStorage.removeItem(AppSecurity.listSearch);
  }

}
