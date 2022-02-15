import { Component, OnInit, OnDestroy } from '@angular/core';
import { DirectoryPlanDetailModel } from 'src/app/_models/directory-plan.model';
import { environment } from 'src/environments/environment';
import { AppSecurity, AppRoutesLinkNonLogin, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { DirectoryPlanService } from 'src/app/_services/directory-plan.service';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-shared',
  templateUrl: './payment-shared.component.html',
  styleUrls: ['./payment-shared.component.css']
})
export class PaymentSharedComponent implements OnInit, OnDestroy {
  public payPalConfig?: IPayPalConfig;
  currentLoginUser?: LoginResponseModel;
  directoryId: number;
  directoryData: DirectoryMasterModel;
  isbasicPlan = true;
  IsValidDirectoryId = false;
  constructor(
    private authService: AuthenticationService,
    private directoryService: DirectoryMasterService,
    private directoryPlanService: DirectoryPlanService,
    private alertService: ToastrService,
    private router: Router) {
    this.currentLoginUser = this.authService.GetLoginUserDetail();
    if (localStorage.getItem(AppSecurity.temp_directory_Detail) !== null &&
      localStorage.getItem(AppSecurity.temp_directory_Detail) !== undefined) {
      this.directoryId = +localStorage.getItem(AppSecurity.temp_directory_Detail);
      this.IsValidDirectoryId = true;
    }
  }

  ngOnInit(): void {
    if (this.directoryId !== undefined) {
      this.InitilizeDirectoryDataAndPayPal();
    }
  }

  private InitilizeDirectoryDataAndPayPal() {
    this.directoryService.GetDirectoryByDirectoryId(this.directoryId).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.directoryData = data.Result[0];
        this.initConfig();
      }
    });
  }

  SetPlan(value: boolean) {
    this.isbasicPlan = value;
  }

  //#region Init PayPal
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.paypal_clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '5',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '5'
                }
              }
            },
            items: [
              {
                name: 'Premium Subscription ' + this.directoryData.BusinessName,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '5',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
      },
      onClientAuthorization: (data) => {
        this.ProcessPayPalData(data);
        // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
      },
      onError: err => {
        this.alertService.error(AppMessages.PAYMENT_FAIL);
      },
      onClick: (data, actions) => {
        this.isbasicPlan = false;
      },
    };
  }
  //#endregion

  //#region Process Payment
  private ProcessPayPalData(data) {
    const paymentdata = {
      DirectoryId: this.directoryData.DirectoryId,
      UserId: this.directoryData.UserId,
      IsPremimun: true,
      PaypalResponse: JSON.stringify(data)
    } as DirectoryPlanDetailModel;
    this.alertService.success(AppMessages.PAYMENT_SUCCESS);
    this.InsertPlanDetails(paymentdata);
  }
  ProcesBasicPlanData() {
    const paymentdata = {
      DirectoryId: this.directoryData.DirectoryId,
      UserId: this.directoryData.UserId,
      IsPremimun: false,
      PaypalResponse: ''
    } as DirectoryPlanDetailModel;
    this.InsertPlanDetails(paymentdata);
  }
  private InsertPlanDetails(paymentData: DirectoryPlanDetailModel) {
    this.directoryPlanService.InsertDirectoryPlanDetail(paymentData).subscribe((data) => {
      if (data.StatusCode === 200) {
        if (localStorage.getItem(AppSecurity.last_route_url) !== undefined && localStorage.getItem(AppSecurity.last_route_url) !== null) {
          this.router.navigate([localStorage.getItem(AppSecurity.last_route_url)]);
        } else {
          this.router.navigate([AppRoutesLinkNonLogin.USER_MODULE]);
        }
      }
    });
  }
  //#endregion
  ngOnDestroy() {
    localStorage.removeItem(AppSecurity.temp_directory_Detail);
    localStorage.removeItem(AppSecurity.last_route_url);
  }
}
