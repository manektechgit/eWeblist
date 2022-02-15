import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CategoryMasterModel } from '../_models/category-master.model';
import { ApiResponseModel } from '../_models/api-response.model';

@Injectable()
export class CategoryMasterService {

  constructor(private httpClient: HttpClient) { }

  //#region HttpGetMethods
  GetAllCategory() {
    return this.httpClient.get<ApiResponseModel>('CategoryMaster/getallcategory')
      .pipe(map(
        data => data
      ));
  }

  GetAllCategoryDetailWithTotalDirectory() {
    return this.httpClient.get<ApiResponseModel>('CategoryMaster/getAllCategorywithtotaldirectory')
      .pipe(map(
        data => data
      ));
  }
  GetCategoryByTotalDirectoryUser(userId: number) {
    return this.httpClient.get<ApiResponseModel>('CategoryMaster/getcategorybytotaldirectoryuser/' + userId)
      .pipe(map(
        data => data
      ));
  }
  GetCategorySubCategoryAlphabatically(alphabet: string) {
    return this.httpClient.get<ApiResponseModel>('CategoryMaster/getcategorysubcategoryalphabatically/' + alphabet)
      .pipe(map(
        data => data
      ));
  }
  GetTotalCategory() {
    return this.httpClient.get<ApiResponseModel>('CategoryMaster/gettotalcategory')
      .pipe(map(
        data => data
      ));
  }
  GetCategoryByName(categoryName: string) {
    return this.httpClient.get<ApiResponseModel>('CategoryMaster/getcategorybyname/' + categoryName)
      .pipe(map(
        data => data
      ));
  }

  //#endregion

  //#region HttpPostMethods
  InsertCategory(categoryMaster: CategoryMasterModel) {
    return this.httpClient.post<ApiResponseModel>('CategoryMaster/insertcategory', categoryMaster).pipe(map(
      data => data
    ));
  }

  UpdateCategory(categoryMaster: CategoryMasterModel) {
    return this.httpClient.post<ApiResponseModel>('CategoryMaster/updatecategory', categoryMaster).pipe(map(
      data => data
    ));
  }
  //#endregion
}
