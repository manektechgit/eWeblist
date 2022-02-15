import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { ContactUsModel } from '../_models/contact-us';

@Injectable()
export class ContactUsService {

  constructor(private httpClient: HttpClient) { }

  //#region Post Methods
  InsertContactInfo(contactUs: ContactUsModel) {
    return this.httpClient.post<ApiResponseModel>('ContactUs/insertcontactinfo', contactUs)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
