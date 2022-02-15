import { Component, OnInit } from '@angular/core';
import { CategoryVM } from 'src/app/_modelsVM/category-master-vm';
import { SubCategoryVM } from 'src/app/_modelsVM/sub-category-master-vm';
import { SearchBy } from 'src/app/_app-constants/app-enum.config';
import { SearchModel } from 'src/app/_models/serach.model';
import { AppSecurity, AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { Router } from '@angular/router';
import { CategorySubCategoryVM } from 'src/app/_modelsVM/category-sub-category-vm';
declare var $: any;
@Component({
  selector: 'app-category-login',
  templateUrl: './category-login.component.html',
  styleUrls: ['./category-login.component.css']
})
export class CategoryLoginComponent implements OnInit {

  alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','ALL'];
  selectedAlphabet = 'A';
  categorySubCategoryVM: CategorySubCategoryVM;
  constructor(private categoryService: CategoryMasterService,private router: Router) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetCategoryByAlphabet(this.selectedAlphabet);
  }
  GetSetSelectedCategory(alphabet: string) {
    this.selectedAlphabet = alphabet;
    this.GetCategoryByAlphabet(this.selectedAlphabet);
  }


  private GetCategoryByAlphabet(alphabet: string) {
    this.categoryService.GetCategorySubCategoryAlphabatically(this.selectedAlphabet)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.categorySubCategoryVM = data.Result;
        }
      });
  }
  StoreAndNavigateToListCategory(categoryVM: CategoryVM) {
    const searchCondition = {
      searchBy: SearchBy.Category,
      categoryId: categoryVM.CategoryId,
      subCategoryId: 0,
      categoryName: categoryVM.Name,
      serachText: null,
    } as SearchModel;

    localStorage.setItem(AppSecurity.listSearch, JSON.stringify(searchCondition));
    this.router.navigate(['user/list']);
  }
  StoreAndNavigateToListSubCategory(categoryVM: CategoryVM, subCategoryVM: SubCategoryVM) {
    const searchCondition = {
      searchBy: SearchBy.Category,
      categoryId: categoryVM.CategoryId,
      subCategoryId: subCategoryVM.SubCategoryId,
      categoryName: categoryVM.Name,
      serachText: null,
    } as SearchModel;

    localStorage.setItem(AppSecurity.listSearch, JSON.stringify(searchCondition));
    this.router.navigate(['user/list']);
  }

}
