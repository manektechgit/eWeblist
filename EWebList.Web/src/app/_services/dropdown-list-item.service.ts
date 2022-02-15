import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DropdownListItemService {

  constructor(private httpClient: HttpClient) { }

  //#region Get Methods
  GetDropDownList(categoryName: string) {
    return this.httpClient.get<ApiResponseModel>('DropDownListItem/getdropdownlist/' + categoryName)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
