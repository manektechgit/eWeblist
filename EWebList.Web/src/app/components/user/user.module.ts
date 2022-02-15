import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginUserHeaderComponent } from 'src/app/header/login-user-header/login-user-header.component';
import { LoginUserFooterComponent } from 'src/app/footer/login-user-footer/login-user-footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAuthGuard } from 'src/app/_guards/user-auth.guard';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { AddEditComponent } from './category-master/add-edit/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubCategoryMasterComponent } from './sub-category-master/sub-category-master.component';
import { AddEditSubCategoryComponent } from './sub-category-master/add-edit-sub-category/add-edit-sub-category.component';
import { SubmitSiteLoginComponent } from './submit-site-login/submit-site-login.component';
import { FilterCategoryPipe } from 'src/app/pipes/filter-category.pipe';
import { ProfileComponent } from './profile/profile.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserDetailComponent } from './manage-user/user-detail/user-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryLoginComponent } from './category-login/category-login.component';
import { DirectoryListByCategoryComponent } from './directory-list-by-category/directory-list-by-category.component';
import { FilterCategorySubCategoryPipe } from 'src/app/pipes/filter-category-sub-category.pipe';
import { FilterUserPipe } from 'src/app/pipes/filter-user.pipe';
import { ContactUsLoginComponent } from './contact-us-login/contact-us-login.component';
import { ChartsModule } from 'ng2-charts';
import { SettingComponent } from './setting/setting.component';
import { PaymentLoginComponent } from './payment-login/payment-login.component';
import { DirectoryComponent } from './my-sites-all-sites/directory.component';
import { MySitesComponent } from './my-sites/my-sites.component';


@NgModule({
  declarations: [
    UserComponent,
    LoginUserHeaderComponent,
    LoginUserFooterComponent,
    DashboardComponent,
    CategoryMasterComponent,
    AddEditComponent,
    SubCategoryMasterComponent,
    AddEditSubCategoryComponent,
    DirectoryComponent,
    SubmitSiteLoginComponent,
    FilterCategoryPipe,
    FilterCategorySubCategoryPipe,
    FilterUserPipe,
    ProfileComponent,
    ManageUserComponent,
    UserDetailComponent,
    CategoryLoginComponent,
    DirectoryListByCategoryComponent,
    ContactUsLoginComponent,
    SettingComponent,
    PaymentLoginComponent,
    MySitesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule
  ],
  providers: [UserAuthGuard]
})
export class UserModule { }
