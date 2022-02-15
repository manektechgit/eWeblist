import { Injectable } from '@angular/core';
import { LogModel } from '../_models/log.model';
import { ApiResponseModel } from '../_models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor(private httpClient: HttpClient) { }

  //#region HttpPostMethods
  InsertLog(logdetail: LogModel) {
    return this.httpClient.post<ApiResponseModel>('Log/insertlog', logdetail)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
