import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { SubCategoryMasterService } from 'src/app/_services/sub-categorymaster.service';
import { SubCategoryMasterModel } from 'src/app/_models/sub-category-master.model';
import { FileToUpload } from 'src/app/_models/flie-upload.model';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { AppJsPath, AppMessages, AppRoutesLinkNonLogin, AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { CountryCode } from 'src/app/_models/country-code';
import { CountryCodeService } from 'src/app/_services/country-code.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { dialCodes } from 'src/app/_app-constants/dial-code';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { EmailValidationService } from 'src/app/_services/email-validation.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-submit-site',
  templateUrl: './submit-site.component.html'
})
export class SubmitSiteComponent implements OnInit {
  //#region Initilization and variable declaration
  @ViewChild('wesiteurl') websiteUrl: ElementRef;
  @ViewChild('category') categoryCombo: ElementRef;
  @ViewChild('newUser') newUser: ElementRef;
  @ViewChild('alreadyauser') alreadyauser: ElementRef;

  directoryForm: FormGroup;
  isSubmit: boolean;
  categories: CategoryMasterModel;
  subCategories: SubCategoryMasterModel;
  countryCodes: CountryCode[] = [];
  directoryLogo: FileToUpload;
  titles: DropDownItemModel;
  isPassowrdTextFocus = false;
  selectedCountryCode = 'in';
  userData: UserMasterModel;
  //#region 
  maxLength100=100;
  maxLength500=500;
  //#endregion

