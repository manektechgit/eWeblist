import { Component, OnInit } from '@angular/core';
import { AppJsPath, AppSecurity, AppRoutesLinkLogin } from 'src/app/_app-constants/app-constants.config';
import { DirectoryClickService } from 'src/app/_services/directory-click.service';
import { SiteTotalClicksResponse, SiteTotalChartDataRequest } from 'src/app/_modelsVM/dashboard-vm';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Role } from 'src/app/_app-constants/app-enum.config';
import { DirectoryPlanService } from 'src/app/_services/directory-plan.service';
import { DirectoryPlanDetailModel } from 'src/app/_models/directory-plan.model';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  siteClickDetail: SiteTotalClicksResponse[] = [];
  sitePublishDetail: SiteTotalClicksResponse[] = [];
  directoryPlanDetail: DirectoryPlanDetailModel[] = [];
  //#region Charts Declaration
  lineChartType = 'bar';
  lineChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          precision: 0,
          beginAtZero: true
        }
      }]
    }
  };
  lineChartDataTotalClicks: ChartDataSets[] = [{ data: [], label: 'Total Clicks' }];
  lineChartLabelsTotalClicks: Label[] = [];

  lineChartDataTotalPublish: ChartDataSets[] = [{ data: [], label: 'Total Clicks' }];
  lineChartLabelsTotalPublish: Label[] = [];
  lineChartColors: Color[] = [
    {
      backgroundColor: '#0551ec',
      hoverBackgroundColor: '#0542bc',
      borderColor: '#0551ec'
    }];
  //#endregion

  constructor(
    private directoryClickService: DirectoryClickService,
    private directoryPlanService: DirectoryPlanService,
    private authService: AuthenticationService,
    private router: Router) {
    this.currentLoginUser = this.authService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetDashboardData();
  }
  private GetDashboardData() {
    this.FilterDataTotalClicks('month');
    if (this.currentLoginUser.RoleId === Role.Admin) {
      this.FilterDataTotalSubmission('month');
    }
  }

  FilterDataTotalClicks(filterBy: 'week' | 'month') {
    const siteClickDetailRequest = {
      FilterBy: filterBy,
      UserId: this.currentLoginUser.UserId
    } as SiteTotalChartDataRequest;
    this.directoryClickService.GetDirectoryClickByWeekMonth(siteClickDetailRequest)
      .subscribe(
        (data) => {
          this.siteClickDetail = data.Result;
          this.SetChartDataTotalClicks();
        },
        (err) => { });
  }
  FilterDataTotalSubmission(filterBy: 'week' | 'month') {
    const siteClickDetailRequest = {
      FilterBy: filterBy,
      UserId: this.currentLoginUser.UserId
    } as SiteTotalChartDataRequest;

    this.directoryClickService.GetDirectoryPublishData(siteClickDetailRequest)
      .subscribe(
        (data) => {
          this.sitePublishDetail = data.Result;
          this.SetChartDataTotalPublish();
        },
        (err) => {

        });
  }
  SetChartDataTotalClicks() {
    const labels = [];
    const clickData = [];
    console.log(this.siteClickDetail);
    this.siteClickDetail.forEach(element => {
      labels.push(element.DateData);
      clickData.push(element.TotalCount);
    });
    this.lineChartDataTotalClicks = [
      { data: clickData, label: 'Total Clicks' },
    ];
    this.lineChartLabelsTotalClicks = labels;
  }
  SetChartDataTotalPublish() {
    const labels = [];
    const clickData = [];
    this.sitePublishDetail.forEach(element => {
      labels.push(element.DateData);
      clickData.push(element.TotalCount);
    });
    this.lineChartDataTotalPublish = [
      { data: clickData, label: 'Total Submission' },
    ];
    this.lineChartLabelsTotalPublish = labels;
  }
}
