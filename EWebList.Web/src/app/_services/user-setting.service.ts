import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { UserSettingModel } from '../_models/user-setting.model';

@Injectable()
export class UserSettingService {

  constructor(private httpClient: HttpClient) { }
  //#region GetMethods
  GetUserSetting(userId: number) {
    return this.httpClient.get<ApiResponseModel>('UserSetting/getusersetting/' + userId)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
  //#region Post Methods
  UpdateUserSetting(userSetting: UserSettingModel) {
    return this.httpClient.post<ApiResponseModel>('UserSetting/updateusersetting', userSetting)
      .pipe(map(
        data => data
      ));
  }
  //#endregion
}
