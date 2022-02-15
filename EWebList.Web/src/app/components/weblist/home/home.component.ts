import { Component, OnInit } from '@angular/core';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { environment } from 'src/environments/environment';
import { AppJsPath, AppSecurity, AppMessages, AppRoutesLinkNonLogin } from 'src/app/_app-constants/app-constants.config';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { Router } from '@angular/router';
import { SearchBy } from 'src/app/_app-constants/app-enum.config';
import { SearchModel } from 'src/app/_models/serach.model';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { EmailSubscriptionService } from 'src/app/_services/email-subscription.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  categories: any;
  categoryImageServerPath = environment.categoryImagePath;
  totalUsers: number;
  totalDirectory: number;
  totalCategory: number;
  email = '';
  emailSubsriptionForm: FormGroup;
  isSubmit: boolean;
  constructor(
    private categoryService: CategoryMasterService,
    private userService: UserMasterService,
    private directoryService: DirectoryMasterService,
    private emailSubscriptionService: EmailSubscriptionService,
    private router: Router,
    private alertService: ToastrService) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeLoginForm();
    this.GetAllCategory();
    this.GetTotalUsers();
    this.GetTotalDirectory();
    this.GetTotalCategory();
  }
  private InitilizeLoginForm() {
    this.emailSubsriptionForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    });
  }
  // get the value of form control to validate on html file
  get f() { return this.emailSubsriptionForm.controls; }

  private GetAllCategory() {
    this.categoryService.GetAllCategoryDetailWithTotalDirectory()
      .subscribe(
        (data) => {
          if (data.StatusCode === 200) {
            this.categories = data.Result;
          }
        },
        (err) => { });
  }
  GetTotalUsers() {
    this.userService.GetTotalActiveUsers()
      .subscribe((data) => {
        this.totalUsers = data.Result;
      });
  }
  GetTotalDirectory() {
    this.directoryService.GetTotalDirectory()
      .subscribe((data) => {
        this.totalDirectory = data.Result;
      });
  }
  GetTotalCategory() {
    this.categoryService.GetTotalCategory()
      .subscribe((data) => {
        this.totalCategory = data.Result;
      });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.emailSubsriptionForm.invalid) {
      return false;
    } else {
      if (this.emailSubsriptionForm.value.Email != '') {
        this.emailSubscriptionService.InsertEmailSubscription(this.emailSubsriptionForm.value.Email)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              this.isSubmit = false;
              this.emailSubsriptionForm.reset();
              this.alertService.success(AppMessages.EMAIL_SUBSRIPTION_SUCESSFULL);
            }
          });
      }

    }
  }
}
