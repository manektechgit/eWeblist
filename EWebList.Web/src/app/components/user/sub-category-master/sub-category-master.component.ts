import { Component, OnInit } from '@angular/core';
import { SubCategoryMasterModel } from 'src/app/_models/sub-category-master.model';
import { AddEditModes, AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { SubCategoryMasterService } from 'src/app/_services/sub-categorymaster.service';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-sub-category-master',
  templateUrl: './sub-category-master.component.html'
})
export class SubCategoryMasterComponent implements OnInit {
  categories: CategoryMasterModel;
  subCategories: SubCategoryMasterModel;
  mode = AddEditModes.default;
  selectedSubCategory: SubCategoryMasterModel;
  subCategoryImageServerPath = environment.subCategoryImagePath;
  filterSelectedCategory = 0;
  searchText='';

  constructor(
    private categoryService: CategoryMasterService,
    private subCategoryService: SubCategoryMasterService) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetCategory();
    this.GetSubCategory();
  }
  private GetCategory() {
    this.categoryService.GetAllCategory().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.categories = data.Result;
      }
    });
  }
  private GetSubCategory() {
    this.subCategoryService.GetAllSubCategory().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.subCategories = data.Result;
      }
    });
  }

  SetInsertMode() {
    this.selectedSubCategory = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedSubCategory: SubCategoryMasterModel) {
    this.mode = AddEditModes.edit;
    this.selectedSubCategory = selectedSubCategory;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      this.GetSubCategory();
    }
  }

}
