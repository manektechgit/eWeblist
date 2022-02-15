import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { DirectoryMasterModel } from '../_models/directory-master.model';
import { PaginationModel } from '../_models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class DirectoryMasterService {

  constructor(private httpClient: HttpClient) { }

  //#region HttpGetMethods
  GetDirectoryByUser(userId: number) {
    return this.httpClient.get<ApiResponseModel>('DirectoryMaster/getdirectorybyuser/' + userId)
      .pipe(map(
        data => data
      ));
  }
  GetMySites(userId: number) {
    return this.httpClient.get<ApiResponseModel>('DirectoryMaster/mysites/' + userId)
      .pipe(map(
        data => data
      ));
  }
  GetDirectoryByDirectoryId(directoryId: number) {
    return this.httpClient.get<ApiResponseModel>('DirectoryMaster/getdirectorybydirectory/' + directoryId)
      .pipe(map(
        data => data
      ));
  }
  GetDirectoryByCategory(categoryId: number) {
    return this.httpClient.get<ApiResponseModel>('DirectoryMaster/getdirectorybycategory/' + categoryId)
      .pipe(map(
        data => data
      ));
  }

  GetDirectoryByCategorySearchText(categoryId: number, searchText: string) {
    return this.httpClient.get<ApiResponseModel>('DirectoryMaster/getdirectorybycategorysearchtext/' + categoryId + '/' + searchText)
      .pipe(map(
        data => data
      ));
  }
  GetTotalDirectory() {
    return this.httpClient.get<ApiResponseModel>('DirectoryMaster/gettotaldirectory')
      .pipe(map(
        data => data
      ));
  }
  //#endregion

  //#region HttpPostMethods
  GetAllDirectory(paginationModel: PaginationModel) {
    return this.httpClient.post<ApiResponseModel>('DirectoryMaster/getalldirectory', paginationModel)
      .pipe(map(
        data => data
      ));
  }

  InsertDirectory(directoryMaster: any) {
    directoryMaster.directoryMaster.CategoryId = +directoryMaster.directoryMaster.CategoryId;
    return this.httpClient.post<ApiResponseModel>('DirectoryMaster/insertdirectory', directoryMaster)
      .pipe(map(
        data => data
      ));
  }
  InsertDirectoryRegisterUser(directoryMaster: DirectoryMasterModel) {
    directoryMaster.CategoryId = +directoryMaster.CategoryId;
    return this.httpClient.post<ApiResponseModel>('DirectoryMaster/insertdirectoryregisteruser', directoryMaster)
      .pipe(map(
        data => data
      ));
  }
  UpdateDirectory(directoryMaster: DirectoryMasterModel) {
    directoryMaster.CategoryId = +directoryMaster.CategoryId;
    return this.httpClient.post<ApiResponseModel>('DirectoryMaster/updatedirectory', directoryMaster)
      .pipe(map(
        data => data
      ));
  }
  DeletDirectory(directoryMaster: DirectoryMasterModel) {
    return this.httpClient.post<ApiResponseModel>('DirectoryMaster/deletedirectory', directoryMaster)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
