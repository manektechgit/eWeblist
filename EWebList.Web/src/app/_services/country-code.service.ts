import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CountryCodeService {

  constructor(private httpClient: HttpClient) { }
  //#region Get Methods
  GetAllCountryCodes() {
    return this.httpClient.get<ApiResponseModel>('CountryCode/getallcountrycodes')
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
