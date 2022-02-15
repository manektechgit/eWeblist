import { Component, OnInit } from '@angular/core';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { AddEditModes, AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html'
})
export class CategoryMasterComponent implements OnInit {
  categories: CategoryMasterModel;
  mode = AddEditModes.default;
  selectedCategory: CategoryMasterModel;
  categoryImageServerPath = environment.categoryImagePath;
  searchText = '';
  constructor(private categoryService: CategoryMasterService) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetCategory();
  }

  private GetCategory() {
    this.categoryService.GetAllCategory().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.categories = data.Result;
      }
    });
  }

  SetInsertMode() {
    this.selectedCategory = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedCategory: CategoryMasterModel) {
    this.mode = AddEditModes.edit;
    this.selectedCategory = selectedCategory;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      this.GetCategory();
    }
  }
}
