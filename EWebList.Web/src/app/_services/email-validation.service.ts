import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  constructor(private httpClient: HttpClient) { }
  //#region Get Methods
  ValidateEmail(emailId: string) {
    return this.httpClient.get<ApiResponseModel>('ValidateEmail/validate/' + emailId)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
