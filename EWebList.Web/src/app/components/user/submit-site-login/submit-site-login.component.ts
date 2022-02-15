import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubCategoryMasterModel } from 'src/app/_models/sub-category-master.model';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { SubCategoryMasterService } from 'src/app/_services/sub-categorymaster.service';
import { DirectoryMasterService } from 'src/app/_services/directorymaster.service';
import { FileToUpload } from 'src/app/_models/flie-upload.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditModes, AppJsPath, AppMessages, AppRoutesLinkLogin, AppSecurity } from 'src/app/_app-constants/app-constants.config';
import { DirectoryMasterModel } from 'src/app/_models/directory-master.model';
import { environment } from 'src/environments/environment';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Role } from 'src/app/_app-constants/app-enum.config';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-submit-site-login',
  templateUrl: './submit-site-login.component.html'
})
export class SubmitSiteLoginComponent implements OnInit, AfterViewInit {
  //#region Declration
  @ViewChild('wesiteurl') websiteUrl: ElementRef;
  @ViewChild('category') categoryCombo: ElementRef;
  directoryForm: FormGroup;
  isSubmit: boolean;
  mode = AddEditModes.insert;

  categories: CategoryMasterModel;
  subCategories: SubCategoryMasterModel;
  currentLoginUser: LoginResponseModel;

  directoryLogo: FileToUpload;
  directory: DirectoryMasterModel;
  directoryId: number;
  directoryImageServerPath = environment.directoryImagePath;
  isAuthorizeForEdit = true;
//#region 
maxLength100=100;
maxLength500=500;
//#endregion
  constructor(
    private authenticateService: AuthenticationService,
    private categoryService: CategoryMasterService,
    private subCategoryService: SubCategoryMasterService,
    private directoryMasterService: DirectoryMasterService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: ToastrService,
    private imageCompress: NgxImageCompressService) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeForm();
    this.GetCategory();
  }
  ngAfterViewInit() {
    this.route.params.subscribe(
      params => {
        if (params.mode) {
          this.mode = params.mode;
          this.directoryId = params.directoryId;
        } else {
          this.mode = AddEditModes.insert;
        }
      }
    );
    this.checkForEditMode();
  }
  //#endregion

  //#region Get And Set Function
  private checkForEditMode() {
    if (this.mode.toLowerCase() === AddEditModes.edit) {
      this.directoryMasterService.GetDirectoryByDirectoryId(this.directoryId)
        .subscribe((data) => {
          if (data.StatusCode === 200) {
            if (data.Result.length > 0) {
              this.directory = data.Result[0];
              if (this.directory.UserId === this.currentLoginUser.UserId || this.currentLoginUser.RoleId === Role.Admin) {
                this.SetEditModeData();
              }
              else {
                this.isAuthorizeForEdit = false;
              }
            } else {
              this.isAuthorizeForEdit = false;
            }
          }
        });
    }
  }

  private InitilizeForm() {
    const urlRegex = '[Hh][Tt][Tt][Pp][Ss]?://(.*)';
    this.directoryForm = new FormGroup({
      DirectoryId: new FormControl(null),
      CategoryId: new FormControl(null, Validators.required),
      SubCategoryId: new FormControl(null, Validators.required),
      UserId: new FormControl(this.currentLoginUser.UserId, Validators.required),
      BusinessName: new FormControl('', Validators.required),
      Logo: new FormControl(''),
      WebsiteUrl: new FormControl('', [Validators.required, Validators.pattern(urlRegex)]),
      ListingHeadline: new FormControl('', [Validators.required,Validators.maxLength(this.maxLength100)]),
      Keywords: new FormControl('', [Validators.required,Validators.maxLength(this.maxLength100)]),
      Description: new FormControl('', [Validators.required,Validators.maxLength(this.maxLength500)]),
      IsDeleted: new FormControl(false),
      IsActive: new FormControl(true),
      DirectoryImage: new FormControl(null)
    });
  }
  private SetEditModeData() {
    this.GetSubCategory(this.directory.CategoryId);
    this.directoryForm.patchValue({
      DirectoryId: this.directory.DirectoryId,
      CategoryId: this.directory.CategoryId,
      SubCategoryId: this.directory.SubCategoryId,
      UserId: this.directory.UserId,
      BusinessName: this.directory.BusinessName,
      Logo: this.directory.Logo,
      WebsiteUrl: this.directory.WebsiteUrl,
      ListingHeadline: this.directory.ListingHeadline,
      Keywords: this.directory.Keywords,
      Description: this.directory.Description,
      IsDeleted: this.directory.IsDeleted,
      IsActive:this.directory.IsActive
    });
  }
  private GetCategory() {
    this.categoryService.GetAllCategory().subscribe((data) => {
      if (data.StatusCode === 200) {
        this.categories = data.Result;
      }
    });
  }
  private GetSubCategory(selectedCategoryId: number) {
    this.subCategories = null;
    this.subCategoryService.GetAllSubCategoryByCategory(selectedCategoryId).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.subCategories = data.Result;
      }
    });
  }

  get d() { return this.directoryForm.controls; }
  //#endregion

  //#region Change Functions
  onCategoryChange() {
    this.GetSubCategory(this.categoryCombo.nativeElement.value);
  }
  //#endregion

  //#region Submit Function
  onSubmit() {
    this.isSubmit = true;
    if (this.directoryForm.invalid) {
      return false;
    } else {
      window.scroll(0, 0);
      if (this.mode.toLowerCase() === AddEditModes.insert) {
        this.directoryMasterService.InsertDirectoryRegisterUser(this.directoryForm.value)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              this.alertService.success(AppMessages.SITE_CREATED);
              localStorage.setItem(AppSecurity.temp_directory_Detail, data.Result);
              this.router.navigate([AppRoutesLinkLogin.PLAN_PAGE]);
            } else if (data.StatusCode === 226) {
              this.alertService.error(data.Message);
              this.websiteUrl.nativeElement.focus();
              return false;
            } else {
              this.alertService.error(AppMessages.SOME_THING_WENT_WRONG);
            }
          });
      } else if (this.mode.toLowerCase() === AddEditModes.edit) {
        this.directoryMasterService.UpdateDirectory(this.directoryForm.value)
          .subscribe((data) => {
            if (data.StatusCode === 200) {
              this.alertService.success(AppMessages.SITE_UPDATED);
              this.router.navigate(['user/my-site']);
            } else if (data.StatusCode === 226) {
              this.alertService.error(data.Message);
              this.websiteUrl.nativeElement.focus();
              return false;
            } else {
              this.alertService.error(AppMessages.SOME_THING_WENT_WRONG);
            }
          });
      }
    }
  }
  //#endregion

  //#region File upload handling
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
      this.directoryForm.patchValue({
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
      this.directoryForm.patchValue({
        DirectoryImage: file
      });
    };
  }
  RemoveLogo() {
    this.directoryLogo = null;
    this.directoryForm.patchValue({
      DirectoryImage: null
    });
  }
  //#endregion
}
