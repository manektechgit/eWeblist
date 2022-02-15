import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { UserMasterService } from 'src/app/_services/user-master.service';
import { UserMasterModel } from 'src/app/_models/user-master.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileToUpload } from 'src/app/_models/flie-upload.model';
import { AddEditModes, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { environment } from 'src/environments/environment';
import { CountryCode } from 'src/app/_models/country-code';
import { CountryCodeService } from 'src/app/_services/country-code.service';
import { dialCodes } from 'src/app/_app-constants/dial-code';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  currentLoginUser: LoginResponseModel;
  userMaster: UserMasterModel;
  userMasterForm: FormGroup;
  isSubmit: boolean;
  UserProfileImage: FileToUpload;
  mode = AddEditModes.default;
  userImageServerPath = environment.userImagePath;
  countryCodes: CountryCode[] = [];
  selectedCountryCode = 'in';
  constructor(
    private authService: AuthenticationService,
    private userService: UserMasterService,
    private countryCodeService: CountryCodeService,
    private alertService: ToastrService,
    private imageCompress: NgxImageCompressService) {
    this.currentLoginUser = this.authService.GetLoginUserDetail();
    this.GetLoginUserDetail();
  }

  ngOnInit(): void {
    this.InitilizeForm();
    this.GetCountryCode();
  }

  private GetLoginUserDetail() {
    this.userService.GetUserDetailById(this.currentLoginUser.UserId)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.userMaster = data.Result;
          this.SetProfileDefault();
          this.authService.UpdateLocalStorage(this.userMaster);
        }
      });
  }
  private InitilizeForm() {
    this.userMasterForm = new FormGroup(
      {
        RegistrationName: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        CountryCode: new FormControl(null, [Validators.required]),
        ContactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9_-]{10,12}')]),
        Password: new FormControl('', {
          validators: [Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
          Validators.maxLength(15)], updateOn: 'change'
        }),
        ConfirmPassword: new FormControl(''),
        ProfileImage: new FormControl(FileToUpload)
      }, {
      validators: this.password.bind(this),
      updateOn: 'blur'
    });
  }
  private GetCountryCode() {
    this.countryCodes = dialCodes;
    // this.countryCodeService.GetAllCountryCodes().subscribe((data) => {
    //   if (data.StatusCode === 200) {
    //     this.countryCodes = data.Result;
    //   }
    // });
  }
  private SetProfileDefault() {
    this.userMasterForm.patchValue({
      RegistrationName: this.userMaster.RegistrationName,
      Email: this.userMaster.Email,
      ContactNo: this.userMaster.ContactNo,
      CountryCode: this.userMaster.CountryCode
    });
    this.selectedCountryCode = this.countryCodes.filter(x => x.CountryCode === this.userMaster.CountryCode)[0].AlphaCode;
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('Password');
    const { value: confirmPassword } = formGroup.get('ConfirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  // get the value of form control to validate on html file
  get f() { return this.userMasterForm.controls; }
  SetMode(mode: string) {
    this.mode = mode;
  }
  onSubmit() {
    this.isSubmit = true;
    if (this.userMasterForm.invalid) {
      return false;
    } else {
      this.setUserMasterValueForUpdate();
      this.userService.UpdateUserMaster(this.userMaster).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.alertService.success(AppMessages.PROFILE_UPDATED);
          this.processProfileUpdate();
        }
      });
    }
  }

  private processProfileUpdate() {
    this.GetLoginUserDetail();
    // this.authService.UpdateLocalStorage(this.userMaster);
    this.SetMode(AddEditModes.default);
    window.location.reload();
  }

  private setUserMasterValueForUpdate() {
    this.userMaster.RegistrationName = this.userMasterForm.value.RegistrationName;
    this.userMaster.Email = this.userMasterForm.value.Email;
    this.userMaster.ContactNo = this.userMasterForm.value.ContactNo;
    if (this.userMasterForm.value.Password !== '') {
      this.userMaster.Password = this.userMasterForm.value.Password;
    }
    this.userMaster.ProfileImage = this.userMasterForm.value.ProfileImage;
    this.userMaster.CountryCode = this.userMasterForm.value.CountryCode;
  }

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
      this.UserProfileImage = file;
      this.userMasterForm.patchValue({
        ProfileImage: file
      });
    };
  }
  changeSelectedCountryCode(value: CountryCode): void {
    this.userMasterForm.patchValue({
      CountryCode: value.CountryCode,
    });
    this.selectedCountryCode = value.AlphaCode;
  }
}
