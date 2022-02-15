import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubCategoryMasterModel } from 'src/app/_models/sub-category-master.model';
import { CategoryMasterModel } from 'src/app/_models/category-master.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AddEditModes, AppMessages } from 'src/app/_app-constants/app-constants.config';
import { SubCategoryMasterService } from 'src/app/_services/sub-categorymaster.service';
import { FileToUpload } from 'src/app/_models/flie-upload.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-sub-category',
  templateUrl: './add-edit-sub-category.component.html'
})
export class AddEditSubCategoryComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() categories: CategoryMasterModel;
  @Input() selectedSubCategory: SubCategoryMasterModel;

  @Output() mode = new EventEmitter<{ mode: string, opertaion: string }>();

  currentLoginUser: LoginResponseModel;
  subCategoryMasterForm: FormGroup;
  isSubmit: boolean;
  addMore = false;

  constructor(
    private authenticateService: AuthenticationService,
    private subCategoryService: SubCategoryMasterService,
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
    this.subCategoryMasterForm = new FormGroup(
      {
        SubCategoryId: new FormControl(null),
        CategoryId: new FormControl(null, [Validators.required]),
        Name: new FormControl('', [Validators.required]),
        IconName: new FormControl(''),
        CreatedBy: new FormControl(this.currentLoginUser.UserId, [Validators.required]),
        ModifiedBy: new FormControl(null),
        IsActive: new FormControl(true, [Validators.required]),
        SubCategoryImage: new FormControl(FileToUpload)
      });
  }
  private setEditModeData() {
    this.subCategoryMasterForm.patchValue({
      SubCategoryId: this.selectedSubCategory.SubCategoryId,
      CategoryId: this.selectedSubCategory.CategoryId,
      Name: this.selectedSubCategory.Name,
      IconName: this.selectedSubCategory.IconName,
      CreatedBy: this.selectedSubCategory.CreatedBy,
      ModifiedBy: this.currentLoginUser.UserId,
      IsActive: this.selectedSubCategory.IsActive
    });
  }
  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.addMore = false;
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() { return this.subCategoryMasterForm.controls; }

  onSubmit() {
    this.isSubmit = true;
    if (this.subCategoryMasterForm.invalid) {
      return false;
    } else {
      if (this.addEditMode.toLowerCase() === AddEditModes.insert.toLowerCase()) {
        this.InsertSubCategory();
      } else if (this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()) {
        this.UpdateSubCategory();
      }
    }
  }

  private UpdateSubCategory() {
    this.subCategoryService.UpdateSubCategory(this.subCategoryMasterForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.alertService.success(AppMessages.SAVE_SUCCESS);
          this.onSaveOrCancel('save');
        } else {
          this.alertService.error(AppMessages.SOME_THING_WENT_WRONG);
        }
      });
  }

  private InsertSubCategory() {
    this.subCategoryService.InsertSubCategory(this.subCategoryMasterForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.alertService.success(AppMessages.SAVE_SUCCESS);
          if (this.addMore) {
            this.ResetFormForNextInsert();
          } else {
            this.onSaveOrCancel('save');
          }

        } else {
          this.alertService.error(AppMessages.SOME_THING_WENT_WRONG);
        }
      });
  }
  private ResetFormForNextInsert() {
    this.subCategoryMasterForm.patchValue({
      Name: '',
      IconName: '',
      SubCategoryImage: FileToUpload
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
      this.subCategoryMasterForm.patchValue({
        SubCategoryImage: file
      });
    };
  }
}
