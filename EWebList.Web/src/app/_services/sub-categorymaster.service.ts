import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResponseModel } from '../_models/api-response.model';
import { SubCategoryMasterModel } from '../_models/sub-category-master.model';

@Injectable()
export class SubCategoryMasterService {

  constructor(private httpClient: HttpClient) { }
  //#region HttpGetMethods
  GetAllSubCategory() {
    return this.httpClient.get<ApiResponseModel>('SubCategoryMaster/getallsubcategory')
      .pipe(map(
        data => data
      ));
  }
  GetAllSubCategoryByCategory(categoryId: number) {
    return this.httpClient.get<ApiResponseModel>('SubCategoryMaster/getallsubcategorybycategory/' + categoryId)
      .pipe(map(
        data => data
      ));
  }
  GetSubCategoryTotalDirectoryByCategory(categoryId: number) {
    return this.httpClient.get<ApiResponseModel>('SubCategoryMaster/getsubcategorytotaldirectorybycategory/' + categoryId)
      .pipe(map(
        data => data
      ));
  }

  /**
  * This Will Return SubCategory Detail When You Pass category id and name of the
  * subcategory.
  *
  * @param categoryId  CategoryId of the category or seleted category.
  * @param name     Subcategory name.
  *
  * @return An `SubCategorydata` of the response.
  */
  SubCategoryByName(categoryId: number, name: string) {
    return this.httpClient.get<ApiResponseModel>('SubCategoryMaster/subcategorybyname/' + categoryId + '/' + name)
      .pipe(map(
        data => data
      ));
  }
  //#endregion

  //#region HttpPostMethods
  InsertSubCategory(subCategoryMaster: SubCategoryMasterModel) {
    return this.httpClient.post<ApiResponseModel>('SubCategoryMaster/insertsubcategory', subCategoryMaster)
      .pipe(map(
        data => data
      ));
  }
  UpdateSubCategory(subCategoryMaster: SubCategoryMasterModel) {
    return this.httpClient.post<ApiResponseModel>('SubCategoryMaster/updatesubcategory', subCategoryMaster)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
