import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from './_services/title.service';
import { LoggerServiceService } from './_services/logger-service.service';
import { AppSecurity } from './_app-constants/app-constants.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private loggerService: LoggerServiceService) {
  }
  ngOnInit() {
    this.SetLogToServer();
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

  ngOnDestroy() {
    this.SetLogToServer();
  }
}
