import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryClickModel } from '../_models/directory-click.model';
import { ApiResponseModel } from '../_models/api-response.model';
import { map } from 'rxjs/operators';
import { DirectoryMasterModel } from '../_models/directory-master.model';
import { LoginResponseModel } from '../_models/login-response.model';
import { AuthenticationService } from './authentication.service';
import { SiteTotalChartDataRequest } from '../_modelsVM/dashboard-vm';

@Injectable()
export class DirectoryClickService {
  private currentLoginUser: LoginResponseModel;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
  }
  //#region Get Methods
  //#endregion

  //#region Post Methods
  InsertDirectoryClick(directory: DirectoryMasterModel) {
    const directoryClickDetail = this.SetClickDetail(directory);
    return this.httpClient.post<ApiResponseModel>
      ('DirectoryClickDetail/insertdirectoryclick', directoryClickDetail)
      .pipe(map(
        data => data
      ));
  }

  GetDirectoryClickByWeekMonth(siteChartDataRequest: SiteTotalChartDataRequest) {
    return this.httpClient.post<ApiResponseModel>
      ('DirectoryClickDetail/getsiteclickdetails', siteChartDataRequest)
      .pipe(map(
        data => data
      ));
  }
  GetDirectoryPublishData(siteChartDataRequest: SiteTotalChartDataRequest) {
    return this.httpClient.post<ApiResponseModel>
      ('DirectoryClickDetail/getdirectorypublishdata', siteChartDataRequest)
      .pipe(map(
        data => data
      ));
  }

  private SetClickDetail(directory: DirectoryMasterModel) {
    this.currentLoginUser = this.authService.GetLoginUserDetail();
    const directoryClickDetail = {
      DirectoryId: directory.DirectoryId,
      UserId: (this.currentLoginUser !== null) ? this.currentLoginUser.UserId : null
    } as DirectoryClickModel;
    return directoryClickDetail;
  }
  //#endregion
}