  constructor(
    private dropDownService: DropdownListItemService,
    private categoryService: CategoryMasterService,
    private subCategoryService: SubCategoryMasterService,
    private directoryMasterService: DirectoryMasterService,
    private countryCodeService: CountryCodeService,
    private router: Router,
    private alertService: ToastrService,
    private authService: AuthenticationService,
    private imageCompress: NgxImageCompressService,
    private emailValidateService: EmailValidationService,
    private modalService: NgbModal,
    private userService: UserMasterService
  ) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeForm();
    this.GetCountryCode();
    this.GetTitles();
    this.GetCategory();
  }
  private InitilizeForm() {
    const urlRegex = '[Hh][Tt][Tt][Pp][Ss]?://(.*)';
    this.directoryForm = new FormGroup({
      userMaster: new FormGroup({
        RegistrationName: new FormControl('', Validators.required),
        Password: new FormControl(''),
        // Password: new FormControl('', [Validators.required,
        // Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),Validators.maxLength(15)]),
        Title: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
        CountryCode: new FormControl('+91', [Validators.required]),
        ContactNo: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]),
        RoleId: new FormControl(2, Validators.required),
        IsActive: new FormControl(true),
      }),
      directoryMaster: new FormGroup({
        CategoryId: new FormControl(null, Validators.required),
        SubCategoryId: new FormControl(null, Validators.required),
        BusinessName: new FormControl('', Validators.required),
        WebsiteUrl: new FormControl('', [Validators.required, Validators.pattern(urlRegex)]),
        ListingHeadline: new FormControl('', [Validators.required,Validators.maxLength(this.maxLength100)]),
        Keywords: new FormControl('', [Validators.required,Validators.maxLength(this.maxLength100)]),
        Description: new FormControl('', [Validators.required,Validators.maxLength(this.maxLength500)]),
        IsActive: new FormControl(true),
        DirectoryImage: new FormControl(null, Validators.required)
      }),
    });
  }
  get u() { return this.directoryForm.controls.userMaster['controls']; }
  get d() { 
    return this.directoryForm.controls.directoryMaster['controls']; }
  //#endregion

  //#region All Get Methods
  private GetCategory() {
    this.categoryService.GetAllCategory().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.categories = data.Result;
      }
    });
  }
  private GetSubCategory() {
    this.subCategories = null;
    if (this.categoryCombo.nativeElement.value !== null) {
      this.subCategoryService.GetAllSubCategoryByCategory(this.categoryCombo.nativeElement.value).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.subCategories = data.Result;
        }
      });
    }

  }
  private GetCountryCode() {
    this.countryCodes = dialCodes;
    // this.countryCodeService.GetAllCountryCodes().subscribe((data) => {
    //   if (data.StatusCode === 200) {
    //     this.countryCodes = data.Result;
    //   }
    // });
  }
  private GetTitles() {
    this.dropDownService.GetDropDownList('Title').subscribe((data) => {
      if (data.StatusCode === 200) {
        this.titles = data.Result;
      }
    });
  }
  //#endregion

  //#region form submit
  onSubmit() {
    this.isSubmit = true;
    if (this.directoryForm.invalid) {
      return false;
    } else {
      window.scroll(0, 0);
      this.directoryMasterService.InsertDirectory(this.directoryForm.value)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            if (data.Result.IsNewUser) {
              this.openModal(this.newUser);
              this.ResetForm();
            } else if (!data.Result.IsNewUser && data.Result.IsApproved) {
              this.alertService.success(AppMessages.SITE_CREATED);
              localStorage.setItem(AppSecurity.temp_directory_Detail, data.Result.DirectoryId);
              this.LoginUser();
            } else if (!data.Result.IsNewUser && !data.Result.IsApproved) {
              this.ResetForm();
              this.openModal(this.alreadyauser);
            }
          } else if (data.StatusCode === 226) {
            this.alertService.error(data.Message);
            this.websiteUrl.nativeElement.focus();
            return false;
          }
        });
      // Email Response Code
      // this.emailValidateService.ValidateEmail(this.directoryForm.controls.userMaster.value.Email)
      //   .subscribe((emailResponse) => {
      //     if (emailResponse.StatusCode === 200) {
      //       if (emailResponse.Result === true) {
      //       } else {
      //         this.alertService.error(AppMessages.EMAIL_NOTVALID);
      //         return false;
      //       }
      //     }
      //   });
    }
  }
  private LoginUser() {
    this.userService.GetUserByEmail(this.directoryForm.controls.userMaster.value.Email).subscribe((userData) => {
      if (userData.StatusCode === 200) {
        this.userData = userData.Result;
        this.userData.Password = atob(this.userData.Password);
        this.authService.AuthenticateUser(this.userData)
          .subscribe((loginResponseData) => {
            if (typeof loginResponseData !== 'undefined' && loginResponseData) {
              if (loginResponseData.StatusCode === 200) {
                if (loginResponseData.Result === null) {
                  this.alertService.error(AppMessages.LOGIN_FAILED);
                }
                else {
                  if (loginResponseData.Result.IsActive) {
                    this.authService.SetUserLoginDataInSesion(true, loginResponseData.Result);
                    this.router.navigate([AppRoutesLinkNonLogin.PLAN_PAGE]);
                  }
                }
              }
            }
            else {
              this.alertService.error(AppMessages.LOGIN_FAILED);
            }
          }, (err) => {
            this.alertService.error(AppMessages.LOGIN_FAILED);
          });
      }
    });

  }
  private ResetForm() {
    this.directoryForm.reset();
    this.isSubmit = false;
    this.directoryLogo = null;
    this.directoryForm.controls.userMaster.patchValue({
      RoleId: 2,
      IsActive: true
    });
    this.directoryForm.controls.directoryMaster.patchValue({
      IsActive: true
    });
    window.scroll(0, 0);
  }
  #endregion

  //#region On change methods
  onCategoryChange() {
    this.GetSubCategory();
  }
  changeSelectedCountryCode(value: CountryCode): void {
    this.directoryForm.controls.userMaster.patchValue({
      CountryCode: value.CountryCode,
    });
    this.selectedCountryCode = value.AlphaCode;
  }
  //#endregion

  //#region logo and file handling
  handleFileInput(fileInput: any) {
    const file = new FileToUpload();
    const fileData = fileInput.target.files[0] as File;
    file.fileName = fileData.name;
    file.fileSize = fileData.size.toString();
    file.fileType = fileData.type;
    const mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (event) => {
      this.imageCompress.compressFile(reader.result.toString(), null, 50, 50).then(
        result => {
          file.fileAsBase64 = result;
        }
      );
      this.directoryLogo = file;
      this.directoryForm.controls.directoryMaster.patchValue({
        DirectoryImage: file
      });
    };
  }
  handleDragAndDrop(fileInput: any) {
    const file = new FileToUpload();
    const fileData = fileInput[0] as File;
    file.fileName = fileData.name;
    file.fileSize = fileData.size.toString();
    file.fileType = fileData.type;
    const mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (event) => {
      this.imageCompress.compressFile(reader.result.toString(), null, 50, 50).then(
        result => {
          file.fileAsBase64 = result;
        }
      );
      this.directoryLogo = file;
      this.directoryForm.controls.directoryMaster.patchValue({
        DirectoryImage: file
      });
    };
  }
  RemoveLogo() {
    this.directoryLogo = null;
    this.directoryForm.controls.directoryMaster.patchValue({
      DirectoryImage: null
    });
  }
  //#endregion
  //#region modalPopup
  openModal(modalname: any) {
    this.modalService.open(modalname).result.then((result) => {
    }, (reason) => {
      this.getDismissReason(reason);
    });
  }
  RedirectToLogin() {
    this.modalService.dismissAll();
    this.router.navigate(['/login']);
  }
  private getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      this.RedirectToLogin();
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.RedirectToLogin();
    } else {
      this.RedirectToLogin();
    }
  }
  //#endregion
}
