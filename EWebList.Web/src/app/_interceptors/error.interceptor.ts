import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { AppMessages, AppSecurity } from '../_app-constants/app-constants.config';
import { LogModel } from '../_models/log.model';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.LogoutUser();
        location.reload(true);
      }
      this.toastr.error(AppMessages.SOME_THING_WENT_WRONG);
      // this.alertService.error('Something went wrong');
      const error = err.error.message || err.statusText;
      this.GetSetLogForServer(err);
      return throwError(error);
    }));
  }

  private GetSetLogForServer(error: string) {
    const previousLogs: LogModel[] = [];
    if (localStorage.getItem(AppSecurity.failed_log) !== null) {
      const localLogs = JSON.parse(localStorage.getItem(AppSecurity.failed_log));
      localLogs.forEach(element => {
        previousLogs.push(element);
      });
    }
    const log = { LogTime: new Date(), LogText: JSON.stringify(error) } as LogModel;
    previousLogs.push(log);
    localStorage.setItem(AppSecurity.failed_log, JSON.stringify(previousLogs));
  }
}
