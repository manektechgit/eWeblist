import { Injectable } from '@angular/core';
import { ApiResponseModel } from '../_models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class EmailSubscriptionService {

  constructor(private httpClient: HttpClient) { }
  //#region Get Methods
  InsertEmailSubscription(emailId: string) {
    return this.httpClient.get<ApiResponseModel>('EmailSubscription/insertemailsubscription/' + emailId)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
