import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAuthGuard } from 'src/app/_guards/user-auth.guard';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { Role } from 'src/app/_app-constants/app-enum.config';
import { SubCategoryMasterComponent } from './sub-category-master/sub-category-master.component';
import { SubmitSiteLoginComponent } from './submit-site-login/submit-site-login.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { CategoryLoginComponent } from './category-login/category-login.component';
import { DirectoryListByCategoryComponent } from './directory-list-by-category/directory-list-by-category.component';
import { ContactUsLoginComponent } from './contact-us-login/contact-us-login.component';
import { SettingComponent } from './setting/setting.component';
import { PaymentLoginComponent } from './payment-login/payment-login.component';
import { DirectoryComponent } from './my-sites-all-sites/directory.component';
import { MySitesComponent } from './my-sites/my-sites.component';


const routes: Routes = [{
  path: '',
  component: UserComponent,
  canActivate: [UserAuthGuard],
  canActivateChild: [UserAuthGuard],
  children: [
    {
      path: '', pathMatch: 'full', redirectTo: 'my-site'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { title: 'Dashboard' }
    },
    {
      path: 'profile',
      component: ProfileComponent,
      data: { title: 'My Profile' }
    },
    {
      path: 'my-site',
      component: MySitesComponent,
      data: { title: 'My Site' }
    },
    {
      path: 'all-site',
      component: DirectoryComponent,
      data: { title: 'All Site', role: Role.Admin }
    },
    {
      path: 'submit-site',
      component: SubmitSiteLoginComponent,
      data: { title: 'Submit Site' }
    },
    {
      path: 'submit-site/:mode/:directoryId/:name',
      component: SubmitSiteLoginComponent,
      data: { title: 'Edit Site' }
    },
    {
      path: 'category-master',
      component: CategoryMasterComponent,
      data: { title: 'Category Master', role: Role.Admin }
    },
    {
      path: 'sub-category-master',
      component: SubCategoryMasterComponent,
      data: { title: 'Sub Category Master', role: Role.Admin }
    },
    {
      path: 'manage-users',
      component: ManageUserComponent,
      data: { title: 'Manage Users', role: Role.Admin }
    },
    {
      path: 'category',
      component: CategoryLoginComponent,
      data: { title: 'Category' }
    },
    {
      path: 'list',
      component: DirectoryListByCategoryComponent,
      data: { title: 'Directory' }
    },
    {
      path: 'contact-us',
      component: ContactUsLoginComponent,
      data: { title: 'Contact Us' }
    },
    {
      path: 'setting',
      component: SettingComponent,
      data: { title: 'Setting' }
    },
    {
      path: 'plan',
      component: PaymentLoginComponent,
      data: { title: 'Choose Plan' }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
