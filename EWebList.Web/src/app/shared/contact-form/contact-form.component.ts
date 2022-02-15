import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { ContactUsService } from 'src/app/_services/contact-us.service';
import { AppJsPath, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactUsForm: FormGroup;
  isSubmit: boolean;
  dropDownItem: DropDownItemModel;
  @Input() fromPage: 'loginuser' | 'logoutuser';
  constructor(
    private dropDownServeice: DropdownListItemService,
    private contactUsService: ContactUsService,
    private alertService: ToastrService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.GetSubjects();
    this.InitilizeForm();
    this.SetLoginUserdata();
  }
  private SetLoginUserdata() {
    if (this.fromPage === 'loginuser') {
      const currenLoginUser = this.authService.GetLoginUserDetail();
      this.contactUsForm.patchValue({
        Name: currenLoginUser.RegistrationName,
        Email: currenLoginUser.Email
      });
    }
  }

  private InitilizeForm() {
    this.contactUsForm = new FormGroup(
      {
        SubjectId: new FormControl(null, [Validators.required]),
        Name: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]),
        Link: new FormControl(''),
        Message: new FormControl('', [Validators.required]),
      });
  }
  private GetSubjects() {
    this.dropDownServeice.GetDropDownList('ContactUs').subscribe((data) => {
      if (data.StatusCode === 200) {
        this.dropDownItem = data.Result;
      }
    });
  }

  get f() { return this.contactUsForm.controls; }

  onSubmit() {
    window.scroll(0, 0);
    this.isSubmit = true;
    if (this.contactUsForm.invalid) {
      return false;
    } else {
      this.contactUsService.InsertContactInfo(this.contactUsForm.value)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            this.isSubmit = false;
            this.contactUsForm.reset();
            window.scroll(0, 0);
            this.alertService.success(AppMessages.CONTACT_US_MESSAGE);
          }
        });
    }
  }
}
