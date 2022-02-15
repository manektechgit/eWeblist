import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerServiceService } from '../_services/logger-service.service';
import { AppSecurity } from '../_app-constants/app-constants.config';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor(private loggerService: LoggerServiceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.SetLogToServer();
    return next.handle(request);
  }
  private SetLogToServer() {
    const logData = localStorage.getItem(AppSecurity.failed_log);
    if (logData !== null) {
      this.loggerService.InsertLog(JSON.parse(logData)).subscribe((data) => {
        if (data.StatusCode === 200) {
          localStorage.removeItem(AppSecurity.failed_log);
        }
      });
    }
  }
}
