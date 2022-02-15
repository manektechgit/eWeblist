import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { Router } from '@angular/router';
import { SearchModel } from 'src/app/_models/serach.model';
import { SearchBy } from 'src/app/_app-constants/app-enum.config';
import { AppSecurity, AppRoutesLinkNonLogin } from 'src/app/_app-constants/app-constants.config';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html'
})
export class SearchbarComponent implements OnInit {
  @ViewChild('SearchBar') SearchBar: ElementRef;
  @Output() searchedData = new EventEmitter<string>();

  searchCondition: SearchModel;
  categories: CategoryMasterModel[];
  selectedCategoryId = 0;
  searchText = '';
  selectedCategoryName = '';
  constructor(
    private categoryService: CategoryMasterService,
    private router: Router) { }

  ngOnInit(): void {
    this.GetAllCategory();
  }
  private GetAllCategory() {
    this.categoryService.GetAllCategory()
      .subscribe(
        (data) => {
          this.categories = data.Result;
          this.GetSetSearchCondition();
        });
  }
  private GetSetSearchCondition() {
    if (localStorage.getItem(AppSecurity.listSearch) !== null && localStorage.getItem(AppSecurity.listSearch) !== undefined) {
      this.searchCondition = JSON.parse(localStorage.getItem(AppSecurity.listSearch));
      if (this.searchCondition.searchBy === SearchBy.SearchText) {
        this.searchText = this.searchCondition.serachText;
      }
      else if (this.searchCondition.searchBy === SearchBy.Category) {
        this.selectedCategoryId = this.searchCondition.categoryId;
      }
      else if (this.searchCondition.searchBy === SearchBy.Both) {
        this.searchText = this.searchCondition.serachText;
        this.selectedCategoryId = this.searchCondition.categoryId;
      }
    }
  }
  SetSelectedText() {
    if (+this.selectedCategoryId !== 0) {
      this.selectedCategoryName = this.categories.filter(x => x.CategoryId == this.selectedCategoryId)[0].SlugName;
    }
  }
  SetSearchDataAndNavigate() {
    if (+this.selectedCategoryId === 0 && this.searchText === '') {
      return false;
    }
    else if (+this.selectedCategoryId === 0 && this.searchText !== '') {
      const searchCondition = {
        searchBy: SearchBy.SearchText,
        categoryId: 0,
        categoryName: 'all',
        serachText: this.searchText
      } as SearchModel;

      this.storeAndNavigate(searchCondition);
    }
    else if (+this.selectedCategoryId !== 0 && this.searchText === '') {
      const searchCondition = {
        searchBy: SearchBy.Category,
        categoryId: +this.selectedCategoryId,
        categoryName: this.selectedCategoryName,
        serachText: null
      } as SearchModel;

      this.storeAndNavigate(searchCondition);
    }
    else {
      const searchCondition = {
        searchBy: SearchBy.Both,
        categoryId: +this.selectedCategoryId,
        categoryName: this.selectedCategoryName,
        serachText: this.searchText
      } as SearchModel;

      this.storeAndNavigate(searchCondition);
    }
  }

  private storeAndNavigate(searchCondition: SearchModel) {
    localStorage.removeItem(AppSecurity.listSearch);
    localStorage.setItem(AppSecurity.listSearch, JSON.stringify(searchCondition));
    this.searchedData.emit(searchCondition.serachText);
    this.router.navigate([AppRoutesLinkNonLogin.DIRECTORY_LIST, searchCondition.categoryName.toLowerCase().trim()]);
  }
}
