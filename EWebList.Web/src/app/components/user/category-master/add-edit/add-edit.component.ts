import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CategoryMasterService } from 'src/app/_services/categorymaster.service';
import { AddEditModes, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { FileToUpload } from 'src/app/_models/flie-upload.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() selectedCategory: CategoryMasterModel;

  @Output() mode = new EventEmitter<{ mode: string, opertaion: string }>();

  currentLoginUser: LoginResponseModel;
  categoryMasterForm: FormGroup;
  isSubmit: boolean;

  constructor(
    private authenticateService: AuthenticationService,
    private categoryMaster: CategoryMasterService,
    private alertService: ToastrService) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
  }

  ngOnInit(): void {
    this.InitilizeForm();
    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
  }

  private InitilizeForm() {
    this.categoryMasterForm = new FormGroup(
      {
        CategoryId: new FormControl(null),
        Name: new FormControl('', [Validators.required]),
        IconName: new FormControl(''),
        CreatedBy: new FormControl(this.currentLoginUser.UserId, [Validators.required]),
        ModifyBy: new FormControl(null),
        IsActive: new FormControl(true, [Validators.required]),
        CategoryImage: new FormControl(FileToUpload)
      });
  }

  private setEditModeData() {
    this.categoryMasterForm.patchValue({
      CategoryId: this.selectedCategory.CategoryId,
      Name: this.selectedCategory.Name,
      IconName: this.selectedCategory.IconName,
      CreatedBy: this.selectedCategory.CreatedBy,
      ModifyBy: this.currentLoginUser.UserId,
      IsActive: this.selectedCategory.IsActive
    });
  }
  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() { return this.categoryMasterForm.controls; }

  onSubmit() {
    this.isSubmit = true;
    if (this.categoryMasterForm.invalid) {
      return false;
    } else {
      if (this.addEditMode.toLowerCase() === AddEditModes.insert.toLowerCase()) {
        this.InsertCategory();
      } else if (this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()) {
        this.UpdateCategory();
      }
    }
  }

  private UpdateCategory() {
    this.categoryMaster.UpdateCategory(this.categoryMasterForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.alertService.success(AppMessages.SAVE_SUCCESS);
          this.onSaveOrCancel('save');
        } else {
          this.alertService.success(AppMessages.SOME_THING_WENT_WRONG);
        }
      });
  }

  private InsertCategory() {
    this.categoryMaster.InsertCategory(this.categoryMasterForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.alertService.success(AppMessages.SAVE_SUCCESS);
          this.onSaveOrCancel('save');
        } else {
          this.alertService.error(AppMessages.SOME_THING_WENT_WRONG);
        }
      });
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
      file.fileAsBase64 = reader.result.toString();
      this.categoryMasterForm.patchValue({
        CategoryImage: file
      });
    };
  }
}
