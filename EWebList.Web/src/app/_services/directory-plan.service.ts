import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryPlanDetailModel } from '../_models/directory-plan.model';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectoryPlanService {

  constructor(private httpClient: HttpClient) { }
  //#region HttpGetMethods
  GetUserDirectoryPlan(userId: number) {
    return this.httpClient.get<ApiResponseModel>('DirectoryPlan/getuserdirectoryplan/' + userId)
      .pipe(map(
        data => data
      ));
  }
  //#endregion

  //#region HttpPostMethods
  InsertDirectoryPlanDetail(directoryPlan: DirectoryPlanDetailModel) {
    return this.httpClient.post<ApiResponseModel>('DirectoryPlan/insertdirectoryplan', directoryPlan)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
